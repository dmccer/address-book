/**
 * 主名片 Item
 */
import '../../../../less/component/layout.less';
import '../../../../less/component/icon.less';
import './index.less';

import React from 'react';
import MiniCard from '../';
import {DrawerEnhance} from '../../../enhance/drawer';

@DrawerEnhance
export default class MainMiniCard extends React.Component {
  maxLeft = 120;

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.maxLeft(this.maxLeft);
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
          <div className="biz-card">
            <MiniCard {...props} />
          </div>
        </div>
        <ul className="actions row">
          <li className="share">分享</li>
          <li className="manage"><a href="./biz-card-manage.html">管理</a></li>
        </ul>
      </div>
    );
  }
}
