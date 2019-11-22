// pages/related-students/related-students.js
import Http from '../../utils/ajax.js';
import PublicFun from '../../utils/PublicFun.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_tip: true,
    role_id: 1,
    studentsInfo: null,
    role_text: '爸爸',
    studentCode: '',
    page: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id) {
      var _self = this;
      Http.Get('/wechat/student/info', {
          studentInfoId: options.id
        })
        .then(res => {
          if (res.message == 'SUCCESS') {
            _self.setData({
              studentsInfo: res.infos
            })
          }
        })
        .catch(err => {
          PublicFun._showToast('网络错误');
        })
    }
    let studentsInfo = app.globalData.studentsInfo ? app.globalData.studentsInfo : {};
    if (studentsInfo.boundStudents != undefined ) {
      this.setData({
        role_id: studentsInfo.boundStudents[0].bountRelation,
      })
    }else{
      this.setData({
        role_id: 1,
      })
    }
    this.setData({
      role_text: PublicFun.role(this.data.role_id)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var pages = getCurrentPages();
    this.setData({
      page: pages
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    //this.data.page[0].load();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var shareObj = {
      title: "",
      path: '/pages/index/index',
      imageUrl: '',
      success: function (res) { },
      fail: function () { },
      complete: function () { }
    }
    return shareObj;
  },
  self_event: function(e) {
    this.setData({
      show_tip: e.detail.show_tip,
      role_id: e.detail.id,
      role_text: e.detail.name,
    })
  },
  self_event_: function(e) {
    this.setData({
      show_tip: e.detail.show_tip,
      role_text: e.detail.name,
      role_id: e.detail.role_id,
    })
  },
  role_s: function() {
    this.setData({
      show_tip: !this.data.show_tip
    })
  },
  submit: function() {
    var _self = this;
    // if (this.data.role_text == "请选择") {
    //   PublicFun._showToast('请选择关联关系')
    // } else {
      Http.Post('/wechat/bound/bindStudent', {
          studentInfoId: _self.data.studentsInfo.studentInfoId,
          bountRelation: _self.data.role_id,
          openId: wx.getStorageSync('openid')
        })
        .then(res => {
          if (res.message == 'SUCCESS') {
            PublicFun._showToastSuccess();
            app.globalData.isShow = false;
            wx.redirectTo({
              url: '../index/index',
            })
          } else {
            PublicFun._showToast('请扫描正确的学生二维码')
          }
        })
        .catch(err => {
          PublicFun._showToast('网络错误');
        })

   // }
  },
  cancel: function() {
    app.globalData.isShow = true;
    wx.redirectTo({
      url: '../index/index',
    })
  }
})