import '../../../less/global/global.less';
import '../../../less/component/form.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import SubHeader from '../../sub-header/';
import Private from '../../private/';

export default class BizCardCertifiedFailPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="biz-card-certified-fail-page mini-page">
        <SubHeader title="名片认证" />
        <div className="biz-card-certified-fail">
          <div className="certified-fail-tip">
            <i className="icon s32 icon-popover-error"></i>
            <p>很遗憾，没有认证通过！</p>
          </div>
          <p className="certified-fail-msg">认证没有通过，请上传真实清晰的证件照片！</p>

          <button className="btn block lightBlue">重新上传资料</button>
        </div>

        <Private />
      </section>
    );
  }
}

ReactDOM.render(<BizCardCertifiedFailPage />, document.querySelector('.page'));
