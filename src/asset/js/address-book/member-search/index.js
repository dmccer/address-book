import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/cell.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import SubHeader from '../../sub-header/';
import ABMember from '../member/';

export default class MemberSearchPage extends React.Component {
  state = {
    memberList: [
      {}, {}, {}, {}
    ]
  };

  constructor() {
    super();
  }

  render() {
    let list = this.state.memberList.map((member, index) => {
      return (
        <ABMember key={`member-item_${index}`} {...member} />
      );
    });

    return (
      <section className="member-search-page">
        <SubHeader title="成员搜索" />
        <div className="member-search">
          <form className="form">
            <div className="field">
              <input
                type="text"
                className="control"
                placeholder="这里输入搜索关键字" />
            </div>
          </form>
          <div className="ab-member-list cells cells-access">
            {list}
          </div>
        </div>
      </section>
    );
  }
}


ReactDOM.render(<MemberSearchPage />, document.querySelector('.page'));
