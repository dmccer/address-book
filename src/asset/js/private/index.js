/**
 * Private 隐私声明
 *
 * Author: Kane xiaoyunhua@ttyhuo.cn
 *
 * Usage:
 *
 * // 若页面高度小于浏览器窗体高度
 * <div className="xx-page mini-page">
 * 		...
 * 		<Private />
 * </div>
 *
 * // 若页面高度大于浏览器窗体高度
 * <div className="xx-page">
 * 		...
 * 		<Private />
 * </div>
 */
import './index.less';

import React from 'react';
import cx from 'classnames';

export default class Private extends React.Component {
  constructor() {
    super();
  }

  render() {
    // <p className="wx-nickname">王晓华</p>
    
    return (
      <div className="private">
        <p>
          <i className="icon s11 icon-lock"></i>
          <span>数据已进行隐私加密，请放心使用</span>
        </p>

      </div>
    );
  }
}
