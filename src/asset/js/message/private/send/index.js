/**
 * 发送私信页面 private-msg-send.html
 *
 * @author xiaoyunhua@ttyhuo.cn
 */
import '../../../../less/global/global.less';
import '../../../../less/component/form.less';
import '../../../../less/component/layout.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';
import querystring from 'querystring';
import cx from 'classnames';

import AjaxError from '../../../ajax-err/';
import SubHeader from '../../../sub-header/';
import Loading from '../../../loading/';
import Toast from '../../../toast/';
import {FieldChangeEnhance} from '../../../enhance/field-change';
import Validator from '../../../validator/';
import Log from '../../../log/';
import FixedHolder from '../../../fixed-holder/';

@FieldChangeEnhance
export default class PrivateMsgSendPage extends React.Component {
  state = {
    msgs: [],
    qs: querystring.parse(location.search.substring(1))
  };

  constructor() {
    super();
  }

  componentDidMount() {
    AjaxError.init(this.refs.toast);

    this.fetch();
  }

  bottom() {
    let winH = $(window).height();
    let docH = $(document).height();

    $(window).scrollTop(docH - winH);
  }

  fetch() {
    this.refs.loading.show('加载中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/query_piv_msg',
        type: 'GET',
        cache: false,
        data: {
          friendly_uid: this.state.qs.fuid
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.setState({
          msgs: res.piv_msg_data_list
        }, () => {
          setTimeout(() => {
            this.bottom();
          }, 100);
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

  post(e) {
    e.preventDefault();
    e.stopPropagation();

    let msg = this.props.msg;

    if (Validator.empty(msg)) {
      this.refs.toast.warn('发送内容不能为空');

      return;
    }

    this.refs.loading.show('发送中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/send_piv_msg',
        type: 'POST',
        data: {
          friendly_uid: this.state.qs.fuid,
          msg: msg
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.props.clear('msg');
        this.fetch();

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);

        this.refs.toast.warn(`发送私信出错:${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  renderMsg() {
    let msgs = this.state.msgs;

    if (msgs.length) {
      return msgs.map((msg, index) => {
        return (
          <div key={`msg-item_${index}`} className={cx('pm-item', msg.holder ? '' : 'friend')}>
            <div className="avatar-box">
              <div className="avatar" style={{
                backgroundImage: `url(${msg.photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
              }}></div>
            </div>
            <div className="msg-box">
              <div className="msg-time">{msg.msg_time}</div>
              <div className="msg-detail">
                <i className="extra"></i>
                <span>{msg.msg}</span>
              </div>
            </div>
          </div>
        );
      });
    }

    return (<div className="empty">暂无私信</div>);
  }

  render() {
    return (
      <section className="private-msg-send-page">
        <SubHeader title="发送私信" />
        <section className="private-msg-send">
          <div className="pm-list">
            {this.renderMsg()}
          </div>
          <FixedHolder height="60" />
          <form className="form" onSubmit={this.post.bind(this)}>
            <div className="msg-sender row">
              <div className="field">
                <input
                  type="text"
                  className="control"
                  placeholder="请输入私信内容"
                  value={this.props.msg}
                  onChange={this.props.handleStrChange.bind(this, 'msg')}
                />
              </div>
              <div className="send">
                <button className="btn block green" type="submit">发送</button>
              </div>
            </div>
          </form>
        </section>
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<PrivateMsgSendPage />, document.querySelector('.page'));
