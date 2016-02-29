import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

export default class ABMemeber extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <a className="cell" href="#">
        <div className="cell-hd">
          <img src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/u-Phh6E2aQ7r0xoO6ygDXw==/6598157183716526804.jpg_188x188x1.jpg" />
        </div>
        <div className="cell-bd">
          <h3>李四 (车主)</h3>
          <p>车型，载重，车长</p>
        </div>
        <div className="cell-ft"></div>
      </a>
    );
  }
}
