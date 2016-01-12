import '../../../../less/component/layout.less';
import '../../../../less/component/icon.less';
import './index.less';

import React from 'react';
import MiniCard from '../../mini-card/';

export default class EditableCard extends React.Component {
  constructor() {
    super();

    this.state = {
      maxLeft: 150,
      touches: {
        startX: 0,
        startY: 0,
        curX: 0,
        curY: 0,
        left: 0
      }
    }
  }

  touchstart(e) {
    if (this.state.dragging) {
      return;
    }

    let px = (e.touches !== undefined) ? e.touches[0].pageX : e.clientX;
    let py = (e.touches !== undefined) ? e.touches[0].pageY : e.clientY;

    this.setState({
      dragging: true,
      touches: {
        startX: px,
        startY: py,
        curX: px,
        curY: py,
        left: 0
      }
    });
  }

  touchmove(e) {
    if (!this.state.dragging) {
      return;
    }

    let touches = this.state.touches;
    let curLeft = touches.left || 0;

    touches.curX = (e.touches) ? e.touches[0].pageX : e.clientX;
    touches.curY = (e.touches) ? e.touches[0].pageY : e.clientY;
    let direction = touches.curX > touches.startX ? 1 : -1;

    if (curLeft === 0 && direction === 1) {
      return;
    }

    touches.direction = direction;

    touches.swipeLength = Math.round(Math.sqrt(Math.pow(touches.curX - touches.startX, 2)));
    if (touches.swipeLength >= this.state.maxLeft) {
      touches.swipeLength = this.state.maxLeft;
    }

    let nextLeft = curLeft + touches.direction * touches.swipeLength;

    this.setState({
      touches: touches,
      left: nextLeft
    });
  }

  touchend(e) {
    if (!this.state.dragging) {
      return;
    }

    let touches = this.state.touches;

    if (touches.left === 0 && !touches.direction || touches.swipeLength < this.state.maxLeft / 2) {
      this.setState({
        dragging: false,
        touches: {},
        left: 0
      });

      return;
    }

    if (touches.swipeLength >= this.state.maxLeft / 2) {
      touches.curX = touches.startX - this.state.maxLeft;

      this.setState({
        dragging: true,
        touches: touches,
        left: -this.state.maxLeft
      });

      return;
    }
  }

  render() {
    return (
      <div className="item">
        <div
          className="row cnt"
          style={{
            left: this.state.left + 'px'
          }}
          onTouchStart={this.touchstart.bind(this)}
          onTouchMove={this.touchmove.bind(this)}
          onTouchEnd={this.touchend.bind(this)}
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
