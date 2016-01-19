/**
 * 他人名片管理 Item
 */
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

    this.refs.confirm.show({
      msg: `是否移除${this.props.card.name}`
    });
  }

  handleConfirmDel() {
    // TODO
    // 1. ajax del card
    // 2. tip for result
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
          <li className="personal-letter">私信</li>
          <li className="del" onClick={this.handleDelBizCard.bind(this)}>删除</li>
        </ul>
        <Confirm ref="confirm" confirm={this.handleConfirmDel.bind(this)} />
      </div>
    );
  }
}
