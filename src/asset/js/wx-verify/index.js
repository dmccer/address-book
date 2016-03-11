/**
 * JS-SDK 微信验证
 *
 * Usage:
 *
 * // 微信验证成功，JS-SDK 准备完毕回调
 * function callback() {}
 *
 * // 微信验证参数
 * let conf = {
 *  url: '/api/bbs_v2/jsapi',
 * 	appId: 'wx13306fcc7460426e',
 * 	jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage']
 * }
 *
 * // 验证
 * WXVerify(conf, callback);
 */

let WXVerify = (conf, cb) => {
  if (!conf) {
    throw new Error('WXVerify 缺少 conf 参数');
  }

  if (!conf.appId) {
    throw new Error('WXVerify 配置缺少 appId');
  }

  if (!conf.jsApiList || !conf.jsApiList.length) {
    throw new Error('WXVerify 配置缺少 jsApiList');
  }

  let url = encodeURIComponent(location.href.split('#')[0]);

  $.getJSON(`${conf.url}?url=${url}`, null, (data) => {
    if (!data) {
      throw new Error('获取签名失败');
    }

    wx.config({
      debug: false,
      appId: conf.appId,
      timestamp: data.timestamp,
      nonceStr: data.noncestr,
      signature: data.signature,
      jsApiList: conf.jsApiList
    });

    wx.ready(cb);
    wx.error((...args) => {
      alert(JSON.stringify(args));
      alert('微信验证失败');
      args.unshift(new Error('微信验证失败'));

      cb && cb.apply(this, args);
    });
  });
}

export default WXVerify;
