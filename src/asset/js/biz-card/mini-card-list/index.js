import './index.less';

import React from 'react';
import ManageOtherMiniCard from '../mini-card/manage-other/';

export default class MiniCardList extends React.Component {
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
          {...item}
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
