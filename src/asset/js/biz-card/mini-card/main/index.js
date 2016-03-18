/**
 * 主名片 Item
 */
import '../../../../less/component/layout.less';
import '../../../../less/component/icon.less';
import './index.less';

import React from 'react';
import Swipeable from 'react-swipeable';
import querystring from 'querystring';

import MiniCard from '../';
import {SwipeEnhance} from '../../../enhance/swipe';
import {BizCardDetail} from '../../model/';
import Loading from '../../../loading/';
import Toast from '../../../toast/';
import Share from '../../../share/';
import AjaxHelper from '../../../ajax-helper/';

@SwipeEnhance
export default class MainMiniCard extends React.Component {
  maxLeft = 120;

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.maxLeft(this.maxLeft);
  }

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);
  }

  handleShare() {
    let user = this.props;

    if (!user.wxReady) {
      this.refs.toast.warn('等待微信验证...');

      return;
    }

    this.ajaxHelper.one(BizCardDetail, res => {
      let card = res.card;

      let qs = querystring.stringify({
        cid: user.cid,
        uid: user.uid
      });
      let url = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `/biz-card-detail.html?${qs}`);

      this.refs.share.toAll({
        title: card.share_title || `${user.nikename}的名片`,
        desc: card.share_desc || user.desc,
        link: url,
        imgUrl: user.photo
      });
      this.refs.share.show();
    }, user.cid);
  }


  render() {
    let props = this.props;

    return (
      <div className="item">
        <Swipeable
          onSwipingLeft={props.swipedLeft.bind(this)}
          onSwipingRight={props.swipedRight.bind(this)}
          delta={3}>
          <div
            className="row cnt"
            style={{
              transform: `translate3d(${props.left}px, 0px, 0px)`,
              WebkitTransform: `translate3d(${props.left}px, 0px, 0px)`,
              transition: `transform 200ms ease`,
              WebkitTransition: `-webkit-transform 200ms ease`
            }}
          >
            <div className="biz-card">
              <MiniCard {...props} />
            </div>
          </div>
        </Swipeable>
        <ul className="actions row">
          <li className="share-btn" onClick={this.handleShare.bind(this)}>分享</li>
          <li className="manage"><a href="./biz-card-manage.html">管理</a></li>
        </ul>
        <Loading ref="loading" />
        <Toast ref="toast" />
        <Share ref="share" wxReady={this.props.wxReady} />
      </div>
    );
  }
}
