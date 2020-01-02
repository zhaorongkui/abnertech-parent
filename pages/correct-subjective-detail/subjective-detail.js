// pages/correct-subjective-detail/subjective-detail.js
import * as echarts from '../../ec-canvas/echarts';
import Http from '../../utils/ajax.js';
import PublicFun from '../../utils/PublicFun.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let obj = {
      revisionQuestionId: Number(options.revisionQuestionId),
      section: Number(options.section),
      studentInfoId: Number(options.studentInfoId),
      subjectAbbreviation: options.subjectAbbreviation
    }
    this.getCorrectInfos(obj);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getCorrectInfos: function (obj) {
    Http.Get('/wechat/revision/questionDetail', obj)
      .then(res => {
        if (res.flag == 1) {
          wx.stopPullDownRefresh()
          this.setData({
            res: res
          })
          // console.log(this.data)
        }
      })
      .catch(err => {
        PublicFun._showToast('网络错误');
      })

  }
})