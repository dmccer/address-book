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

import ModalHeader from '../../modal-header/';
import BizCardEditableGroupItem from '../group/editable/';
import GroupItemEditConfirm from '../group/edit-modal/';
import Private from '../../private/';
import Loading from '../../loading/';

export default class BizCardGroupManagePage extends React.Component {
  state = {
    groups: []
  };

  constructor() {
    super();
  }

  componentWillMount() {
    this.setState({
      groups: [
        {
          name: '默认分组',
          total: 10,
          id: 1
        }, {
          name: '亲情市场',
          total: 3,
          id: 2
        }, {
          name: '道义市场',
          total: 5,
          id: 3
        }, {
          name: '黑名单',
          total: 2,
          id: 4
        }
      ]
    });
  }

  renderGroupList() {
    if (this.state.groups.length) {
      return this.state.groups.map((group) => {
        return <BizCardEditableGroupItem key={`group-item_${group.id}`} {...group} />
      });
    }
  }

  handleAdd() {
    this.refs.editModal.show({
      title: '添加群组',
      placeholder: '请输入新群组名称'
    });
  }

  handleAddConfirmed() {}

  render() {
    return (
      <section className="group-manage-page">
        <ModalHeader title="管理群组" />
        <div className="group-manage">
          <a
            href="javascript:void(0)"
            className="btn block lightBlue add-btn"
            onClick={this.handleAdd.bind(this)}
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
          confirm={this.handleAddConfirmed.bind(this)}
        />
        <Private />
      </section>
    );
  }
}

ReactDOM.render(<BizCardGroupManagePage />, document.querySelector('.page'));
