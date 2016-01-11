import '../../less/component/layout.less';
import '../../less/component/icon.less';
import './index.less';

import React from 'react';
import Mask from '../mask/';

export default class More extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.on) {
      return (
        <section className="more">
          <ul className="arrow-list">
            <li>
              <a href="#" className="row">
                <div>您有未读消息</div>
                <div className="count">
                  <i className="icon s22 icon-badge">99</i>
                  <i className="icon icon-right-arrow"></i>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="row">
                <div>您有未处理审核</div>
                <div className="count">
                  <i className="icon s22 icon-badge">16</i>
                  <i className="icon icon-right-arrow"></i>
                </div>
              </a>
            </li>
          </ul>
          <section className="nav row">
            <div className="menu">
              <i className="icon s30 icon-biz-card"></i>
              <span>名片</span>
            </div>
            <div className="menu">
              <i className="icon s30 icon-address-book"></i>
              <span>通讯录</span>
            </div>
            <div className="menu">
              <i className="icon icon-mail menu"></i>
              <span>消息</span>
            </div>
            <div className="menu">
              <i className="icon s30 icon-account"></i>
              <span>我的</span>
            </div>
          </section>
        </section>
      );
    }

    return null;
  }
}
