import './index.less';

import React from 'react';
import Promise from 'promise';

import Confirm from '../../../confirm/';
import Loading from '../../../loading/';
import Toast from '../../../toast/';

export default class BizCardEditableGroupItem extends React.Component {
  constructor() {
    super();
  }

  handleDel() {
    this.refs.confirm.show(`是否删除群组${this.props.name}`);
  }

  handleConfirmed() {
    this.refs.loading.show('删除中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: `/api/biz_card/group/${this.props.id}`,
        type: 'POST',
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.code === 0) {
        this.refs.toast.success(`删除群组${this.props.name}成功`);

        return;
      }

      this.refs.toast.warn(res.errMsg);
    }).catch((xhr) => {
      this.refs.toast.error(`删除群组${this.props.name}失败`);
    }).done(() => {
      this.refs.loading.close();
    });
  }

  handleEdit() {
    
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
            <h2>{props.name}</h2>
          </div>
          <div className="edit" onClick={this.handleEdit.bind(this)}>
            <i className="icon icon-edit s16"></i>
          </div>
        </div>
        <Confirm
          ref="confirm"
          confirm={this.handleConfirmed.bind(this)}
        />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </div>
    );
  }
}
