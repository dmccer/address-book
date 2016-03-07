import './index.less';

import React from 'react';

export default class MsgItem extends React.Component {
  constructor() {
    super();
  }

  formatDateTime(d) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  }

  render() {
    let props = this.props;

    return (
      <a className="cell" href={`./biz-card-detail.html?uid=${props.uid}&cid=${props.cid}`}>
        <div className="weui_cell_hd">
          <img style={{
            width: '50px',
            height: '50px',
            display: 'block',
            marginRight: '8px'
          }} src={props.photo} />
        </div>
        <div className="cell-bd cell_primary">
          <h3>{props.msg}</h3>
          <p>{this.formatDateTime(new Date(props.createtime))}</p>
        </div>
        <div className="cell-ft"></div>
      </a>
    );
  }
}
