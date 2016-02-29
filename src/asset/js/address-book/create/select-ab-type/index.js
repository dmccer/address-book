/**
 * 新建通讯录-选择通讯录类型页面
 */
 import '../../../../less/global/global.less';
 import '../../../../less/component/layout.less';
 import '../../../../less/component/icon.less';

import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import SubHeader from '../../../sub-header/';
import Private from '../../../private/';

export default class SelectABTypePage extends React.Component {
  state = {};

  constructor() {
    super();
  }

  render() {
    return (
      <section className="select-abtype-page">
        <SubHeader title="新建通讯录" />
        <div className="select-abtype">
          <div className="abtype-list">
            <a className="abtype-item" href="#">
              <i className="icon s40 icon-my-roadtrain"></i>
              <h3>我的车队</h3>
            </a>
            <a className="abtype-item" href="#">
              <i className="icon s40 icon-biz-friend"></i>
              <h3>行业好友</h3>
            </a>
            <a className="abtype-item" href="#">
              <i className="icon s40 icon-in-company"></i>
              <h3>公司内部</h3>
            </a>
            <a className="abtype-item" href="#">
              <i className="icon s40 icon-truck-pkg-union"></i>
              <h3>车&货联盟</h3>
            </a>
          </div>
        </div>
        <Private />
      </section>
    );
  }
}

ReactDOM.render(<SelectABTypePage />, document.querySelector('.page'));
