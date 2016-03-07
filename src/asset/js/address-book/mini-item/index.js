import './index.less';

import React from 'react';

export default class ABMiniItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    let props = this.props;

    return (
      <li>
        <a href={`./address-book-detail.html?id=${props.id}`}>
          <img className="cover" src={props.photo} />
          <div className="ab-profile">
            <h3>{props.name}</h3>
            <div>
              <span className="creator">由 <b>{props.group_holder}</b> 创建</span>
              <span className="people-num">人数: {props.cards_count}</span>
            </div>
          </div>
        </a>
      </li>
    );
  }
}
