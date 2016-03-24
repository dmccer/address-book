/**
 * 分组管理页面
 */
import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/layout.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise/lib/es6-extensions';
import find from 'lodash/collection/find';

import AjaxHelper from '../../ajax-helper/';
import ModalHeader from '../../modal-header/';
import BizCardEditableGroupItem from '../group/editable/';
import Prompt from '../../prompt/';
import Private from '../../private/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import {
  BizCardGroups,
  CreateBizCardGroup,
  RenameBizCardGroup,
  DelBizCardGroup
} from '../model/';

export default class BizCardGroupManagePage extends React.Component {
  state = {
    groups: []
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);
    this.getGroups();
  }

  /**
   * getGroups 获取我的名片分组
   * @return {Promise}
   */
  getGroups() {
    this.ajaxHelper.one(BizCardGroups, res => {
      this.setState({
        groups: res.pimCardGroups
      });
    });
  }

  handleClickAdd() {
    this.refs.editModal.show({
      title: '添加分组',
      placeholder: '请输入新分组名称'
    });
  }

  handleAddGroup(val) {
    if (val === '') {
      return;
    }

    this.ajaxHelper.one(CreateBizCardGroup, res => {
      this.refs.toast.success('添加分组成功');

      this.getGroups();
    }, val);
  }

  /**
   * handleEditGroupName 修改分组名称
   * @param  {[type]} group 修改的分组
   * @param  {[type]} name  新分组名
   * @return
   */
  handleEditGroupName(group, name) {
    if (name === '') {
      return;
    }

    let exist = find(this.state.groups, (group) => {
      return group.groupname === name;
    });

    if (exist) {
      this.refs.toast.warn('分组名称不能重复');

      return;
    }

    this.ajaxHelper.one(RenameBizCardGroup, res => {
      this.refs.toast.success('修改分组名成功');

      this.getGroups();
    }, group.id, name);
  }

  /**
   * handleRemoveGroup 删除分组
   * @param  {[type]} group 待删除的分组
   * @return
   */
  handleRemoveGroup(group) {
    this.ajaxHelper.one(DelBizCardGroup, res => {
      this.refs.toast.success(`删除分组${group.groupname}成功`);
      this.getGroups();
    }, group.id);
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
        <ModalHeader title="管理分组" />
        <div className="group-manage">
          <a
            href="javascript:void(0)"
            className="btn block lightBlue add-btn"
            onClick={this.handleClickAdd.bind(this)}
          >
            <i className="icon s15 icon-round-plus"></i>
            <span>新建分组</span>
          </a>
          <div className="list">
            {this.renderGroupList()}
          </div>
        </div>
        <Prompt
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
