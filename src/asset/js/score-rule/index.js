import '../../less/global/global.less';
import '../../less/component/layout.less';
import '../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import SubHeader from '../sub-header/';

export default class ScoreRule extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="score-rule">
        <SubHeader title="积分规则" />
        <h2 className="subtitle">积分规则</h2>
        <ul className="rule-list">
          <li>每日签到可获 3 积分 / 天</li>
          <li>分享通讯录组，被分享的人加入此通讯录组可获得 1 积分/人，每天最多 10 积分</li>
          <li>
            <a href="#">分享主名片</a>
            <span>，可获得 1 积分，每天最多 10 积分</span>
          </li>
          <li>
            <a href="#">实名认证</a>
            <span>并通过，可获得 300 积分，每个用户只能获取一次</span>
          </li>
          <li>
            <a href="#">新建名片</a>
            <span>，资料填写完整度 100%，可获得 200 积分，每个用户只能获取一次</span>
          </li>
        </ul>
        <table className="power-4-level">
          <thead>
            <tr>
              <th>等级</th>
              <th>权限</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h3>VIP 1</h3>
                <p>0-599 积分</p>
              </td>
              <td>
                <p>好友上限: 500 人</p>
                <p>通讯录上限: 10 个</p>
              </td>
            </tr>
            <tr>
            <td>
              <h3>VIP 2</h3>
              <p>600-5999 积分</p>
            </td>
            <td>
              <p>好友上限: 2000 人</p>
              <p>通讯录上限: 100 个</p>
            </td>
            </tr>
            <tr>
              <td>
                <h3>VIP 3</h3>
                <p>6000+ 积分</p>
              </td>
              <td>
                <p>好友上限: 10000 人</p>
                <p>通讯录上限: 800 个</p>
              </td>
            </tr>
          </tbody>
        </table>
        <h2 className="subtitle">最近积分记录</h2>
        <table className="score-history">
          <thead>
            <tr>
              <th>时间</th>
              <th>动作</th>
              <th>积分</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12-11 10:11</td>
              <td>名片分享</td>
              <td>1</td>
            </tr>
            <tr>
              <td>12-10 10:22</td>
              <td>每日签到</td>
              <td>1</td>
            </tr>
            <tr>
              <td>12-09 11:31</td>
              <td>实名认证</td>
              <td>300</td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}


ReactDOM.render(<ScoreRule />, document.querySelector('.page'));
