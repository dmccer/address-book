import './index.less';

import React from 'react';
import cx from 'classnames';

/**
 * Private
 */
export default class Private extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="private">
        <p>
          <i className="icon s11 icon-lock"></i>
          <span>数据已进行隐私加密，请放心使用</span>
        </p>
        <p className="wx-nickname">王晓华</p>
      </div>
    );
  }
}
