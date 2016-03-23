/**
 * MyPage 我的页面
 *
 * @author Kane xiaoyunhua@ttyhuo.cn
 */
import '../../less/global/global.less';
import '../../less/component/layout.less';
import '../../less/component/form.less';
import '../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';
import querystring from 'querystring';

import AjaxHelper from '../ajax-helper/';
import Header from '../header/';
import Nav from '../nav/';
import Popover from '../popover/';
import Loading from '../loading/';
import Toast from '../toast/';
import Config from '../config';
import WXVerify from '../wx-verify/';
import {UserInfo, UpdateUserAvatar, Signin} from './model/';

export default class MyPage extends React.Component {
  state = {
    signinable: false,
    account: {}
  };

  constructor() {
    super();
  }

  componentWillMount() {
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
    this.getUser();
  }

  getUser() {
    this.ajaxHelper.one(UserInfo, res => {
      this.setState({
        signinable: !res.book_in,
        account: res.userInfo
      });
    });
  }

  /**
   * 处理点击签到
   * @param  {ClickEvent} e 点击事件
   * @return
   */
  handleSignin(e) {
    e.preventDefault();
    e.stopPropagation();

    this.ajaxHelper.one(Signin, res => {
      this.setState({
        signinable: false
      });

      this.refs.popover.success('签到成功');
      this.getUser();
    });
  }

  handleUpdateAvatar(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.wxReady) {
      this.refs.toast.warn('等待微信验证...');
      return;
    }

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
            this.ajaxHelper.one(UpdateUserAvatar, res => {
              this.refs.toast.success('更换头像成功');
              this.getUser();
            }, res.serverId);
          }
        });
      }
    });
  }

  renderCertify() {
    let verifyFlag = this.state.account.verify_flag;

    if (this.state.account.verifyFlag === 3) {
      return (
        <button className="btn line blue" disabled type="button">已实名认证</button>
      );
    }

    let url;
    switch (verifyFlag) {
      case 0:
        url = './biz-card-certify.html';
        break;
      case 1:
        url = './biz-card-certified.html';
        break;
      case 2:
        url = './biz-card-certified-ok.html';
        break;
      default:
        url = './biz-card-certify.html';
    }

    let qs = querystring.stringify({
      uid: this.state.account.id
    });

    return (
      <a href={`${url}?${qs}`} className="btn line blue" type="button">实名认证</a>
    );
  }

  render() {
    let account = this.state.account;
    return (
      <section className="my-page">
        <Header title="我的" />
        <section className="my">
          <div className="avatar">
            <a
              href="javascript:;"
              style={{
                backgroundImage: `url(${account.photo})`,
                backgroundSize: 'cover'
              }}
              onClick={this.handleUpdateAvatar.bind(this)}></a>
          </div>
          <a href="./score-rule.html" className="vip-score-link">
            <ul className="vip-score grid">
              <li className="vip">
                <span>当前等级:</span>
                <i className={`icon icon-vip-${account.level}`}></i>
              </li>
              <li className="score">
                <span>您的积分:</span>
                <b>{account.score}</b>
              </li>
            </ul>
          </a>
          <div className="btns">
            <button
              className="btn block red sigin-btn"
              type="button"
              disabled={!this.state.signinable}
              onClick={this.handleSignin.bind(this)}>{this.state.signinable ? '签到' : '已签到'}</button>
            {this.renderCertify()}
          </div>
          <Popover ref="popover" />
        </section>
        <Nav on="account" />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<MyPage />, document.querySelector('.page'));
