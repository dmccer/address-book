import '../../../../less/component/layout.less';
import '../../../../less/component/icon.less';
import './index.less';

import React from 'react';
import MiniCard from '../';
import Confirm from '../../../confirm/';
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

  handleDelBizCard(e) {
    e.stopPropagation();
    e.preventDefault();

    this.refs.confirm.show(`是否移除${this.props.card.name}`);
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
            <MiniCard {...this.props.card} />
          </div>
        </div>
        <ul className="actions row">
          <li>私信</li>
          <li onClick={this.handleDelBizCard.bind(this)}>删除</li>
        </ul>
        <Confirm ref="confirm" />
      </div>
    );
  }
}
