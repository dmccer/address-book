import Promise from 'promise';

/**
 * 发送验证码
 * @param  {String} tel 手机号
 * @return {Promise}
 */
export var SendVerifyCode = (tel) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/send_verify_code',
      type: 'POST',
      data: {
        tel: tel
      },
      success: resolve,
      error: reject
    });
  });
}

/**
 * 登录
 * @param {Object} params
 * @param {String} params.tel 手机号
 * @param {String} params.code 验证码
 * @param {String} params.wx_code 微信中，url 上的查询参数 code
 * @param {String} params.source 用户登录来源 'h5', 'app' ...
 * @return {Promise}
 */
export var Login = (params) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/login',
      type: 'POST',
      data: params,
      success: resolve.bind(this),
      error: reject.bind(this)
    });
  });
}

/**
 * 获取用户信息
 * @return {Promise}
 */
export var UserInfo = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/fetch_uinfo',
      type: 'GET',
      cache: false,
      success: resolve,
      error: reject
    });
  });
}

/**
 * 更换用户头像
 * @param  {String} avatar 头像微信 media ID
 * @return {Promise}
 */
export var UpdateUserAvatar = (avatar) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/upload_user_photo',
      type: 'POST',
      data: {
        uphoto_mid: avatar
      },
      success: resolve,
      error: reject
    });
  });
}

/**
 * 签到
 * @return {Promise}
 */
export var Signin = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/book_in',
      type: 'POST',
      success: resolve,
      error: reject
    });
  });
}

/**
 * 查询最近积分记录
 * @return {Promise}
 */
export var MyRecentScoreActionList = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/pim_score_list',
      type: 'GET',
      cache: false,
      success: resolve,
      error: reject
    });
  });
}

/**
 * 查询我的实名认证信息
 * @return {Promise}
 */
export var MyVerifyInfo = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/query_user_verify',
      type: 'GET',
      cache: false,
      success: resolve,
      error: reject
    });
  });
}

/**
 * 撤销名片认证
 * @return {Promise}
 */
export var RevokeMyVerify = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/revoke_user_verify',
      type: 'POST',
      success: resolve,
      error: reject
    });
  });
}

/**
 * 申请名片认证
 * @param  {String} bizCard 名片或工牌图片微信 media_id
 * @param  {String} IDCard  身份证图片微信 media_id
 * @return {Promise}
 */
export var UploadMyVerify = (bizCard, IDCard) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/upload_user_verify',
      type: 'POST',
      data: {
        namecard_mid: bizCard,
        idcard_mid: IDCard
      },
      success: resolve,
      error: reject
    });
  });
}
