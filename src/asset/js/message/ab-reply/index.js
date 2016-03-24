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
import Promise from 'promise/lib/es6-extensions';
import querystring from 'querystring';

import AjaxHelper from '../../ajax-helper/';
import SubHeader from '../../sub-header/';
import MsgItem from '../item/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import Private from '../../private/';
import {NoticeList} from '../model/';

export default class ABReplyMsgListPage extends React.Component {
  state = {
    notices: []
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);

    this.fetch();
  }

  fetch() {
    this.ajaxHelper.one(NoticeList, res => {
      this.setState({
        notices: res.notices
      });
    }, 2);
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
