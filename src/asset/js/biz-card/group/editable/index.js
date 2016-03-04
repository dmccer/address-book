import './index.less';

import React from 'react';
import Promise from 'promise';

import Confirm from '../../../confirm/';
import GroupItemEditConfirm from '../edit-modal/';
import Loading from '../../../loading/';
import Toast from '../../../toast/';

export default class BizCardEditableGroupItem extends React.Component {
  constructor() {
    super();
  }

  handleDel() {
    this.refs.confirm.show({
      msg: `删除群组${this.props.groupname}`
    });
  }

  handleEdit() {
    this.refs.editModal.show({
      title: '编辑群组',
      placeholder: this.props.groupname
    });
  }

  render() {
    let props = this.props;

    return (
      <div className="editable-group-item">
        <div className="row">
          <div className="del" onClick={this.handleDel.bind(this)}>
            <i className="icon icon-del s16"></i>
          </div>
          <div className="group-item">
            <h2>{props.groupname}</h2>
          </div>
          <div className="edit" onClick={this.handleEdit.bind(this)}>
            <i className="icon icon-edit s16"></i>
          </div>
        </div>
        <Confirm
          ref="confirm"
          confirm={props.onRemove}
        />
        <GroupItemEditConfirm
          ref="editModal"
          confirm={props.onEdit}
        />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </div>
    );
  }
}
