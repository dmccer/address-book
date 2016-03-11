import '../../../less/global/global.less';
import '../../../less/component/form.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import querystring from 'querystring';
import Promise from 'promise';

import AjaxError from '../../ajax-err/';
import SubHeader from '../../sub-header/';
import Private from '../../private/';
import Loading from '../../loading/';
import Toast from '../../toast/';

export default class BizCardCertifiedPage extends React.Component {
  state = {
    qs: querystring.parse(location.search.substring(1))
  };

  constructor() {
    super();
  }

  handleCancelCertify() {
    this.refs.loading.show('请求中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/pim/cancel_card_verify',
        type: 'POST',
        data: {
          cid: this.state.qs.cid,
          vtype: 1
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.toast.success('撤销认证成功');
        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        this.refs.toast.warn(`撤销认证出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  render() {
    return (
      <section className="biz-card-certified-page mini-page">
        <SubHeader title="实名认证" />

        <div className="biz-card-certified">
          <div className="certified-tip">
            <h2>您的申请已经提交</h2>
            <p>申请认证大概需要1-3个工作日</p>
            <p>请您耐心等待</p>
          </div>

          <div className="field">
            <a href={`./biz-card-detail.html?${location.search.substring(1)}`} className="btn block lightBlue">返回名片</a>
          </div>
          <div className="field">
            <button onClick={this.handleCancelCertify.bind(this)} type="button" className="btn block lightBlue">撤销认证</button>
          </div>
        </div>

        <Private />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<BizCardCertifiedPage />, document.querySelector('.page'));
