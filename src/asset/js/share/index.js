import '../../less/component/icon.less';
import '../../less/component/layout.less';
import './index.less';

import React from 'react';
import cx from 'classnames';

import Mask from '../mask/';

export default class Share extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  show() {
    this.setState({
      on: true
    });
  }

  shareToWeiXin() {}

  shareToPengYouQuan() {}

  shareToQQ() {}

  shareToQzone() {}

  render() {
    let shareClassNames = cx('share', this.state.on ? 'on' : '');

    return this.state.on ? (
      <div className={shareClassNames}>
        <Mask type="black" />
        <ul className="share-list grid">
          <li onClick={this.shareToWeiXin.bind(this)}>
            <i className="icon icon-weixin"></i>
            <span>微信</span>
          </li>
          <li onClick={this.shareToPengYouQuan.bind(this)}>
            <i className="icon icon-pengyouquan"></i>
            <span>朋友圈</span>
          </li>
          <li onClick={this.shareToQQ.bind(this)}>
            <i className="icon icon-qq"></i>
            <span>QQ</span>
          </li>
          <li onClick={this.shareToQzone.bind(this)}>
            <i className="icon icon-qzone"></i>
            <span>QQ空间</span>
          </li>
        </ul>
      </div>
    ) : null;
  }
}
