import querystring from 'querystring';
import Log from '../log/';

let AjaxErrorHandler = {
  init: (toast) => {
    AjaxErrorHandler.toast = toast;
    AjaxErrorHandler.listen();
  },

  listen: () => {
    $(document).on('ajaxError', (e, xhr, opts, err) => {
      Log.error(xhr.responseText);

      if (xhr.status === 403) {
        AjaxErrorHandler.toast.warn('未登录,进入登录页面中...');

        setTimeout(() => {
          let qs = querystring.stringify({
            ref: location.href
          });

          location.href = location.protocol + '//' + location.host + location.pathname.replace(/\/[^\/]+$/, `/login.html?${qs}`);
        }, 2000);

        return;
      }

      AjaxErrorHandler.toast.warn(`请求服务器出错, ${xhr.statusText}`);
    });
  }
};

export default AjaxErrorHandler;
