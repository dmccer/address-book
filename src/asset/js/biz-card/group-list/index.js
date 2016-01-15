import './index.less';

import React from 'react';
import BizCardGroup from '../group/';

export default class BizCardGroupList extends React.Component {
  constructor() {
    super();
  }

  render() {
    let list = this.props.items.map((item, index) => {
      return (
        <BizCardGroup
          {...item}
          key={`biz-card-group_${index}`}
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
