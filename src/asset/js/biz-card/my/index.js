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
import Promise from 'promise';

import AjaxError from '../../ajax-err/';
import Header from '../../header/';
import Nav from '../../nav/';
import MainMiniCard from '../mini-card/main/';
import BizCardGroupList from '../group-list/';

import Loading from '../../loading/';
import Toast from '../../toast/';
import Log from '../../log/';

export default class BizCardMyPage extends React.Component {
  state = {
    groups: []
  };

  constructor() {
    super();
  }

  componentDidMount() {
    AjaxError.init(this.refs.toast);
    this.fetch();
  }

  /**
   * fetch 获取页面所需信息
   * @return
   */
  fetch() {
    this.refs.loading.show('加载中...');

    Promise
      .all([this.getMyBizCard(), this.getGroups()])
      .then((args) => {
        this.calcFriendsCount(args[1]);
        let groups = args[1];

        groups.push({
          groupname: '管理群组',
          extra: true
        });

        this.setState({
          groups: groups,
          myBizCard: args[0]
        });
      })
      .catch((err) => {
        if (err && err instanceof Error) {
          Log.error(err);

          this.refs.toast.warn(`加载页面失败,${err.message}`);
        }
      })
      .done(() => {
        this.refs.loading.close();
      });
  }

  /**
   * formatGroups 给 group 增加 name 字段，值为 groupname
   * @param  {Array<Group>} groups
   * @return {Array<Group>}
   */
  formatGroups(groups) {
    return groups.map((group) => {
      group.name = group.groupname;

      return group;
    });
  }

  /**
   * calcFriendsCount 计算好友总数
   * @param  {Array<Group>} groups
   * @return
   */
  calcFriendsCount(groups) {
    let count = groups.reduce((a, b) => {
      return a.friends_count + b.friends_count;
    });

    this.setState({
      friendsCount: count
    });
  }

  /**
   * getMyBizCard 获取我的主名片信息
   * @return {Promise}
   */
  getMyBizCard() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/query_main_card_desc',
        type: 'GET',
        cache: false,
        success: resolve.bind(this),
        error: reject.bind(this)
      });
    }).then((res) => {
      if (res.retcode === 0) {
        return;
      }

      this.refs.toast.warn(res.msg);
    });
  }

  /**
   * getGroups 获取我的名片分组
   * @return {Promise}
   */
  getGroups() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/query_my_card_groups',
        type: 'GET',
        cache: false,
        success: resolve.bind(this),
        error: reject.bind(this)
      });
    }).then((res) => {
      if (res.retcode === 0) {
        return res.pimCardGroups;
      }

      this.refs.toast.warn(res.msg);
    });
  }

  renderMyBizCard() {
    if (this.state.myBizCard) {
      return <MainMiniCard {...this.state.myBizCard} />;
    }
  }

  render() {
    return (
      <section className="biz-card-my-page">
        <Header title="我的名片" />
        <div className="biz-card-my">
          <a href="./biz-card-create.html" className="btn block green add-btn">
            <i className="icon s12 icon-plus"></i>
            <span>新建名片</span>
          </a>
          {this.renderMyBizCard()}
          <ul className="menu grid">
            <li className="on"><a href="javascript:;">名片好友</a></li>
            <li><a href="./biz-card-swap.html">名片交换</a></li>
          </ul>
          <div className="search-sec">
            <a href="./search-biz-card.html" className="search">
              <i className="icon s14 icon-search"></i>
              <span>您共有 {this.state.friendsCount} 位好友可搜索</span>
            </a>
          </div>
          <div className="divide"></div>
          <BizCardGroupList items={this.state.groups} />
          <div className="fixed-holder"></div>
        </div>
        <Nav on="biz-card" />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<BizCardMyPage />, document.querySelector('.page'));
