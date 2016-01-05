import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

export default class SubHeader extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header className="header row">
        <section className="left">消息</section>
        <section className="center">{this.props.title}</section>
        <section className="right">+</section>
      </header>
    );
  }
}
