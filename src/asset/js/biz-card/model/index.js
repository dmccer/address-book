import Promise from 'promise';

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

export var SetMainBizCard = cid => {
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
