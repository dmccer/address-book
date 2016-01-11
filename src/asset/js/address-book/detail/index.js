import '../../../less/global/global.less';
import '../../../less/component/layout.less';
import '../../../less/component/form.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';

import SubHeader from '../../sub-header/';
import Loading from '../../loading/';
import Popover from '../../popover/';

export default class ABDetailPage extends React.Component {
  constructor() {
    super();

    this.state = {}
  }

  render() {
    return (
      <section className="ab-detail-page">
        <SubHeader />
        <section className="ab-detail">
          <div className="ab-profile">
            <h2>上海到南昌货运联盟名字过长两行</h2>
            <div className="description">通讯录简介通讯录简介通讯录简介通讯录简介通讯录简介通讯录简介通讯录简介通讯录简介通讯录简介通讯录简介通讯录简介通讯录简介通讯录简介通讯录简介</div>
            <div className="creator">创建人: 人物名称</div>
          </div>
          <ul className="menu grid">
            <li className="on">成员 (100)</li>
            <li>设置</li>
          </ul>
          <a className="search">
            <i className="icon s14 icon-search"></i>
            <span>通讯录共有 100 人</span>
          </a>
          <div className="divide"></div>
          <ul className="list member-list">
            <li>
              <a href="#">
                <img className="cover" src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/Bxuv7RNkBKTwug5oISbHZw==/6631311857283249341.jpg_188x188x1.jpg" />
                <div className="member-profile">
                  <h3>李四 (车主)</h3>
                  <div>车型，载重，车长</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <img className="cover" src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/Bxuv7RNkBKTwug5oISbHZw==/6631311857283249341.jpg_188x188x1.jpg" />
                <div className="member-profile">
                  <h3>李四 (货主)</h3>
                  <div>公司职位</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <img className="cover" src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/Bxuv7RNkBKTwug5oISbHZw==/6631311857283249341.jpg_188x188x1.jpg" />
                <div className="member-profile">
                  <h3>李四 (车主)</h3>
                  <div>车型，载重，车长</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <img className="cover" src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/Bxuv7RNkBKTwug5oISbHZw==/6631311857283249341.jpg_188x188x1.jpg" />
                <div className="member-profile">
                  <h3>李四 (货主)</h3>
                  <div>公司职位</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <img className="cover" src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/Bxuv7RNkBKTwug5oISbHZw==/6631311857283249341.jpg_188x188x1.jpg" />
                <div className="member-profile">
                  <h3>李四 (车主)</h3>
                  <div>车型，载重，车长</div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <img className="cover" src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/Bxuv7RNkBKTwug5oISbHZw==/6631311857283249341.jpg_188x188x1.jpg" />
                <div className="member-profile">
                  <h3>李四 (货主)</h3>
                  <div>公司职位</div>
                </div>
              </a>
            </li>
          </ul>
          <div className="fixed-holder"></div>
          <div className="btn block blue join-btn">加入该通讯录</div>
        </section>
        <Loading ref="loading" />
      </section>
    );
  }
}

ReactDOM.render(<ABDetailPage />, document.querySelector('.page'));
