import './index.less';

import React from 'react';
import cx from 'classnames';
import Promise from 'promise';

import ManageOtherMiniCardList from '../manage-other-list/';

export default class BizCardGroup extends React.Component {
  state = {
    bizCards: []
  };

  constructor() {
    super();
  }

  getBizCards() {
    new Promise((resolve, reject) => {
      $.ajax({
        url: `/api/${this.props.id}/biz_cards`,
        type: 'GET',
        success: resolve.bind(this),
        error: reject.bind(this)
      });
    }).then((res) => {
      this.setState({
        bizCards: res
      });
    }).catch((xhr) => {
      console.log(xhr)
    }).done(() => {
      // hide loading
    });
  }

  renderMiniCardList() {
    if (this.state.opened) {
      return <ManageOtherMiniCardList items={this.state.bizCards} />
    }
  }

  toggleBizCards() {
    if (!this.state.opened && !this.state.bizCards.length) {
      this.getBizCards();
    }

    this.setState({
      opened: !this.state.opened
    });
  }

  renderManageGroup() {
    let props = this.props;

    return (
      <div className="biz-card-group">
        <div className="group">
          <a href="./manage-biz-card.html" className="row">
            <div className="ab-group">
              <i className="icon icon-manage s15"></i>
              <span>{props.name}</span>
            </div>
          </a>
        </div>
      </div>
    );
  }

  render() {
    let props = this.props;

    if (props.extra) {
      return this.renderManageGroup();
    }

    return (
      <div className={cx('biz-card-group', this.state.opened ? 'opened' : '')}>
        <div className="group">
          <div className="row" onClick={this.toggleBizCards.bind(this)}>
            <div className="ab-group">
              <i className={cx('icon', this.state.opened ? 'icon-bottom-triangle' : 'icon-right-triangle')}></i>
              <span>{props.name}</span>
            </div>
            <div className="people-num">{props.total}</div>
          </div>
        </div>
        {this.renderMiniCardList()}
      </div>
    )
  }
}
