import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/layout.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../../header/';
import Nav from '../../nav/';

export default class BizCardMyPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="biz-card-my-page">
        <Header title="我的名片" />
        <div className="biz-card-my">
          <a href="#" className="btn block green add-btn">
            <i className="icon s12 icon-plus"></i>
            <span>新建名片</span>
          </a>
          <ul className="menu grid">
            <li className="on">名片好友</li>
            <li>名片交换</li>
          </ul>
          <div className="search-sec">
            <a className="search">
              <i className="icon icon-search"></i>
              <span>您共有 100 位好友可搜索</span>
            </a>
          </div>
          <div className="divide"></div>
          <div className="list ab-group-list">
            <a href="#">
              <div className="row">
                <div className="ab-group">
                  <i className="icon icon-right-triangle"></i>
                  <span>默认分组</span>
                </div>
                <div className="people-num">2/2</div>
              </div>
            </a>
            <a href="#">
              <div className="row">
                <div className="ab-group">
                  <i className="icon icon-right-triangle"></i>
                  <span>亲情市场</span>
                </div>
                <div className="people-num">2/3</div>
              </div>
            </a>
            <a href="#">
              <div className="row">
                <div className="ab-group">
                  <i className="icon icon-right-triangle"></i>
                  <span>道义市场</span>
                </div>
                <div className="people-num">2/3</div>
              </div>
            </a>
            <a href="#">
              <div className="row">
                <div className="ab-group">
                  <i className="icon icon-right-triangle"></i>
                  <span>黑名单</span>
                </div>
                <div className="people-num">2/3</div>
              </div>
            </a>
            <a href="#">
              <div className="row">
                <div className="ab-group">
                  <i className="icon s15 icon-manage"></i>
                  <span>管理群组</span>
                </div>
                <div className="people-num">2/3</div>
              </div>
            </a>
          </div>
          <div className="fixed-holder"></div>
        </div>
        <Nav />
      </section>
    );
  }
}

ReactDOM.render(<BizCardMyPage />, document.querySelector('.page'));
