import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/layout.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import ModalHeader from '../../modal-header/';
import MiniCard from '../mini-card/';
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
            <div className="row">
              <div className="action">
                <i className="icon s16 icon-del"></i>
              </div>
              <div className="biz-card">
                <MiniCard />
              </div>
            </div>
            <div className="row">
              <div className="action">
                <i className="icon s16 icon-del"></i>
              </div>
              <div className="biz-card">
                <MiniCard />
              </div>
            </div>
            <div className="row">
              <div className="action">
                <i className="icon s16 icon-del"></i>
              </div>
              <div className="biz-card">
                <MiniCard />
              </div>
            </div>
          </div>
        </div>
        <Private />
      </section>
    );
  }
}

ReactDOM.render(<BizCardManagePage />, document.querySelector('.page'));
