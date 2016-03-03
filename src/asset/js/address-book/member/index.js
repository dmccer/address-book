import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

export default class ABMemeber extends React.Component {
  constructor() {
    super();
  }

  render() {
    let props = this.props;

    return (
      <a className="cell" href="#">
        <div className="cell-hd">
          <img src={props.photo} />
        </div>
        <div className="cell-bd">
          <h3>{props.nikename} ({props.ctype === 1 ? '车主' : '货主'})</h3>
          <p>{props.desc}</p>
        </div>
        <div className="cell-ft"></div>
      </a>
    );
  }
}
