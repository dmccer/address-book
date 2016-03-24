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
import {MyVerifyInfo} from '../../my/model/';

export default class BizCardCertifiedOKPage extends React.Component {
  state = {
    qs: querystring.parse(location.search.substring(1))
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);

    this.fetch();
  }

  fetch() {
    this.ajaxHelper.one(MyVerifyInfo, res => {
      console.log(res);
    });
  }

  render() {
    return (
      <section className="biz-card-certified-ok-page mini-page">
        <SubHeader title="实名认证" />
        <div className="biz-card-certified-ok">
          <div className="certified-ok-tip">
            <i className="icon s32 icon-popover-success"></i>
            <p>恭喜您，认证成功！</p>
          </div>
          <p className="certified-ok-time">认证通过时间: 2015年12月12日 14:15:22</p>
        </div>
        <Private />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<BizCardCertifiedOKPage />, document.querySelector('.page'));
