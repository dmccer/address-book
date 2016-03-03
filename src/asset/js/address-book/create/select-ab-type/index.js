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

export default class SelectABTypePage extends React.Component {
  state = {
    abTypes: [
      {
        name: '车货联盟',
        icon: 'icon-truck-pkg-union',
        id: 4
      }, {
        name: '行业好友',
        icon: 'icon-biz-friend',
        id: 2
      }, {
        name: '我的车队',
        icon: 'icon-my-roadtrain',
        id: 1
      }, {
        name: '公司内部',
        icon: 'icon-in-company',
        id: 3
      }
    ]
  };

  constructor() {
    super();
  }

  renderABTypes() {
    let abTypes = this.state.abTypes;

    if (abTypes && abTypes.length) {
      return abTypes.map((abType, index) => {
        return (
          <a
            key={`abType-item_${index}`}
            className="abtype-item"
            href={`./create-ab.html?atype=${abType.id}`}>
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
