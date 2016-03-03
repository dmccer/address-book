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
 * this.refs.confirm.show({
 * 		msg: '是否删除该条记录?'
 * });
 */
import '../../less/component/layout.less';
import './index.less';

import React from 'react';

import Mask from '../mask/';
import {ConfirmEnhance} from '../enhance/confirm';

@ConfirmEnhance
export default class Confirm extends React.Component {
  state = {};

  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;

    if (!props.on) {
      return null;
    }

    return (
      <div className="confirm">
        <Mask type="black" />
        <div className="confirm-panel">
          <div className="tip">{props.msg}</div>
          <div className="btns grid">
            <div className="btn block lightBlack" onClick={props.cancel}>取消</div>
            <div className="btn block lightBlack" onClick={props.confirm}>确定</div>
          </div>
        </div>
      </div>
    );
  }
}
