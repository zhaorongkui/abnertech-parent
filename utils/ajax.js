
const API_URL = "http://192.168.7.254:19081";
//const API_URL = "http://39.155.189.134:19081";
//const API_URL = "https://dev-wechat.abnertech.com"
//const API_URL = "https://plan-wechat.abnertech.com"
// const API_URL = "https://plan-wechat.abnertech.com"
//const API_URL = "http://192.168.7.157:8088"
function Get(url, params) {

  let promise = new Promise(function(resolve, reject) {

    wx.request({

      url: API_URL + url,

      data: params,

      method: 'GET',

      header: {
        'Content-Type': 'application/json'
      },

      success: res => {

        resolve(res.data);

      },

      fail: res => {

        reject(res.data)

      }

    })

  });

  return promise

}

function Post(url, params) {

  let promise = new Promise(function(resolve, reject) {

    wx.request({

      url: API_URL + url,

      data: params,

      method: 'POST',

      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },

      success: res => {

        resolve(res.data);

      },

      fail: res => {

        reject(res.data)

      }

    })

  });

  return promise

}

function JsonPost(url, params) {

  let promise = new Promise(function(resolve, reject) {

    wx.request({

      url: API_URL + url,

      data: JSON.stringify(params),

      method: 'POST',

      header: {
        'Content-Type': 'application/json'
      },

      success: res => {

        resolve(res.data);

      },

      fail: res => {

        reject(res.data);

      }

    })

  });

  return promise

}

module.exports = {

  Get,

  Post,

  JsonPost

}