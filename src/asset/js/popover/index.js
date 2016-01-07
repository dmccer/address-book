import './index.less';
import '../../less/component/icon.less';

import React from 'react';
import cx from 'classnames';

export default class Loading extends React.Component {
  constructor() {
    super();

    this.state = {
      on: false,
      type: 'success',
      timeout: 3000
    };
  }

  show(type='success', msg: string, timeout=3000: number) {
    this.setState({
      msg: msg,
      type: type,
      timeout: timeout || 3000,
      on: true
    });

    setTimeout(() => {
      this.setState({
        on: false
      });
    }, this.state.timeout);
  }

  success(msg: string, timeout: number) {
    this.show('success', msg, timeout);
  }

  error() {
    this.show('error', msg, timeout);
  }


  render() {
    let popoverClassNames = cx('popover', this.state.on ? 'on' : '');
    let iconClassNames = cx('icon s32', `icon-${this.state.type}`);

    return this.state.on ? (
      <div className={popoverClassNames}>
        <div>
          <i className={iconClassNames}></i>
          <p className="popover-text">{this.state.msg}</p>
        </div>
      </div>
    ) : null;
  }
}
