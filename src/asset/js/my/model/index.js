import Promise from 'promise';

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
