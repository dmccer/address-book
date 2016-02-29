/**
 * 申请审核项
 */
import '../../../../less/global/global.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

export default class ABApplicatItem extends React.Component {
  static defaultProps = {};

  state = {};

  constructor() {
    super();
  }

  render() {
    return (
      <a className="cell" href="#">
        <div className="cell-hd">
          <img src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/u-Phh6E2aQ7r0xoO6ygDXw==/6598157183716526804.jpg_188x188x1.jpg" />
        </div>
        <div className="cell-bd">
          <h3>张三申请加入您的"XX 通讯录"</h3>
          <p>2015-12-12 12:12:12</p>
        </div>
        <div className="cell-ft"></div>
      </a>
    );
  }
}
