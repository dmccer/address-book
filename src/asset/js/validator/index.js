let Validator = {
  config: (toast) => {
    Validator.toast = toast;
  },

  empty: (s) => {
    s = $.trim(s);

    return s === '';
  },

  required: (s) => {
    s = $.trim(s);

    return s !== '';
  },

  len: (s, size) => {
    s = $.trim(s);

    return s.length === size;
  },

  test: (rule, msg, ...args) => {
    let r = Validator[rule].apply(Validator, args);

    if (!Validator.toast) {
      throw Error('Validator 没有配置 toast 参数');
    }

    if (!r) {
      Validator.toast.warn(msg);
    }

    return r;
  }
};

export default Validator;
