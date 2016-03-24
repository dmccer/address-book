import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise/lib/es6-extensions';

import AjaxHelper from '../ajax-helper/';
import {MsgCount} from '../message/model/';

export default class Header extends React.Component {
  state = {};

  constructor() {
    super();
  }

  componentWillMount() {
    this.ajaxHelper = new AjaxHelper();

    this.fetchMsgCount();
  }

  handleAdd() {
    this.setState({
      adding: !this.state.adding
    });
  }

  fetchMsgCount() {
    this.ajaxHelper.one(MsgCount, res => {
      this.setState({
        hasMsg: res.total_count > 0
      })
    });

    setTimeout(() => {
      this.fetchMsgCount();
    }, 30*1000);
  }

  renderAddActions() {
    if (this.state.adding) {
      return (
        <ul className="actions">
          <li><a href="./select-ab-type.html">新建通讯录</a></li>
          <li><a href="./biz-card-create.html">新建名片</a></li>
          <li><a href="./biz-card-manage.html">名片管理</a></li>
        </ul>
      );
    }
  }

  render() {
    let msgCountTip = this.state.hasMsg ? <i className="icon icon-dot s12"></i> : null;
    return (
      <header className="header row">
        <section className="left">
          <a href="./message.html">
            <i className="icon icon-mail"></i>
          </a>
          {msgCountTip}
        </section>
        <section className="center">{this.props.title}</section>
        <section className="right" onClick={this.handleAdd.bind(this)}>
          <i className="icon s20 icon-plus"></i>
          {this.renderAddActions()}
        </section>
      </header>
    );
  }
}
