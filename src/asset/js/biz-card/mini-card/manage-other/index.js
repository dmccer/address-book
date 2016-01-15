import '../../../../less/component/layout.less';
import '../../../../less/component/icon.less';
import './index.less';

import React from 'react';
import MiniCard from '../';
import {DrawerEnhance} from '../../../enhance/drawer';

@DrawerEnhance
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
          <li className="share">私信</li>
          <li className="set-main-card">删除</li>
        </ul>
      </div>
    );
  }
}
