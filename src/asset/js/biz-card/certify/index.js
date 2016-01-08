import '../../../less/global/global.less';
import '../../../less/component/form.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import SubHeader from '../../sub-header/';
import Private from '../../private/';

export default class BizCardCertifyPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="biz-card-certify-page">
        <SubHeader title="名片认证" />

        <div className="biz-card-certify">
          <div className="field">
            <button type="button" className="btn line green">上传【名片及工牌】实物照片</button>
          </div>
          <div className="field">
            <button type="button" className="btn line green">上传【身份证正面】实物照片</button>
          </div>
          <div className="submit">
            <button type="button" className="btn block green">申请名片认证</button>
          </div>
        </div>

        <Private />
      </section>
    );
  }
}

ReactDOM.render(<BizCardCertifyPage />, document.querySelector('.page'));
