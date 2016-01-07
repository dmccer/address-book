import '../../less/global/global.less';
import '../../less/component/layout.less';
import '../../less/component/form.less';
import '../../less/component/icon.less';
import './index.less';


import React from 'react';
import ReactDOM from 'react-dom';

export default class LoginPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="login-page">
        <header className="header">登录</header>
        <form className="form login">
          <div className="field">
            <label className="icon icon-phone"></label>
            <input type="tel" placeholder="请输入手机号" className="control" />
          </div>
          <div className="field row">
            <div className="field vertify-code">
              <label className="icon icon-key"></label>
              <input type="tel" placeholder="请输入验证码" className="control" />
            </div>
            <div className="vertify-btn">
              <button type="button" className="btn block purple">获取验证码 (69s)</button>
            </div>
          </div>
          <div className="btns">
            <button className="btn block blue" type="submit">登录</button>
          </div>
        </form>
      </section>
    );
  }
}

ReactDOM.render(<LoginPage />, document.querySelector('.page'));
