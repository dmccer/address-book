import '../../../less/global/global.less';
import '../../../less/component/form.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import querystring from 'querystring';
import cx from 'classnames';
import Promise from 'promise';

import AjaxHelper from '../../ajax-helper/';
import Config from '../../config';
import SubHeader from '../../sub-header/';
import WXVerify from '../../wx-verify/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import Private from '../../private/';
import {UploadMyVerify} from '../../my/model/';

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
      jsApiList: ['chooseImage', 'uploadImage']
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

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);
  }

  handleUploadImage(field: String, e: Object) {
    e.stopPropagation();
    e.preventDefault();

    if (!this.state.wxReady) {
      this.refs.toast.warn('等待微信验证...');

      return;
    }

    wx.chooseImage({
      count: 1,
      success: (res) => {
        let localIds = res.localIds;
        let len = localIds.length;

        if (len === 0) {
          this.refs.toast.warn('请选择一张图片');
          return;
        }

        if (len > 1) {
          this.refs.toast.warn('只能选择一张图片');
          return;
        }

        wx.uploadImage({
          localId: localIds[0],
          success: (res) => {
            this.setState({
              [field]: res.serverId
            });
          }
        });
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

    this.ajaxHelper.one(UploadMyVerify, res => {
      this.refs.toast.success('已提交认证');
      setTimeout(() => {
        location.href = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, '/biz-card-certified.html');
      }, 1500);
    }, this.state.bizCard, this.state.IDCard)
  }

  render() {
    return (
      <section className="biz-card-certify-page mini-page">
        <SubHeader title="实名认证" />

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
              onClick={this.handleSubmit.bind(this)}>申请实名认证</button>
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
