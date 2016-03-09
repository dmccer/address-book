import '../../../less/component/capsule.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

export default class ABMemeber extends React.Component {
  constructor() {
    super();
  }

  render() {
    let props = this.props;
    let memberTypeDes = '';

    if (props.holder) {
      memberTypeDes = '发起人&';
    }

    let visible = props.shouldShowVisibility && props.auth === 0 ? (<i className="capsule lightBlue">可见</i>) : null;
    let del = !props.shouldShowVisibility ? (
      <i
        className="icon s22 icon-dustbin"
        onClick={props.onDel}></i>
    ) : null

    return (
      <a className="cell" href="javascript:;" onClick={props.onView}>
        <div className="cell-hd">
          <img src={props.photo} />
        </div>
        <div className="cell-bd cell_primary">
          <h3>{props.nikename} ({`${memberTypeDes}${(props.ctype === 1 ? '车主' : '货主')}`})</h3>
          <p>{props.desc}</p>
        </div>
        <div className="cell-ft">
          {visible}
          {del}
        </div>
      </a>
    );
  }
}
