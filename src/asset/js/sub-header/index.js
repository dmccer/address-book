import '../../less/component/layout.less';
import '../../less/component/icon.less';
import './index.less';

import React from 'react';
import More from '../more/';

export default class SubHeader extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  toggleMore() {
    this.setState({
      show: !this.state.show
    });
  }

  back() {
    history.back();

    try {
      WeixinJSBridge.invoke('closeWindow');
    } catch(e) {
      window.close();
    }
  }

  render() {
    return (
      <header className="header row">
        <section className="left" onClick={this.back.bind(this)}><i className="icon icon-left-arrow"></i></section>
        <section className="center">{this.props.title}</section>
        <section className="right" onClick={this.toggleMore.bind(this)}>
          <i className="icon s20 icon-more"></i>
          <More on={this.state.show} />
        </section>
      </header>
    );
  }
}
