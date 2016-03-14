import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/cell.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import querystring from 'querystring';
import Promise from 'promise';
import debounce from 'lodash/function/debounce';

import SubHeader from '../../sub-header/';
import ABMember from '../../biz-card/mini-card/';
import AjaxError from '../../ajax-err/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import Log from '../../log/';

export default class MemberSearchPage extends React.Component {
  state = {
    memberList: [],
    qs: querystring.parse(location.search.substring(1))
  };

  constructor() {
    super();
  }

  componentDidMount() {
    AjaxError.init(this.refs.toast);
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
    new Promise((resolve, reject) => {
      $.ajax({
        url: '/pim/query_addlist_cards',
        type: 'GET',
        cache: false,
        data: {
          aid: this.state.qs.aid,
          keyword: this.state.keyword
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.setState({
          memberList: res.addlist_cards
        });

        return;
      }

      this.refs.toast.warn(res.msg);
    }).catch((err) => {
      if (err && err instanceof Error) {
        Log.error(err);

        this.refs.toast.warn(`加载数据出错,${err.message}`);
      }
    });
  }

  renderList() {
    let memberList = this.state.memberList;

    if (memberList && memberList.length) {
      return memberList.map((member, index) => {
        return (
          <ABMember key={`member-item_${index}`} {...member} />
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
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}


ReactDOM.render(<MemberSearchPage />, document.querySelector('.page'));
