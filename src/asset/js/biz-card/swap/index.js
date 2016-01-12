import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/layout.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../../header/';
import Nav from '../../nav/';
import MyMiniCard from '../my-mini-card/';

export default class BizCardSwapPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="biz-card-swap-page">
        <Header title="我的名片" />
        <div className="biz-card-swap">
          <MyMiniCard />
          <ul className="menu grid">
            <li>名片好友</li>
            <li className="on">名片交换</li>
          </ul>
          <div className="swap">
            <h2>我的名片二维码</h2>
          		<div className="qrcode">
          		  <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRIFWNF49yLwt9Tz7iO6BVKVL2Adx-0Ekv-vIdToGOYqYmF31Ck" />
          		</div>
          		<p>扫描二维码，自动加入到我的货运通讯录</p>
          		<div className="swap-btn">
          			<button className="btn block blue">扫一扫</button>
          		</div>
          </div>
          <div className="fixed-holder"></div>
        </div>
        <Nav on="biz-card" />
      </section>
    );
  }
}

ReactDOM.render(<BizCardSwapPage />, document.querySelector('.page'));
