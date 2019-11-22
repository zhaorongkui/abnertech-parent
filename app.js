//app.js
import Http from './utils/ajax.js';
import PublicFun from './utils/PublicFun.js';
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    wx.setStorageSync('showT', true);
    wx.setStorageSync('show', false);
    // 登录
    //this.login();
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    showT: true,
    parentInfo: '',
    studentInfoId: '',
    studentsInfo: '',
    studentId_: '',
    isShow: false,
    studentName:'',
    parentId:'',
    showMasks: true
  },
  login: function (callback) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        Http.Get('/wechat/data/getOpenid', {
            code: res.code
          })
          .then(res => {
            if (res.message == 'SUCCESS') {
              wx.setStorageSync('openid', res.infos.openid); //存储openid
              callback(res.infos.openid);
            }
          })
          .catch(err => {
            PublicFun._showToast('网络错误');
          })
      }
    })
  }

})