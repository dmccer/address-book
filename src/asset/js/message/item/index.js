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
      <a className="cell" href={props.url}>
        <div className="weui_cell_hd avatar" style={{
          backgroundImage: `url(${props.photo})`
        }}></div>
        <div className="cell-bd cell_primary">
          <h3>{props.msg}</h3>
          <p>{props.createtime}</p>
        </div>
        <div className="cell-ft"></div>
      </a>
    );
  }
}
