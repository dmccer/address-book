import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/layout.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import TinyHeader from '../../tiny-header/';
import MiniCardList from '../mini-card-list/';

export default class SearchBizCardPage extends React.Component {
  state = {
    bizCards: [{
      name: '李刚'
    }, {
      name: '张三丰'
    }]
  };

  constructor() {
    super();
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
                <input type="text" className="control" placeholder="您共有135位好友可搜索" />
              </div>
              <div className="cancel">
                <button type="button" className="btn block green">取消</button>
              </div>
            </div>
          </form>
          <MiniCardList items={this.state.bizCards} />
        </section>
      </div>
    );
  }
}

ReactDOM.render(<SearchBizCardPage />, document.querySelector('.page'));
