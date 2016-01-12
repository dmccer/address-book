import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

export default class ModalHeader extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header className="header row">
        <section className="left"><i className="tag">取消</i></section>
        <section className="center">{this.props.title}</section>
        <section className="right"><i className="tag">完成</i></section>
      </header>
    );
  }
}
