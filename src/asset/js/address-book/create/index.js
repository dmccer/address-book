/**
 * ABCreatePage 创建通讯录页面
 *
 * @author Kane xiaoyunhua@ttyhuo.cn
 */
import '../../../less/global/global.less';
import '../../../less/component/layout.less';
import '../../../less/component/form.less';
import '../../../less/component/icon.less';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';
import querystring from 'querystring';

import AjaxHelper from '../../ajax-helper/';
import {FieldChangeEnhance} from '../../enhance/field-change';
import Validator from '../../validator/';
import SubHeader from '../../sub-header/';
import Loading from '../../loading/';
import Private from '../../private/';
import Toast from '../../toast/';
import FixedHolder from '../../fixed-holder/';
import {ABBaseInfo, UpdateAB, CreateAB} from '../model/';

@FieldChangeEnhance
export default class ABCreatePage extends React.Component {
  state = {
    bizCardFields: [
      {
        name: '常跑路线',
        value: 'start_addr,end_addr'
      }, {
        name: '公司名称',
        value: 'com_name'
      }, {
        name: '公司职位',
        value: 'com_position'
      }, {
        name: '公司地址',
        value: 'com_addr'
      }
    ],
    maxAdescLength: 90,
    qs: querystring.parse(location.search.substring(1))
  };

  constructor() {
    super();
  }

  componentWillMount() {
    this.setState({
      editMod: $.trim(this.state.qs.aid) !== ''
    });
  }

  componentDidMount() {
    this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);

    if (this.state.editMod) {
      this.fetch();
    }
  }

  fetch() {
    this.ajaxHelper.one(ABBaseInfo, res => {
      let abInfo = res.addlist_card;

      this.props.setFields({
        aname: abInfo.aname,
        adesc: abInfo.adesc,
        aquestion: abInfo.aquestion
      });

      let bizCardFields = this.state.bizCardFields;
      bizCardFields.forEach((field) => {
        if (abInfo.arequires.indexOf(field.value) !== -1) {
          field.selected = true;
        }
      });
      this.setState({
        abInfo: abInfo,
        bizCardFields: bizCardFields
      });
    }, this.state.qs.aid);
  }

  validate() {
    if (Validator.empty(this.props.aname)) {
      this.refs.toast.warn('通讯录名称不能为空');
      return false;
    }

    if (Validator.empty(this.props.adesc)) {
      this.refs.toast.wanr('通讯录描述不能为空');
      return false;
    }

    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.validate()) {
      return;
    }

    let params = {
      atype: this.state.qs.atype,
      aname: this.props.aname,
      arequires: this.getSelectedBizCardFieldVals(),
      adesc: this.props.adesc,
      aquestion: this.props.aquestion
    };

    if (this.state.editMod) {
      params.aid = this.state.qs.aid;

      return this.ajaxHelper.one(UpdateAB, res => {
        this.refs.toast.success('编辑通讯录成功');

        setTimeout(() => {
          let qs = querystring.stringify({
            id: res.aid
          });

          location.href = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `/address-book-detail.html?${qs}`);
        }, 2000);
      }, params);
    }

    this.ajaxHelper.one(CreateAB, res => {
      this.refs.toast.success('发起通讯录成功');

      setTimeout(() => {
        let qs = querystring.stringify({
          id: res.aid,
          create: 1
        });

        location.href = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `/address-book-detail.html?${qs}`);
      }, 2000);
    }, params);
  }

  handleToggleSelectBizCardField(field: Object) {
    let fields = this.state.bizCardFields;
    let index = this.state.bizCardFields.indexOf(field);
    fields[index].selected = !field.selected;

    this.setState({
      bizCardFields: fields
    });
  }

  getSelectedBizCardFieldVals() {
    let selectedFields = this.state.bizCardFields.filter((field) => {
      return field.selected;
    });

    if (selectedFields && selectedFields.length) {
      return selectedFields.map((field) => {
        return field.value;
      }).join();
    }

    return null;
  }

  renderBizCardFields() {
    return this.state.bizCardFields.map((field, index) => {
      let icon = field.selected ? <i className="icon icon-ok"></i> : null;
      return (
        <li
          className={field.selected ? 'selected' : ''}
          key={`biz-card-field-item_${index}`}
          onClick={this.handleToggleSelectBizCardField.bind(this, field)}>
          <span>{field.name}</span>
          {icon}
        </li>
      );
    });
  }

  render() {
    let props = this.props;

    return (
      <section className="ab-create-page">
        <SubHeader title={`${this.state.editMod ? '编辑' : '新建'}通讯录`} />
        <div className="ab-create">
          <form className="form" onSubmit={this.handleSubmit.bind(this)}>
            <div className="ab-name field">
              <input
                className="control"
                type="text"
                placeholder="这里输入通讯录名称"
                value={props.aname}
                onChange={props.handleStrChange.bind(this, 'aname')} />
              <i className="star">*</i>
            </div>
            <div className="panel-field">
              <p>申请加入通讯录，需提供的名片必须信息:</p>
              <ul className="biz-card-fields">
                {this.renderBizCardFields()}
              </ul>
            </div>
            <div className="panel-field">
              <p>描述说明:</p>
              <div className="field">
                <textarea
                  className="control"
                  rows="5"
                  placeholder="这里输入对通讯录的描述..."
                  value={props.adesc}
                  onChange={props.handleLimitStrChange.bind(this, 'adesc', this.state.maxAdescLength)}></textarea>
                <i className="star">*</i>
                <span className="char-count">{props.adesc && props.adesc.length || 0}/{this.state.maxAdescLength}</span>
              </div>
            </div>
            <div className="panel-field">
              <p>验证问题:</p>
              <div className="field question">
                <input
                  type="text"
                  className="control"
                  placeholder="如: 你是车主还是货主?"
                  value={props.aquestion}
                  onChange={props.handleStrChange.bind(this, 'aquestion')}
                />
              </div>
            </div>
            <button type="submit" className="btn block green submit">保存通讯录</button>
          </form>
        </div>
        <Private />
        <FixedHolder height="44" />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<ABCreatePage />, document.querySelector('.page'));
