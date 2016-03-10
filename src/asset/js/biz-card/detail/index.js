import '../../../less/global/global.less';
import '../../../less/component/layout.less';
import '../../../less/component/form.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import querystring from 'querystring';
import Promise from 'promise';

import AjaxError from '../../ajax-err/';
import SubHeader from '../../sub-header/';
import Private from '../../private/';
import Selector from '../../selector/';
import Confirm from '../../confirm/';
import Popover from '../../popover/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import Log from '../../log/';
import FixedHolder from '../../fixed-holder/';

const ASK_URL = {
  bc: {
    get: '/mvc/pim/query_card_askfor',
    handle: '/mvc/pim/handle_card_askfor'
  },
  ab: {
    get: '/mvc/pim/query_addlist_askfor',
    handle: '/mvc/pim/handle_addlist_askfor'
  }
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
  }

  componentDidMount() {
    AjaxError.init(this.refs.toast);

    this.fetch();
  }

  fetch() {
    this.refs.loading.show('加载中...');

    let reqs = [this.getAccountInfo(), this.getBizCard()];

    // 消息审核状态
    if (this.state.qs.askid) {
      reqs.push(this.getAskStatus());
    }

    Promise
      .all(reqs)
      .then((args) => {
        let state = {
          account: args[0],
          bizCard: args[1]
        };

        if (args[2]) {
          state.askfor = args[2];
        }

        this.setState(state);
      })
      .catch((err) => {
        if (err && err instanceof Error) {
          this.refs.toast.warn(`加载数据出错,${err.message}`);
        }
      })
      .done(() => {
        this.refs.loading.close();
      });
  }

  getAskStatus() {
    let askType = this.state.qs.askType;

    return new Promise((resolve, reject) => {
      $.ajax({
        url: ASK_URL[askType].get,
        type: 'GET',
        cache: false,
        data: {
          askfor: this.state.qs.askid
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        return res.ask_for;
      }

      this.refs.toast.warn(res.msg);
    });
  }

  handleClickAsk(val) {
    this.askHandleVal = val;

    this.refs.handleAsk.show({
      msg: `确认${val === 1 ? '通过' : '拒绝'}该用户的申请?`
    });
  }

  handleAsk() {
    this.refs.loading.show('请求中...');

    let askType = this.state.qs.askType;

    new Promise((resolve, reject) => {
      $.ajax({
        url: ASK_URL[askType].handle,
        type: 'POST',
        data: {
          askfor: this.state.qs.askid,
          status: this.askHandleVal
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.toast.success('处理申请完成');
        this.fetch();
        return;
      }

      this.refs.toast.warn(res.msg);
    })
    .catch((err) => {
      if (err && err instanceof Error) {
        this.refs.toast.warn(`处理申请出错,${err.message}`);
      }
    })
    .done(() => {
      this.refs.loading.close();
    });
  }

  getAccountInfo() {
    return new Promise((resolve, reject) => {
      let data = {};

      if (this.state.qs.uid){
        data.uid = this.state.qs.uid;
      }

      $.ajax({
        url: '/mvc/pim/query_user_card_desc',
        type: 'GET',
        cache: false,
        data: data,
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        res.card.holder_flag = res.holder_flag;
        return res.card;
      }

      this.refs.toast.warn(res.msg);
    });
  }

  getBizCard() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/query_card_desc',
        type: 'GET',
        data: {
          cid: this.state.qs.cid
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        return res.card;
      }

      this.refs.toast.warn(res.msg);
    });
  }

  /**
   * getGroups 获取我的名片分组
   * @return {Promise}
   */
  getGroups() {
    this.refs.loading.show('加载中...');

    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/query_my_card_groups',
        type: 'GET',
        cache: false,
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        let groups = res.pimCardGroups.map((group) => {
          return {
            id: group.id,
            name: group.groupname
          };
        });

        this.setState({
          selectorData: groups
        });
        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        this.refs.toast.warn(`加载名片分组出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
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

    this.refs.loading.show('请求中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/move_my_card_friend',
        type: 'POST',
        data: {
          friendly_uid: this.state.qs.uid,
          gid: group.id
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.popover.success(`名片好友成功移动到${group.name}`);

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);

        this.refs.toast.error(`移动好友出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  handleClickRemoveFriend() {
    this.refs.confirm.show({
      msg: '确认删除名片好友?'
    });
  }

  handleRemoveFriend() {
    this.refs.loading.show('请求中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/del_my_card_friend',
        type: 'POST',
        data: {
          friendly_uid: this.state.qs.uid,
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.popover.success(`删除名片好友成功`);

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);

        this.refs.toast.error(`删除名片好友出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  handleClickSetMainBizCard() {
    let bizCard = this.state.bizCard;

    if (bizCard.main_card === 1) {
      this.refs.toast.warn('当前名片已是主名片');

      return;
    }

    this.refs.setMainBizCardConfirm.show({
      msg: '确认设置为主名片?'
    });
  }

  handleSetMainBizCard() {
    this.refs.loading.show('请求中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/set_main_card',
        type: 'POST',
        data: {
          cid: this.state.bizCard.id
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.popover.success('设置主名片成功');
        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        this.refs.toast.warn(`设置主名片出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  handleClickRemoveMyBizCard() {
    this.refs.removeMyBizCardConfirm.show({
      msg: '确认删除该名片?'
    });
  }

  handleRemoveMyBizCard() {
    this.refs.loading.show('删除中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/del_my_card',
        type: 'POST',
        data: {
          cid: this.state.bizCard.id
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.popover.success('删除名片成功');
        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        this.refs.toast.warn(`删除名片出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
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

  renderActions() {
    let account = this.state.account;

    if (account.holder_flag) {
      return (
        <div>
          <a href={`./biz-card-certify.html?cid=${this.state.bizCard.id}&uid=${this.state.qs.uid}`} className="btn block lightBlue">名片认证</a>
          <div className="btn block lightBlue" onClick={this.handleClickSetMainBizCard.bind(this)}>设为主名片</div>
          <div className="btn block del-btn" onClick={this.handleClickRemoveMyBizCard.bind(this)}>删除名片</div>
        </div>
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
              onClick={this.handleClickAsk.bind(this, 1)}>
              {status ? '已通过' : '通过'}
            </button>
          </div>
          <div>
            <button
              type="button"
              disabled={status}
              className="btn block lightBlue"
              onClick={this.handleClickAsk.bind(this, 2)}>
              忽略
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
    let fromCities = bizCard.start_addr ? bizCard.start_addr.split(',') : [];
    let toCities = bizCard.end_addr ? bizCard.end_addr.split(',') : [];

    return (
      <section className="biz-card-detail-page">
        <SubHeader title={`${bizCard.nikename || ''}的名片`} />
        <div className="profile">
          <div className="avatar">
            <a href="#" style={{
              backgroundImage: `url(${account.photo})`,
              backgroundSize: 'contain'
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
            <b>VIP 1</b>
          </li>
          <li className="score">
            <span>人脉:</span>
            <b><a href="#">357</a></b>
          </li>
        </ul>
        <section className="info">
          <h2>
            <i className="icon icon-account-profile s15"></i>
            <span>基本信息</span>
          </h2>
          <dl className="info-list inline basic-info">
            <dt>手机号码:</dt>
            <dd className="tel">{bizCard.tel}</dd>
          </dl>
          <dl className="info-list inline basic-info">
            <dt>微信账号:</dt>
            <dd>{bizCard.wechat}</dd>
          </dl>
          <dl className="info-list inline basic-info">
            <dt>QQ 账号:</dt>
            <dd>{bizCard.qq}</dd>
          </dl>
          <h2>
            <i className="icon icon-route s15"></i>
            <span>专线路线</span>
          </h2>
          <dl className="info-list private-route">
            <dt>出发地:</dt>
            <dd>
              {this.renderRoutes(fromCities)}
            </dd>
          </dl>
          <dl className="info-list private-route">
            <dt>到达地:</dt>
            <dd>
              {this.renderRoutes(toCities)}
            </dd>
          </dl>
          <h2>
            <i className="icon icon-truck-info s15"></i>
            <span>车辆信息</span>
          </h2>
          <dl className="info-list inline truck-info">
            <dt>车 型:</dt>
            <dd>{bizCard.trucktype}</dd>
          </dl>
          <dl className="info-list inline truck-info">
            <dt>车 长:</dt>
            <dd>{bizCard.trucklength}米</dd>
          </dl>
          <dl className="info-list inline truck-info">
            <dt>载 重:</dt>
            <dd>{bizCard.loadlimit}吨</dd>
          </dl>
          <dl className="info-list inline truck-info">
            <dt>车牌号:</dt>
            <dd>{bizCard.licenseplate}</dd>
          </dl>
          <h2>
            <i className="icon icon-other-info s15"></i>
            <span>其他信息</span>
          </h2>
          <dl className="info-list inline other-info">
            <dt>地址:</dt>
            <dd>{bizCard.com_addr}</dd>
          </dl>
          <dl className="info-list inline other-info">
            <dt>业务介绍:</dt>
            <dd>{bizCard.service_desc}</dd>
          </dl>

          <div className="actions">
            <div className="btn block lightBlue">名片分享</div>
            {this.renderActions()}
            <div className="btn block lightBlue">完善我的名片</div>
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
      </section>
    );
  }
}

ReactDOM.render(<BizCardDetailPage />, document.querySelector('.page'));
