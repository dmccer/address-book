import Promise from 'promise';

export var Cities = (city, district) => {
  return new Promise((resolve, reject) => {
    let data = {};

    if (city) {
      data.cityIndex = city;
    }

    if (district) {
      data.districtIndex = district;
    }

    $.ajax({
      url: '/pim/getCitys',
      type: 'GET',
      cache: false,
      data: data,
      success: resolve,
      error: reject
    });
  });
}
