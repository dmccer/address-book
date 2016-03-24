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
import Promise from 'promise/lib/es6-extensions';
import AjaxError from '../ajax-err/';
import Log from '../log/';

const noop = () => {};

export default class AjaxHelper {
  constructor(loading, toast) {
    this.loading = loading;
    this.toast = toast;

    this.loadingState = !!loading;
    this.toastState = !!toast;

    this.toastState && AjaxError.init(this.toast);
  }

  all(models: Array<Object>, cb: Object, ...args) {
    let ok, fail = noop;

    if (typeof cb === 'function') {
      ok = cb;
    } else {
      ok = cb.success;
      fail = cb.error;
    }

    this.loadingState && this.loading.show('请求中...');

    let ps = models.map((model, index) => {
      return model.apply(this, args[index]).then(res => {
        if (res.retcode === 0) {
          return res;
        }

        this.toastState && this.toast.warn(res.msg);
      });
    });

    Promise
      .all(ps)
      .then(ok, fail)
      .catch(err => {
        if (err && err instanceof Error) {
          Log.error(err);

          // this.toastState && this.toast.warn(`有点不对劲,${err.message}`);
        }
      })
      .done(() => {
        this.loadingState && this.loading.close();
      });
  }

  one(model: Object, cb: Object, ...args) {
    let ok, fail = noop;

    if (typeof cb === 'function') {
      ok = cb;
    } else {
      ok = cb.success;
      fail = cb.error;
    }

    this.loadingState && this.loading.show('请求中...');

    model.apply(this, args)
      .then(res => {
        if (res.retcode === 0) {
          return ok(res);
        }

        this.toastState && this.toast.warn(res.msg);
        fail(res);
      }, fail)
      .catch(err => {
        if (err && err instanceof Error) {
          Log.error(err);

          // this.toastState && this.toast.warn(`有点不对劲,${err.message}`);
        }
      })
      .done(() => {
        this.loadingState && this.loading.close();
      });
  }
}
