/**
 * 私信列表页面
 */
import '../../../less/global/global.less';
import '../../../less/component/cell.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';

import AjaxError from '../../ajax-err/';
import SubHeader from '../../sub-header/';
import MsgUserItem from './item/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import Log from '../../log/';

export default class PrivateMsgListPage extends React.Component {
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
        url: '/pim/query_pivmsg_list',
        type: 'GET',
        cache: false,
        data: {
          ntype: 4
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.setState({
          notices: res.piv_msg_list
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
