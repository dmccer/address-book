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
import Popover from '../../popover/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import Log from '../../log/';

export default class BizCardDetailPage extends React.Component {
  state = {
    selectorData: [],
    qs: querystring.parse(location.search.substring(1)),
    bizCard: {},
    account: {}
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

    Promise
      .all([this.getAccountInfo(), this.getBizCard()])
      .then((args) => {
        this.setState({
          account: args[0],
          bizCard: args[1]
        });
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

    // TODO: 移动好友到分组 ajax 和提示
    this.refs.popover.success('名片好友成功移动到黑名单');
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

  render() {
    let bizCard = this.state.bizCard;
    let account = this.state.account;
    let accountType = bizCard.ctype === 1 ? <i className="icon icon-account-type-truck"></i> : <i className="icon icon-account-type-package"></i>;
    let fromCities = bizCard.start_addr ? bizCard.start_addr.split(',') : [];
    let toCities = bizCard.end_addr ? bizCard.end_addr.split(',') : [];

    return (
      <section className="biz-card-detail-page">
        <SubHeader title={`${bizCard.nikename}的名片`} />
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
            <div className="btn block lightBlue">发送私信</div>
            <div className="btn block lightBlue move-btn" onClick={this.handleMoveFriend.bind(this)}>
              <span>移动好友到</span>
              <i className="icon icon-right-triangle white"></i>
            </div>
            <div className="btn block lightBlue">名片分享</div>
            <div className="btn block del-btn">删除好友</div>
            <div className="btn block lightBlue">完善我的名片</div>
          </div>
          <Popover ref="popover" />
        </section>
        <Selector
          ref="selector"
          items={this.state.selectorData}
          onSelect={this.handleSelectedGroup.bind(this)}
        />
        <Private />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<BizCardDetailPage />, document.querySelector('.page'));
