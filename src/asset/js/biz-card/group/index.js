import './index.less';

import React from 'react';
import cx from 'classnames';
import Promise from 'promise';

import AjaxError from '../../ajax-err/';
import ManageOtherMiniCardList from '../manage-other-list/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import Log from '../../log/';

export default class BizCardGroupItem extends React.Component {
  state = {
    bizCards: []
  };

  constructor() {
    super();
  }

  componentDidMount() {
    AjaxError.init(this.refs.toast);
  }

  getBizCards() {
    this.refs.loading.show('加载中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/query_card_friends',
        type: 'GET',
        cache: false,
        data: {
          gid: this.props.id
        },
        success: resolve.bind(this),
        error: reject.bind(this)
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.setState({
          bizCards: res.cardFriends
        });

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);

        this.refs.toast.warn(`获取名片失败, ${err.message}`)
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  renderMiniCardList() {
    if (this.state.opened) {
      return <ManageOtherMiniCardList items={this.state.bizCards} />
    }
  }

  toggleBizCards() {
    if (this.props.friends_count === 0) {
      return;
    }

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
          <a href="./group-manage.html" className="row">
            <div className="ab-group">
              <i className="icon icon-manage s15"></i>
              <span>{props.groupname}</span>
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
              <span>{props.groupname}</span>
            </div>
            <div className="people-num">{props.friends_count}</div>
          </div>
        </div>
        {this.renderMiniCardList()}
        <Loading ref="loading" />
        <Toast ref="toast" />
      </div>
    )
  }
}
