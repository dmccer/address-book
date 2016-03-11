import React from 'react';

export var SwipeEnhance = ComposedComponent => class extends React.Component {
  static displayName = 'ComponentEnhancedWithSwipeEventHandler';

  state = {
    left: 0,
    maxLeft: 150
  };

  constructor(props) {
    super(props);
  }

  maxLeft(max) {
    this.setState({
      maxLeft: max
    });
  }

  handleSwipedLeft() {
    this.setState({
      left: -this.state.maxLeft
    });
  }

  handleSwipedRight() {
    if (this.state.left === 0) {
      return;
    }

    this.setState({
      left: 0
    });
  }

  render() {
    return <ComposedComponent
      {...this.props}
      {...this.state}
      swipedLeft={this.handleSwipedLeft.bind(this)}
      swipedRight={this.handleSwipedRight.bind(this)}
      maxLeft={this.maxLeft.bind(this)}  />
  }
}
