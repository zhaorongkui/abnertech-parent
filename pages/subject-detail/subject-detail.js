// pages/subject-detail/subject-detail.js
import Http from '../../utils/ajax.js';
import PublicFun from '../../utils/PublicFun.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentInfoId: '',
    homeworkPageSubjectData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.studentId_) {
      this.setData({
        studentInfoId: app.globalData.studentId_
      })
    } else {
      this.setData({
        studentInfoId: options.id
      })
    }
    this.homeworkPageSubjectData(this.data.studentInfoId)
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

  },
  homeworkPageSubjectData: function(id) {
    var _self = this;
    Http.Get('/wechat/homework/homeworkPageSubjectData', {
        studentInfoId: id
      })
      .then(res => {
        if (res.message == 'SUCCESS') {
          _self.setData({
            homeworkPageSubjectData: res.infos
          })
        }
      })
      .catch(err => {
        PublicFun._showToast('网络错误');
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
})