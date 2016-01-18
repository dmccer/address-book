/**
 * 确认框
 *
 * Usage:
 *
 * function confirmed() {
 * 		console.log('删除成功');
 * }
 *
 * <Confirm ref="confirm" confirm={this.confirmed.bind(this)} />
 *
 * this.refs.confirm.show('是否删除该条记录?');
 */
import '../../less/component/layout.less';
import './index.less';

import React from 'react';

import Mask from '../mask/';

class Confirm extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  show(msg: String) {
    this.setState({
      on: true,
      msg: msg
    });
  }

  close() {
    this.setState({
      on: false
    });
  }

  cancel() {
    this.props.cancel();
    this.close();
  }

  confirm() {
    this.props.confirm();
    this.close();
  }

  render() {
    if (!this.state.on) {
      return null;
    }

    return (
      <div className="confirm">
        <Mask type="black" />
        <div className="confirm-panel">
          <div className="tip">{this.state.msg}</div>
          <div className="btns grid">
            <div className="btn block lightBlack" onClick={this.cancel.bind(this)}>取消</div>
            <div className="btn block lightBlack" onClick={this.confirm.bind(this)}>确定</div>
          </div>
        </div>
      </div>
    );
  }
}

Confirm.defaultProps = {
  confirm: () => {},
  cancel: () => {}
}

export default Confirm;
