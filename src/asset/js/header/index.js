import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header className="header row">
        <section className="left"></section>
        <section className="center"></section>
        <section className="right"></section>
      </header>
    );
  }
}
