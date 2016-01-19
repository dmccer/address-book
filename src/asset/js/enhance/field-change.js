import React from 'react';

// for validate
// const FLOAT_REG = /^(([1-9]{1}\d*)|(0))\.\d+$/;
// const INT_REG = /^\d+$/;

export var FieldChangeEnhance = ComposedComponent => class extends React.Component {
  static displayName = 'ComponentEnhancedWithFieldChangeHandler';

  state = {};

  constructor(props) {
    super(props);
  }

  // 纯数字字符串或整数
  handleIntegerChange(field: String, e: Object) {
    this.setState({
      [field]: $.trim(e.target.value).replace(/[^\d]/g, '')
    });
  }

  // 小数或整数
  handleFloatChange(field: String, e: Object) {
    this.setState({
      [field]: $.trim(e.target.value).replace(/[^\d\.]/, '')
    })
  }

  // 字符串
  handleStrChange(field: String, e: Object) {
    this.setState({
      [field]: $.trim(e.target.value).replace(/[^\s]/, '')
    });
  }

  // 手机号
  handleMobileNoChange(field: String, e: Object) {
    this.setState({
      [field]: $.trim(e.target.value).replace(/[^\d]/, '').substring(0, 11)
    });
  }

  render() {
    return (
      <ComposedComponent
        {...this.props}
        {...this.state}
        handleIntegerChange={this.handleIntegerChange.bind(this)}
        handleFloatChange={this.handleFloatChange.bind(this)}
        handleStrChange={this.handleStrChange.bind(this)}
        handleMobileNoChange={this.handleMobileNoChange.bind(this)}
      />
    );
  }
}
