/**
 * 名片交换页面
 */
import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/layout.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';
import querystring from 'querystring';

import AjaxHelper from '../../ajax-helper/';
import Header from '../../header/';
import Nav from '../../nav/';
import Config from '../../config';
import WXVerify from '../../wx-verify/';
import MiniCard from '../mini-card/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import {MainBizCard, SwapBizCard} from '../model/';

export default class BizCardSwapPage extends React.Component {
  state = {
    bizCard: {}
  };

  constructor() {
    super();
  }

  componentWillMount() {
    WXVerify({
      appId: Config.wxAppId,
      url: Config.wxSignatureUrl,
      jsApiList: ['scanQRCode']
    }, (err) => {
      if (err) {
        // 微信验证失败处理
        return;
      }

      this.setState({
        wxReady: true
      });
    });
  }

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);

    this.getMyBizCard();
  }

  /**
   * getMyBizCard 获取我的主名片信息
   * @return {Promise}
   */
  getMyBizCard() {
    this.ajaxHelper.one(MainBizCard, res => {
      this.setState({
        bizCard: res.card
      });

      if (!res.card.qr_code) {
        this.refs.toast.warn('您还没有名片');
      }
    });
  }

  handleScan() {
    if (!this.state.wxReady) {
      this.refs.toast.warn('等待微信验证...');

      return;
    }

    wx.scanQRCode({
      needResult: 1,
      scanType: ["qrCode"],
      success: (res) => {
        var result = res.resultStr;
        this.handleSwapBizCard(querystring.parse(result.split('?')[1]).friendly_uid);
      }
    });
  }

  handleSwapBizCard(uid) {
    this.ajaxHelper.one(SwapBizCard, res => {
      this.refs.toast.success(res.msg);
    }, uid);
  }

  render() {
    return (
      <section className="biz-card-swap-page">
        <Header title="我的名片" />
        <div className="biz-card-swap">
          <MiniCard {...this.state.bizCard} />
          <ul className="menu grid">
            <li><a href="./my-biz-card.html">名片好友</a></li>
            <li className="on">名片交换</li>
          </ul>
          <div className="swap">
            <h2>我的名片二维码</h2>
          		<div className="qrcode">
          		  <img src={this.state.bizCard.qr_code} />
          		</div>
          		<p>扫描二维码，自动加入到我的货运通讯录</p>
          		<div className="swap-btn">
          			<button className="btn block blue" onClick={this.handleScan.bind(this)}>扫一扫</button>
          		</div>
          </div>
          <div className="fixed-holder"></div>
        </div>
        <Nav on="biz-card" />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<BizCardSwapPage />, document.querySelector('.page'));
