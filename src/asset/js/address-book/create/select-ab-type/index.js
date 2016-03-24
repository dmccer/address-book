/**
 * 新建通讯录-选择通讯录类型页面
 */
 import '../../../../less/global/global.less';
 import '../../../../less/component/layout.less';
 import '../../../../less/component/icon.less';

import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

import SubHeader from '../../../sub-header/';
import Private from '../../../private/';
import AB_TYPES from '../../../const/abtype';

export default class SelectABTypePage extends React.Component {
  state = {
    abTypes: AB_TYPES
  };

  constructor() {
    super();
  }

  selected(abType) {
    let url = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `/create-ab.html?atype=${abType.id}`);
    location.replace(url);
  }

  renderABTypes() {
    let abTypes = this.state.abTypes;

    if (abTypes && abTypes.length) {
      return abTypes.map((abType, index) => {
        return (
          <a
            key={`abType-item_${index}`}
            className="abtype-item"
            onClick={this.selected.bind(this, abType)}
            href="javascript:;">
            <i className={cx('icon s40', abType.icon)}></i>
            <h3>{abType.name}</h3>
          </a>
        );
      });
    }
  }

  render() {
    return (
      <section className="select-abtype-page">
        <SubHeader title="新建通讯录" />
        <div className="select-abtype">
          <div className="abtype-list">
            {this.renderABTypes()}
          </div>
        </div>
        <Private />
      </section>
    );
  }
}

ReactDOM.render(<SelectABTypePage />, document.querySelector('.page'));
