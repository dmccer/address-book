import '../../../less/global/global.less';
import '../../../less/component/cell.less';
import '../../../less/component/accordion.less';
import '../../../less/component/layout.less';
import '../../../less/component/form.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';
import querystring from 'querystring';
import find from 'lodash/collection/find';

import AjaxError from '../../ajax-err/';
import ABMember from '../member/';
import SubHeader from '../../sub-header/';
import Loading from '../../loading/';
import Confirm from '../../confirm/';
import Prompt from '../../prompt/';
import Prviate from '../../private/';
import FixedHolder from '../../fixed-holder/';
import Toast from '../../toast/';
import Log from '../../log/';
import AB_TYPES from '../../const/abtype';

export default class ABDetailPage extends React.Component {

  state = {
    abInfo: {},
    memberList: [],
    qs: querystring.parse(location.search.substring(1))
  };

  constructor() {
    super();
  }

  componentWillMount() {
    this.setState({
      atab: this.state.qs.atab || 'member'
    });
  }

  componentDidMount() {
    AjaxError.init(this.refs.toast);

    this.fetch();
  }

  fetch() {
    this.refs.loading.show('加载中...');

    Promise
      .all([this.getABBaseInfo(), this.getMemberList()])
      .then((args) => {
        let abInfo = args[0];

        let abType = find(AB_TYPES, (abType) => {
          return abType.id === abInfo.atype;
        });

        abInfo.abTypeText = abType.name;

        this.setState({
          abInfo: abInfo,
          memberList: args[1]
        });
      })
      .catch((err) => {
        if (err && err instanceof Error) {
          Log.error(err);

          this.refs.toast.warn(`加载数据出错,${err.message}`);
        }
      })
      .done(() => {
        this.refs.loading.close();
      });
  }

  getABBaseInfo() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/addlist_cards_baseinfo',
        type: 'GET',
        cache: false,
        data: {
          aid: this.state.qs.id
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        return res.addlist_card;
      }

      this.refs.toast.warn(res.msg);
    });
  }

  getMemberList() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/query_addlist_cards',
        type: 'GET',
        cache: false,
        data: {
          aid: this.state.qs.id
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        return res.addlist_cards;
      }

      this.refs.toast.warn(res.msg);
    });
  }

  handleClickDelAB(e) {
    e.preventDefault();
    e.stopPropagation();

    this.refs.confirm.show({
      msg: '确定删除整个通讯录？'
    });
  }

  handleDelAB() {
    this.refs.loading.show('请求中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/del_addlist',
        type: 'POST',
        data: {
          aid: this.state.qs.id
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.toast.success('删除通讯录成功');
        setTimeout(() => {
          history.back();
        }, 2000);
        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);

        this.refs.toast.warn(`删除通讯录出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  handleClickJoinAB() {
    let question = this.state.abInfo.aquestion;

    if (question) {
      this.refs.prompt.show({
        title: question
      });
    }
  }

  handleJoinAB(val) {
    if (val === '') {
      return;
    }

    this.refs.loading.show('请求中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/join_addlist',
        type: 'POST',
        data: {
          aid: this.state.qs.id,
          answer: val
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.toast.success(res.msg);

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);

        this.refs.toast.warn(`加入该通讯录成功,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  renderABMembers() {
    let memberList = this.state.memberList;
    let abInfo = this.state.abInfo;

    if (memberList && memberList.length) {
      let list = this.state.memberList.map((member, index) => {
        if (member.uid === abInfo.group_holder_uid) {
          member.holder = true;
        }

        return (
          <ABMember
            key={`member-item_${index}`}
            {...member}
            onView={this.handleToggleActiveMember.bind(this, member)}
          />
        );
      });

      let joinAB = !abInfo.joined_flag ? (
        <div
          className="btn block lightBlue join-btn"
          onClick={this.handleClickJoinAB.bind(this)}
        >加入该通讯录</div>
      ) : null;

      return (
        <div className="member">
          <a className="search" href="./ab-member-search.html">
            <i className="icon s14 icon-search"></i>
            <span>通讯录共有 {memberList.length} 人</span>
          </a>
          <div className="divide"></div>
          <div className="ab-member-list cells cells-access">
            {list}
          </div>
          <a className="more-list">点击查看更多</a>
          <div className="pub-ab-btn">
            <a className="btn block lightBlue" href="./create-ab.html">我也要发布通讯录</a>
          </div>
          {joinAB}
          <Prompt
            ref="prompt"
            confirm={this.handleJoinAB.bind(this)}
          />
          {this.renderMemberActions()}
          <FixedHolder height="44" />
        </div>
      );
    }
  }

  renderABCreated() {
    let memberList = this.state.memberList;

    if (this.state.qs.create == 1) {
      let member = memberList[0];
      let abInfo = this.state.abInfo;

      if (abInfo.group_holder_uid === member.uid) {
        member.holder = true;

        return (
          <div className="ab-created">
            <div className="invitation">
              <p>通讯录创建成功</p>
              <p>您可以分享给朋友一起加入通讯录</p>
              <button className="btn block green">邀请好友</button>
            </div>
            <div className="ab-member-list cells">
              <ABMember {...member} />
            </div>
          </div>
        );
      }
    }
  }

  renderSetting() {
    if (this.state.atab === 'setting') {
      if (this.state.abInfo.group_holder_flag) {
        return (
          <div className="ab-setting cells cells-access">
            <a className="cell" href="#">
              <div className="cell-hd">
                <i className="icon icon-ab-edit s15"></i>
              </div>
              <div className="cell-bd">
                <h3>修改通讯录</h3>
              </div>
              <div className="cell-ft"></div>
            </a>
            <a className="cell" href="#" onClick={this.handleClickDelAB.bind(this)}>
              <div className="cell-hd">
                <i className="icon icon-dustbin s15"></i>
              </div>
              <div className="cell-bd">
                <h3>删除通讯录</h3>
              </div>
              <div className="cell-ft"></div>
            </a>
          </div>
        );
      }

      return (
        <div className="ab-setting cells cells-access">
          <a className="cell" href="#">
            <div className="cell-hd">
              <i className="icon icon-recommend-star s15"></i>
            </div>
            <div className="cell-bd">
              <h3>推荐给好友</h3>
            </div>
            <div className="cell-ft"></div>
          </a>
          <a className="cell" href="#">
            <div className="cell-hd">
              <i className="icon icon-power s15"></i>
            </div>
            <div className="cell-bd">
              <h3>退出该通讯录</h3>
            </div>
            <div className="cell-ft"></div>
          </a>
        </div>
      );
    }
  }

  renderABMember() {
    if (this.state.atab === 'member') {
      return (
        <div>
          {this.renderABCreated()}
          {this.renderABMembers()}
          <h2 className="accordion-hd">疑难帮助</h2>
          <div className="help accordion access">
            <div className="media-box">
              <h3 className="media-box-title">
                <i className="icon green icon-dot"></i>
                <span>什么是物流通讯录？</span>
              </h3>
              <p className="media-box-desc">答：一人创建通讯录，大家来加入。快速帮您制作人脉通讯录，随时随地查看详细信息。</p>
            </div>
            <div className="media-box">
              <h3 className="media-box-title">
                <i className="icon green icon-dot"></i>
                <span>如何找到物流通讯录？</span>
              </h3>
              <p className="media-box-desc">答：微信搜索公众号“物流通讯录”，关注物流通讯录即可。</p>
            </div>
          </div>
        </div>
      );
    }
  }

  handleTabChange(tab: String) {
    let last = this.state.atab;

    if (tab === last) {
      return;
    }

    this.setState({
      atab: tab
    });
  }

  handleToggleActiveMember(member: Object, e: Object) {
    e.preventDefault();
    e.stopPropagation();

    let activeMember = this.state.activeMember;
    if (activeMember === member) {
      this.setState({
        activeMember: null
      });

      return;
    }

    this.setState({
      activeMember: member
    });
  }

  renderMemberActions() {
    let activeMember = this.state.activeMember;

    if (activeMember) {
      let qs = querystring.stringify({
        cid: activeMember.cid,
        uid: activeMember.uid
      });

      return (
        <div className="member-actions row">
          <div>
            <a
              href={`tel:${activeMember.tel}`}
              className="btn block lightBlue">
              拨打电话
            </a>
          </div>
          <div>
            <a
              href={`./biz-card-detail.html?${qs}`}
              className="btn block lightBlue">
              查看详细信息
            </a>
          </div>
        </div>
      );
    }
  }

  render() {
    let abInfo = this.state.abInfo;
    let memberList = this.state.memberList;

    return (
      <section className="ab-detail-page">
        <SubHeader />
        <section className="ab-detail">
          <div className="ab-profile">
            <h2>{abInfo.aname}</h2>
            <p className="ab-type">[{abInfo.abTypeText}]</p>
            <div className="description">{abInfo.adesc}</div>
            <div className="creator">创建人: {abInfo.group_holder}</div>
          </div>
          <ul className="menu grid">
            <li
              className={this.state.atab === 'member' ? 'on' : ''}
              onClick={this.handleTabChange.bind(this, 'member')}>成员 ({memberList.length})</li>
            <li
              className={this.state.atab === 'setting' ? 'on' : ''}
              onClick={this.handleTabChange.bind(this, 'setting')}>设置</li>
          </ul>
          {this.renderABMember()}
          {this.renderSetting()}
        </section>
        <Prviate />
        <Confirm
          ref="confirm"
          confirm={this.handleDelAB.bind(this)}/>
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<ABDetailPage />, document.querySelector('.page'));
