/**
 * 名片交换页面
 */
import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/layout.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';

import AjaxError from '../../ajax-err/';
import Header from '../../header/';
import Nav from '../../nav/';
import MiniCard from '../mini-card/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import Log from '../../log/';

export default class BizCardSwapPage extends React.Component {
  state = {
    bizCard: {}
  };

  constructor() {
    super();
  }

  componentDidMount() {
    AjaxError.init(this.refs.toast);

    this.getMyBizCard();
  }

  /**
   * getMyBizCard 获取我的主名片信息
   * @return {Promise}
   */
  getMyBizCard() {
    this.refs.loading.show('加载中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/query_user_card_desc',
        type: 'GET',
        cache: false,
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.setState({
          bizCard: res.card
        });
        
        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);

        this.refs.toast.warn(`加载出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  render() {
    return (
      <section className="biz-card-swap-page">
        <Header title="我的名片" />
        <div className="biz-card-swap">
          <MiniCard {...this.state.bizCard} />
          <ul className="menu grid">
            <li><a href="./my-biz-card.html">名片好友</a></li>
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
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<BizCardSwapPage />, document.querySelector('.page'));
