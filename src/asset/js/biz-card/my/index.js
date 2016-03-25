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
import Promise from 'promise/lib/es6-extensions';

import AjaxHelper from '../../ajax-helper/';
import {MainBizCard, BizCardGroups, RemoveFriendBizCard} from '../model/';
import Config from '../../config';
import Header from '../../header/';
import Nav from '../../nav/';
import MainMiniCard from '../mini-card/main/';
import BizCardGroupList from '../group-list/';
import Confirm from '../../confirm/';
import WXVerify from '../../wx-verify/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import Log from '../../log/';

export default class BizCardMyPage extends React.Component {
  state = {
    groups: [],
    myBizCard: null
  };

  constructor() {
    super();
  }

  componentWillMount() {
    WXVerify({
      appId: Config.wxAppId,
      url: Config.wxSignatureUrl,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
    }, (err) => {
      if (err) {
        // 微信验证失败处理
        return;
      }

      this.setState({
        wxReady: true
      });
    });
  }

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);

    this.fetch();
  }

  /**
   * fetch 获取页面所需信息
   * @return
   */
  fetch() {
    this.ajaxHelper.all([MainBizCard, BizCardGroups], res => {
      let bizCard = res[0].card;
      let groups = res[1].pimCardGroups;

      this.calcFriendsCount(groups);

      groups.push({
        groupname: '管理分组',
        extra: true
      });

      this.setState({
        groups: groups,
        myBizCard: bizCard,
        loaded: true
      });
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
      return a + b.friends_count;
    }, 0);

    this.setState({
      friendsCount: count
    });
  }

  renderMyBizCard() {
    let myBizCard = this.state.myBizCard;
    let loaded = this.state.loaded;

    if (loaded && myBizCard) {
      return <MainMiniCard wxReady={this.state.wxReady} {...myBizCard} />;
    }

    if (loaded && myBizCard.cid == null) {
      return (
        <a href="./biz-card-create.html" className="btn block green add-btn">
          <i className="icon s12 icon-plus"></i>
          <span>新建名片</span>
        </a>
      );
    }
  }

  handleClickDelBizCard(card: Object, e: Object) {
    e.stopPropagation();
    e.preventDefault();

    this.toRemoveBizCard = card;

    this.refs.delBizCard.show({
      msg: `是否移除名片好友${card.nikename}`
    });
  }

  handleDelBizCard() {
    this.ajaxHelper.one(RemoveFriendBizCard, res => {
      this.refs.toast.success('删除名片好友成功');
      location.reload();
    }, this.toRemoveBizCard.uid);
  }

  handleCancelDelBizCard() {
    this.toRemoveBizCard = null;
  }

  render() {
    return (
      <section className="biz-card-my-page">
        <Header title="名片" />
        <div className="biz-card-my">
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
          <BizCardGroupList items={this.state.groups} onDelBizCard={this.handleClickDelBizCard.bind(this)} />
          <div className="fixed-holder"></div>
        </div>
        <Nav on="biz-card" />
        <Confirm
          ref="delBizCard"
          confirm={this.handleDelBizCard.bind(this)}
          cancel={this.handleCancelDelBizCard.bind(this)}
        />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<BizCardMyPage />, document.querySelector('.page'));
