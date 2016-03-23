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
import Promise from 'promise';
import querystring from 'querystring';
import find from 'lodash/collection/find';
import keys from 'lodash/object/keys';

import AjaxHelper from '../../ajax-helper/';
import SubHeader from '../../sub-header/';
import {FieldChangeEnhance} from '../../enhance/field-change';
import Validator from '../../validator/';
import Private from '../../private/';
import GoTop from '../../gotop/';
import DropList from '../../droplist/';
import Modal from '../../modal/';
import AddressSelector from '../../address-selector/'
import Selector from '../../selector/';
import Loading from '../../loading/';
import Toast from '../../toast/';
import {
  BizCardDetail,
  UpdateBizCard,
  CreateBizCard,
  AllTrucks
} from '../model/';
import injectTapEventPlugin from 'react-tap-event-plugin';
// 因为 iscroll 禁用了 click 事件，
// 若启用 iscroll click, 会对其他默认滚动列表，滚动时触发 click
// 启用 tap 事件
injectTapEventPlugin();

const ALL = '不限';
const VISIBILITY_ITEMS = [
  {
    name: '公开(所有人可见)',
    id: 0
  }, {
    name: '私密(交换名片可见)',
    id: 1
  }
];
const BIZ_CARD_TYPE_ITEMS = [
  {
    name: '车主(我有车)',
    id: 1
  }, {
    name: '货主(我有货)',
    id: 2
  }
];
const ROUTE_TITLES = {
  1: '常跑',
  2: '优势'
};

@FieldChangeEnhance
export default class CreateBizCardPage extends React.Component {
  state = {
    visibilityList: VISIBILITY_ITEMS,
    bizCardTypeList: BIZ_CARD_TYPE_ITEMS,
    dropListData: [],
    selectorData: [],
    visibility: {},
    bizCardType: {},
    truckType: {},
    qs: querystring.parse(location.search.substring(1))
  };

  constructor() {
    super();
  }

  componentWillMount() {
    if ($.trim(this.state.qs.cid) !== '') {
      this.setState({
        editMod: true
      });
    }
  }

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);
    Validator.config(this.refs.toast);

    if (this.state.editMod) {
      this.getBizCard();

      return;
    }

    // 新建名片，默认值配置
    this.setBizCard({
      auth: 0,
      ctype: 1
    });
  }

  setBizCard(bc) {
    let visibility = find(VISIBILITY_ITEMS, (item) => {
      return item.id === bc.auth;
    });
    let bizCardType = find(BIZ_CARD_TYPE_ITEMS, (item) => {
      return item.id === bc.ctype;
    });

    let fromCities = bc.start_addr ? bc.start_addr.split(',') : [];
    let toCities = bc.end_addr ? bc.end_addr.split(',') : [];

    let defaultData = {
      visibility: visibility,
      bizCardType: bizCardType,
      fromCities: fromCities,
      toCities: toCities
    };

    if (bc.trucktype != null) {
      let truckType = find(this.state.selectorData, (item) => {
        return item.id == bc.trucktype;
      });

      if (truckType) {
        defaultData.truckType = truckType;
      }
    }

    this.setState(defaultData);
  }

  getBizCard() {
    this.ajaxHelper.all([BizCardDetail, AllTrucks], res => {
      let card = res[0].card;

      let trucks = res[1].trucks;
      let truckList = keys(trucks).map((key) => {
        return {
          id: key,
          name: trucks[key]
        };
      });

      this.setState({
        selectorData: truckList
      }, () => {
        this.setBizCard(card);
        this.props.setFields(card);
      });

    }, [this.state.qs.cid], []);
  }

  validate() {
    let props = this.props;

    return Validator.test('required', '姓名不能为空', props.nikename) &&
      Validator.test('required', '手机号不能为空', props.tel) &&
      Validator.test('len', '手机号格式不正确', props.tel, 11) &&
      (Validator.empty(props.licenseplate) || Validator.test('licenseplate', '车牌号格式不正确', props.licenseplate));
  }

  buildData() {
    let props = this.props;
    let state = this.state;

    let data = {
      ctype: state.bizCardType.id,
      auth: state.visibility.id,
      nikename: props.nikename,
      tel: props.tel,
      wechat: props.wechat,
      qq: props.qq,
      start_addr: state.fromCities.join(),
      end_addr: state.toCities.join(),
      com_name: props.com_name,
      com_position: props.com_position,
      com_addr: props.com_addr,
      service_desc: props.service_desc,
      share_title: props.share_title,
      share_desc: props.share_desc
    };

    if (state.bizCardType.id === 1) {
      data.licenseplate = props.licenseplate;

      if (props.trucklength) {
        data.trucklength = props.trucklength;
      }

      if (props.loadlimit) {
        data.loadlimit = props.loadlimit;
      }

      if (this.state.truckType.id != null) {
        data.trucktype = this.state.truckType.id || null;
      }
    }

    if (this.state.editMod) {
      data.cid = this.state.qs.cid;
    }

    return data;
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.validate()) {
      return;
    }

    let params = this.buildData();

    this.ajaxHelper.one(this.state.editMod ? UpdateBizCard : CreateBizCard, res => {
      this.refs.toast.warn('保存名片成功');

      setTimeout(() => {
        let qs = querystring.stringify({
          cid: res.cid
        });
        let url = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `/biz-card-detail.html?${qs}`);

        if (this.state.qs.ref) {
          url = this.state.qs.ref;
        }

        location.href = url;
      });
    }, params);
  }

  toggleMoreFields() {
    this.setState({
      showMore: !this.state.showMore
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
    this.refs.droplist.show(offset.top + offset.height + 1, this.state[field]);
  }

  handleDropListSelect(item: Object) {
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

  handleClickTruckType() {
    this.ajaxHelper.one(AllTrucks, res => {
      let trucks = res.trucks;
      let truckList = keys(trucks).map((key) => {
        return {
          id: key,
          name: trucks[key]
        };
      });

      this.setState({
        selectorData: truckList
      }, () => {
        this.refs.selector.show();
      });
    });
  }

  handleSelectorSelected(truckType: Object) {
    this.setState({
      truckType: truckType
    });
  }

  handleSelectorCancel() {}

  showTruckFields() {
    if (this.state.bizCardType.id === 1) {
      let props = this.props;

      return (
        <div>
          <div className="field">
            <input
              readOnly
              type="text"
              className="control"
              placeholder="车型"
              value={this.state.truckType.name}
              onClick={this.handleClickTruckType.bind(this)} />
          </div>
          <div className="field">
            <input
              type="tel"
              className="control"
              placeholder="载重(吨)"
              value={props.loadlimit}
              onChange={props.handleFloatChange.bind(this, 'loadlimit')} />
          </div>
          <div className="field">
            <input
              type="tel"
              className="control"
              placeholder="车长(米)"
              value={props.trucklength}
              onChange={props.handleFloatChange.bind(this, 'trucklength')} />
          </div>
          <div className="field">
            <input
              type="text"
              className="control"
              placeholder="车牌号, 如: 沪W12333"
              value={props.licenseplate}
              onChange={props.handleStrChange.bind(this, 'licenseplate')} />
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
    let props = this.props;

    return (
      <div className="create-biz-card-page">
        <SubHeader title={`${this.state.editMod ? '编辑' : '新建'}名片`} />
        <section className="create-biz-card">
          <form className="form" onSubmit={this.handleSubmit.bind(this)}>
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
                placeholder="姓名"
                value={props.nikename}
                onChange={props.handleStrChange.bind(this, 'nikename')} />
              <i className="star">*</i>
            </div>
            <div className="field required">
              <input
                type="tel"
                className="control"
                placeholder="手机"
                value={props.tel}
                onChange={props.handleMobileNoChange.bind(this, 'tel')} />
              <i className="star">*</i>
            </div>
            <div className="field">
              <input
                type="text"
                className="control"
                placeholder="微信"
                value={props.wechat}
                onChange={props.handleStrChange.bind(this, 'wechat')} />
            </div>
            <div className="field">
              <input
                type="tel"
                className="control"
                placeholder="QQ"
                value={props.qq}
                onChange={props.handleIntegerChange.bind(this, 'qq')} />
            </div>

            <div
              className={cx('more-link', this.state.showMore ? 'hide' : '')}
              onClick={this.toggleMoreFields.bind(this)}>
              <span>展开更多</span>
              <i className="icon icon-bottom-triangle blue"></i>
            </div>
            <section className={cx('more-fields', this.state.showMore ? '' : 'hide')}>
              <div className="panel routes">
                <h2>{`${ROUTE_TITLES[this.state.bizCardType.id]}路线`}</h2>
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
                    className="control"
                    value={props.com_name}
                    onChange={props.handleStrChange.bind(this, 'com_name')} />
                </div>
              </div>
              <div className="panel">
                <h2>公司职位</h2>
                <div className="field">
                  <input
                    type="text"
                    className="control"
                    value={props.com_position}
                    onChange={props.handleStrChange.bind(this, 'com_position')} />
                </div>
              </div>
              <div className="panel">
                <h2>公司地址</h2>
                <div className="field">
                  <input
                    type="text"
                    className="control"
                    value={props.com_addr}
                    onChange={props.handleStrChange.bind(this, 'com_addr')} />
                </div>
              </div>
              <div className="panel">
                <h2>业务介绍</h2>
                <div className="field">
                  <input
                    type="text"
                    className="control"
                    value={props.service_desc}
                    onChange={props.handleStrChange.bind(this, 'service_desc')} />
                </div>
              </div>
              <div className="panel">
                <h2>分享标题</h2>
                <div className="field">
                  <input
                    type="text"
                    className="control"
                    placeholder="请填写分享名片到微信等平台的标题"
                    value={props.share_title}
                    onChange={props.handleStrChange.bind(this, 'share_title')} />
                </div>
              </div>
              <div className="panel">
                <h2>分享语</h2>
                <div className="field">
                  <input
                    type="text"
                    className="control"
                    placeholder="请填写分享名片到微信等平台的分享语"
                    value={props.share_desc}
                    onChange={props.handleStrChange.bind(this, 'share_desc')} />
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
        <Selector
          ref="selector"
          items={this.state.selectorData}
          onSelect={this.handleSelectorSelected.bind(this)}
          onCancel={this.handleSelectorCancel.bind(this)}
        />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </div>
    );
  }
}

ReactDOM.render(<CreateBizCardPage />, document.querySelector('.page'));
