import '../../less/global/global.less';
import '../../less/component/layout.less';
import '../../less/component/form.less';
import '../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';

import Header from '../header/';
import Nav from '../nav/';
import Loading from '../loading/';
import Popover from '../popover/';

export default class MyPage extends React.Component {
  constructor() {
    super();

    this.state = {
      signinable: true
    }
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
        url: '/api/signin',
        type: 'POST',
        success: resolve.bind(this),
        error: reject.bind(this)
      });
    }).then((res) => {
      this.setState({
        signinable: false
      });

      this.refs.popover.success('签到成功');
    }).catch((xhr) => {
      console.log(xhr)
    }).done(() => {
      this.refs.loading.close();
    })
  }

  render() {
    return (
      <section className="my-page">
        <Header title="我的" />
        <section className="my">
          <div className="avatar">
            <a href="#" style={{
              backgroundImage: 'url("http://imgsize.ph.126.net/?imgurl=http://img0.ph.126.net/DumDJ-ZwuOleqNA40O14ew==/6631345942143875871.jpg_230x230x1x95.jpg")',
              backgroundSize: 'contain'
            }}></a>
          </div>
          <ul className="vip-score grid">
            <li className="vip">
              <span>当前等级:</span>
              <b>VIP 1</b>
            </li>
            <li className="score">
              <span>您的积分:</span>
              <b><a href="#">357</a></b>
            </li>
          </ul>
          <div className="btns">
            <button className="btn block red" type="button" disabled={!this.state.signinable} onClick={this.handleSignin.bind(this)}>签到</button>
            <button className="btn line blue" type="button">退出账号</button>
          </div>
          <Popover ref="popover" />
        </section>
        <Nav />
        <Loading ref="loading" />
      </section>
    );
  }
}

ReactDOM.render(<MyPage />, document.querySelector('.page'));
