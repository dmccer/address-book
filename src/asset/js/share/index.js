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

  shareToWeiXin() {
    if (!this.props.wxReady) {
      return;
    }

    wx.onMenuShareAppMessage({
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
    });
  }

  shareToPengYouQuan() {
    if (!this.props.wxReady) {
      return;
    }
  }

  shareToQQ() {
    if (!this.props.wxReady) {
      return;
    }
  }

  shareToQzone() {
    if (!this.props.wxReady) {
      return;
    }
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
      <div className={shareClassNames}>
        <Mask type="black" click={this.handleMaskClick.bind(this)} />
        <ul className="share-list grid">
          <li onClick={this.shareToWeiXin.bind(this)}>
            <i className="icon icon-weixin"></i>
            <span>微信</span>
          </li>
          <li onClick={this.shareToPengYouQuan.bind(this)}>
            <i className="icon icon-pengyouquan"></i>
            <span>朋友圈</span>
          </li>
          <li onClick={this.shareToQQ.bind(this)}>
            <i className="icon icon-qq"></i>
            <span>QQ</span>
          </li>
          <li onClick={this.shareToQzone.bind(this)}>
            <i className="icon icon-qzone"></i>
            <span>QQ空间</span>
          </li>
        </ul>
      </div>
    ) : null;
  }
}
