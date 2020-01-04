// pages/correct-group-detail/correct-group-detail.js

import * as echarts from '../../ec-canvas/echarts';
import Http from '../../utils/ajax.js';
import PublicFun from '../../utils/PublicFun.js';
const app = getApp();




Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: null,
    currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.groupDetail(options.revisionQuestionId, options.section, options.studentInfoId, options.subjectAbbreviation)
  },
  groupDetail(revisionQuestionId, section, studentInfoId, subjectAbbreviation){
    Http.Get('/wechat/revision/questionDetail', {
      revisionQuestionId: revisionQuestionId,
      section: section,
      studentInfoId: studentInfoId,
      subjectAbbreviation: subjectAbbreviation
    })
      .then(res => {
        if (res.flag == 1) {
          this.setData({
            res:res
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  handelIndex(e){
    this.setData({
      currentIndex: e.detail.passValue
    })
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
  onShareAppMessage: function() {

  }
})