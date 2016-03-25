import Promise from 'promise/lib/es6-extensions';
import querystring from 'querystring';
import assign from 'lodash/object/assign';
import {POST_OPT, GET_OPT} from '../../const/fetch';

/**
 * 消息总量
 * @return {Promise}
 */
export var MsgCount = () => {
  return fetch('/pim/query_msgs_count', GET_OPT);
}

/**
 * 分类消息列表
 * @param  {Number} ntype 消息类别
 * ntype 的值如下：
 * 1: 申请加入通讯录消息
 * 2: 通讯录加入申请回复消息
 * 3: 名片交换申请消息
 * 4: 名片交换申请回复消息
 * 5: 私信消息
 * @return {Promise}
 */
export var NoticeList = (ntype) => {
  let qs = querystring.stringify({
    ntype: ntype
  });
  return fetch(`/pim/query_notice_list?${qs}`, GET_OPT);
}

/**
 * 私信列表
 * @return {Promise}
 */
export var PrivateMsgList = () => {
  return fetch('/pim/query_pivmsg_list', GET_OPT);
}

/**
 * 与名片好友的私信
 * @param  {String} fid 名片好友ID
 * @return {Promise}
 */
export var PrivateMsgWithFriend = (fid) => {
  let qs = querystring.stringify({
    friendly_uid: fid
  });
  return fetch(`/pim/query_piv_msg?${qs}`, GET_OPT);
}

/**
 * 发送私信给名片好友
 * @param  {String} fid 名片好友ID
 * @param  {String} msg 私信内容
 * @return {Promise}
 */
export var SendPrivateMsg = (fid, msg) => {
  return fetch('/pim/send_piv_msg', assign({
    body: querystring.stringify({
      friendly_uid: fid,
      msg: msg
    })
  }, POST_OPT));
}
