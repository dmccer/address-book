/**
 * 私信列表页面
 */
import '../../../less/global/global.less';
import '../../../less/component/cell.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';

import AjaxHelper from '../../ajax-helper/';
import SubHeader from '../../sub-header/';
import MsgUserItem from './item/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import {PrivateMsgList} from '../model/';

export default class PrivateMsgListPage extends React.Component {
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
    this.ajaxHelper.one(PrivateMsgList, res => {
      this.setState({
        notices: res.piv_msg_list
      });
    }, 4);
  }

  renderMsg() {
    let msgs = this.state.notices;

    if (msgs.length) {
      return msgs.map((msg, index) => {
        return (
          <MsgUserItem
            key={`msg-item_${index}`}
            {...msg} />
        );
      });
    }

    return (<div className="empty">暂无私信</div>);
  }

  render() {
    return (
      <section className="private-msg-list-page">
        <SubHeader title="私信" />
        <section className="private-msg-list">
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

ReactDOM.render(<PrivateMsgListPage />, document.querySelector('.page'));
