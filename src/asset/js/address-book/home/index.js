import '../../../less/global/global.less';
import '../../../less/component/layout.less';
import '../../../less/component/form.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';

import Header from '../../header/';
import Nav from '../../nav/';
import Loading from '../../loading/';
import Popover from '../../popover/';

export default class ABPage extends React.Component {
  constructor() {
    super();

    this.state = {}
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
      <section className="ab-page">
        <Header title="通讯录" />
        <section className="ab">
          <a className="search">
            <i className="icon s14 icon-search"></i>
            <span>通讯录共有 100 人</span>
          </a>
          <div className="divide"></div>
          <h2 className="subtitle">我发起的</h2>
          <ul className="list ab-list">
            <li>
              <a href="./address-book-detail.html">
                <img className="cover" src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/Bxuv7RNkBKTwug5oISbHZw==/6631311857283249341.jpg_188x188x1.jpg" />
                <div className="ab-profile">
                  <h3>通讯录名称</h3>
                  <div>
                    <span className="creator">由 <b>张三</b> 创建</span>
                    <span className="people-num">人数: 100</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="./address-book-detail.html">
                <img className="cover" src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/Bxuv7RNkBKTwug5oISbHZw==/6631311857283249341.jpg_188x188x1.jpg" />
                <div className="ab-profile">
                  <h3>通讯录名称</h3>
                  <div>
                    <span className="creator">由 <b>张三</b> 创建</span>
                    <span className="people-num">人数: 100</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <h2 className="subtitle">我加入的</h2>
          <ul className="list ab-list">
            <li>
              <a href="./address-book-detail.html">
                <img className="cover" src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/Bxuv7RNkBKTwug5oISbHZw==/6631311857283249341.jpg_188x188x1.jpg" />
                <div className="ab-profile">
                  <h3>通讯录名称</h3>
                  <div>
                    <span className="creator">由 <b>张三</b> 创建</span>
                    <span className="people-num">人数: 100</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="./address-book-detail.html">
                <img className="cover" src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/Bxuv7RNkBKTwug5oISbHZw==/6631311857283249341.jpg_188x188x1.jpg" />
                <div className="ab-profile">
                  <h3>通讯录名称</h3>
                  <div>
                    <span className="creator">由 <b>张三</b> 创建</span>
                    <span className="people-num">人数: 100</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <h2 className="subtitle">推荐通讯录</h2>
          <ul className="list ab-list">
            <li>
              <a href="./address-book-detail.html">
                <img className="cover" src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/Bxuv7RNkBKTwug5oISbHZw==/6631311857283249341.jpg_188x188x1.jpg" />
                <div className="ab-profile">
                  <h3>通讯录名称</h3>
                  <div>
                    <span className="creator">由 <b>张三</b> 创建</span>
                    <span className="people-num">人数: 100</span>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="./address-book-detail.html">
                <img className="cover" src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/Bxuv7RNkBKTwug5oISbHZw==/6631311857283249341.jpg_188x188x1.jpg" />
                <div className="ab-profile">
                  <h3>通讯录名称</h3>
                  <div>
                    <span className="creator">由 <b>张三</b> 创建</span>
                    <span className="people-num">人数: 100</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </section>
        <div className="fixed-holder"></div>
        <Nav on="address-book" />
        <Loading ref="loading" />
      </section>
    );
  }
}

ReactDOM.render(<ABPage />, document.querySelector('.page'));
