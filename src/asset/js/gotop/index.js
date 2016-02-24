import '../../less/component/icon.less';
import './index.less';

import React from 'react';
import cx from 'classnames';
import debounce from 'lodash/function/debounce';

export default class GoTop extends React.Component {
  constructor() {
    super();

    this.state = {}
  }

  componentDidMount() {
    let winH = $(window).height();

    $(window).on('scroll', debounce(() => {
      let t = $(window).scrollTop();
      let on = t > 0.5 * winH;

      this.setState({
        on: on
      });
    }));
  }

  back() {
    $(window).scrollTop(0);
  }

  render() {
      return this.state.on ? <div className="go-top icon icon-gotop s40" onClick={this.back.bind(this)}></div> : null;
  }
}
