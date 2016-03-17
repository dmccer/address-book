import './index.less';

import React from 'react';

import cx from 'classnames';
import ReactIScroll from 'react-iscroll';
import IScroll from 'iscroll/build/iscroll';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// 因为 iscroll 禁用了 click 事件，
// 若启用 iscroll click, 会对其他默认滚动列表，滚动时触发 click
// 启用 tap 事件
// injectTapEventPlugin();

export default class Selector extends React.Component {
  static defaultProps = {
    options: {
      mouseWheel: true,
      // click: true,
      scrollbars: true,
      fadeScrollbars: true,
      interactiveScrollbars: true,
      shrinkScrollbars: 'scale'
    },
    onSelect: () => {},
    onClose: () => {},
    onCancel: () => {}
  };

  state = {};

  constructor() {
    super();
  }

  show() {
    this.setState({
      on: true
    });
  }

  /**
   * 关闭
   */
  close() {
    this.setState({
      on: false
    });

    this.props.onClose();
  }

  /**
   * 点击空白区域取消选择
   */
  cancel(e) {
    if (e.currentTarget !== e.target) {
      return;
    }

    this.close();

    this.props.onCancel();
  }

  handleSelected(item: Object) {
    this.props.onSelect(item);

    this.close();
  }

  /**
   * 展示项
   */
  renderItems() {
    let items = this.props.items;

    if (items && items.length) {
      return items.map((item, index) => {
        return (
          <li
            key={`selector-item_${index}`}
            onTouchTap={this.handleSelected.bind(this, item)}
            className={item.selected ? 'selected' : ''}>{item.name}</li>
        );
      });
    }
  }

  render() {
    let cxs = cx('selector', this.state.on ? 'on' : '');

    return (
      <div
        className={cxs}
        onClick={this.cancel.bind(this)}>
        <div className="list">
          <ReactIScroll
            iScroll={IScroll}
            options={this.props.options}>
            <ul>
              {this.renderItems()}
            </ul>
          </ReactIScroll>
        </div>
      </div>
    );
  }
}
