import '../../less/component/icon.less';
import '../../less/component/layout.less';
import './index.less';

import React from 'react';
import cx from 'classnames';

import Mask from '../mask/';

export default class Share extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  show() {
    this.setState({
      on: true
    });
  }

  toAll(opts={}) {
    this.shareToWeiXin(opts);
    this.shareToQQ(opts);
    this.shareToPengYouQuan(opts);
    this.shareToQzone(opts);
  }

  /**
   * [shareToWeiXin description]
   * @param  {[type]} opts={} [description]
   * @return
   *
   * {
     title: '', // 分享标题
     desc: '', // 分享描述
     link: '', // 分享链接
     imgUrl: '', // 分享图标
     type: '', // 分享类型,music、video或link，不填默认为link
     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
     success: function () {
       // 用户确认分享后执行的回调函数
     },
     cancel: function () {
       // 用户取消分享后执行的回调函数
     }
   }
   *
   */
  shareToWeiXin(opts={}) {
    if (!this.props.wxReady) {
      return;
    }

    wx.onMenuShareAppMessage(opts);
  }

  shareToPengYouQuan() {
    if (!this.props.wxReady) {
      return;
    }

    wx.onMenuShareTimeline(opts);
  }

  shareToQQ() {
    if (!this.props.wxReady) {
      return;
    }

    wx.onMenuShareQQ(opts);
  }

  shareToQzone() {
    if (!this.props.wxReady) {
      return;
    }

    wx.onMenuShareQZone(opts);
  }

  close() {
    this.setState({
      on: false
    });
  }

  handleMaskClick(e) {
    this.close();
  }

  render() {
    let shareClassNames = cx('share', this.state.on ? 'on' : '');

    return this.state.on ? (
      <div className={shareClassNames} onClick={this.handleMaskClick.bind(this)}>
        <Mask type="black" />
        <div className="tip"></div>
      </div>
    ) : null;
  }
}
