import '../../../../less/component/icon.less'
import './index.less';

import React from 'react';

export default class PrivateMsgUserItem extends React.Component {
  constructor() {
    super();
  }

  renderCount() {
    let count = this.props.unread_count;

    if (count) {
      return <i className="icon s22 icon-badge">{count}</i>;
    }
  }

  render() {
    let props = this.props;

    return (
      <a className="cell" href={`./private-msg-send.html?fuid=${props.friendly_uid}`}>
        <div className="weui_cell_hd">
          <img style={{
            width: '50px',
            height: '50px',
            display: 'block',
            marginRight: '8px'
          }} src={props.photo} />
        </div>
        <div className="cell-bd cell_primary">
          <h3>{props.nikename}</h3>
          <p>{props.last_msg}</p>
        </div>
        <div className="cell-ft">
          {this.renderCount()}
        </div>
      </a>
    );
  }
}
