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
    let props = this.props;

    return (
      <div className="item">
        <div
          className="row cnt"
          style={{
            transform: `translate3d(${props.left}px, 0px, 0px)`,
            WebkitTransform: `translate3d(${props.left}px, 0px, 0px)`,
            transition: `transform 100ms ease`,
            WebkitTransition: `-webkit-transform 100ms ease`
          }}
          onTouchStart={props.touchstart}
          onTouchMove={props.touchmove}
          onTouchEnd={props.touchend}
        >
          <div className="action" onClick={props.onDel}>
            <i className="icon s16 icon-del"></i>
          </div>
          <div className="biz-card">
            <MiniCard {...props} />
          </div>
        </div>
        <ul className="actions row">
          <li className="share">分享</li>
          <li className="set-main-card" onClick={props.onSetMainBizCard}>设为主名片</li>
        </ul>
      </div>
    );
  }
}
