import './index.less';

import React from 'react';
import MiniCard from '../mini-card/';

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
        <div className="item" key={`min-card_${index}`}>
          <MiniCard {...item} />
        </div>
      );
    });

    return (
      <div className="mini-card-list">
        {list}
      </div>
    );
  }
}
