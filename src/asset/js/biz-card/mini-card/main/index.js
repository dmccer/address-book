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
          <div className="biz-card">
            <MiniCard />
          </div>
        </div>
        <ul className="actions row">
          <li className="share">分享</li>
          <li className="manage">管理</li>
        </ul>
      </div>
    );
  }
}
