// pages/track/track.js 
import * as echarts from '../../ec-canvas/echarts';
import Http from '../../utils/ajax.js';
import PublicFun from '../../utils/PublicFun.js';

const app = getApp();
var arr = [];
var count=0;
var rotateIndex = 0
var f_arr = [];
var t_arr = [];
var m_arr = [];
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    current_router: 'track',
    current_tab: 'tab1',
    yuelineChart: null,
    isShow_z: true,
    t_id: 1,
    studentInfoId: '',
    studentName: '',
    finishRate: 0,
    tureRate: 0,
    subjectStatisticals: [],
    subjectData: [],
    statisticalMonthPoint: null,
    rankRate: 0,
    ec: {
      lazyLoad: true
    },
    isShowline: false,
    selectorQuery_w: '',
    selectorQuery_h: '',
    show: false,


    homeworkClassid: '',
    subjectName: '',
    section: '',
    zuowenlist: [],
    homeworkName:'',
    submitType:'',
    totalScore:'',
    score:'',
    reviewType:'',
    submitTime:0,
    homeworkEndTime:'',
    compositionComment:{},
    prveimgUrl:'',
    prveimgUrlFlag:false,
    prveiCount:0,
    animation:'',
    imageheight:0,
    imagewidth:0,
    displayWallId:'' ,//是否是优秀作文
    currentTime:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      homeworkClassid: options.id,
      subjectName: options.name != undefined ? options.name:'' ,
      section: options.section != undefined ? options.section :''
    })
    if (app.globalData.studentId_) {
      this.setData({
        studentInfoId: app.globalData.studentId_,
      })
      this.homework_statistical(this.data.studentInfoId, this.data.homeworkClassid);
    } else {
      let studentsInfo = app.globalData.studentsInfo ? app.globalData.studentsInfo : {};
      if (JSON.stringify(studentsInfo) != "{}" && studentsInfo.boundStudents != undefined) {
        this.setData({
          studentInfoId: studentsInfo.boundStudents[0].studentInfoId
        })
        this.homework_statistical(this.data.studentInfoId, this.data.homeworkClassid)
      } else if (JSON.stringify(studentsInfo) != "{}" && studentsInfo.boundStudents == undefined) {
        this.setData({
          studentInfoId: studentsInfo.studentInfoId
        })
        this.homework_statistical(this.data.studentInfoId, this.data.homeworkClassid)
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
  init_one: function (m_arr, t_rr, f_arr, w, h) { //初始化第一个图表
    var _self = this;
    _self.oneComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart, m_arr, t_rr, f_arr, w, h)
      _self.chart = chart;
      return chart;
    });
  },
  prveimg(e){ 
    // count = e.currentTarget.dataset.index
    // this.setData({
    //   prveiCount: count,
    //   prveimgUrlFlag:true,
    //   prveimgUrl: e.currentTarget.dataset.img
    // })
    
    wx.previewImage({
      current: e.currentTarget.dataset.img, 
      urls: this.data.zuowenlist.urlList
    })
  },
  imageLoad(e){
    var imageSize = this.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight 
    })
  },
  routate(){
    rotateIndex++
    if (rotateIndex >= 4){
      rotateIndex = 4
    }
    this.animation.rotate(90 * (rotateIndex)).step()
    this.setData({
      animation: this.animation.export()
    })
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imagewidth,
      imageheight: imageSize.imageheight
    })
  },
  close(){
    rotateIndex = 0
    count = 0
    this.setData({
      prveimgUrlFlag: false,
    })
  },
  handel_left(){
    rotateIndex = 0
    this.animation.rotate(90 * (rotateIndex)).step()
    this.setData({
      animation: this.animation.export()
    })
    count--
    if (count <= 0) {
      count = 0
    }
    var imgUrl = this.data.zuowenlist.urlList[count]
    this.setData({
      prveiCount: count,
      prveimgUrl: imgUrl
    })
  },
  handel_right() {
    rotateIndex = 0
    this.animation.rotate(90 * (rotateIndex)).step()
    this.setData({
      animation: this.animation.export()
    })
    
    count++
    if (count >= this.data.zuowenlist.urlList.length - 1) {
      count = this.data.zuowenlist.urlList.length - 1
    }
    var imgUrl = this.data.zuowenlist.urlList[count]
    this.setData({
      prveiCount: count,
      prveimgUrl: imgUrl
    })
  },
  imageUtil(e) {
    var imageSize = {};
    var originalWidth = e.detail.width;//图片原始宽 
    var originalHeight = e.detail.height;//图片原始高 
    var originalScale = originalHeight / originalWidth;//图片高宽比 
    //获取屏幕宽高 
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        var windowscale = windowHeight / windowWidth;//屏幕高宽比 
        if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比 
          //图片缩放后的宽为屏幕宽 
          imageSize.imageWidth = windowWidth;
          imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
        } else {//图片高宽比大于屏幕高宽比 
          //图片缩放后的高为屏幕高 
          imageSize.imageHeight = windowHeight;
          imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
        }

      }
    })
    return imageSize;
  } ,
  loadPage(){
    this.homework_statistical(this.data.studentInfoId, this.data.homeworkClassid);
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0',
      success: function (res) {
       
      }
    })
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
    this.loadPage()
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
  self_event: function (e) {
    this.setData({
      isShow_z: e.detail.isShow_z,
      t_id: e.detail.t_id,
      finishRate: 0,
      tureRate: 0,
      subjectStatisticals: [],
      subjectData: [],
      statisticalMonthPoint: null,
      rankRate: 0,
    })
    if (this.data.t_id == 2) {
      this.setData({
        statisticalMonthPoint: '888'
      })
      this.oneComponent = this.selectComponent('#mychart');
    }
    this.selectorQuery();
  },
  selectorQuery: function () {
    var that = this;
    wx.createSelectorQuery().select('.container_').boundingClientRect(function (rect) {
      if (rect != null) {
        that.setData({
          selectorQuery_w: parseInt(rect.width),
          selectorQuery_h: parseInt(rect.height)
        })
      }
      that.homework_statistical(that.data.studentInfoId, that.data.homeworkClassid);
    }).exec();
  },
  homework_statistical: function (id, workid) {
    var _self = this;
    Http.Get('/wechat/homework/compositionAnswer', {
      studentInfoId: id,
      homeworkClassId: workid,
    })
      .then(res => {
        if (res.message == 'SUCCESS') {
          wx.stopPullDownRefresh()
          if (res.infos) {
            _self.setData({
              displayWallId: res.infos.displayWallId != undefined ? res.infos.displayWallId :'',
              currentTime: res.currentTime,
              submitTime: res.infos.submitTime != undefined ? res.infos.submitTime : 0,
              isShowline: false,
              homeworkName: res.infos.studentCompositionTitle,
              homeworkEndTime: res.infos.homeworkEndTime,
              zuowenlist: res.infos.compositionDetail,
              submitType: res.infos.submitType != undefined ? res.infos.submitType : '',
              totalScore: res.infos.totalScore != undefined ? res.infos.totalScore : 0,
              score: res.infos.score != undefined ? res.infos.score : 0,
              reviewType: res.infos.reviewType != undefined ? res.infos.reviewType : 0,
              compositionComment: res.infos.compositionComment
            })
          } 
          
        }
      })
      .catch(err => {
        PublicFun._showToast('网络错误');
      })
  },
  handleChange_router({
    detail
  }) {
    this.setData({
      current_router: detail.key
    });
    let url = '../' + detail.key + "/" + detail.key;
    wx.redirectTo({
      url: url,
    })
  },
  handleChange_tab({
    detail
  }) {
    this.setData({
      current_tab: detail.key
    });
  },

})