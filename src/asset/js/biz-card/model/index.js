import Promise from 'promise/lib/es6-extensions';
import querystring from 'querystring';
import assign from 'lodash/object/assign';
import {POST_OPT, GET_OPT} from '../../const/fetch';

/**
 * 创建名片
 * @param  {Object} params 名片字段
 * @return {Promise}
 */
export var CreateBizCard = (params) => {
  return fetch('/pim/create_card', assign({
    body: querystring.stringify(params)
  }, POST_OPT));
}

/**
 * 修改名片信息
 * @param  {Object} params 名片字段，必须包含 cid
 * @return {Promise}
 */
export var UpdateBizCard = (params) => {
  return fetch('/pim/edit_card', assign({
    body: querystring.stringify(params)
  }, POST_OPT));
}

/**
 * 车型列表
 * @return {Promise}
 */
export var AllTrucks = () => {
  return fetch('/pim/all_trucks', GET_OPT);
}

/**
 * 获取名片和用户简介
 * @param  {String} uid 可选
 * @return {Promise}
 */
export var MainBizCard = (uid) => {
  let data = {};
  if (uid) {
    data.uid = uid;
  }

  let qs = querystring.stringify(data);
  return fetch(`/pim/query_user_card_desc?${qs}`, GET_OPT);
}

/**
 * 获取名片详情
 * @param  {String} cid 名片ID
 * @return {Promise}
 */
export var BizCardDetail = (cid) => {
  let qs = querystring.stringify({
    cid: cid
  });
  return fetch(`/pim/query_card_desc?${qs}`, GET_OPT);
}

/**
 * 我的名片列表
 * @return {Promise}
 */
export var MyBizCardList = () => {
  return fetch('/pim/query_user_cards', GET_OPT);
}

/**
 * 删除我的名片
 * @param  {String} cid 名片ID
 * @return {Promise}
 */
export var DelMyBizCard = (cid) => {
  return fetch('/pim/del_my_card', assign({
    body: querystring.stringify({
      cid: cid
    })
  }, POST_OPT));
}

/**
 * 设置默认名片
 * @param {String} cid 名片ID
 * @return {Promise}
 */
export var SetMainBizCard = (cid) => {
  return fetch('/pim/set_main_card', assign({
    body: querystring.stringify({
      cid: cid
    })
  }, POST_OPT));
}

/**
 * 搜索我的名片好友
 * @param  {String} keyword 关键字
 * @return {Promise}
 */
export var SearchMyCardFriends = (keyword) => {
  let qs = querystring.stringify({
    keyword: keyword
  });

  return fetch(`/pim/search_my_card_friends?${qs}`, GET_OPT);
}

/**
 * 某一分组下的好友名片
 * @param  {String} gid 名片分组 ID
 * @return {Promise}
 */
export var BizCardFriendsOfGroup = (gid) => {
  let qs = querystring.stringify({
    gid: gid
  });
  return fetch(`/pim/query_card_friends?${qs}`, GET_OPT);
}

/**
 * 获取我的名片分组
 * @return {Promise}
 */
export var BizCardGroups = () => {
  return fetch('/pim/query_my_card_groups', GET_OPT);
}

/**
 * 新建名片分组
 * @param  {String} gname 名片分组名称
 * @return {Promise}
 */
export var CreateBizCardGroup = (gname) => {
  return fetch('/pim/create_card_group', assign({
    body: querystring.stringify({
      groupname: gname
    })
  }, POST_OPT));
}

/**
 * 修改名片分组名称
 * @param  {String} gid 名片分组 ID
 * @param  {String} gname 名片分组名称
 * @return {Promise}
 */
export var RenameBizCardGroup = (gid, gname) => {
  return fetch('/pim/rename_card_group', assign({
    body: querystring.stringify({
      gid: gid,
      groupname: gname
    })
  }, POST_OPT));
}

/**
 * 删除名片分组
 * @param  {String} gid 需要删除的名片分组 ID
 * @return {Promise}
 */
export var DelBizCardGroup = (gid) => {
  return fetch('/pim/del_my_card_group', assign({
    body: querystring.stringify({
      gid: gid
    })
  }, POST_OPT));
}

/**
 * 移动好友到指定分组
 * @param  {String} fid 名片好友的 uid
 * @param  {String} gid 分组 id
 * @return {Promise}
 */
export var ChangeGroupOfFriend = (fid, gid) => {
  return fetch('/pim/move_my_card_friend', assign({
    body: querystring.stringify({
      gid: gid,
      friendly_uid: fid,
    })
  }, POST_OPT));
}

/**
 * 删除名片好友
 * @param {String} fid 名片好友的 uid
 * @return {Promise}
 */
export var RemoveFriendBizCard = (fid) => {
  return fetch('/pim/del_my_card_friend', assign({
    body: querystring.stringify({
      friendly_uid: fid,
    })
  }, POST_OPT));
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
  let qs = querystring.stringify({
    askfor: askfor
  });
  return fetch(`${ASK_URL[asktype].get}?${qs}`, GET_OPT);
}

/**
 * 申请处理
 * @param  {String} asktype 申请类型 'bc' 或 'ab'
 * @param  {String} askfor  申请 id
 * @param  {String} status  处理状态
 * @return {Promise}
 */
export var HandleBizCardAsk = (asktype, askfor, status) => {
  return fetch(ASK_URL[asktype].handle, assign({
    body: querystring.stringify({
      askfor: askfor,
      status: status
    })
  }, POST_OPT));
}

/**
 * 交换名片
 * @param  {String} fid 名片好友 uid
 * @return {Promise}
 */
export var SwapBizCard = (fid) => {
  return fetch('/pim/swap_card', assign({
    body: querystring.stringify({
      friendly_uid: fid
    })
  }, POST_OPT));
}
