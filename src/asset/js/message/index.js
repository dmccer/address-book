/**
 * 消息分类及数量展示页面
 */
import '../../less/global/global.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import SubHeader from '../sub-header/';
import Private from '../private/';

export default class MessagePage extends React.Component {
  state = {};

  constructor() {
    super();
  }

  render() {
    return (
      <section className="message-page">
        <SubHeader title="消息" />
        <section className="message">
          <h2 className="cells-title">通讯录</h2>
          <div className="cells cells-access">
            <a className="cell" href="javascript:;">
              <div className="cell-bd cell_primary">
                <p>管理通知</p>
              </div>
              <div className="cell-ft"></div>
            </a>
            <a className="cell" href="javascript:;">
              <div className="cell-bd cell_primary">
                <p>申请回复</p>
              </div>
              <div className="cell-ft"></div>
            </a>
          </div>
          <h2 className="cells-title">名片</h2>
          <div className="cells cells-access">
            <a className="cell" href="javascript:;">
              <div className="cell-bd cell_primary">
                <p>管理通知</p>
              </div>
              <div className="cell-ft"></div>
            </a>
            <a className="cell" href="javascript:;">
              <div className="cell-bd cell_primary">
                <p>申请回复</p>
              </div>
              <div className="cell-ft"></div>
            </a>
          </div>
          <h2 className="cells-title">私信</h2>
          <div className="cells cells-access">
            <a className="cell" href="./private-msg-list.html">
              <div className="cell-bd cell_primary">
                <p>名片好友</p>
              </div>
              <div className="cell-ft">
                <i className="icon s22 icon-badge">90</i>
              </div>
            </a>
          </div>
        </section>
        <Private />
      </section>
    );
  }
}

ReactDOM.render(<MessagePage />, document.querySelector('.page'));
