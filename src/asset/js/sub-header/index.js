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
        <section className="left"><i className="icon s20 icon-left-arrow"></i></section>
        <section className="center">{this.props.title}</section>
        <section className="right"><i className="icon s20 icon-more"></i></section>
      </header>
    );
  }
}
