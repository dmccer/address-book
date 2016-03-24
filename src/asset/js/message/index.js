/**
 * 消息分类及数量展示页面
 */
import '../../less/global/global.less';
import '../../less/component/cell.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise/lib/es6-extensions';
import find from 'lodash/collection/find';

import AjaxHelper from '../ajax-helper/';
import SubHeader from '../sub-header/';
import Private from '../private/';
import Loading from '../loading/';
import Toast from '../toast/';
import {MsgCount} from './model/';

export default class MessagePage extends React.Component {
  state = {
    msgCategories: []
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);

    this.fetch();
  }

  fetch() {
    this.ajaxHelper.one(MsgCount, res => {
      this.setState({
        msgCategories: res.msgs_count_list
      });
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
                <p>好友私信</p>
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
