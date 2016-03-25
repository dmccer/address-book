import Promise from 'promise/lib/es6-extensions';
import querystring from 'querystring';
import assign from 'lodash/object/assign';
import {POST_OPT, GET_OPT} from '../../const/fetch';

/**
 * 搜索通讯录
 * @param  {String} keyword 关键字
 * @return {Promise}
 */
export var SearchAB = (keyword) => {
  let qs = querystring.stringify({
    keyword: keyword
  });
  return fetch(`/pim/search_addlist?${qs}`, GET_OPT);
}

/**
 * 搜索通讯录成员
 * @param  {String} aid 通讯录ID
 * @param  {String} keyword 关键字
 * @return {Promise}
 */
export var SearchABMember = (aid, keyword) => {
  let qs = querystring.stringify({
    aid: aid,
    keyword: keyword
  });
  return fetch(`/pim/search_addlist_member?${qs}`, GET_OPT);
}

/**
 * 修改通讯录
 * @param  {Object} ab 通讯录字段, 必须包含 aid
 * @return {Promise}
 */
export var UpdateAB = (ab) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/edit_addlist',
      type: 'POST',
      data: ab,
      success: resolve,
      error: reject
    });
  });
}

/**
 * 创建通讯录
 * @param {Object} ab 通讯录字段
 * @param {Number} ab.atype 通讯录类型
 * @param {String} ab.aname 通讯录名称
 * @param {String} ab.arequires 加入通讯录需要对方名片的字段
 * @param {String} ab.adesc 通讯录简介
 * @param {String} ab.aquestion 通讯录验证问题
 * @return {Promise}
 */
export var CreateAB = (ab) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/create_addlist',
      type: 'POST',
      data: ab,
      success: resolve,
      error: reject
    });
  });
}

/**
 * 更改通讯录 LOGO
 * @param  {String} logo 微信 media_id
 * @return {Promise}
 */
export var UpdateABLogo = (aid, logo) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/upload_addlist_photo',
      type: 'POST',
      data: {
        aid: aid,
        aphoto_mid: logo
      },
      success: resolve,
      error: reject
    });
  });
}

/**
 * 通讯录基本信息
 * @param  {String} aid 通讯录ID
 * @return {Promise}
 */
export var ABBaseInfo = (aid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/addlist_cards_baseinfo',
      type: 'GET',
      cache: false,
      data: {
        aid: aid
      },
      success: resolve,
      error: reject
    });
  })
}

/**
 * 通讯录成员列表
 * @param  {String} aid 通讯录ID
 * @return {Promise}
 */
export var ABMemberList = (aid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/query_addlist_cards',
      type: 'GET',
      cache: false,
      data: {
        aid: aid
      },
      success: resolve,
      error: reject
    });
  });
}

/**
 * 删除通讯录
 * @param  {String} aid 通讯录ID
 * @return {Promise}
 */
export var DelAB = (aid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/del_addlist',
      type: 'POST',
      data: {
        aid: aid
      },
      success: resolve,
      error: reject
    });
  });
}

/**
 * 加入通讯录
 * @param  {String} aid 通讯录ID
 * @param  {String} answer 验证问题的答案
 * @return {Promise}
 */
export var JoinAB = (aid, answer) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/join_addlist',
      type: 'POST',
      data: {
        aid: aid,
        answer: answer
      },
      success: resolve,
      error: reject
    });
  })
}

/**
 * 删除名片成员
 * @param  {String} aid 通讯录 ID
 * @param  {String} uid 成员 ID
 * @return {Promise}
 */
export var DelABMember = (aid, uid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/del_addlist_card',
      type: 'POST',
      data: {
        aid: aid,
        uid: uid
      },
      success: resolve,
      error: reject
    });
  });
}

/**
 * 成员自己退出通讯录
 * @param  {String} aid 通讯录ID
 * @return {Promise}
 */
export var QuitAB = (aid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/quit_addlist',
      type: 'POST',
      data: {
        aid: aid
      },
      success: resolve,
      error: reject
    });
  });
}

/**
 * 通讯录分类列表 - 通讯录首页
 * @return {Promise}
 */
export var MainABList = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/main_addlist_info',
      type: 'GET',
      cache: false,
      success: resolve,
      error: reject
    });
  });
}
