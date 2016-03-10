import './index.less';

import React from 'react';
import cx from 'classnames';

const MENUS = [
  {
    id: 'biz-card',
    name: '名片',
    url: './my-biz-card.html'
  }, {
    id: 'address-book',
    name: '通讯录',
    url: './address-book.html'
  }, {
    id: 'account',
    name: '我的',
    url: './index.html'
  }
];

export default class Nav extends React.Component {
  constructor() {
    super();
  }

  handleChangeTab(menu: Object, e: Object) {
    if (menu.id === this.props.on) {
      e.stopPropagation();
      e.preventDefault();
      
      return;
    }
  }

  render() {
    let menuList = MENUS.map((menu, index) => {
      let on = menu.id === this.props.on ? 'on' : '';
      let iconClassNames = cx('icon s22', `icon-${menu.id}`, on);
      let menuClassNames = cx('menu', on);

      return (
        <div className={menuClassNames} key={'menu_' + index}>
          <a href={menu.url} onClick={this.handleChangeTab.bind(this, menu)}>
            <i className={iconClassNames}></i>
            <span>{menu.name}</span>
          </a>
        </div>
      )
    });

    return (
      <section className="nav row">
        {menuList}
      </section>
    );
  }
}
