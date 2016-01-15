import '../../less/component/layout.less';
import './index.less';

import React from 'react';

import Mask from '../mask/';

export default class Confirm extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  show() {
    this.setState({
      on: true
    });
  }

  render() {
    if (!this.state.on) {
      return null;
    }
    
    return (
      <div className="confirm">
        <Mask type="black" />
        <div className="confirm-panel">
          <div className="tip">这里是提示文字</div>
          <div className="btns grid">
            <div className="btn block lightBlack">取消</div>
            <div className="btn block lightBlack">确定</div>
          </div>
        </div>
      </div>
    );
  }
}
