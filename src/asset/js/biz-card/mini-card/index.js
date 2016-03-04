/**
 * 名片 Item
 */
import './index.less';

import React from 'react';
import cx from 'classnames';

export default class MiniCard extends React.Component {
	constructor() {
		super();
	}

	render() {
		let props = this.props;
		let certified = props.verifyflag === 2 ? <i className="icon s14 icon-certificate"></i> : null;

		return (
			<a className="my-profile" href={`./biz-card-detail.html?cid=${props.cid}&uid=${props.uid}`}>
		    <div className="avatar" style={{
		      backgroundImage: `url(${props.photo})`
		    }}></div>
		    <div className="profile">
		      <p className="my">
		        <span>{props.nikename}</span>
		        <span className="vip-level">VIP {props.level}</span>
		      </p>
		      <p className="intro">{props.desc}</p>
					<div className="icons">
						{certified}
						<i className={cx('icon', props.ctype === 1 ? 'icon-account-type-truck' : 'icon-account-type-package')}></i>
					</div>
		    </div>
		  </a>
		);
	}
}
