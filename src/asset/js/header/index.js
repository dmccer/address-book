import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';
import Log from '../log/';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    this.fetchMsgCount();
  }

  handleAdd() {
    this.setState({
      adding: !this.state.adding
    });
  }

  fetchMsgCount() {
    new Promise((resolve, reject) => {
      $.ajax({
        url: '/pim/query_msgs_count',
        type: 'GET',
        cache: false,
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.setState({
          hasMsg: res.total_count > 0
        })
        return;
      }
    }).catch((err) => {
      Log.error(err);
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
        </ul>
      );
    }
  }

  render() {
    return (
      <header className="header row">
        <section className="left">
          <a href="./message.html">
            <i className="icon icon-mail"></i>
          </a>
          <i className="icon icon-dot s12"></i>
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
