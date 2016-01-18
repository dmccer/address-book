import './index.less';

import React from 'react';

export default class BizCardEditableGroupItem extends React.Component {
  constructor() {
    super();
  }

  handleDel() {}

  handleEdit() {}

  render() {
    let props = this.props;

    return (
      <div className="editable-group-item row">
        <div className="del" onClick={this.handleDel.bind(this)}>
          <i className="icon icon-del s16"></i>
        </div>
        <div className="group-item">
          <h2>{props.name}</h2>
        </div>
        <div className="edit" onClick={this.handleEdit.bind(this)}>
          <i className="icon icon-edit s16"></i>
        </div>
      </div>
    );
  }
}
