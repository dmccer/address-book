/**
 * 自己的名片管理页面
 */
import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/layout.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';
import querystring from 'querystring';

import ModalHeader from '../../modal-header/';
import ManageMyMiniCard from '../mini-card/manage-my/';
import Config from '../../config';
import WXVerify from '../../wx-verify/';
import Private from '../../private/';
import Confirm from '../../confirm/';
import Toast from '../../toast/';
import Loading from '../../loading/';
import Share from '../../share/';
import AjaxHelper from '../../ajax-helper/';
import {BizCardDetail, MyBizCardList, DelMyBizCard, SetMainBizCard} from '../model/';

export default class BizCardManagePage extends React.Component {
  state = {
    bizCards: []
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

    this.getMyBizCards();
  }

  getMyBizCards() {
    this.ajaxHelper.one(MyBizCardList, res => {
      this.setState({
        bizCards: res.cards
      });
    });
  }

  handleRemove(bizCard) {
    this.confirmTempData = bizCard;
    this.confirmAction = 'removeBizCard';
    this.refs.confirm.show({
      msg: '是否删除名片?'
    });
  }

  handleConfirmRemoveBizCard() {
    this[this.confirmAction]();
  }

  removeBizCard() {
    this.ajaxHelper.one(DelMyBizCard, res => {
      this.refs.toast.success('删除名片成功');
      this.getMyBizCards();
    }, this.confirmTempData.cid);
  }

  handleCancelRemoveBizCard() {
    this.confirmTempData = null;
    this.confirmAction = null;
  }

  handleSetMainBizCard(bizCard) {
    if (bizCard.main_card === 1) {
      this.refs.toast.warn('当前名片已是默认名片');

      return;
    }

    this.confirmAction = 'setMainBizCard';
    this.confirmTempData = bizCard;

    this.refs.confirm.show({
      msg: '确认设置为默认名片?'
    });
  }

  setMainBizCard() {
    this.ajaxHelper.one(SetMainBizCard, res => {
      this.refs.toast.success('设置默认名片片成功');
      this.getMyBizCards();
    }, this.confirmTempData.cid);
  }

  handleShare(user: Object) {
    if (!this.state.wxReady) {
      this.refs.toast.warn('等待微信验证...');

      return;
    }

    this.ajaxHelper.one(BizCardDetail, res => {
      let card = res.card;

      let qs = querystring.stringify({
        cid: user.cid,
        uid: user.uid
      });
      let url = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `/biz-card-detail.html?${qs}`);

      this.refs.share.toAll({
        title: card.share_title || `${user.nikename}的名片`,
        desc: card.share_desc || user.desc,
        link: url,
        imgUrl: user.photo,
      });
      this.refs.share.show();
    }, user.cid);
  }

  renderMyBizCards() {
    let bizCards = this.state.bizCards;

    if (bizCards && bizCards.length) {
      return bizCards.map((bizCard, index) => {
        return <ManageMyMiniCard
          key={`biz-card-item_${index}`}
          onDel={this.handleRemove.bind(this, bizCard)}
          onSetMainBizCard={this.handleSetMainBizCard.bind(this, bizCard)}
          onShare={this.handleShare.bind(this, bizCard)}
          {...bizCard} />;
      });
    }
  }

  render() {
    return (
      <section className="biz-card-manage-page">
        <ModalHeader title="名片管理" />
        <div className="biz-card-manage">
          <a href="./biz-card-create.html" className="btn block lightBlue add-btn">
            <i className="icon s15 icon-round-plus"></i>
            <span>新建名片</span>
          </a>
          <div className="list bc-list">
            {this.renderMyBizCards()}
          </div>
        </div>
        <Private />
        <Confirm
          ref="confirm"
          confirm={this.handleConfirmRemoveBizCard.bind(this)}
          cancel={this.handleCancelRemoveBizCard.bind(this)} />
        <Loading ref="loading" />
        <Toast ref="toast" />
        <Share ref="share" wxReady={this.state.wxReady} />
      </section>
    );
  }
}

ReactDOM.render(<BizCardManagePage />, document.querySelector('.page'));
