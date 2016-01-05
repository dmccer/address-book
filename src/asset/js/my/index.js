import '../../less/global/global.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from '../header/';

export default class MyPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="my">
        <Header />
      </section>
    );
  }
}

ReactDOM.render(<MyPage />, document.querySelector('.page'));
