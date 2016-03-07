/**
 * 消息分类及数量展示页面
 */
import '../../less/global/global.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';
import find from 'lodash/collection/find';

import AjaxError from '../ajax-err/';
import SubHeader from '../sub-header/';
import Private from '../private/';
import Loading from '../loading/';
import Toast from '../toast/';
import Log from '../log/';


export default class MessagePage extends React.Component {
  state = {
    msgCategories: []
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
        url: '/mvc/pim/query_msgs_count',
        type: 'GET',
        cache: false,
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.setState({
          msgCategories: res.msgs_count_list
        });

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);

        this.refs.toast.warn(err.message);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  getMsgCategory(categoryId) {
    let r = find(this.state.msgCategories, (item) => {
      return item.msg_type === categoryId;
    });

    if (!r) {
      r = {
        msg_type: categoryId,
        msg_count: 0
      };
    }

    return r;
  }

  renderMsgCount(categoryId) {
    let msg = this.getMsgCategory(categoryId);

    if (msg.msg_count) {
      return <i className="icon s22 icon-badge">{msg.msg_count}</i>;
    }
  }

  render() {
    return (
      <section className="message-page">
        <SubHeader title="消息" />
        <section className="message">
          <h2 className="cells-title">通讯录</h2>
          <div className="cells cells-access">
            <a className="cell" href="./ab-application-msg-list.html">
              <div className="cell-bd cell_primary">
                <p>管理通知</p>
              </div>
              <div className="cell-ft">
                {this.renderMsgCount(1)}
              </div>
            </a>
            <a className="cell" href="./ab-reply-msg-list.html">
              <div className="cell-bd cell_primary">
                <p>申请回复</p>
              </div>
              <div className="cell-ft">
                {this.renderMsgCount(2)}
              </div>
            </a>
          </div>
          <h2 className="cells-title">名片</h2>
          <div className="cells cells-access">
            <a className="cell" href="./biz-card-application-msg.html">
              <div className="cell-bd cell_primary">
                <p>管理通知</p>
              </div>
              <div className="cell-ft">
                {this.renderMsgCount(3)}
              </div>
            </a>
            <a className="cell" href="./biz-card-reply-msg.html">
              <div className="cell-bd cell_primary">
                <p>申请回复</p>
              </div>
              <div className="cell-ft">
                {this.renderMsgCount(4)}
              </div>
            </a>
          </div>
          <h2 className="cells-title">私信</h2>
          <div className="cells cells-access">
            <a className="cell" href="./private-msg-list.html">
              <div className="cell-bd cell_primary">
                <p>名片好友</p>
              </div>
              <div className="cell-ft">
              {this.renderMsgCount(5)}
              </div>
            </a>
          </div>
        </section>
        <Private />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<MessagePage />, document.querySelector('.page'));
