import './index.less';

import React from 'react';

import {ConfirmEnhance} from '../enhance/confirm';
import {FieldChangeEnhance} from '../enhance/field-change';
import Mask from '../mask/';

@ConfirmEnhance
@FieldChangeEnhance
export default class Modal extends React.Component {
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
      <div className="modal">
        <Mask type="black" />
        <div className="modal-panel">
          <h2>{props.title}</h2>
          <div className="content">{props.msg}</div>
          <div className="btns grid">
            <div className="btn block lightBlack" onClick={props.cancel}>取消</div>
            <div className="btn block lightBlack" onClick={props.confirm}>确定</div>
          </div>
        </div>
      </div>
    );
  }
}
