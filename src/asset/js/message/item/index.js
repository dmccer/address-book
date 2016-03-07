import './index.less';

import React from 'react';

export default class MsgItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <a className="cell" href="#">
        <div className="weui_cell_hd">
          <img style={{
            width: '50px',
            height: '50px',
            display: 'block',
            marginRight: '8px'
          }} src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/S1Z9d539QDBx__a7M8n1xQ==/6630599373748343075.jpg_188x188x1.jpg" />
        </div>
        <div className="cell-bd cell_primary">
          <h3>张三申请和您交换名片</h3>
          <p>2015-12-30 12:11:50</p>
        </div>
        <div className="cell-ft"></div>
      </a>
    );
  }
}
