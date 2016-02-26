/**
 * 新建名片页面
 */
import '../../../less/global/global.less';
import '../../../less/component/form.less';
import '../../../less/component/layout.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

import SubHeader from '../../sub-header/';
import Private from '../../private/';
import GoTop from '../../gotop/';
import DropList from '../../droplist/';
import Modal from '../../modal/';
import AddressSelector from '../../address-selector/'

const ALL = '不限';

export default class CreateBizCardPage extends React.Component {
  state = {
    dropListData: [],
    visibility: {},
    bizCardType: {}
  };

  constructor() {
    super();
  }

  componentDidMount() {
    let visibilityList = [
      {
        name: '公开(所有人可见)',
        id: 1,
        selected: true
      }, {
        name: '私密(交换名片可见)',
        id: 2
      }
    ];
    let bizCardTypeList = [
      {
        name: '车主(我有车)',
        id: 1,
        selected: true
      }, {
        name: '货主(我有货)',
        id: 2
      }
    ];

    this.setState({
      visibilityList: visibilityList,
      bizCardTypeList: bizCardTypeList,
      visibility: visibilityList[0],
      bizCardType: bizCardTypeList[0],
      fromCities: [
        '上海-浦东新区',
        '江苏-苏州'
      ],
      toCities: [
        '湖南-长沙',
        '山东-青岛'
      ]
    });
  }

  toggleDropList(field: String, e: Object) {
    if (field === this.state.currentDropField) {
      this.refs.droplist.cancel();

      return;
    }

    this.setState({
      currentDropField: field,
      dropListData: this.state[`${field}List`]
    });

    let offset = $(e.currentTarget).offset();
    this.refs.droplist.show(offset.top + offset.height + 1);
  }

  toggleMoreFields() {
    this.setState({
      showMore: !this.state.showMore
    });
  }

  handleDropListSelect(item: Object) {
    this.state.dropListData.forEach((item) => {
      item.selected = false;
    });

    item.selected = true;

    this.setState({
      [this.state.currentDropField]: item
    });
  }

  handleDropListClose() {
    this.setState({
      currentDropField: null
    });
  }

  formatAddress(args) {
    let selected = args.filter((arg) => {
      return !!arg;
    });

    let lastIndex = selected.length - 1;

    if (selected[lastIndex] === ALL) {
      selected.splice(lastIndex, 1);
    }

    return selected.join('-');
  }

  handleSelectedAddress(...args) {
    let address = this.formatAddress(args);

    if (address === '') {
      return;
    }

    let field = this.state.currentSelectAddressField;

    let addresses = this.state[field];

    if (addresses.indexOf(address) === -1) {
      addresses.push(address);

      this.setState({
        [field]: addresses
      });
    }
  }

  handleAddAddress(field: String) {
    this.setState({
      currentSelectAddressField: field
    });

    this.refs.addressSelector.show(0);
  }

  handleRemoveRoute(field, typeDesc, item) {
    this.currentRemoveField = field;
    this.currentRemoveItem = item;

    this.refs.modal.show({
      title: `删除${typeDesc}`,
      msg: item
    });
  }

  confirmRemoveRoute() {
    let cities = this.state[this.currentRemoveField];
    cities.splice(cities.indexOf(this.currentRemoveItem), 1);
    this.setState({
      [this.currentRemoveField]: cities
    });
  }

  cancelRemoveRoute() {
    this.currentRemoveField = null;
    this.currentRemoveItem = null;
  }

  showTruckFields() {
    if (this.state.bizCardType.id === 1) {
      return (
        <div>
          <div className="field">
            <input
              type="text"
              className="control"
              placeholder="车型" />
          </div>
          <div className="field">
            <input
              type="number"
              className="control"
              placeholder="载重(吨)" />
          </div>
          <div className="field">
            <input
              type="number"
              className="control"
              placeholder="车长(米)" />
          </div>
          <div className="field">
            <input
              type="text"
              className="control"
              placeholder="车牌号" />
          </div>
        </div>
      );
    }
  }

  renderRoutes(type, list) {
    if (list && list.length) {
      let typeDesc = '出发地';

      if (type === 'toCities') {
        typeDesc = '到达地';
      }

      return list.map((item, index) => {
        return (
          <div className="route" key={`route-item_${index}`}>
            <span>{item}</span>
            <i
              className="icon icon-del s15"
              onClick={this.handleRemoveRoute.bind(this, type, typeDesc, item)}>
            </i>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="create-biz-card-page">
        <SubHeader title="新建名片" />
        <section className="create-biz-card">
          <form className="form">
            <div className="desc">
              现在开始创建您的名片<br />(仅需填写一次，可重复使用)
            </div>
            <div
              className="drop-btn btn block lightBlue"
              onClick={this.toggleDropList.bind(this, 'visibility')}>
              <span>{this.state.visibility.name}</span>
              <i className="icon icon-bottom-triangle white"></i>
            </div>
            <div
              className="drop-btn btn block lightBlue"
              onClick={this.toggleDropList.bind(this, 'bizCardType')}>
              <span>{this.state.bizCardType.name}</span>
              <i className="icon icon-bottom-triangle white"></i>
            </div>
            <div className="field required">
              <input
                type="text"
                className="control"
                placeholder="姓名" />
              <i className="star">*</i>
            </div>
            <div className="field required">
              <input
                type="tel"
                className="control"
                placeholder="手机" />
              <i className="star">*</i>
            </div>
            <div className="field">
              <input
                type="text"
                className="control"
                placeholder="微信" />
            </div>
            <div className="field">
              <input
                type="tel"
                className="control"
                placeholder="QQ" />
            </div>

            <div
              className={cx('more-link', this.state.showMore ? 'hide' : '')}
              onClick={this.toggleMoreFields.bind(this)}>
              <span>展开更多</span>
              <i className="icon icon-bottom-triangle blue"></i>
            </div>
            <section className={cx('more-fields', this.state.showMore ? '' : 'hide')}>
              <div className="panel routes">
                <h2>常跑路线</h2>
                <h3>
                  <span>出发地</span>
                  <i className="icon icon-add s15" onClick={this.handleAddAddress.bind(this, 'fromCities')}></i>
                </h3>
                {this.renderRoutes('fromCities', this.state.fromCities)}

                <h3>
                  <span>到达地</span>
                  <i className="icon icon-add s15" onClick={this.handleAddAddress.bind(this, 'toCities')}></i>
                </h3>
                {this.renderRoutes('toCities', this.state.toCities)}
              </div>
              {this.showTruckFields()}
              <div className="panel">
                <h2>公司名称</h2>
                <div className="field">
                  <input
                    type="text"
                    className="control" />
                </div>
              </div>
              <div className="panel">
                <h2>公司职位</h2>
                <div className="field">
                  <input
                    type="text"
                    className="control" />
                </div>
              </div>
              <div className="panel">
                <h2>公司地址</h2>
                <div className="field">
                  <input
                    type="text"
                    className="control" />
                </div>
              </div>
              <div className="panel">
                <h2>业务介绍</h2>
                <div className="field">
                  <input
                    type="text"
                    className="control" />
                </div>
              </div>
              <div className="panel">
                <h2>分享标题</h2>
                <div className="field">
                  <input
                    type="text"
                    className="control"
                    placeholder="请填写分享名片到微信等平台的标题" />
                </div>
              </div>
              <div className="panel">
                <h2>分享语</h2>
                <div className="field">
                  <input
                    type="text"
                    className="control"
                    placeholder="请填写分享名片到微信等平台的分享语" />
                </div>
              </div>
            </section>

            <button type="submit" className="btn block green submit">保存名片</button>
          </form>
        </section>
        <DropList
          ref="droplist"
          items={this.state.dropListData}
          onSelect={this.handleDropListSelect.bind(this)}
          onClose={this.handleDropListClose.bind(this)}
        />
        <Private />
        <GoTop />
        <Modal
          ref='modal'
          confirm={this.confirmRemoveRoute.bind(this)}
          cancel={this.cancelRemoveRoute.bind(this)}
        />
        <AddressSelector
          ref="addressSelector"
          done={this.handleSelectedAddress.bind(this)}
        />
      </div>
    );
  }
}

ReactDOM.render(<CreateBizCardPage />, document.querySelector('.page'));
