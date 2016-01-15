import './index.less';

import React from 'react';
import cx from 'classnames';

export default class BizCardGroup extends React.Component {
  constructor() {
    super();
  }

  renderTotalNum() {
    if (!this.props.extra) {
      return <div className="people-num">{this.props.total}</div>;
    }
  }

  render() {
    let props = this.props;

    return (
      <div className="biz-card-group">
        <div className="row">
          <div className="ab-group">
            <i className={cx('icon', props.extra ? 'icon-manage s15' : 'icon-right-triangle')}></i>
            <span>{props.name}</span>
          </div>
          {this.renderTotalNum()}
        </div>
      </div>
    )
  }
}
