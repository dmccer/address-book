import './index.less';

import React from 'react';

import {ConfirmEnhance} from '../../../enhance/confirm';
import {FieldChangeEnhance} from '../../../enhance/field-change';
import Mask from '../../../mask/';

@ConfirmEnhance
@FieldChangeEnhance
export default class GroupItemEditConfirm extends React.Component {
  state = {};

  constructor(props) {
    super(props);
  }

  handleConfirm() {
    this.props.confirm(this.props.val);
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
          <h2>{props.title}</h2>
          <div className="input">
            <input
              type="text"
              placeholder={props.placeholder}
              value={props.val}
              onChange={props.handleStrChange.bind(this, 'val')}
            />
          </div>
          <div className="btns grid">
            <div className="btn block lightBlack" onClick={props.cancel}>取消</div>
            <div className="btn block lightBlack" onClick={props.confirm.bind(this, props.val)}>确定</div>
          </div>
        </div>
      </div>
    );
  }
}
