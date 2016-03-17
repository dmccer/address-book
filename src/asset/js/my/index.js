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

import AjaxError from '../ajax-err/';
import Header from '../header/';
import Nav from '../nav/';
import Loading from '../loading/';
import Popover from '../popover/';
import Toast from '../toast/';
import Log from '../log/';

export default class MyPage extends React.Component {
  state = {
    signinable: false,
    account: {}
  };

  constructor() {
    super();
  }

  componentDidMount() {
    AjaxError.init(this.refs.toast);

    this.getUser();
  }

  /**
   * 处理点击签到
   * @param  {ClickEvent} e 点击事件
   * @return
   */
  handleSignin(e) {
    e.preventDefault();
    e.stopPropagation();

    this.refs.loading.show('请求中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/pim/book_in',
        type: 'POST',
        success: resolve.bind(this),
        error: reject.bind(this)
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.setState({
          signinable: false
        });

        this.refs.popover.success('签到成功');

        this.getUser();

        return;
      }

      this.refs.toast.error(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);

        this.refs.toast.error(`签到出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  getUser() {
    this.refs.loading.show('加载中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/pim/fetch_uinfo',
        type: 'POST',
        success: resolve.bind(this),
        error: reject.bind(this)
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.setState({
          signinable: !res.book_in,
          account: res.userInfo
        });

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);
        this.refs.toast.error(`加载用户信息出错, ${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  renderCertify() {
    let verifyFlag = this.state.account.verifyFlag;

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
            <a href="#" style={{
              backgroundImage: `url(${account.photo})`,
              backgroundSize: 'contain'
            }}></a>
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
