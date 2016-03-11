/**
 * 下拉列表
 *
 * @author Kane xiaoyunhua@ttyhuo.cn
 */
import '../../less/component/icon.less';
import './index.less';

import React from 'react';
import cx from 'classnames';

export default class DropList extends React.Component {
  static defaultProps = {
    onClose: () => {},
    onSelect: () => {},
    onCancel: () => {}
  };

  state = {};

  constructor() {
    super();
  }

  show(top: Number, selected: Object) {
    this.setState({
      top: top,
      on: true,
      selected: selected
    });
  }

  close() {
    this.setState({
      on: false
    });

    this.props.onClose();
  }

  cancel() {
    this.close();

    this.props.onCancel();
  }

  handleSelect(item: Object) {
    if (item === this.state.selected) {
      return;
    }

    this.setState({
      selected: item
    });

    this.props.onSelect(item);
    this.close();
  }

  render() {
    let top = this.state.top;
    let selectedDropItem = this.state.selected || {};
    let cxs = cx('droplist', this.state.on ? 'on' : '');

    let list = this.props.items.map((item) => {
      let selected = selectedDropItem.id === item.id ? <i className="icon icon-tick"></i> : null;

      return (
        <div
          className="droplist-item"
          key={`droplist-item_${item.id}`}
          onClick={this.handleSelect.bind(this, item)}>
          <span>{item.name}</span>
          {selected}
        </div>
      );
    });

    return (
      <section
        className={cxs}
        style={{
          top: `${top}px`
        }}
      >
        {list}
      </section>
    );
  }
}
