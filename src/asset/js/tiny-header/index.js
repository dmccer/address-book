import '../../less/component/layout.less'
import './index.less';

import React from 'react';

export default class TinyHeader extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header className="header row">
        <section>{this.props.title}</section>
      </header>
    );
  }
}
