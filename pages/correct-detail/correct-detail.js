// pages/track/track.js 
import * as echarts from '../../ec-canvas/echarts';
import Http from '../../utils/ajax.js';
import PublicFun from '../../utils/PublicFun.js';
const app = getApp();

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
    }
  },
  data: {
    studentInfoId: '',
    studentName: '',
    isShowline: false,
    revisionId: '',
    currentPage: 1,
    revisionStudentInfo: {},
    revisionStudentQuestionVOList: []
  },

  workDetailTo: function (e, id) {
    // console.log(e.currentTarget.dataset.item)
    let obj = {
      revisionQuestionId: e.currentTarget.dataset.item.revisionQuestionId,
      section: this.data.revisionStudentInfo.section,
      studentInfoId: this.data.studentInfoId,
      subjectAbbreviation: this.data.revisionStudentInfo.subjectAbbreviation
    }
    let detailUrl = '';
    let questionTypeCode = e.currentTarget.dataset.item.questionTypeCode;
    let questionProperty = e.currentTarget.dataset.item.questionProperty;
    
    //let questionTypeCode = 4;

    if (questionTypeCode === 1) {
      detailUrl = '/pages/correct-radio-detail/radio-detail?revisionQuestionId=' + obj.revisionQuestionId + '&section=' +
        obj.section + '&studentInfoId=' + obj.studentInfoId + '&subjectAbbreviation=' + obj.subjectAbbreviation
    } else if (questionTypeCode === 2) {
      detailUrl = '/pages/correct-checkBox-detail/checkBox-detail?revisionQuestionId=' + obj.revisionQuestionId + '&section=' +
        obj.section + '&studentInfoId=' + obj.studentInfoId + '&subjectAbbreviation=' + obj.subjectAbbreviation
    } else if (questionTypeCode === 3) {
      detailUrl = '/pages/correct-judge-detail/judge-detail?revisionQuestionId=' + obj.revisionQuestionId + '&section=' +
        obj.section + '&studentInfoId=' + obj.studentInfoId + '&subjectAbbreviation=' + obj.subjectAbbreviation
    } else if (questionTypeCode === 4) {
      detailUrl = '/pages/correct-group-detail/correct-group-detail?revisionQuestionId=' + obj.revisionQuestionId + '&section=' +

      obj.section + '&studentInfoId=' + obj.studentInfoId + '&subjectAbbreviation=' + obj.subjectAbbreviation
    }  else if (questionTypeCode === 5 || questionTypeCode === 6) {

      detailUrl = '/pages/correct-subjective-detail/subjective-detail?revisionQuestionId=' + obj.revisionQuestionId + '&section=' +
        obj.section + '&studentInfoId=' + obj.studentInfoId + '&subjectAbbreviation=' + obj.subjectAbbreviation
    }
    wx.navigateTo({
      url: detailUrl
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      revisionId: options.id
    })
    if (app.globalData.studentId_) {
      this.setData({
        studentInfoId: app.globalData.studentId_,
      })
      this.homework_list(this.data.studentInfoId, this.data.currentPage, this.data.revisionId);
    } else {
      let studentsInfo = app.globalData.studentsInfo ? app.globalData.studentsInfo : {};
      if (JSON.stringify(studentsInfo) != "{}" && studentsInfo.boundStudents != undefined) {
        this.setData({
          studentInfoId: studentsInfo.boundStudents[0].studentInfoId
        })
        this.homework_list(this.data.studentInfoId, this.data.currentPage, this.data.revisionId)
      } else if (JSON.stringify(studentsInfo) != "{}" && studentsInfo.boundStudents == undefined) {
        this.setData({
          studentInfoId: studentsInfo.studentInfoId
        })
        this.homework_list(this.data.studentInfoId, this.data.currentPage, this.data.revisionId)
      }
    }
    this.setData({
      studentName: app.globalData.studentName,
    })
    wx.setNavigationBarTitle({
      title: app.globalData.studentName + '的作业'
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        show: true
      })
    }, 600)
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
    //this.loadPage()
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
    var shareObj = {
      title: "",
      path: '/pages/index/index',
      imageUrl: '',
      success: function (res) {},
      fail: function () {},
      complete: function () {}
    }
    return shareObj;
  },

  homework_list: function (id, page, revisionId) {
    var _self = this;
    Http.Get('/wechat/revision/getRevisionQuestionList', {
        studentInfoId: id,
        currentPage: page,
        pageSize: 10,
        revisionId: revisionId
      })
      .then(res => {
        if (res.flag == 1) {
          wx.stopPullDownRefresh()
          this.setData({
            revisionStudentInfo: res.infos.revisionStudentInfo,
            revisionStudentQuestionVOList: res.infos.revisionStudentQuestionVOList
          })

        }
      })
      .catch(err => {
        PublicFun._showToast('网络错误');
      })
  },

})