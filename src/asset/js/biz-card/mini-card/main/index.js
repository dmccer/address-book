/**
 * 主名片 Item
 */
import '../../../../less/component/layout.less';
import '../../../../less/component/icon.less';
import './index.less';

import React from 'react';
import Swipeable from 'react-swipeable';
import MiniCard from '../';
import {SwipeEnhance} from '../../../enhance/swipe';

@SwipeEnhance
export default class MainMiniCard extends React.Component {
  maxLeft = 120;

  // state = {
  //   left: 0
  // };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.maxLeft(this.maxLeft);
  }

  handleSwiping(e, deltax) {
    console.log(deltax);
  }

  render() {
    let props = this.props;

    return (
      <div className="item">
        <Swipeable
          onSwipedLeft={props.swipedLeft}
          onSwipedRight={props.swipedRight}
          onSwipingLeft={this.handleSwiping.bind(this)}
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
          <li className="share">分享</li>
          <li className="manage"><a href="./biz-card-manage.html">管理</a></li>
        </ul>
      </div>
    );
  }
}
