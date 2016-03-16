/**
 * 名片 Item
 */
import '../../../less/component/icon.less';
import '../../../less/component/capsule.less';
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
		let holder = props.holder ? <i className="icon icon-group-manager"></i> : null;
		let defaultBizCard = props.main_card === 1 ? <i className="capsule lightBlue">默</i> : null;

		return (
			<a className="cell my-profile" onClick={props.onView} href={`./biz-card-detail.html?cid=${props.cid}&uid=${props.uid}`}>
		    <div className="avatar" style={{
		      backgroundImage: `url(${props.photo})`
		    }}></div>
		    <div className="profile">
		      <p className="my">
		        <span>{props.nikename}</span>
		        <i className={cx('icon', `icon-vip-${props.level}`)} />
						{holder}
						{defaultBizCard}
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
