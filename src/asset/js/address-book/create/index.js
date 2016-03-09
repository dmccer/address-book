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

import AjaxError from '../../ajax-err/';
import {FieldChangeEnhance} from '../../enhance/field-change';
import Validator from '../../validator/';
import SubHeader from '../../sub-header/';
import Loading from '../../loading/';
import Private from '../../private/';
import Toast from '../../toast/';
import Log from '../../log/';

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

  componentDidMount() {
    AjaxError.init(this.refs.toast);
  }

  validate() {
    if (Validator.empty(this.props.aname)) {
      this.refs.toast.warn('通讯录名称不能为空');
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

    this.refs.loading.show('保存中...');

    new Promise((resolve, reject) => {
      $.ajax({
        url: '/mvc/pim/create_addlist',
        type: 'POST',
        data: {
          atype: this.state.qs.atype,
          aname: this.props.aname,
          arequires: this.getSelectedBizCardFieldVals(),
          adesc: this.props.adesc,
          aquestion: this.props.aquestion
        },
        success: resolve,
        error: reject
      });
    }).then((res) => {
      if (res.retcode === 0) {
        this.refs.toast.success('发起通讯录成功');

        setTimeout(() => {
          let qs = querystring.stringify({
            id: res.aid,
            create: 1
          });

          location.href = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `/address-book-detail.html?${qs}`);
        }, 2000);
        return;
      }
    }).catch((err) => {
      if (err && err instanceof Error) {
        this.refs.toast.warn(`发起通讯录出错,${err.message}`);
      }
    }).done(() => {
      this.refs.loading.close();
    });
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
        <SubHeader title="新建通讯录" />
        <div className="ab-create">
          <form className="form" onSubmit={this.handleSubmit.bind(this)}>
            <div className="ab-name field">
              <input
                className="control"
                type="text"
                placeholder="这里输入通讯录名称"
                value={props.aname}
                onChange={props.handleStrChange.bind(this, 'aname')} />
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
            <button type="submit" className="btn block lightBlue submit">确定发起</button>
          </form>
        </div>
        <Private />
        <Loading ref="loading" />
        <Toast ref="toast" />
      </section>
    );
  }
}

ReactDOM.render(<ABCreatePage />, document.querySelector('.page'));
