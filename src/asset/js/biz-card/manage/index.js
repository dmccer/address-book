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

import AjaxError from '../../ajax-err/';
import ModalHeader from '../../modal-header/';
import ManageMyMiniCard from '../mini-card/manage-my/';
import Private from '../../private/';
import Confirm from '../../confirm/';
import Toast from '../../toast/';
import Loading from '../../loading/';
import Log from '../../log/';

export default class BizCardManagePage extends React.Component {
  state = {
    bizCards: []
  };

  constructor() {
    super();
  }

  componentDidMount() {
    AjaxError.init(this.refs.toast);
    this.getMyBizCards();
  }

  getMyBizCards() {
    this.refs.loading.show('加载中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/query_user_cards',
        type: 'GET',
        cache: false,
        success: resolve.bind(this),
        error: reject.bind(this)
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.setState({
          bizCards: res.cards
        });

        return;
      }
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);

        this.refs.toast.warn(`加载我的名片出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  handleRemove(bizCard) {
    this.toRemovedBizCard = bizCard;
    this.refs.confirm.show({
      msg: '是否删除名片?'
    });
  }

  handleConfirmRemoveBizCard() {
    this.refs.loading.show('删除中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/del_my_card',
        type: 'POST',
        data: {
          cid: this.toRemovedBizCard.cid
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.toast.success('删除名片成功');
        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        this.refs.toast.warn(`删除名片出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  handleCancelRemoveBizCard() {
    this.toRemovedBizCard = null;
  }

  renderMyBizCards() {
    let bizCards = this.state.bizCards;

    if (bizCards && bizCards.length) {
      return bizCards.map((bizCard, index) => {
        return <ManageMyMiniCard
          key={`biz-card-item_${index}`}
          onDel={this.handleRemove.bind(this, bizCard)}
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
      </section>
    );
  }
}

ReactDOM.render(<BizCardManagePage />, document.querySelector('.page'));
