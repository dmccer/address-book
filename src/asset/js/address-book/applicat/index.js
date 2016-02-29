/**
 * 申请审核列表页面
 *
 * @author Kane xiaoyunhua@ttyhuo.cn
 */

import '../../../less/global/global.less';
import '../../../less/component/cell.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import SubHeader from '../../sub-header/';
import Private from '../../private/';

export default class ABApplicatListPage extends React.Component {
  state = {};

  constructor() {
    super();
  }

  render() {
    return (
      <section className="ab-applicat-list-page">
        <SubHeader title="申请审核列表" />
        <div className="ab-applicat-list cells cells-access">
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
        </div>
        <Private />
      </section>
    );
  }
}

ReactDOM.render(<ABApplicatListPage />, document.querySelector('.page'));
