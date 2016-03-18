import Promise from 'promise';

/**
 * 获取名片和用户简介
 * @param  {String} uid 可选
 * @return {Promise}
 */
export var MainBizCard = (uid) => {
  return new Promise((resolve, reject) => {
    let data = {};
    if (uid) {
      data.uid = uid;
    }

    $.ajax({
      url: '/pim/query_user_card_desc',
      type: 'GET',
      cache: false,
      data: data,
      success: resolve,
      error: reject
    });
  });
}

/**
 * 获取名片详情
 * @param  {String} cid 名片ID
 * @return {Promise}
 */
export var BizCardDetail = (cid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/query_card_desc',
      type: 'GET',
      cache: false,
      data: {
        cid: cid
      },
      success: resolve,
      error: reject
    });
  });
}

/**
 * 我的名片列表
 * @return {Promise}
 */
export var MyBizCardList = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/query_user_cards',
      type: 'GET',
      cache: false,
      success: resolve,
      error: reject
    });
  });
}

/**
 * 删除我的名片
 * @param  {String} cid 名片ID
 * @return {Promise}
 */
export var DelMyBizCard = (cid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/del_my_card',
      type: 'POST',
      data: {
        cid: cid
      },
      success: resolve,
      error: reject
    });
  });
}

/**
 * 设置默认名片
 * @param {String} cid 名片ID
 * @return {Promise}
 */
export var SetMainBizCard = (cid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/set_main_card',
      type: 'POST',
      data: {
        cid: cid
      },
      success: resolve,
      error: reject
    });
  });
}

/**
 * 获取我的名片分组
 * @return {Promise}
 */
export var BizCardGroups = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/query_my_card_groups',
      type: 'GET',
      cache: false,
      success: resolve,
      error: reject
    });
  });
}

/**
 * 移动好友到指定分组
 * @param  {String} fid 名片好友的 uid
 * @param  {String} gid 分组 id
 * @return {Promise}
 */
export var ChangeGroupOfFriend = (fid, gid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/move_my_card_friend',
      type: 'POST',
      data: {
        friendly_uid: fid,
        gid: gid
      },
      success: resolve,
      error: reject
    });
  })
}

/**
 * 删除名片好友
 * @param {String} fid 名片好友的 uid
 * @return {Promise}
 */
export var RemoveFriendBizCard = (fid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/del_my_card_friend',
      type: 'POST',
      data: {
        friendly_uid: fid
      },
      success: resolve,
      error: reject
    });
  });
}

const ASK_URL = {
  bc: {
    get: '/pim/query_card_askfor',
    handle: '/pim/handle_card_askfor'
  },
  ab: {
    get: '/pim/query_addlist_askfor',
    handle: '/pim/handle_addlist_askfor'
  }
};

/**
 * 查询申请状态
 * @param  {String} asktype 申请类型 'bc' 或 'ab'
 * @param  {String} askfor 申请 id
 * @return {Promise}
 */
export var BizCardAskStatus = (asktype, askfor) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: ASK_URL[asktype].get,
      type: 'GET',
      cache: false,
      data: {
        askfor: askfor
      },
      success: resolve,
      error: reject
    });
  });
}

/**
 * 申请处理
 * @param  {String} asktype 申请类型 'bc' 或 'ab'
 * @param  {String} askfor  申请 id
 * @param  {String} status  处理状态
 * @return {Promise}
 */
export var HandleBizCardAsk = (asktype, askfor, status) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: ASK_URL[asktype].handle,
      type: 'POST',
      data: {
        askfor: askfor,
        status: status
      },
      success: resolve,
      error: reject
    });
  })
}

export var SwapBizCard = (fid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/swap_card',
      type: 'POST',
      data: {
        friendly_uid: fid
      },
      success: resolve,
      error: reject
    });
  });
}
