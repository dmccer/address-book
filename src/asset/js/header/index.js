import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  handleAdd() {
    this.setState({
      adding: !this.state.adding
    });
  }

  renderAddActions() {
    if (this.state.adding) {
      return (
        <ul className="actions">
          <li><a href="#">新建通讯录</a></li>
          <li><a href="#">新建名片</a></li>
        </ul>
      );
    }
  }

  render() {
    return (
      <header className="header row">
        <section className="left"><i className="icon icon-mail"></i></section>
        <section className="center">{this.props.title}</section>
        <section className="right" onClick={this.handleAdd.bind(this)}>
          <i className="icon s20 icon-plus"></i>
          {this.renderAddActions()}
        </section>
      </header>
    );
  }
}
