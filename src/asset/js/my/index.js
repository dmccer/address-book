import '../../less/global/global.less';
import '../../less/component/layout.less';
import '../../less/component/form.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../header/';
import Nav from '../nav/';

export default class MyPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="my-page">
        <Header title="我的" />
        <section className="my">
          <div className="avatar">
            <a href="#"></a>
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
            <button className="btn block red" type="button">签到</button>
            <button className="btn block line" type="button">退出账号</button>
          </div>
        </section>
        <Nav />
      </section>
    );
  }
}

ReactDOM.render(<MyPage />, document.querySelector('.page'));
