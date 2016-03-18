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
import cx from 'classnames';

import AjaxError from '../../ajax-err/';
import ABMember from '../../biz-card/mini-card/';
import SubHeader from '../../sub-header/';
import Loading from '../../loading/';
import Confirm from '../../confirm/';
import Prompt from '../../prompt/';
import Prviate from '../../private/';
import FixedHolder from '../../fixed-holder/';
import Toast from '../../toast/';
import Log from '../../log/';
import AB_TYPES from '../../const/abtype';
import GoTop from '../../gotop/';
import Mask from '../../mask/';

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
        url: '/pim/addlist_cards_baseinfo',
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
        url: '/pim/query_addlist_cards',
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
      msg: '确定删除整个通讯录，删除后将无法恢复？'
    });
  }

  handleDelAB() {
    this.refs.loading.show('请求中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/pim/del_addlist',
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
        }, 1000);
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

      this.question = true;
      return;
    }

    this.refs.joinAB.show({
      msg: '是否加入该通讯录?'
    });
  }

  handleJoinAB(val) {
    let data = {
      aid: this.state.qs.id
    }

    if (this.question) {
      if (val === '') {
        return;
      }

      data.answer = val;
    }

    this.refs.loading.show('请求中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/pim/join_addlist',
        type: 'POST',
        data: data,
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

        this.refs.toast.warn(`加入该通讯录出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  handleChangeLogo() {}

  renderABMembers() {
    if (this.state.qs.create == 1) {
      return;
    }

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
          <a className="search" href={`./ab-member-search.html?aid=${this.state.qs.id}`}>
            <i className="icon s14 icon-search"></i>
            <span>通讯录共有 {memberList.length} 人</span>
          </a>
          <div className="divide"></div>
          <div className="ab-member-list cells cells-access">
            {list}
          </div>
          <div className="pub-ab-btn">
            <a className="btn block lightBlue" href="./select-ab-type.html">我也要发布通讯录</a>
          </div>
          {joinAB}
          <Prompt
            ref="prompt"
            confirm={this.handleJoinAB.bind(this)}
          />
          <Confirm
            ref="joinAB"
            confirm={this.handleJoinAB.bind(this)}
          />
          <Confirm
            ref="swapBizCard"
            confirm={this.handleSwapBizCard.bind(this)}
            cancel={this.handleCancelSwapBizCard.bind(this)}
          />
          <Confirm
            ref="removeMember"
            confirm={this.handleRemoveMember.bind(this)}
            cancel={this.handleCancelRemoveMember.bind(this)}
          />
          {this.renderMemberActions()}
        </div>
      );
    }
  }

  handleCancelRemoveMember() {
    this.toRemoveMember = null;
  }

  handleRemoveMember() {
    this.refs.loading.show('请求中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/pim/del_addlist_card',
        type: 'POST',
        data: {
          aid: this.state.qs.id,
          uid: this.toRemoveMember.uid
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.toast.success('删除成员成功');
        this.fetch();

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);

        this.refs.toast.warn(`删除成员出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  handleClickRemoveMember(member: Object, e: Object) {
    e.preventDefault();
    e.stopPropagation();

    this.toRemoveMember = member;

    this.refs.removeMember.show({
      msg: '确认要删除该成员吗？'
    });
  }

  renderABCreated() {
    let memberList = this.state.memberList;

    if (this.state.qs.create == 1 && memberList.length) {
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
      let abInfo = this.state.abInfo;

      if (this.state.abInfo.group_holder_flag) {
        return (
          <div className="ab-setting cells cells-access">
            <a className="cell" href={`./create-ab.html?aid=${this.state.qs.id}&atype=4`}>
              <div className="cell-hd">
                <i className="icon icon-ab-edit s15"></i>
              </div>
              <div className="cell-bd">
                <h3>修改通讯录</h3>
              </div>
              <div className="cell-ft"></div>
            </a>
            <a className="cell" href="javascript:;" onClick={this.handleChangeLogo.bind(this)}>
              <div className="cell-hd">
                <i className="icon icon-ab-edit s15"></i>
              </div>
              <div className="cell-bd">
                <h3>更换LOGO</h3>
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
          <a className="cell" href="javascript:;" onClick={this.handleClickQuitAB.bind(this)}>
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
          <div className="help accordion">
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
    let joined = this.state.abInfo.joined_flag;

    if (tab === last) {
      return;
    }

    if (!joined && tab === 'setting') {
      return;
    }

    this.setState({
      atab: tab
    });
  }

  handleToggleActiveMember(member: Object, e: Object) {
    e.preventDefault();
    e.stopPropagation();

    if (member.auth === 1) {
      this.refs.swapBizCard.show({
        msg: '您暂无权查看,请先交换名片'
      });

      this.toSwapMember = member;
      return;
    }

    let activeMember = this.state.activeMember;
    if (activeMember === member) {
      this.setState({
        activeMember: null,
      });

      return;
    }

    this.setState({
      activeMember: member
    });
  }

  handleSwapBizCard() {
    this.refs.loading.show('请求中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/pim/swap_card',
        type: 'POST',
        data: {
          friendly_uid: this.toSwapMember.uid
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

        this.refs.toast.warn(`交换名片出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  handleCancelSwapBizCard() {
    this.toSwapMember = null;
  }

  handleClickQuitAB(e) {
    e.preventDefault();
    e.stopPropagation();

    this.refs.quit.show({
      msg: '确认退出该通讯录？'
    });
  }

  handleQuitAB() {
    this.refs.loading.show('请求中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/pim/quit_addlist',
        type: 'POST',
        data: {
          aid: this.state.qs.id
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.toast.success('退出通讯录成功');
        setTimeout(() => {
          location.reload();
        }, 2000);

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);

        this.refs.toast.warn(`退出通讯录出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  closeMemberActions() {
    this.setState({
      activeMember: null
    });
  }

  renderMemberActions() {
    let activeMember = this.state.activeMember;
    let qs, del;

    if (activeMember) {
       qs = querystring.stringify({
        cid: activeMember.cid,
        uid: activeMember.uid
      });

      del = this.state.abInfo.group_holder_flag ? (
        <div>
          <a
            href="javascript:;"
            onClick={this.handleClickRemoveMember.bind(this, activeMember)}
            className="btn block lightBlue">
            删除
          </a>
        </div>
      ) : null;
    }

    return (
      <div className={cx('member-actions-wrapper', activeMember ? 'on' : '')}>
        <Mask type="black" click={this.closeMemberActions.bind(this)} />
        <div className="member-actions row">
          <div>
            <a
              href={`tel:${activeMember && activeMember.tel}`}
              className="btn block lightBlue">
              拨打电话
            </a>
          </div>
          <div>
            <a
              href={`./biz-card-detail.html?${qs}`}
              className="btn block lightBlue">
              详细信息
            </a>
          </div>
          {del}
        </div>
      </div>
    );
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
        <FixedHolder height="44" />
        <Confirm
          ref="confirm"
          confirm={this.handleDelAB.bind(this)}
        />
        <Confirm
          ref="quit"
          confirm={this.handleQuitAB.bind(this)}
        />
        <Loading ref="loading" />
        <Toast ref="toast" />
        <GoTop />
      </section>
    );
  }
}

ReactDOM.render(<ABDetailPage />, document.querySelector('.page'));
