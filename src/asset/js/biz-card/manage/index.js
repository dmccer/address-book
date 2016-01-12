import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/layout.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import ModalHeader from '../../modal-header/';
import EditableCard from './editable-card/';
import Private from '../../private/';

export default class BizCardManagePage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="biz-card-manage-page">
        <ModalHeader title="名片管理" />
        <div className="biz-card-manage">
          <a href="#" className="btn block lightBlue add-btn">
            <i className="icon s15 icon-round-plus"></i>
            <span>新建名片</span>
          </a>
          <div className="list bc-list">
            <EditableCard />
            <EditableCard />
            <EditableCard />
            <EditableCard />
          </div>
        </div>
        <Private />
      </section>
    );
  }
}

ReactDOM.render(<BizCardManagePage />, document.querySelector('.page'));
