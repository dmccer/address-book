/**
 * 群组管理页面
 */
import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/layout.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';

import ModalHeader from '../../modal-header/';
import BizCardEditableGroupItem from '../group/editable/';
import GroupItemEditConfirm from '../group/edit-modal/';
import Private from '../../private/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import Log from '../../log/';

export default class BizCardGroupManagePage extends React.Component {
  state = {
    groups: []
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.getGroups();
  }

  /**
   * getGroups 获取我的名片分组
   * @return {Promise}
   */
  getGroups() {
    this.refs.loading.show('加载中...');

    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/query_my_card_groups',
        type: 'GET',
        cache: false,
        data: {
          no_def: 1
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.setState({
          groups: res.pimCardGroups
        });

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        this.refs.toast.warn(`加载名片分组出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  handleClickAdd() {
    this.refs.editModal.show({
      title: '添加群组',
      placeholder: '请输入新群组名称'
    });
  }

  handleAddGroup(val) {
    if (val === '') {
      return;
    }

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/create_card_group',
        type: 'POST',
        data: {
          groupname: val
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.toast.success('添加群组成功');

        this.getGroups();

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        this.refs.toast.error(`添加群组出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  /**
   * handleEditGroupName 修改群组名称
   * @param  {[type]} group 修改的群组
   * @param  {[type]} name  新群组名
   * @return
   */
  handleEditGroupName(group, name) {
    if (name === '') {
      return;
    }

    this.refs.loading.show('请求中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/rename_card_group',
        type: 'POST',
        data: {
          gid: group.id,
          groupname: name
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.toast.success('修改群组名成功');

        this.getGroups();

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        this.refs.toast.error(`修改群组名出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  /**
   * handleRemoveGroup 删除群组
   * @param  {[type]} group 待删除的群组
   * @return
   */
  handleRemoveGroup(group) {
    this.refs.loading.show('删除中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/del_my_card_group',
        type: 'POST',
        data: {
          gid: group.id
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.toast.success(`删除群组${group.groupname}成功`);

        this.getGroups();

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        this.refs.toast.error(`删除群组${group.groupname}出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
  }

  renderGroupList() {
    if (this.state.groups.length) {
      return this.state.groups.map((group) => {
        return (
          <BizCardEditableGroupItem
            key={`group-item_${group.id}`}
            onEdit={this.handleEditGroupName.bind(this, group)}
            onRemove={this.handleRemoveGroup.bind(this, group)}
            {...group} />
        );
      });
    }
  }

  render() {
    return (
      <section className="group-manage-page">
        <ModalHeader title="管理群组" />
        <div className="group-manage">
          <a
            href="javascript:void(0)"
            className="btn block lightBlue add-btn"
            onClick={this.handleClickAdd.bind(this)}
          >
            <i className="icon s15 icon-round-plus"></i>
            <span>新建群组</span>
          </a>
          <div className="list">
            {this.renderGroupList()}
          </div>
        </div>
        <GroupItemEditConfirm
          ref="editModal"
          confirm={this.handleAddGroup.bind(this)}
        />
        <Private />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<BizCardGroupManagePage />, document.querySelector('.page'));
