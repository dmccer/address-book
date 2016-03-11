import '../../../less/global/global.less';
import '../../../less/component/form.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import querystring from 'querystring';
import cx from 'classnames';
import Promise from 'promise';

import AjaxError from '../../ajax-err/';
import Config from '../../config';
import SubHeader from '../../sub-header/';
import WXVerify from '../../wx-verify/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import Private from '../../private/';

export default class BizCardCertifyPage extends React.Component {
  state = {
    qs: querystring.parse(location.search.substring(1))
  };

  constructor() {
    super();
  }

  componentWillMount() {
    WXVerify({
      appId: Config.wxAppId,
      url: Config.wxSignatureUrl,
      jsApiList: ['uploadImage']
    }, (err) => {
      if (err) {
        // 微信验证失败处理
        return;
      }

      this.setState({
        wxReady: true
      });
    });
  }

  handleUploadImage(field: String, e: Object) {
    e.stopPropagation();
    e.preventDefault();

    if (!this.state.wxReady) {
      this.refs.toast.warn('等待微信验证...');

      return;
    }

    wx.chooseImage({
      success: (res) => {
        if (res.localIds && res.localIds.length) {
          this.setState({
            [field]: res.localIds[0]
          });
        }
      }
    });
  }

  handleSubmit(e: Object) {
    e.stopPropagation();
    e.preventDefault();

    if (!this.state.bizCard || !this.state.IDCard) {
      this.refs.toast.warn('请先上传名片及工牌和身份证正面');
      return;
    }

    this.refs.loading.show('请求中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/pim/upload_card_verify',
        type: 'POST',
        data: {
          cid: this.state.qs.cid,
          vtype: 1,
          name_card_img: this.state.bizCard,
          id_card_img: this.state.IDCard
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.toast.success('已提交认证');
        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        this.refs.toast.warn(`提交认证出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  render() {
    return (
      <section className="biz-card-certify-page mini-page">
        <SubHeader title="名片认证" />

        <div className="biz-card-certify">
          <div className={cx('field', this.state.bizCard ? 'on' : '')}>
            <button type="button" className="btn block offBlue">名片及工牌 (上传成功)</button>
          </div>
          <div className={cx('field', this.state.IDCard ? 'on' : '')}>
            <button type="button" className="btn block offBlue">身份证正面 (上传成功)</button>
          </div>
          <div className={cx('field', this.state.bizCard ? '' : 'on')}>
            <button
              type="button"
              className="btn line green"
              onClick={this.handleUploadImage.bind(this, 'bizCard')}>上传【名片及工牌】实物照片</button>
          </div>
          <div className={cx('field', this.state.IDCard ? '' : 'on')}>
            <button
              type="button"
              className="btn line green"
              onClick={this.handleUploadImage.bind(this, 'IDCard')}>上传【身份证正面】实物照片</button>
          </div>
          <div className="submit">
            <button
              type="button"
              className="btn block green"
              onClick={this.handleSubmit.bind(this)}>申请名片认证</button>
          </div>
        </div>
        <Private />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<BizCardCertifyPage />, document.querySelector('.page'));
