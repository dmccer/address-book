/**
 * 他人名片管理 - 我的名片页面->名片分组->他人名片
 */
import './index.less';

import React from 'react';
import ManageOtherMiniCard from '../mini-card/manage-other/';

export default class ManageOtherMiniCardList extends React.Component {
  defaultProps = {
    items: []
  };

  constructor() {
    super();
  }

  render() {
    let list = this.props.items.map((item, index) => {
      return (
        <ManageOtherMiniCard
          key={`min-card_${index}`}
          card={item}
          onDelBizCard={this.props.onDelBizCard.bind(this, item)}
        />
      );
    });

    return (
      <div className="mini-card-list">
        {list}
      </div>
    );
  }
}
