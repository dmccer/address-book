import './index.less';

import React from 'react';

import cx from 'classnames';
import ReactIScroll from 'react-iscroll';
import IScroll from 'iscroll/build/iscroll';
import Promise from 'promise';

import find from 'lodash/collection/find';
import Loading from '../loading/';
import Popover from '../popover/';
import AjaxHelper from '../ajax-helper/';
import {Cities} from './model';

const ALL = '不限';

export default class AddressSelector extends React.Component {
  static defaultProps = {
    options: {
      mouseWheel: true,
      // click: true,
      scrollbars: true,
      fadeScrollbars: true,
      interactiveScrollbars: true,
      shrinkScrollbars: 'scale'
    },
    onSelectHistory: () => {},
    onSelectArea: () => {},
    onSelectCity: () => {},
    onSelectProvince: () => {},
    onCancel: () => {},
    onClose: () => {},
    onShow: () => {},
    done: () => {}
  };

  state = {
    historyCities: [],
    provinces: [],
    cities: [],
    areas: []
  };

  constructor() {
    super();
  }

  show() {
    this.setState({
      on: true
    });

    this.props.onShow();
  }

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper(this.refs.loading);

    // 若获取过省份列表，则直接展示，无须再次请求
    if (this.state.provinces && this.state.provinces.length) {
      return;
    }

    this.fetchProvinces();
  }

  /**
   * 获取选中的数据在列表中的索引位置
   * @param  {String} field    字段
   * @param  {String} listName 列表字段
   */
  getIndex(field, listName) {
    return this.state[listName].indexOf(this.state[field]);
  }

  /**
   * 获取省份列表
   */
  fetchProvinces() {
    this.ajaxHelper.one(Cities, res => {
      this.setState({
        provinces: res.resultList
      });
    });
  }

  /**
   * 获取城市列表
   */
  fetchCities() {
    this.ajaxHelper.one(Cities, res => {
      this.setState({
        cities: res.resultList
      });
    }, this.getIndex('province', 'provinces'));
  }

  /**
   * 获取地区列表
   */
  fetchAreas() {
    this.ajaxHelper.one(Cities, res => {
      this.setState({
        areas: res.resultList
      });
    }, this.getIndex('province', 'provinces'), this.getIndex('city', 'cities'));
  }

  /**
   * 处理选择地区
   */
  select_area(area) {
    this.setState({
      area: area
    }, () => {
      this.props.onSelectArea(area, this.state.city, this.state.province);

      if (area === ALL) {
        // this.done();

        return;
      }

      // this.done();
    });
  }

  /**
   * 处理选择城市
   */
  select_city(city) {
    this.setState({
      city: city
    }, () => {
      this.props.onSelectCity(city, this.state.province);

      if (city === ALL) {
        // this.done();

        return;
      }

      this.fetchAreas();
    });
  }

  /**
   * 处理选择省份
   */
  select_province(province) {
    this.setState({
      province: province
    }, () => {
      this.props.onSelectProvince(province);

      if (province === ALL) {
        // this.done();
        return;
      }

      this.fetchCities();
    });
  }

  /**
   * 完成地址选择
   */
  done() {
    let province = this.state.province;
    let city = this.state.city;
    let area = this.state.area;

    this.props.done(province, city, area);
    this.close();
  }

  /**
   * 清除选中数据
   */
  clear() {
    this.setState({
      province: null,
      city: null,
      area: null
    });
  }

  /**
   * 关闭地址选择器
   */
  close() {
    this.clear();

    this.setState({
      on: false
    });

    this.props.onClose();
  }

  /**
   * 点击空白区域取消选择
   */
  cancel(e) {
    if (e.currentTarget !== e.target) {
      return;
    }

    this.close();

    let province = this.state.province;
    let city = this.state.city;
    let area = this.state.area;

    this.props.onCancel(province, city, area);
  }

  /**
   * 展示城市或省份或地区项
   */
  renderItem(list, field) {
    return list.map((item, index) => {
      return (
        <li key={`${field}_${item}`} onTouchTap={this[`select_${field}`].bind(this, item)}>{item}</li>
      );
    });
  }

  renderItems() {
    if (!this.state.province) {
      return this.renderItem(this.state.provinces, 'province');
    }

    if (!this.state.city) {
      return this.renderItem(this.state.cities, 'city');
    }

    return this.renderItem(this.state.areas, 'area');
  }

  render() {
    let cxs = cx('address-selector', this.state.on ? 'on' : '');

    return (
      <div
        className={cxs}
        onClick={this.cancel.bind(this)}>
        <div className="list">
          <ReactIScroll
            iScroll={IScroll}
            options={this.props.options}>
            <ul>
              {this.renderItems()}
            </ul>
          </ReactIScroll>
        </div>
        <ul className="selected">
          <li>{this.state.province || '省份'}</li>
          <li>{this.state.city || '城市'}</li>
          <li>{this.state.area || '县/区'}</li>
          <li
            className="confirm"
            onClick={this.done.bind(this)}>确定</li>
        </ul>
        <Loading ref="loading" />
        <Popover ref="popover" />
      </div>
    );
  }
}
