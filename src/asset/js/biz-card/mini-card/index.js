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
		let intro = '';

		if (props.com_name) {
			intro += props.com_name;

			if (props.com_position) {
				intro += props.com_position;
			}
		} else {
			intro += `联系电话: ${props.tel}`;
		}

		return (
			<div className="my-profile">
		    <div className="avatar" style={{
		      backgroundImage: 'url(http://imgsize.ph.126.net/?imgurl=http://img2.ph.126.net/y05QWUvtxCFVc44Ozx-SCQ==/6631404216260167640.jpg_188x188x1.jpg)'
		    }}></div>
		    <div className="profile">
		      <p className="my">
		        <span>{props.nikename}</span>
		        <span className="vip-level">VIP1</span>
		      </p>
		      <p className="intro">{intro}</p>
					<div className="icons">
						<i className="icon s14 icon-certificate"></i>
						<i className="icon icon-account-type-truck"></i>
					</div>
		    </div>
		  </div>
		);
	}
}
