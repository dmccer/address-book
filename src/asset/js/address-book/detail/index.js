import '../../../less/global/global.less';
import '../../../less/component/cell.less';
import '../../../less/component/accordion.less';
import '../../../less/component/layout.less';
import '../../../less/component/form.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';

import ABMember from '../member/';
import SubHeader from '../../sub-header/';
import Loading from '../../loading/';
import Popover from '../../popover/';
import Prviate from '../../private/';
import FixedHolder from '../../fixed-holder/';

export default class ABDetailPage extends React.Component {

  state = {
    memberList: [{}, {}, {}]
  };

  constructor() {
    super();
  }

  renderABMembers() {
    let memberList = this.state.memberList;

    if (memberList && memberList.length) {
      let list = this.state.memberList.map((member, index) => {
        return (
          <ABMember key={`member-item_${index}`} {...member} />
        );
      });

      return (
        <div className="member">
          <a className="search" href="./ab-member-search.html">
            <i className="icon s14 icon-search"></i>
            <span>通讯录共有 {memberList.length} 人</span>
          </a>
          <div className="divide"></div>
          <div className="ab-member-list cells cells-access">
            {list}
          </div>
          <a className="more-list">点击查看更多</a>
          <div className="pub-ab-btn">
            <div className="btn block lightBlue">我也要发布通讯录</div>
          </div>
          <div className="btn block lightBlue join-btn">加入该通讯录</div>
        </div>
      );
    }
  }

  renderABCreated() {
    return (
      <div className="ab-created">
        <div className="invitation">
          <p>通讯录创建成功</p>
          <p>您可以分享给朋友一起加入通讯录</p>
          <button className="btn block lightBlue">邀请好友</button>
        </div>
        <div className="ab-member-list cells">
          <ABMember />
        </div>
      </div>
    );
  }

  renderSetting() {
    return (
      <div className="ab-setting cells cells-access">
        <a className="cell" href="#">
          <div className="cell-hd">
            <i className="icon icon-ab-edit s15"></i>
          </div>
          <div className="cell-bd">
            <h3>修改通讯录</h3>
          </div>
          <div className="cell-ft"></div>
        </a>
        <a className="cell" href="#">
          <div className="cell-hd">
            <i className="icon icon-dustbin s15"></i>
          </div>
          <div className="cell-bd">
            <h3>删除通讯录</h3>
          </div>
          <div className="cell-ft"></div>
        </a>
        <a className="cell" href="#">
          <div className="cell-hd">
            <i className="icon icon-recommend-star s15"></i>
          </div>
          <div className="cell-bd">
            <h3>推荐给好友</h3>
          </div>
          <div className="cell-ft"></div>
        </a>
        <a className="cell" href="#">
          <div className="cell-hd">
            <i className="icon icon-power s15"></i>
          </div>
          <div className="cell-bd">
            <h3>退出该通讯录</h3>
          </div>
          <div className="cell-ft"></div>
        </a>
      </div>
    );
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
          {this.renderSetting()}
          {this.renderABCreated()}
          {this.renderABMembers()}
          <h2 className="accordion-hd">疑难帮助</h2>
          <div className="help accordion access">
            <div className="media-box">
              <h3 className="media-box-title">
                <i className="icon green icon-dot"></i>
                <span>什么是物流通讯录？</span>
              </h3>
              <p className="media-box-desc">答：一人创建通讯录，大家来加入。快速帮您制作人脉通讯录，随时随地查看详细信息。</p>
            </div>
            <div className="media-box">
              <h3 className="media-box-title">
                <i className="icon green icon-dot"></i>
                <span>如何找到物流通讯录？</span>
              </h3>
              <p className="media-box-desc">答：微信搜索公众号“物流通讯录”，关注物流通讯录即可。</p>
            </div>
          </div>
        </section>
        <Loading ref="loading" />
        <Prviate />
        <FixedHolder height="44" />
      </section>
    );
  }
}

ReactDOM.render(<ABDetailPage />, document.querySelector('.page'));
