/**
 * 申请审核列表页面
 *
 * @author Kane xiaoyunhua@ttyhuo.cn
 */

import '../../../less/global/global.less';
import '../../../less/component/cell.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import ABApplicatItem from './item/';
import SubHeader from '../../sub-header/';
import Private from '../../private/';

export default class ABApplicatListPage extends React.Component {
  state = {
    applicatList: [
      {}, {}, {}, {}, {}
    ]
  };

  constructor() {
    super();
  }

  render() {
    let list = this.state.applicatList.map((item, index) => {
      return (
        <ABApplicatItem key={`applicat-item_${index}`} {...item} />
      );
    })

    return (
      <section className="ab-applicat-list-page">
        <SubHeader title="申请审核列表" />
        <div className="ab-applicat-list cells cells-access">
          {list}
        </div>
        <Private />
      </section>
    );
  }
}

ReactDOM.render(<ABApplicatListPage />, document.querySelector('.page'));
