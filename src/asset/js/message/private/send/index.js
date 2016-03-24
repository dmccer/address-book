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
import Promise from 'promise/lib/es6-extensions';
import querystring from 'querystring';
import cx from 'classnames';

import AjaxHelper from '../../../ajax-helper/';
import SubHeader from '../../../sub-header/';
import Loading from '../../../loading/';
import Toast from '../../../toast/';
import {FieldChangeEnhance} from '../../../enhance/field-change';
import Validator from '../../../validator/';
import FixedHolder from '../../../fixed-holder/';
import {PrivateMsgWithFriend, SendPrivateMsg} from '../../model/';

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
    this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);

    this.fetch();
  }

  bottom() {
    let winH = $(window).height();
    let docH = $(document).height();

    $(window).scrollTop(docH - winH);
  }

  fetch() {
    this.ajaxHelper.one(PrivateMsgWithFriend, res => {
      this.setState({
        msgs: res.piv_msg_data_list
      }, () => {
        setTimeout(() => {
          this.bottom();
        }, 100);
      });
    }, this.state.qs.fuid);
  }

  post(e) {
    e.preventDefault();
    e.stopPropagation();

    let msg = this.props.msg;

    if (Validator.empty(msg)) {
      this.refs.toast.warn('发送内容不能为空');

      return;
    }

    this.ajaxHelper.one(SendPrivateMsg, res => {
      this.props.clear('msg');
      this.fetch();
    }, this.state.qs.fuid, msg);
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
                  onChange={this.props.handleStrWithEmptyChange.bind(this, 'msg')}
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
