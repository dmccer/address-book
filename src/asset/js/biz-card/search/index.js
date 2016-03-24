/**
 * SearchBizCardPage 名片搜索页面
 *
 * @author Kane xiaoyunhua@ttyhuo.cn
 */
import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/layout.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise/lib/es6-extensions';
import debounce from 'lodash/function/debounce';

import AjaxHelper from '../../ajax-helper/';
import TinyHeader from '../../tiny-header/';
import MiniCardList from '../mini-card-list/';
import {SearchMyCardFriends} from '../model/';

export default class SearchBizCardPage extends React.Component {
  state = {
    bizCards: []
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper();
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

  /**
   * query 根据关键字搜索名片好友
   * @return
   */
  query() {
    this.ajaxHelper.one(SearchMyCardFriends, res => {
      this.setState({
        bizCards: res.cardFriends
      });
    }, this.state.keyword);
  }

  /**
   * handleCancelSearch 取消搜索
   * @return
   */
  handleCancelSearch() {
    history.back();
  }

  /**
   * renderEmpty 结果为空提示
   * @return {Element}
   */
  renderEmpty() {
    if (!this.state.bizCards || !this.state.bizCards.length) {
      return (
        <div className="empty">没有搜索到结果</div>
      );
    }
  }

  render() {
    return (
      <div className="search-biz-card-page">
        <TinyHeader title="搜索" />
        <section className="search-biz-card">
          <form className="form">
            <div className="search-bar row">
              <div className="field search">
                <i className="icon s14 icon-search"></i>
                <input
                  type="text"
                  className="control"
                  placeholder="关键字"
                  value={this.state.keyword}
                  onChange={this.handleKeywordChange.bind(this)} />
              </div>
              <div className="cancel">
                <button
                  type="button"
                  className="btn block green"
                  onClick={this.handleCancelSearch.bind(this)}>取消</button>
              </div>
            </div>
          </form>
          <MiniCardList items={this.state.bizCards} />
          {this.renderEmpty()}
        </section>
      </div>
    );
  }
}

ReactDOM.render(<SearchBizCardPage />, document.querySelector('.page'));
