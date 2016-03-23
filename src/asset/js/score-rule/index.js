import '../../less/global/global.less';
import '../../less/component/layout.less';
import '../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';
import querystring from 'querystring';

import WXVerify from '../wx-verify/';
import SubHeader from '../sub-header/';
import Private from '../private/';
import Config from '../config';
import Loading from '../loading/';
import Toast from '../toast/';
import Log from '../log/';
import Confirm from '../confirm/';
import Share from '../share/';
import AjaxHelper from '../ajax-helper/';
import {MyRecentScoreActionList, MyVerifyInfo} from '../my/model/';
import {MainBizCard, BizCardDetail} from '../biz-card/model/';

export default class ScoreRulePage extends React.Component {
  state = {};

  constructor() {
    super();
  }

  componentWillMount() {
    WXVerify({
      appId: Config.wxAppId,
      url: Config.wxSignatureUrl,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
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

    this.getHistoryScore();
  }

  getHistoryScore() {
    this.ajaxHelper.one(MyRecentScoreActionList, res => {
      this.setState({
        historyScoreList: res.pim_score_list
      });
    });
  }

  certify(e) {
    e.stopPropagation();
    e.preventDefault();

    this.ajaxHelper.one(MyVerifyInfo, res => {
      let page;

      switch (res.verifyflag) {
        case 0:
          page = '/biz-card-certify.html';
          break;
        case 1:
          page = '/biz-card-certified.html';
          break;
        case 2:
          page = '/biz-card-certified-ok.html';
          break;
        case 3:
          page = '/biz-card-certified-fail.html';
          break;
        default:
          page = '/biz-card-certify.html';
      }

      location.href = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `${page}`);
    });
  }

  share() {
    if (!this.state.wxReady) {
      this.refs.toast.warn('等待微信验证...');
      return;
    }

    this.ajaxHelper.one(MainBizCard, res => {
      let user = res.card;

      if (!user.cid) {
        this.refs.noneMainBizCard.show({
          msg: '您还没有默认名片，请先新建名片'
        });

        return;
      }

      this.ajaxHelper.one(BizCardDetail, res => {
        let card = res.card;
        let qs = querystring.stringify({
          cid: card.id,
          uid: card.uid
        });
        let url = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `/biz-card-detail.html?${qs}`);

        this.refs.share.toAll({
          title: card.def_share_title,
          desc: card.def_share_desc,
          link: url,
          imgUrl: user.photo
        });

        this.refs.share.show();
      }, user.cid)
    });
  }

  handleCreateMainBizCard() {
    location.href = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `/biz-card-create.html?ref=${location.href}`);
  }

  zero(n) {
    return n >= 10 ? n : `0${n}`;
  }

  formatTime(d) {
    let mm = this.zero(d.getMonth() + 1);
    let dd = this.zero(d.getDate());
    let HH = this.zero(d.getHours());
    let MM = this.zero(d.getMinutes());

    return `${mm}-${dd} ${HH}:${MM}`;
  }

  renderHistoryScoreList() {
    let list = this.state.historyScoreList;

    if (list && list.length) {
      return list.map((item, index) => {
        return (
          <tr key={`score-item_${index}`}>
            <td>{this.formatTime(new Date(item.createtime))}</td>
            <td>{item.desc}</td>
            <td>{item.score}</td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <section className="score-rule-page">
        <SubHeader title="积分规则" />
        <section className="score-rule">
          <h2 className="subtitle">积分规则</h2>
          <ul className="rule-list">
            <li>
              <i className="icon s12 icon-li"></i>
              <p><span>每日签到可获 3 积分 / 天</span></p>
            </li>
            {
              // <li>
              //   <i className="icon s12 icon-li"></i>
              //   <p><span>分享通讯录组，被分享的人加入此通讯录组可获得 1 积分/人，每天最多 10 积分</span></p>
              // </li>
            }
            <li>
              <i className="icon s12 icon-li"></i>
              <p>
                <a href="javascript:;" onClick={this.share.bind(this)}>分享默认名片</a>
                <span>，可获得 1 积分，每天最多 10 积分</span>
              </p>
            </li>
            <li>
              <i className="icon s12 icon-li"></i>
              <p>
                <a href="javascript:;" onClick={this.certify.bind(this)}>实名认证</a>
                <span>并通过，可获得 300 积分，每个用户只能获取一次</span>
              </p>
            </li>
            <li>
              <i className="icon s12 icon-li"></i>
              <p>
                <a href="./biz-card-create.html">新建名片</a>
                <span>，资料填写完整度 100%，可获得 200 积分，每个用户只能获取一次</span>
              </p>
            </li>
          </ul>
          <table className="power-4-level">
            <thead>
              <tr>
                <th>等级</th>
                <th>权限</th>
              </tr>
            </thead>
            <tbody>
              <tr className="on">
                <td>
                  <h3><i className="icon icon-vip-1"></i></h3>
                  <p>0-599 积分</p>
                </td>
                <td>
                  <p>好友上限: 100 人</p>
                  <p>通讯录上限: 10 个</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h3><i className="icon icon-vip-2"></i></h3>
                  <p>600-5999 积分</p>
                </td>
                <td>
                  <p>好友上限: 200 人</p>
                  <p>通讯录上限: 20 个</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h3><i className="icon icon-vip-3"></i></h3>
                  <p>6000+ 积分</p>
                </td>
                <td>
                  <p>好友上限: 1000 人</p>
                  <p>通讯录上限: 800 个</p>
                </td>
              </tr>
            </tbody>
          </table>
          <h2 className="subtitle">最近积分记录</h2>
          <table className="score-history">
            <thead>
              <tr>
                <th>时间</th>
                <th>动作</th>
                <th>积分</th>
              </tr>
            </thead>
            <tbody>
              {this.renderHistoryScoreList()}
            </tbody>
          </table>
        </section>
        <Private />
        <Confirm
          ref="noneMainBizCard"
          confirm={this.handleCreateMainBizCard.bind(this)}
          rightBtnText={'新建名片'}
          leftBtnText={'关闭'}
        />
        <Share ref="share" wxReady={this.state.wxReady} />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<ScoreRulePage />, document.querySelector('.page'));
