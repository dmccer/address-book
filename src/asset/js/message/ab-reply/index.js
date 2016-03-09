/**
 * 通讯录申请回复列表页面
 *
 * @author Kane xiaoyunhua@ttyhuo.cn
 */

import '../../../less/global/global.less';
import '../../../less/component/cell.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';
import querystring from 'querystring';

import AjaxError from '../../ajax-err/';
import SubHeader from '../../sub-header/';
import MsgItem from '../item/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import Log from '../../log/';
import Private from '../../private/';

export default class ABReplyMsgListPage extends React.Component {
  state = {
    notices: []
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    this.refs.loading.show('加载中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/query_notice_list',
        type: 'GET',
        cache: false,
        data: {
          ntype: 2
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.setState({
          notices: res.notices
        });

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);

        this.refs.toast.warn(err.message);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  renderMsg() {
    let msgs = this.state.notices;

    if (msgs.length) {
      return msgs.map((msg, index) => {
        let qs = querystring.stringify({
          uid: msg.uid,
          id: msg.aid
        });

        return (
          <MsgItem
            key={`msg-item_${index}`}
            url={`./address-book-detail.html?${qs}`}
            {...msg} />
        );
      });
    }

    return (<div className="empty">暂无消息</div>);
  }

  render() {
    return (
      <section className="ab-reply-list-page">
        <SubHeader title="通讯录申请回复消息" />
        <div className="ab-reply-list cells cells-access">
          {this.renderMsg()}
        </div>
        <Private />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<ABReplyMsgListPage />, document.querySelector('.page'));
