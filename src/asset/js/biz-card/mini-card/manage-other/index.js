/**
 * 他人名片管理 Item
 */
import '../../../../less/component/layout.less';
import '../../../../less/component/icon.less';
import './index.less';

import React from 'react';
import MiniCard from '../';
import Swipeable from 'react-swipeable';
import {SwipeEnhance} from '../../../enhance/swipe';

@SwipeEnhance
export default class ManageOtherMiniCard extends React.Component {
  state = {
    maxLeft: 120
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.maxLeft(this.state.maxLeft);
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
            onTouchEnd={props.touchend}>
            <div className="biz-card">
              <MiniCard {...props.card} />
            </div>
          </div>
        </Swipeable>
        <ul className="actions row">
          <li className="personal-letter"><a href={`./private-msg-send.html?fuid=${props.card.uid}`}>私信</a></li>
          <li className="del" onClick={props.onDelBizCard}>删除</li>
        </ul>
      </div>
    );
  }
}
