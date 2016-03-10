import './index.less';

import React from 'react';
import BizCardGroupItem from '../group/';

export default class BizCardGroupList extends React.Component {
  constructor() {
    super();
  }

  render() {
    let list = this.props.items.map((item, index) => {
      return (
        <BizCardGroupItem
          {...item}
          key={`biz-card-group_${index}`}
          onDelBizCard={this.props.onDelBizCard}
        />
      );
    });

    return (
      <div className="list ab-group-list">
      {list}
      </div>
    );
  }
}
