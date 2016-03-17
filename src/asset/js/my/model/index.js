import Promise from 'promise';

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

export var MyVerifyInfo = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/pim/query_my_card_verify',
      type: 'GET',
      cache: false,
      success: resolve,
      error: reject
    });
  });
}
