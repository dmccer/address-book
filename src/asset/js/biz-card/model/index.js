import Promise from 'promise/lib/es6-extensions';

/**
 * 创建名片
 * @param  {Object} params 名片字段
 * @return {Promise}
 */
export var CreateBizCard = (params) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/create_card',
      type: 'POST',
      data: params,
      success: resolve,
      error: reject
    });
  });
}

/**
 * 修改名片信息
 * @param  {Object} params 名片字段，必须包含 cid
 * @return {Promise}
 */
export var UpdateBizCard = (params) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/edit_card',
      type: 'POST',
      data: params,
      success: resolve,
      error: reject
    });
  });
}

/**
 * 车型列表
 * @return {Promise}
 */
export var AllTrucks = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/all_trucks',
      type: 'GET',
      cache: false,
      success: resolve,
      error: reject
    });
  });
}

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
 * 搜索我的名片好友
 * @param  {String} keyword 关键字
 * @return {Promise}
 */
export var SearchMyCardFriends = (keyword) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/search_my_card_friends',
      type: 'GET',
      cache: false,
      data: {
        keyword: keyword
      },
      success: resolve,
      error: reject
    });
  });
}

/**
 * 某一分组下的好友名片
 * @param  {String} gid 名片分组 ID
 * @return {Promise}
 */
export var BizCardFriendsOfGroup = (gid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/query_card_friends',
      type: 'GET',
      cache: false,
      data: {
        gid: gid
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
 * 新建名片分组
 * @param  {String} gname 名片分组名称
 * @return {Promise}
 */
export var CreateBizCardGroup = (gname) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/create_card_group',
      type: 'POST',
      data: {
        groupname: gname
      },
      success: resolve,
      error: reject
    });
  })
}

/**
 * 修改名片分组名称
 * @param  {String} gid 名片分组 ID
 * @param  {String} gname 名片分组名称
 * @return {Promise}
 */
export var RenameBizCardGroup = (gid, gname) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/rename_card_group',
      type: 'POST',
      data: {
        gid: gid,
        groupname: gname
      },
      success: resolve,
      error: reject
    });
  });
}

/**
 * 删除名片分组
 * @param  {String} gid 需要删除的名片分组 ID
 * @return {Promise}
 */
export var DelBizCardGroup = (gid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/del_my_card_group',
      type: 'POST',
      data: {
        gid: gid
      },
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

/**
 * 交换名片
 * @param  {String} fid 名片好友 uid
 * @return {Promise}
 */
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
