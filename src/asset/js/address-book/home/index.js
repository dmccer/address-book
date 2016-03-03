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

import AjaxError from '../../ajax-err/';
import Header from '../../header/';
import Nav from '../../nav/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import Log from '../../log/';

export default class ABPage extends React.Component {
  state = {
    createdList: [],
    joinedList: []
  };

  constructor() {
    super();
  }

  componentDidMount() {
    AjaxError.init(this.refs.toast);

    this.fetch();
  }

  fetch() {
    this.refs.loading.show('加载中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/main_addlist_info',
        type: 'GET',
        cache: false,
        success: resolve.bind(this),
        error: reject.bind(this)
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.setState({
          createdList: res.create_addlist,
          joinedList: res.join_addlist
        });

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);

        this.refs.toast.warn(`加载通讯录数据出错，${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  renderItems(list) {
    if (list && list.length) {
      return list.map((item, index) => {
        return (
          <li key={`ab-item_${index}`}>
            <a href={`./address-book-detail.html?id=${item.id}`}>
              <img className="cover" src={item.photo} />
              <div className="ab-profile">
                <h3>{item.name}</h3>
                <div>
                  <span className="creator">由 <b>{item.group_holder}</b> 创建</span>
                  <span className="people-num">人数: {item.cards_count}</span>
                </div>
              </div>
            </a>
          </li>
        );
      });
    }
  }

  renderEmpty(list) {
    if (!list || !list.length) {
      return (
        <li className="empty">暂无</li>
      );
    }
  }

  render() {
    return (
      <section className="ab-page">
        <Header title="通讯录" />
        <section className="ab">
          <a className="search">
            <i className="icon s14 icon-search"></i>
            <span>点击开始搜索</span>
          </a>
          <div className="divide"></div>
          <h2 className="subtitle">我发起的</h2>
          <ul className="list ab-list">
            {this.renderItems(this.state.createdList)}
            {this.renderEmpty(this.state.createdList)}
          </ul>
          <h2 className="subtitle">我加入的</h2>
          <ul className="list ab-list">
            {this.renderItems(this.state.joinedList)}
            {this.renderEmpty(this.state.joinedList)}
          </ul>
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
