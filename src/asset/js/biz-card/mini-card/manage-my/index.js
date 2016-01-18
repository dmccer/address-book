/**
 * 自己名片管理 Item
 */
import '../../../../less/component/layout.less';
import '../../../../less/component/icon.less';
import './index.less';

import React from 'react';
import MiniCard from '../';
import {DrawerEnhance} from '../../../enhance/drawer';

@DrawerEnhance
export default class ManageMyMiniCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="item">
        <div
          className="row cnt"
          style={{
            left: this.props.left + 'px'
          }}
          onTouchStart={this.props.touchstart}
          onTouchMove={this.props.touchmove}
          onTouchEnd={this.props.touchend}
        >
          <div className="action">
            <i className="icon s16 icon-del"></i>
          </div>
          <div className="biz-card">
            <MiniCard />
          </div>
        </div>
        <ul className="actions row">
          <li className="share">分享</li>
          <li className="set-main-card">设为主名片</li>
        </ul>
      </div>
    );
  }
}
