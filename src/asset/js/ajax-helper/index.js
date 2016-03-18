/**
 * AjaxHelper
 *
 * @Author xiaoyunhua@ttyhuo.cn
 *
 * Usage:
 *
 * componentDidMount() {
 * 		this.ajaxHelper = new AjaxHelper(this.refs.loading, this.refs.toast);
 * }
 *
 * fetch() {
 * 		this.ajaxHelper.one(MainBizCard, res => {
 * 			// code
 * 		}, uid);
 *
 * 		this.ajaxHelper.all([MainBizCard, BizCardDetail], res => {
 * 			// code
 * 		}, [uid, cid]);
 * }
 */
import Promise from 'promise';
import AjaxError from '../ajax-err/';
import Log from '../log/';

export default class AjaxHelper {
  constructor(loading, toast) {
    if (!loading && !toast) {
      this.silent = true;

      return;
    }

    this.loading = loading;
    this.toast = toast;

    AjaxError.init(this.toast);
  }

  all(models: Array<Object>, cb: Function, ...args) {
    if (!this.silent) {
      this.loading.show('请求中...');
    }

    let ps = models.map((model, index) => {
      return model.apply(this, args[index]).then(res => {
        if (res.retcode === 0) {
          return res;
        }

        if (!this.silent) {
          this.toast.warn(res.msg);
        }
      });
    });

    Promise
      .all(ps)
      .then(cb)
      .catch(err => {
        if (err && err instanceof Error) {
          Log.error(err);

          if (!this.silent) {
            this.toast.warn(`有点不对劲,${err.message}`);
          }
        }
      })
      .done(() => {
        if (!this.silent) {
          this.loading.close();
        }
      });
  }

  one(model: Object, cb: Function, ...args) {
    if (!this.silent) {
      this.loading.show('请求中...');
    }

    model.apply(this, args)
      .then(res => {
        if (res.retcode === 0) {
          return cb(res);
        }

        if (!this.silent) {
          this.toast.warn(res.msg);
        }
      })
      .catch(err => {
        if (err && err instanceof Error) {
          Log.error(err);
          if (!this.silent) {
            this.toast.warn(`有点不对劲,${err.message}`);
          }
        }
      })
      .done(() => {
        if (!this.silent) {
          this.loading.close();
        }
      });
  }
}
