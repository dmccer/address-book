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

export default class BizCardCertifiedOKPage extends React.Component {
  state = {
    qs: querystring.parse(location.search.substring(1))
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
        url: '/pim/query_my_card_verify',
        type: 'GET',
        data: {
          cid: this.state.qs.cid
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        // 设置实名认证通过时间

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        this.refs.toast.warn(`加载名片信息出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
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
