import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

export default class ModalHeader extends React.Component {
  constructor() {
    super();
  }

  handleCancel() {
    history.back();
  }

  render() {
    return (
      <header className="header row">
        <section className="left" onClick={this.handleCancel.bind(this)}><i className="tag">取消</i></section>
        <section className="center">{this.props.title}</section>
        <section className="right" onClick={this.handleCancel.bind(this)}><i className="tag">完成</i></section>
      </header>
    );
  }
}
