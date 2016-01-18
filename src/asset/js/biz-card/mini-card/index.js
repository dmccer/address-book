/**
 * 名片 Item
 */
import './index.less';

import React from 'react';

export default class MiniCard extends React.Component {
	constructor() {
		super();
	}

	render() {
		let props = this.props;

		return (
			<div className="my-profile">
		    <div className="avatar" style={{
		      backgroundImage: 'url(http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/y05QWUvtxCFVc44Ozx-SCQ==/6631404216260167640.jpg_188x188x1.jpg)'
		    }}></div>
		    <div className="profile">
		      <p className="my">
		        <span>{props.name}</span>
		        <span className="vip-level">VIP1</span>
		      </p>
		      <p className="intro">我是描述文字，我是描述文字</p>
					<div className="icons">
						<i className="icon s14 icon-certificate"></i>
						<i className="icon icon-account-type-truck"></i>
					</div>
		    </div>
		  </div>
		);
	}
}
