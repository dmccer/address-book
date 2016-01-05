import '../../less/global/global.less';
import '../../less/component/layout.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../header/';
import Nav from '../nav/';

export default class MyPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="my">
        <Header title="我的" />
        <Nav />
      </section>
    );
  }
}

ReactDOM.render(<MyPage />, document.querySelector('.page'));
