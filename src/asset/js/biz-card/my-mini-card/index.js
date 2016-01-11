import './index.less';

import React from 'react';

export default class MyMiniCard extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		return (
			<div className="my-profile">
		    <div className="avatar" style={{
		      backgroundImage: 'url(http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/y05QWUvtxCFVc44Ozx-SCQ==/6631404216260167640.jpg_188x188x1.jpg)'
		    }}></div>
		    <div className="profile">
		      <p className="my">
		        <span>王晓华</span>
		        <span className="vip-level">VIP1</span>
		      </p>
		      <p className="intro">我是描述文字，我是描述文字</p>
		      <i className="icon icon-account-type-truck"></i>
		    </div>
		  </div>
		);
	}
}