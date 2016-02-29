/**
 * ABCreatePage 创建通讯录页面
 *
 * @author Kane xiaoyunhua@ttyhuo.cn
 */
import '../../../less/global/global.less';
import '../../../less/component/layout.less';
import '../../../less/component/form.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';

import SubHeader from '../../sub-header/';
import Loading from '../../loading/';
import Popover from '../../popover/';
import Private from '../../private/';

export default class ABCreatePage extends React.Component {
  state = {};

  constructor() {
    super();
  }

  render() {
    return (
      <section className="ab-create-page">
        <SubHeader title="新建通讯录" />
        <div className="ab-create">
          <form className="form">
            <div className="ab-name field">
              <input
                className="control"
                type="text"
                placeholder="这里输入通讯录名称" />
            </div>
            <div className="panel-field">
              <p>申请加入通讯录，需提供的名片必须信息:</p>
              <ul className="biz-card-fields">
                <li>
                  <span>公司</span>
                  <i className="icon icon-ok"></i>
                </li>
                <li>
                  <span>职位</span>
                </li>
                <li>
                  <span>通信地址</span>
                </li>
                <li>
                  <span>供应资源</span>
                </li>
                <li>
                  <span>车辆信息</span>
                </li>
              </ul>
            </div>
            <div className="panel-field">
              <p>描述说明:</p>
              <div className="field">
                <textarea
                  className="control"
                  rows="5"
                  placeholder="这里输入对通讯录的描述..."></textarea>
                <span className="char-count">0/90</span>
              </div>
            </div>
            <button className="btn block lightBlue submit">确定发起</button>
          </form>
        </div>
        <Private />
      </section>
    );
  }
}

ReactDOM.render(<ABCreatePage />, document.querySelector('.page'));
