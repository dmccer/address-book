import '../../../less/global/global.less';
import '../../../less/component/form.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import SubHeader from '../../sub-header/';
import Private from '../../private/';

export default class BizCardCertifiedPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="biz-card-certified-page mini-page">
        <SubHeader title="名片认证" />

        <div className="biz-card-certified">
          <div className="certified-tip">
            <h2>您的申请已经提交</h2>
            <p>申请认证大概需要1-3个工作日</p>
            <p>请您耐心等待</p>
          </div>

          <div className="field">
            <button type="button" className="btn block lightBlue">返回名片</button>
          </div>
          <div className="field">
            <button type="button" className="btn block lightBlue">撤销认证</button>
          </div>
        </div>

        <Private />
      </section>
    );
  }
}

ReactDOM.render(<BizCardCertifiedPage />, document.querySelector('.page'));
