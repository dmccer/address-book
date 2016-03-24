import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/cell.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import querystring from 'querystring';
import Promise from 'promise/lib/es6-extensions';
import debounce from 'lodash/function/debounce';

import AjaxHelper from '../../ajax-helper/';
import {SearchABMember} from '../model/';
import SubHeader from '../../sub-header/';
import ABMember from '../../biz-card/mini-card/';
import Toast from '../../toast/';

export default class MemberSearchPage extends React.Component {
  state = {
    memberList: [],
    qs: querystring.parse(location.search.substring(1))
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper();

    this.query();
  }

  /**
   * handleKeywordChange 处理用户输入关键字
   * @param  {ChangeEvent} e
   * @return
   */
  handleKeywordChange(e) {
    let keyword = $.trim(e.target.value);
    let _last = this.state.keyword;

    if (keyword === _last) {
      return;
    }

    this.setState({
      keyword: keyword
    }, () => {
      this.query();
    });
  }

  query() {
    this.ajaxHelper.one(SearchABMember, res => {
      this.setState({
        memberList: res.addlist_cards
      });
    }, this.state.qs.aid, this.state.keyword);
  }

  handleToggleActiveMember(member: Object, e: Object) {
    if (member.auth === 1) {
      e.preventDefault();
      e.stopPropagation();

      this.refs.toast.warn('不是您的名片好友,无权查看');
      return;
    }
  }

  renderList() {
    let memberList = this.state.memberList;

    if (memberList && memberList.length) {
      return memberList.map((member, index) => {
        return (
          <ABMember
            key={`member-item_${index}`}
            onView={this.handleToggleActiveMember.bind(this, member)}
            {...member} />
        );
      });
    } else {
      return (
        <div className="empty">没有找到</div>
      );
    }
  }

  render() {
    return (
      <section className="member-search-page">
        <SubHeader title="成员搜索" />
        <div className="member-search">
          <form className="form">
            <div className="field">
              <input
                type="text"
                className="control"
                placeholder="这里输入搜索关键字"
                value={this.state.keyword}
                onChange={this.handleKeywordChange.bind(this)} />
            </div>
          </form>
          <div className="ab-member-list cells cells-access">
            {this.renderList()}
          </div>
        </div>
        <Toast ref="toast" />
      </section>
    );
  }
}


ReactDOM.render(<MemberSearchPage />, document.querySelector('.page'));
