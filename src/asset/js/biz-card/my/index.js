/**
 * 我的名片页面
 */
import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/layout.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../../header/';
import Nav from '../../nav/';
import MainMiniCard from '../mini-card/main/';
import BizCardGroupList from '../group-list/';

export default class BizCardMyPage extends React.Component {
  state = {
    groups: [
      {
        name: '默认分组',
        total: 10,
        id: 1
      }, {
        name: '亲情市场',
        total: 3,
        id: 2
      }, {
        name: '道义市场',
        total: 5,
        id: 3
      }, {
        name: '黑名单',
        total: 2,
        id: 4
      }
    ]
  };

  constructor() {
    super();
  }

  componentWillMount() {
    let groups = this.state.groups;

    groups.push({
      name: '管理群组',
      extra: true
    });
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
          <MainMiniCard />
          <ul className="menu grid">
            <li className="on"><a href="./my-biz-card.html">名片好友</a></li>
            <li><a href="./biz-card-swap.html">名片交换</a></li>
          </ul>
          <div className="search-sec">
            <a href="./search-biz-card.html" className="search">
              <i className="icon s14 icon-search"></i>
              <span>您共有 100 位好友可搜索</span>
            </a>
          </div>
          <div className="divide"></div>
          <BizCardGroupList items={this.state.groups} />
          <div className="fixed-holder"></div>
        </div>
        <Nav on="biz-card" />
      </section>
    );
  }
}

ReactDOM.render(<BizCardMyPage />, document.querySelector('.page'));
