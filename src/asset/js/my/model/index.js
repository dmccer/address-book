import Promise from 'promise/lib/es6-extensions';
import querystring from 'querystring';
import assign from 'lodash/object/assign';
import {POST_OPT, GET_OPT} from '../../const/fetch';

/**
 * 发送验证码
 * @param  {String} tel 手机号
 * @return {Promise}
 */
export var SendVerifyCode = (tel) => {
  return fetch('/pim/send_verify_code', assign({
    body: querystring.stringify({
      tel: tel
    })
  }, POST_OPT));
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
  return fetch('/pim/login', assign({
    body: querystring.stringify(params)
  }, POST_OPT));
}

/**
 * 获取用户信息
 * @return {Promise}
 */
export var UserInfo = () => {
  return fetch('/pim/fetch_uinfo', GET_OPT);
}

/**
 * 更换用户头像
 * @param  {String} avatar 头像微信 media ID
 * @return {Promise}
 */
export var UpdateUserAvatar = (avatar) => {
  return fetch('/pim/upload_user_photo', assign({
    body: querystring.stringify({
      uphoto_mid: avatar
    })
  }, POST_OPT));
}

/**
 * 签到
 * @return {Promise}
 */
export var Signin = () => {
  return fetch('/pim/book_in', POST_OPT);
}

/**
 * 查询最近积分记录
 * @return {Promise}
 */
export var MyRecentScoreActionList = () => {
  return fetch('/pim/pim_score_list', GET_OPT);
}

/**
 * 查询我的实名认证信息
 * @return {Promise}
 */
export var MyVerifyInfo = () => {
  return fetch('/pim/query_user_verify', GET_OPT);
}

/**
 * 撤销名片认证
 * @return {Promise}
 */
export var RevokeMyVerify = () => {
  return fetch('/pim/revoke_user_verify', POST_OPT);
}

/**
 * 申请名片认证
 * @param  {String} bizCard 名片或工牌图片微信 media_id
 * @param  {String} IDCard  身份证图片微信 media_id
 * @return {Promise}
 */
export var UploadMyVerify = (bizCard, IDCard) => {
  return fetch('/pim/upload_user_verify', assign({
    body: querystring.stringify({
      namecard_mid: bizCard,
      idcard_mid: IDCard
    })
  }, POST_OPT));
}
