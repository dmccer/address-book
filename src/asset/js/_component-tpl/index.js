/**
 * XXX 页面
 */
import '../../less/global/global.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

export default class XXXPage extends React.Component {
  static defaultProps = {};
  
  state = {};

  constructor() {
    super();
  }

  render() {
    return (
      <section className="xxx-page"></section>
    );
  }
}

ReactDOM.render(<XXXPage />, document.querySelector('.page'));
