import Promise from 'promise/lib/es6-extensions';

/**
 * 消息总量
 * @return {Promise}
 */
export var MsgCount = () => {
  return fetch('/pim/query_msgs_count');

  // return new Promise((resolve, reject) => {
  //   $.ajax({
  //     url: '/pim/query_msgs_count',
  //     type: 'GET',
  //     cache: false,
  //     success: resolve,
  //     error: reject
  //   });
  // });
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
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/query_notice_list',
      type: 'GET',
      cache: false,
      data: {
        ntype: ntype
      },
      success: resolve,
      error: reject
    });
  });
}

/**
 * 私信列表
 * @return {Promise}
 */
export var PrivateMsgList = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/query_pivmsg_list',
      type: 'GET',
      cache: false,
      success: resolve,
      error: reject
    });
  });
}

/**
 * 与名片好友的私信
 * @param  {String} fid 名片好友ID
 * @return {Promise}
 */
export var PrivateMsgWithFriend = (fid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/query_piv_msg',
      type: 'GET',
      cache: false,
      data: {
        friendly_uid: fid
      },
      success: resolve,
      error: reject
    });
  });
}

/**
 * 发送私信给名片好友
 * @param  {String} fid 名片好友ID
 * @param  {String} msg 私信内容
 * @return {Promise}
 */
export var SendPrivateMsg = (fid, msg) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/send_piv_msg',
      type: 'POST',
      data: {
        friendly_uid: fid,
        msg: msg
      },
      success: resolve,
      error: reject
    });
  });
}
