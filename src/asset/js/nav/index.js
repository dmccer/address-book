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
          <i className="icon s22 icon-biz-card"></i>
          <span>名片</span>
        </div>
        <div className="menu">
          <i className="icon s22 icon-address-book"></i>
          <span>通讯录</span>
        </div>
        <div className="menu on">
          <i className="icon s22 icon-account"></i>
          <span>我的</span>
        </div>
      </section>
    );
  }
}
