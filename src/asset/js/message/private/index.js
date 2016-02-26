/**
 * 私信列表页面
 */
import '../../../less/global/global.less';
import '../../../less/component/cell.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import SubHeader from '../../sub-header/';

export default class PrivateMsgListPage extends React.Component {
  static defaultProps = {};

  state = {};

  constructor() {
    super();
  }

  render() {
    return (
      <section className="private-msg-list-page">
        <SubHeader title="私信" />
        <section className="private-msg-list">
          <div className="cells cells-access">
            <a className="cell" href="#">
              <div className="weui_cell_hd">
                <img style={{
                  width: '50px',
                  height: '50px',
                  display: 'block',
                  marginRight: '8px'
                }} src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/S1Z9d539QDBx__a7M8n1xQ==/6630599373748343075.jpg_188x188x1.jpg" />
              </div>
              <div className="cell-bd cell_primary">
                <h3>张三</h3>
                <p>消息内容描述消息内容描述</p>
              </div>
              <div className="cell-ft">
                <i className="icon s22 icon-badge">10</i>
              </div>
            </a>
            <a className="cell" href="#">
              <div className="weui_cell_hd">
                <img style={{
                  width: '50px',
                  height: '50px',
                  display: 'block',
                  marginRight: '8px'
                }} src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/S1Z9d539QDBx__a7M8n1xQ==/6630599373748343075.jpg_188x188x1.jpg" />
              </div>
              <div className="cell-bd cell_primary">
                <h3>张三</h3>
                <p>消息内容描述消息内容描述</p>
              </div>
              <div className="cell-ft">
                <i className="icon s22 icon-badge">10</i>
              </div>
            </a>
            <a className="cell" href="#">
              <div className="weui_cell_hd">
                <img style={{
                  width: '50px',
                  height: '50px',
                  display: 'block',
                  marginRight: '8px'
                }} src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/S1Z9d539QDBx__a7M8n1xQ==/6630599373748343075.jpg_188x188x1.jpg" />
              </div>
              <div className="cell-bd cell_primary">
                <h3>张三</h3>
                <p>消息内容描述消息内容描述</p>
              </div>
              <div className="cell-ft">
                <i className="icon s22 icon-badge">10</i>
              </div>
            </a>
            <a className="cell" href="#">
              <div className="weui_cell_hd">
                <img style={{
                  width: '50px',
                  height: '50px',
                  display: 'block',
                  marginRight: '8px'
                }} src="http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/S1Z9d539QDBx__a7M8n1xQ==/6630599373748343075.jpg_188x188x1.jpg" />
              </div>
              <div className="cell-bd cell_primary">
                <h3>张三</h3>
                <p>消息内容描述消息内容描述</p>
              </div>
              <div className="cell-ft">
                <i className="icon s22 icon-badge">10</i>
              </div>
            </a>
          </div>
        </section>
      </section>
    );
  }
}

ReactDOM.render(<PrivateMsgListPage />, document.querySelector('.page'));
