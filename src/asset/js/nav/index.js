import './index.less';

import React from 'react';

export default class Nav extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="nav row">
        <div className="menu">
          <i className="icon icon-biz-card"></i>
          <span>名片</span>
        </div>
        <div className="menu">
          <i className="icon icon-biz-card"></i>
          <span>通讯录</span>
        </div>
        <div className="menu">
          <i className="icon icon-biz-card"></i>
          <span>我的</span>
        </div>
      </section>
    );
  }
}
