import './index.less';

import React from 'react';
import ABMiniItem from '../mini-item/';

export default class ABList extends React.Component {
  constructor() {
    super();
  }

  renderItems() {
    let list = this.props.items;

    if (list && list.length) {
      return list.map((item, index) => {
        return (
          <ABMiniItem
            key={`ab-item_${index}`}
            {...item}
          />
        );
      });
    }

    return (
      <li className="empty">暂无</li>
    );
  }

  render() {
    return (
      <ul className="list ab-list">
        {this.renderItems()}
      </ul>
    );
  }
}
