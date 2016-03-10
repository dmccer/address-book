/**
 * LoginPage 登录页面 /login.html
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
import querystring from 'querystring';
import Promise from 'promise';

import {FieldChangeEnhance} from '../enhance/field-change';
import AjaxError from '../ajax-err/';
import Validator from '../validator/';
import TinyHeader from '../tiny-header/';
import Loading from '../loading/';
import Toast from '../toast/';
import Log from '../log/';

const GET_VERIFY_CODE = '获取验证码';

@FieldChangeEnhance
export default class LoginPage extends React.Component {
  state = {
    count: GET_VERIFY_CODE,
    qs: querystring.parse(location.search.substring(1))
  };

  constructor() {
    super();
  }

  componentDidMount() {
    AjaxError.init(this.refs.toast);
  }

  /**
   * handleSubmit 处理登录
   * @param  {SubmitEvent} e
   * @return
   */
  handleSubmit(e: Object) {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.submiting) {
      return;
    }

    if (!this.validateTel() || !this.validateCode()) {
      return;
    }

    this.setState({
      submiting: true
    });

    this.refs.loading.show('登录中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/login',
        type: 'POST',
        data: {
          tel: this.props.tel,
          code: this.props.code,
          source: 'h5'
        },
        success: resolve.bind(this),
        error: reject.bind(this)
      });
    }).then((res) => {
      if (res.retcode === 0) {
        let qs = querystring.stringify(this.state.qs);
        let url = this.state.qs.ref || location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `/index.html?${qs}`);

        location.replace(url);

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      this.refs.toast.warn(`登录失败, ${err.message}`);
    }).done(() => {
      this.setState({
        submiting: false
      });

      this.refs.loading.close();
    });
  }

  /**
   * validateCode 验证验证码
   * @return {Boolean}
   */
  validateCode() {
    if (Validator.empty(this.props.code)) {
      this.refs.toast.warn('验证码不能为空');
      return false;
    }

    return true;
  }

  /**
   * validateTel 验证手机格式
   * @return {Boolean} Boolean
   */
  validateTel() {
    if (Validator.empty(this.props.tel)) {
      this.refs.toast.warn('请输入手机号');

      return false;
    }

    if (!Validator.len(this.props.tel, 11)) {
      this.refs.toast.warn('手机号格式不正确');

      return false;
    }

    return true;
  }

  /**
   * handleGetVerifyCode 处理获取验证码
   * @param  {ClickEvent} e
   * @return
   */
  handleGetVerifyCode(e: Object) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.validateTel()) {
      return;
    }

    if (this.state.verifyCodeDisabled) {
      this.refs.toast.info('验证码已发送');

      return;
    }

    this.setState({
      verifyCodeDisabled: true
    });

    this.refs.loading.show('发送验证码...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/send_verify_code',
        type: 'POST',
        data: {
          tel: this.props.tel
        },
        success: resolve.bind(this),
        error: reject.bind(this)
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.toast.warn('验证码发送成功');
        this.countDown();
        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);
        this.refs.toast.warn('验证码发送失败');
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  /**
   * countDown 倒计时
   * @return
   */
  countDown() {
    let count = 60;

    let fn = () => {
      count--;

      if (count === 0) {
        this.setState({
          count: GET_VERIFY_CODE,
          verifyCodeDisabled: false
        });

        return;
      }

      this.setState({
        count: `${GET_VERIFY_CODE}(${count}s)`
      });

      setTimeout(fn, 1000);
    }

    fn();
  }

  render() {
    let props = this.props;

    return (
      <section className="login-page">
        <TinyHeader title="登录" />
        <form className="form login" onSubmit={this.handleSubmit.bind(this)}>
          <div className="field">
            <label className="icon icon-phone"></label>
            <input
              type="tel"
              placeholder="请输入手机号"
              className="control"
              value={props.tel}
              onChange={props.handleMobileNoChange.bind(this, 'tel')} />
          </div>
          <div className="field row">
            <div className="field vertify-code">
              <label className="icon icon-key"></label>
              <input
                type="tel"
                placeholder="请输入验证码"
                className="control"
                value={props.code}
                onChange={props.handleIntegerChange.bind(this, 'code')} />
            </div>
            <div className="vertify-btn">
              <button
                type="button"
                className="btn block purple"
                onClick={this.handleGetVerifyCode.bind(this)}
                disabled={this.state.verifyCodeDisabled}>{this.state.count}</button>
            </div>
          </div>
          <div className="btns">
            <button className="btn block blue" type="submit">登录</button>
          </div>
        </form>
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<LoginPage />, document.querySelector('.page'));
