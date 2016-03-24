/**
 * 名片交换申请列表页面 ./biz-card-application-msg.html
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
import {NoticeList} from '../model/';

export default class BizCardApplicationMsgListPage extends React.Component {
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
    }, 3);
  }

  renderMsg() {
    let msgs = this.state.notices;

    if (msgs.length) {
      return msgs.map((msg, index) => {
        let qs = querystring.stringify({
          uid: msg.uid,
          cid: msg.cid,
          askid: msg.askid,
          askType: 'bc'
        });

        return (
          <MsgItem
            key={`msg-item_${index}`}
            url={`./biz-card-detail.html?${qs}`}
            {...msg} />
        );
      });
    }

    return (<div className="empty">暂无消息</div>);
  }

  render() {
    return (
      <section className="bc-application-msg-list-page">
        <SubHeader title="名片交换申请消息" />
        <section className="bc-application-msg-list">
          <div className="cells cells-access">
            {this.renderMsg()}
          </div>
        </section>
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<BizCardApplicationMsgListPage />, document.querySelector('.page'));
