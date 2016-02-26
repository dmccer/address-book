import '../../../less/global/global.less';
import '../../../less/component/layout.less';
import '../../../less/component/form.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import SubHeader from '../../sub-header/';
import Private from '../../private/';
import Selector from '../../selector/';
import Popover from '../../popover/';

export default class BizCardDetailPage extends React.Component {
  state = {
    selectorData: [
      {
        name: '默认分组',
        id: 1
      }, {
        name: '亲情市场',
        id: 2
      }, {
        name: '道义市场',
        id: 3
      }, {
        name: '黑名单',
        id: 4
      }
    ]
  };

  constructor() {
    super();
  }

  handleMoveFriend() {
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

  render() {
    return (
      <section className="biz-card-detail-page">
        <SubHeader title="xx的名片" />
        <div className="profile">
          <div className="avatar">
            <a href="#" style={{
              backgroundImage: 'url("http://imgsize.ph.126.net/?imgurl=http://img1.ph.126.net/DgzSMe-5TSTtQzsb7zSaKg==/6631308558750149593.bmp_188x188x1.jpg")',
              backgroundSize: 'contain'
            }}></a>
          </div>
          <p>
            <span className="name">欧巴</span>
            <span className="office">经理</span>
          </p>
          <p className="company">上海急哦及有限公司</p>
        </div>
        <ul className="vip-score grid">
          <li className="vip">
            <i className="icon s14 icon-certificate"></i>
            <i className="icon icon-account-type-truck"></i>
            <i className="icon icon-account-type-package"></i>
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
            <dd className="tel">17028291821</dd>
            <dt>微信账号:</dt>
            <dd>weixin</dd>
            <dt>QQ 账号:</dt>
            <dd>17362827382</dd>
          </dl>
          <h2>
            <i className="icon icon-route s15"></i>
            <span>专线路线</span>
          </h2>
          <dl className="info-list private-route">
            <dt>出发地:</dt>
            <dd>
              <p>上海-浦东新区</p>
              <p>江苏-苏州</p>
            </dd>
            <dt>到达地:</dt>
            <dd>
              <p>上海-浦东新区</p>
              <p>江苏-苏州</p>
            </dd>
          </dl>
          <h2>
            <i className="icon icon-truck-info s15"></i>
            <span>车辆信息</span>
          </h2>
          <dl className="info-list inline truck-info">
            <dt>车 型:</dt>
            <dd>板车</dd>
            <dt>车 长:</dt>
            <dd>10米</dd>
            <dt>载 重:</dt>
            <dd>3吨</dd>
            <dt>车牌号:</dt>
            <dd>沪X01922</dd>
          </dl>
          <h2>
            <i className="icon icon-other-info s15"></i>
            <span>其他信息</span>
          </h2>
          <dl className="info-list inline other-info">
            <dt>地址:</dt>
            <dd>上海市浦东新区毕升路289弄1号401</dd>
            <dt>业务介绍:</dt>
            <dd>主运各种冷冻物品</dd>
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
      </section>
    );
  }
}

ReactDOM.render(<BizCardDetailPage />, document.querySelector('.page'));
