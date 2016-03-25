import '../../../less/global/global.less';
import '../../../less/component/layout.less';
import '../../../less/component/form.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import querystring from 'querystring';
import Promise from 'promise/lib/es6-extensions';
import cx from 'classnames';

import AjaxHelper from '../../ajax-helper/';
import Config from '../../config';
import WXVerify from '../../wx-verify/';
import SubHeader from '../../sub-header/';
import Private from '../../private/';
import Selector from '../../selector/';
import Confirm from '../../confirm/';
import Popover from '../../popover/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import Log from '../../log/';
import Share from '../../share/';
import FixedHolder from '../../fixed-holder/';
import {
  MainBizCard,
  BizCardDetail,
  BizCardAskStatus,
  HandleBizCardAsk,
  ChangeGroupOfFriend,
  BizCardGroups,
  SetMainBizCard,
  RemoveFriendBizCard,
  DelMyBizCard,
  AllTrucks,
  SwapBizCard
} from '../model/';
import {MyVerifyInfo} from '../../my/model/';
import injectTapEventPlugin from 'react-tap-event-plugin';
// 因为 iscroll 禁用了 click 事件，
// 若启用 iscroll click, 会对其他默认滚动列表，滚动时触发 click
// 启用 tap 事件
injectTapEventPlugin();

const ASK_URL = {
  bc: {
    get: '/pim/query_card_askfor',
    handle: '/pim/handle_card_askfor'
  },
  ab: {
    get: '/pim/query_addlist_askfor',
    handle: '/pim/handle_addlist_askfor'
  }
};

const ROUTE_TITLES = {
  1: '常跑',
  2: '优势'
};

export default class BizCardDetailPage extends React.Component {
  state = {
    selectorData: [],
    qs: querystring.parse(location.search.substring(1)),
    bizCard: {},
    account: {},
    askfor: {}
  };

  constructor() {
    super();

    this.verifyWX = new Promise((resolve, reject) => {
      WXVerify({
        appId: Config.wxAppId,
        url: Config.wxSignatureUrl,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
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

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);

    this.fetch();
  }

  fetch() {
    let qs = this.state.qs;
    let reqs = [MainBizCard, BizCardDetail, AllTrucks];
    let params = [[qs.uid], [qs.cid], []];

    // 消息审核状态
    if (qs.askid) {
      reqs.push(BizCardAskStatus);
      params.push([qs.askType, qs.askid]);
    }

    this.ajaxHelper.all(reqs, res => {
      let account = res[0].card;
      let card = res[1].card;
      let trucks = res[2].trucks;

      account.holder_flag = res[0].holder_flag;
      card.is_my_friend = res[1].is_my_friend;
      card.truckTypeStr = trucks[card.trucktype];

      let r = {
        account: account,
        bizCard: card
      };

      if (res[3] && res[3].ask_for) {
        r.askfor = res[3].ask_for;
      }

      this.setState(r);

      this.verifyWX.then(() => {
        let qs = querystring.stringify({
          cid: card.id,
          uid: card.uid
        });
        let url = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `/biz-card-detail.html?${qs}`);

        this.refs.share.toAll({
          title: card.def_share_title,
          desc: card.def_share_desc,
          link: url,
          imgUrl: account.photo
        });
      });
    }, ...params);
  }

  handleClickAsk(val) {
    this.askHandleVal = val;

    this.refs.handleAsk.show({
      msg: `确认${val === 1 ? '通过' : '拒绝'}该用户的申请?`
    });
  }

  handleAsk() {
    let qs = this.state.qs;
    this.ajaxHelper.one(HandleBizCardAsk, res => {
      this.refs.toast.success('处理申请完成');
      this.fetch();
      setTimeout(() => {
        history.back();
      }, 1500)
    }, qs.askType, qs.askid, this.askHandleVal);
  }

  /**
   * getGroups 获取我的名片分组
   * @return {Promise}
   */
  getGroups() {
    this.ajaxHelper.one(BizCardGroups, res => {
      let groups = res.pimCardGroups.map((group) => {
        return {
          id: group.id,
          name: group.groupname
        };
      });

      this.setState({
        selectorData: groups
      });
    });
  }

  handleMoveFriend() {
    this.getGroups();

    this.refs.selector.show();
  }

  setSelectedGroup(group: Object) {
    let groups = this.state.selectorData;
    groups.forEach(group => group.selected = false);

    group.selected = true;

    this.setState({
      selectorData: groups
    });
  }

  handleSelectedGroup(group: Object) {
    this.setSelectedGroup(group);

    this.ajaxHelper.one(ChangeGroupOfFriend, res => {
      this.refs.popover.success(`已将名片好友移动到${group.name}`);
    }, this.state.qs.uid, group.id);
  }

  handleClickRemoveFriend() {
    this.refs.confirm.show({
      msg: '确认删除名片好友?'
    });
  }

  handleRemoveFriend() {
    this.ajaxHelper.one(RemoveFriendBizCard, res => {
      this.refs.popover.success(`删除名片好友成功`);

      setTimeout(() => {
        history.back();
      }, 1500);
    }, this.state.qs.uid);
  }

  handleClickSetMainBizCard() {
    let bizCard = this.state.bizCard;

    if (bizCard.main_card === 1) {
      this.refs.toast.warn('当前名片已是默认名片');

      return;
    }

    this.refs.setMainBizCardConfirm.show({
      msg: '确认设置为默认名片?'
    });
  }

  handleSetMainBizCard() {
    this.ajaxHelper.one(SetMainBizCard, res => {
      this.refs.popover.success('设置默认名片成功');
    }, this.state.bizCard.id);
  }

  handleClickRemoveMyBizCard() {
    this.refs.removeMyBizCardConfirm.show({
      msg: '确认删除该名片?'
    });
  }

  handleRemoveMyBizCard() {
    this.ajaxHelper.one(DelMyBizCard, res => {
      this.refs.popover.success('删除名片成功');
      setTimeout(() => {
        history.back();
      }, 1500);
    }, this.state.bizCard.id);
  }

  certify(e) {
    e.stopPropagation();
    e.preventDefault();

    this.ajaxHelper.one(MyVerifyInfo, res => {
      let qs = querystring.stringify({
        cid: this.state.bizCard.id,
        uid: this.state.qs.uid
      });

      let page;

      switch (res.verifyflag) {
        case 0:
          page = '/biz-card-certify.html';
          break;
        case 1:
          page = '/biz-card-certified.html';
          break;
        case 2:
          page = '/biz-card-certified-ok.html';
          break;
        case 3:
          page = '/biz-card-certified-fail.html';
          break;
        default:
          page = '/biz-card-certify.html';
      }

      location.href = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `${page}?${qs}`);
    }, this.state.bizCard.id);
  }

  handleShare() {
    this.refs.share.show();
  }

  handleClickSwapBizCard() {
    this.refs.handleSwapBizCard.show({
      msg: '确认交换名片?'
    });
  }

  handleSwapBizCard() {
    this.ajaxHelper.one(SwapBizCard, res => {
      this.refs.toast.success(res.msg);
    }, this.state.qs.uid);
  }

  renderRoutes(routes) {
    if (routes && routes.length) {
      return routes.map((route, index) => {
        return (
          <p key={`route-item_${index}`}>{route}</p>
        );
      });
    }
  }

  renderRoutesPanel() {
    let bizCard = this.state.bizCard;
    let fromCities = bizCard.start_addr ? bizCard.start_addr.split(',') : [];
    let toCities = bizCard.end_addr ? bizCard.end_addr.split(',') : [];

    if (fromCities.length || toCities.length) {
      return (
        <div className="group">
          <h2>
            <i className="icon icon-route s15"></i>
            <span>{`${ROUTE_TITLES[bizCard.ctype]}路线`}</span>
          </h2>
          <dl className={cx('info-list private-route', fromCities.length ? '' : 'off')}>
            <dt>出发地:</dt>
            <dd>
              {this.renderRoutes(fromCities)}
            </dd>
          </dl>
          <dl className={cx('info-list private-route', toCities.length ? '' : 'off')}>
            <dt>到达地:</dt>
            <dd>
              {this.renderRoutes(toCities)}
            </dd>
          </dl>
        </div>
      );
    }
  }

  renderActions() {
    let account = this.state.account;
    let bizCard = this.state.bizCard;

    if (account.holder_flag) {
      return (
        <div>
          <a href="javascript:;" onClick={this.certify.bind(this)} className="btn block lightBlue">实名认证</a>
          <div className="btn block lightBlue" onClick={this.handleClickSetMainBizCard.bind(this)}>设为默认名片</div>
          <div className="grid">
            <div className="btn block del-btn" onClick={this.handleClickRemoveMyBizCard.bind(this)}>删除名片</div>
            <a href="./biz-card-manage.html" className="btn block del-btn">名片管理</a>
          </div>
          <a href={`./biz-card-create.html?cid=${this.state.bizCard.id}`} className="btn block lightBlue">完善我的名片</a>
        </div>
      );
    }

    if (!bizCard.is_my_friend) {
      return (
        <div className="btn block lightBlue" onClick={this.handleClickSwapBizCard.bind(this)}>名片交换</div>
      );
    }

    let qs = querystring.stringify({
      fuid: account.uid
    });

    return (
      <div>
        <a href={`./private-msg-send.html?${qs}`} className="btn block lightBlue">发送私信</a>
        <div className="btn block lightBlue move-btn" onClick={this.handleMoveFriend.bind(this)}>
          <span>移动好友到</span>
          <i className="icon icon-right-triangle white"></i>
        </div>
        <div className="btn block del-btn" onClick={this.handleClickRemoveFriend.bind(this)}>删除好友</div>
      </div>
    );
  }

  renderAskActions() {
    if (this.state.qs.askid) {
      // status 为 0, 标示申请未处理，其他表示已处理
      let status = this.state.askfor.status !== 0;

      return (
        <div className="ask-actions row">
          <div>
            <button
              type="button"
              disabled={status}
              className="btn block lightBlue"
              onClick={this.handleClickAsk.bind(this, 2)}>
              忽略
            </button>
          </div>
          <div>
            <button
              type="button"
              disabled={status}
              className="btn block lightBlue"
              onClick={this.handleClickAsk.bind(this, 1)}>
              {status ? '已通过' : '通过'}
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
    let bizCard = this.state.bizCard;
    let account = this.state.account;
    let accountType = bizCard.ctype === 1 ? <i className="icon icon-account-type-truck"></i> : <i className="icon icon-account-type-package"></i>;

    return (
      <section className="biz-card-detail-page">
        <SubHeader title={`${bizCard.nikename || ''}的名片`} />
        <div className="profile">
          <div className="avatar">
            <a href="javascript:;" style={{
              backgroundImage: `url(${account.photo})`,
              backgroundSize: 'cover'
            }}></a>
          </div>
          <p>
            <span className="name">{bizCard.nikename}</span>
            <span className="office">{bizCard.com_position}</span>
          </p>
          <p className="company">{bizCard.com_name}</p>
        </div>
        <ul className="vip-score grid">
          <li className="vip">
            <i className="icon s14 icon-certificate"></i>
            {accountType}
            <i className={`icon icon-vip-${account.level}`}></i>
          </li>
          <li className="score">
            <span>人脉:</span>
            <b>{account.fcount}</b>
          </li>
        </ul>
        <section className="info">
          <h2>
            <i className="icon icon-account-profile s15"></i>
            <span>基本信息</span>
          </h2>
          <dl className="info-list inline basic-info">
            <dt>手机号码:</dt>
            <dd><a className="tel" href={`tel:${bizCard.tel}`}>{bizCard.tel}</a></dd>
          </dl>
          <dl className={cx('info-list inline basic-info', bizCard.wechat ? '' : 'off')}>
            <dt>微信账号:</dt>
            <dd>{bizCard.wechat}</dd>
          </dl>
          <dl className={cx('info-list inline basic-info', bizCard.qq ? '' : 'off')}>
            <dt>QQ 账号:</dt>
            <dd>{bizCard.qq}</dd>
          </dl>
          {this.renderRoutesPanel()}

          <div className={cx('group', (bizCard.ctype === 1 && (bizCard.truckTypeStr || bizCard.trucklength || bizCard.loadlimit || bizCard.licenseplate)) ? '' : 'off')}>
            <h2>
              <i className="icon icon-truck-info s15"></i>
              <span>车辆信息</span>
            </h2>
            <dl className={cx('info-list inline truck-info', bizCard.truckTypeStr ? '' : 'off')}>
              <dt>车 型:</dt>
              <dd>{bizCard.truckTypeStr}</dd>
            </dl>
            <dl className={cx('info-list inline truck-info', bizCard.trucklength ? '' : 'off')}>
              <dt>车 长:</dt>
              <dd>{bizCard.trucklength}米</dd>
            </dl>
            <dl className={cx('info-list inline truck-info', bizCard.loadlimit ? '' : 'off')}>
              <dt>载 重:</dt>
              <dd>{bizCard.loadlimit}吨</dd>
            </dl>
            <dl className={cx('info-list inline truck-info', bizCard.licenseplate ? '' : 'off')}>
              <dt>车牌号:</dt>
              <dd>{bizCard.licenseplate}</dd>
            </dl>
          </div>

          <div className={cx('group', bizCard.com_addr || bizCard.service_desc ? '' : 'off')}>
            <h2>
              <i className="icon icon-other-info s15"></i>
              <span>其他信息</span>
            </h2>
            <dl className={cx('info-list inline other-info', bizCard.com_addr ? '' : 'off')}>
              <dt>地址:</dt>
              <dd>{bizCard.com_addr}</dd>
            </dl>
            <dl className={cx('info-list inline other-info', bizCard.service_desc ? '' : 'off')}>
              <dt>业务介绍:</dt>
              <dd>{bizCard.service_desc}</dd>
            </dl>
          </div>

          <div className="actions">
            <div className="btn block lightBlue" onClick={this.handleShare.bind(this)}>名片分享</div>
            {this.renderActions()}
          </div>
          {this.renderAskActions()}
          <Popover ref="popover" />
        </section>
        <Private />
        <Selector
          ref="selector"
          items={this.state.selectorData}
          onSelect={this.handleSelectedGroup.bind(this)}
        />
        <Confirm
          ref="confirm"
          confirm={this.handleRemoveFriend.bind(this)}
        />
        <Confirm
          ref="handleSwapBizCard"
          confirm={this.handleSwapBizCard.bind(this)}
        />
        <Confirm
          ref="removeMyBizCardConfirm"
          confirm={this.handleRemoveMyBizCard.bind(this)}
        />
        <Confirm
          ref="setMainBizCardConfirm"
          confirm={this.handleSetMainBizCard.bind(this)}
        />
        <Confirm
          ref="handleAsk"
          confirm={this.handleAsk.bind(this)}
        />
        <FixedHolder height="44" />
        <Loading ref="loading" />
        <Toast ref="toast" />
        <Share ref="share" wxReady={this.state.wxReady} />
      </section>
    );
  }
}

ReactDOM.render(<BizCardDetailPage />, document.querySelector('.page'));
