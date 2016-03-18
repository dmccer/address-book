/**
 * 自己名片管理 Item
 */
import '../../../../less/component/layout.less';
import '../../../../less/component/icon.less';
import './index.less';

import React from 'react';
import Swipeable from 'react-swipeable';
import querystring from 'querystring';

import {SwipeEnhance} from '../../../enhance/swipe';
import MiniCard from '../';

@SwipeEnhance
export default class ManageMyMiniCard extends React.Component {
  constructor(props) {
    super(props);
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
              transition: `transform 100ms ease`,
              WebkitTransition: `-webkit-transform 100ms ease`
            }}
            onTouchStart={props.touchstart}
            onTouchMove={props.touchmove}
            onTouchEnd={props.touchend}
          >
            <div className="action" onClick={props.onDel}>
              <div className="del-box">
                <i className="icon s16 icon-del"></i>
              </div>
            </div>
            <div className="biz-card">
              <div className="add-box" onClick={props.onSetMainBizCard}>
                <i className="icon icon-add s16"></i>
              </div>
              <MiniCard {...props} />
            </div>
          </div>
        </Swipeable>
        <ul className="actions row">
          <li className="share-btn" onClick={props.onShare}>分享</li>
          <li className="set-main-card" onClick={props.onSetMainBizCard}>设为默认</li>
        </ul>
      </div>
    );
  }
}
