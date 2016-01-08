import '../../../less/global/global.less';
import '../../../less/component/form.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import SubHeader from '../../sub-header/';
import Private from '../../private/';

export default class BizCardCertifiedOKPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="biz-card-certified-ok-page mini-page">
        <SubHeader title="名片认证" />
        <div className="biz-card-certified-ok">
          <div className="certified-ok-tip">
            <i className="icon s32 icon-popover-success"></i>
            <p>恭喜您，认证成功！</p>
          </div>
          <p className="certified-ok-time">认证通过时间: 2015年12月12日 14:15:22</p>
        </div>
        <Private />
      </section>
    );
  }
}

ReactDOM.render(<BizCardCertifiedOKPage />, document.querySelector('.page'));
