import '../../less/global/global.less';

import React from 'react';
import ReactDOM from 'react-dom';

export default class TXL extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="txl">
        <h1>通讯录</h1>
      </section>
    );
  }
}

ReactDOM.render(<TXL />, document.querySelector('.page'));
