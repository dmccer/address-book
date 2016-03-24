import '../../../less/global/global.less';
import '../../../less/component/form.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import querystring from 'querystring';
import Promise from 'promise/lib/es6-extensions';

import AjaxHelper from '../../ajax-helper/';
import SubHeader from '../../sub-header/';
import Private from '../../private/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import {RevokeMyVerify} from '../../my/model/';

export default class BizCardCertifiedPage extends React.Component {
  state = {
    qs: querystring.parse(location.search.substring(1))
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);
  }

  handleCancelCertify() {
    this.ajaxHelper.one(RevokeMyVerify, res => {
      this.refs.toast.success('撤销认证成功');

      setTimeout(() => {
        history.back();
      }, 1500);
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
