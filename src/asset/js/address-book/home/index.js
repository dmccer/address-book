/**
 * ABPage 通讯录 Tab 页面
 *
 * @author Kane xiaoyunhua@ttyhuo.cn
 */
import '../../../less/global/global.less';
import '../../../less/component/layout.less';
import '../../../less/component/form.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';

import AjaxHelper from '../../ajax-helper/';
import Header from '../../header/';
import Nav from '../../nav/';
import ABMiniItem from '../mini-item/';
import ABList from '../list/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import {MainABList} from '../model/';

export default class ABPage extends React.Component {
  state = {
    createdList: [],
    joinedList: []
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);

    this.fetch();
  }

  fetch() {
    this.ajaxHelper.one(MainABList, res => {
      this.setState({
        recommendList: res.recommend_addlist,
        joinedList: res.join_addlist
      });
    });
  }

  render() {
    return (
      <section className="ab-page">
        <Header title="通讯录" />
        <section className="ab">
          <a className="search" href="./search-ab.html">
            <i className="icon s14 icon-search"></i>
            <span>点击开始搜索</span>
          </a>
          <div className="divide"></div>
          <h2 className="subtitle">推荐通讯录</h2>
          <ABList items={this.state.recommendList} />
          <h2 className="subtitle">我加入的</h2>
          <ABList items={this.state.joinedList} />
        </section>
        <div className="fixed-holder"></div>
        <Nav on="address-book" />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<ABPage />, document.querySelector('.page'));
