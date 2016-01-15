import React from 'react';

export var DrawerEnhance = ComposedComponent => class extends React.Component {
  static displayName = 'ComponentEnhancedWithDrawerEventHandler';

  state = {
    maxLeft: 150,
    touches: {
      startX: 0,
      startY: 0,
      curX: 0,
      curY: 0,
      left: 0
    }
  };

  constructor(props) {
    super(props);
  }

  touchstart(e) {
    if (this.state.dragging) {
      return;
    }

    let px = (e.touches !== undefined) ? e.touches[0].pageX : e.clientX;
    let py = (e.touches !== undefined) ? e.touches[0].pageY : e.clientY;

    let left = this.state.left;
    let touches = {
      startX: px,
      startY: py,
      curX: px,
      curY: py,
      left: left || 0
    };

    this.setState({
      dragging: true,
      touches: touches
    });
  }

  touchmove(e) {
    if (!this.state.dragging) {
      return;
    }

    let touches = this.state.touches;
    let curLeft = touches.left || 0;

    let curX = (e.touches) ? e.touches[0].pageX : e.clientX;
    let curY = (e.touches) ? e.touches[0].pageY : e.clientY;
    let direction = curX > touches.startX ? 1 : -1;

    // 初始状态右滑静止
    if (curLeft === 0 && direction === 1) {
      return;
    }

    // 当前状态已经是最大值，则不能继续滑动
    if (curLeft === this.state.maxLeft * direction) {
      return;
    }

    touches.curX = curX;
    touches.curY = curY;

    touches.direction = direction;
    touches.swipeLength = Math.round(Math.sqrt(Math.pow(touches.curX - touches.startX, 2)));

    // 滑动距离超过最大值, 滑动距离采用最大值
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

    this.setState({
      touches: {},
      dragging: false
    });

    if (touches.swipeLength < this.state.maxLeft / 2 ||
      touches.left === 0 && !touches.direction ||
      touches.direction > 0) {
      this.setState({
        left: 0
      });

      return;
    }

    if (touches.swipeLength >= this.state.maxLeft / 2) {
      this.setState({
        left: -this.state.maxLeft
      });

      return;
    }
  }

  render() {
    return <ComposedComponent
      {...this.props}
      {...this.state}
      touchstart={this.touchstart.bind(this)}
      touchmove={this.touchmove.bind(this)}
      touchend={this.touchend.bind(this)}  />
  }
}
