import '../../less/component/icon.less';
import './index.less';

import React from 'react';
import cx from 'classnames';
import debounce from 'lodash/function/debounce';
import $ from '../lib/z';
import EventListener from 'fbjs/lib/EventListener';

export default class GoTop extends React.Component {
  state = {};

  constructor() {
    super();
  }

  componentDidMount() {
    let winH = $.height(window);

    EventListener.listen(window, 'scroll', debounce(() => {
      let t = $.scrollTop(window);
      let on = t > 0.5 * winH;

      this.setState({
        on: on
      });
    }));
  }

  back() {
    $.scrollTop(window, 0);
  }

  render() {
      return this.state.on ? <div className="go-top icon icon-gotop s40" onClick={this.back.bind(this)}></div> : null;
  }
}
