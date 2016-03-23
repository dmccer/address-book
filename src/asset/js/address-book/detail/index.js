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

import ABMember from '../../biz-card/mini-card/';
import SubHeader from '../../sub-header/';
import Confirm from '../../confirm/';
import Prompt from '../../prompt/';
import Prviate from '../../private/';
import FixedHolder from '../../fixed-holder/';
import AB_TYPES from '../../const/abtype';
import GoTop from '../../gotop/';
import Mask from '../../mask/';
import Config from '../../config';
import Share from '../../share/';
import WXVerify from '../../wx-verify/';
import AjaxHelper from '../../ajax-helper/';
import {
  ABBaseInfo,
  ABMemberList,
  UpdateABLogo,
  JoinAB,
  DelAB,
  DelABMember,
  QuitAB
} from '../model/';
import {SwapBizCard} from '../../biz-card/model/';

import Loading from '../../loading/';
import Toast from '../../toast/';

export default class ABDetailPage extends React.Component {

  state = {
    abInfo: {},
    memberList: [],
    qs: querystring.parse(location.search.substring(1))
  };

  constructor() {
    super();

    this.verifyWX = new Promise((resolve, reject) => {
      WXVerify({
        appId: Config.wxAppId,
        url: Config.wxSignatureUrl,
        jsApiList: [
          'chooseImage',
          'uploadImage',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareQZone'
        ]
      }, (err) => {
        if (err) {
          reject(err);
          return;
        }

        this.setState({
          wxReady: true
        }, () => {
          resolve();
        });
      });
    });
  }

  componentWillMount() {
    this.setState({
      atab: this.state.qs.atab || 'member'
    });
  }

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);

    this.fetch();
  }

  fetch() {
    let aid = this.state.qs.id;

    this.ajaxHelper.all([ABBaseInfo, ABMemberList], res => {
      let abInfo = res[0].addlist_card;
      let memberList = res[1].addlist_cards;

      abInfo.no_requires = res[0].no_requires;
      abInfo.my_main_card_id = res[0].my_main_card_id;

      let abType = find(AB_TYPES, (abType) => {
        return abType.id === abInfo.atype;
      });

      abInfo.abTypeText = abType.name;

      this.setState({
        abInfo: abInfo,
        memberList: memberList
      });

      this.verifyWX.then(() => {
        let qs = querystring.stringify({
          id: this.state.qs.id
        });
        let url = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `/address-book-detail.html?${qs}`);

        this.refs.share.toAll({
          title: `${abInfo.aname}-物流通讯录`,
          desc: abInfo.adesc || `${abInfo.group_holder}诚挚邀请您加入通讯录"${abInfo.name}"`,
          link: url,
          imgUrl: abInfo.photo
        });
      });
    }, [aid], [aid]);
  }

  handleClickDelAB(e) {
    e.preventDefault();
    e.stopPropagation();

    this.refs.confirm.show({
      msg: '确定删除整个通讯录，删除后将无法恢复？'
    });
  }

  handleDelAB() {
    this.ajaxHelper.one(DelAB, res => {
      this.refs.toast.success('删除通讯录成功');

      setTimeout(() => {
        location.href = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, '/address-book.html');
      }, 1000);
    }, this.state.qs.id);
  }

  handleCreateMainBizCard() {
    location.href = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `/biz-card-create.html?ref=${location.href}`);
  }

  handleMissRequiredBizCardFields() {
    let qs = querystring.stringify({
      cid: this.state.abInfo.my_main_card_id,
      ref: location.href
    });

    location.href = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `/biz-card-create.html?${qs}`);
  }

  handleClickJoinAB() {
    let abInfo = this.state.abInfo;

    if (!abInfo.has_maincard) {
      this.refs.noneMainBizCard.show({
        msg: '您还没有名片，请先新建名片'
      });
      return;
    }

    if (abInfo.no_requires) {
      this.refs.missRequiredBizCardFields.show({
        msg: `您的默认名片缺少${abInfo.no_requires}信息，请您完善`
      });

      return;
    }

    let question = abInfo.aquestion;

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

  handleJoinAB(arg) {
    let answer;

    if (this.question) {
      if (arg == null || arg === '') {
        return;
      }

      answer = arg;
    }

    this.ajaxHelper.one(JoinAB, res => {
      this.refs.toast.success(res.msg);
    }, this.state.qs.id, answer);
  }

  handleShareAB() {
    this.refs.share.show();
  }

  handleChangeLogo() {
    this.refs.toast.warn('等待微信验证...');

    this.verifyWX.then(() => {
      wx.chooseImage({
        count: 1,
        success: (res) => {
          let localIds = res.localIds;
          let len = localIds.length;

          if (len === 0) {
            this.refs.toast.warn('请选择一张图片');
            return;
          }

          if (len > 1) {
            this.refs.toast.warn('只能选择一张图片');
            return;
          }

          wx.uploadImage({
            localId: localIds[0],
            success: (res) => {
              this.ajaxHelper.one(UpdateABLogo, res => {
                this.refs.toast.success('更换LOGO成功');
              }, this.state.qs.id, res.serverId);
            }
          });
        }
      });
    });
  }

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
          className="btn block green join-btn"
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
            ref="missRequiredBizCardFields"
            confirm={this.handleMissRequiredBizCardFields.bind(this)}
            rightBtnText={'完善名片'}
            leftBtnText={'关闭'}
          />
          <Confirm
            ref="noneMainBizCard"
            confirm={this.handleCreateMainBizCard.bind(this)}
            rightBtnText={'新建名片'}
            leftBtnText={'关闭'}
          />
          <Confirm
            ref="swapBizCard"
            confirm={this.handleSwapBizCard.bind(this)}
            cancel={this.handleCancelSwapBizCard.bind(this)}
            rightBtnText={'交换名片'}
            leftBtnText={'关闭'}
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
    this.ajaxHelper.one(DelABMember, res => {
      this.refs.toast.success('删除成员成功');
      this.fetch();
    }, this.state.qs.id, this.toRemoveMember.uid);
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
              <button
                className="btn block green"
                onClick={this.handleShareAB.bind(this)}>邀请好友</button>
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
            <a className="cell" href="javascript:;" onClick={this.handleShareAB.bind(this)}>
              <div className="cell-hd">
                <i className="icon icon-recommend-star s15"></i>
              </div>
              <div className="cell-bd">
                <h3>推荐给好友</h3>
              </div>
              <div className="cell-ft"></div>
            </a>
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
                <i className="icon icon-change-ab-logo s15"></i>
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
          <a className="cell" href="javascript:;" onClick={this.handleShareAB.bind(this)}>
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
    this.ajaxHelper.one(SwapBizCard, res => {
      this.refs.toast.success(res.msg);
    }, this.toSwapMember.uid);
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
    this.ajaxHelper.one(QuitAB, res => {
      this.refs.toast.success('退出通讯录成功');

      setTimeout(() => {
        location.reload();
      }, 2000);
    }, this.state.qs.id);
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
        <Share ref="share" wxReady={this.state.wxReady} />
        <GoTop />
      </section>
    );
  }
}

ReactDOM.render(<ABDetailPage />, document.querySelector('.page'));
