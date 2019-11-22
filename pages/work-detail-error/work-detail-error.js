// pages/track/track.js 
import * as echarts from '../../ec-canvas/echarts';
import Http from '../../utils/ajax.js';
import PublicFun from '../../utils/PublicFun.js';

const app = getApp();
var arr = [];
var f_arr = [];
var t_arr = [];
var m_arr = [];
var team=[]
function setOption(chart, m_arr, t_arr, f_arr, w, h) {
  var option = {
    title: {
      text: '',
      left: '',
      textStyle: {

      }
    },
    color: ["#ffc006", "#91b6ff"],
    legend: {
      orient: 'horizontal',
      data: ['完成率', '正确率'],
      icon: "rect",
      bottom: 10,
      left: 'center',
      z: 10,
      itemWidth: 25,
      itemHeight: 15,
      itemGap: 60,
      borderRadius: 20,
      textStyle: {
        fontSize: 13
      }
    },
    grid: {
      containLabel: true,
      left: 10,
      top: 15,
      width: w / 1.15,
      height: h / 1.4,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      confine: false
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: m_arr,
      axisLabel: {
        formatter: function(value, index) {
          if (value == '') {
            return value;
          } else {
            return value + '月';
          }
        },
        show: true,
        textStyle: {
          color: "#9494a0",
          fontSize: 12
        }
      },
      axisTick: {

        lineStyle: {
          opacity: 0
        }
      },

    },
    yAxis: {
      x: 'center',
      type: 'value',
      max: 100,
      splitLine: {
        show: false,
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#9494a0",
          fontSize: 12
        }
      }
    },
    extraCssText: 'z-index:9999999999',
    series: [{
      name: '完成率',
      type: 'line',
      smooth: true,
      data: f_arr
    }, {
      name: '正确率',
      type: 'line',
      smooth: true,
      data: t_arr
    }]
  };
  chart.setOption(option)
}
Page({
  onShareAppMessage: function(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
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
    finishRates: 0,
    tureRate: 0,
    score: '',
    score1: '',
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
    dailyWrongList:[],
    homeworkName:'',
    submitType:'',
    submitTime:0,
    text: '完成题数',
    homeworkEndTime:'',
    homeworkType:'',
    currentTime:0,
    texts: '得分',
    subjectAbbreviation:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      homeworkClassid: options.id,
      subjectName: options.name,
      section: options.section,
      homeworkType: options.worktype
    })
    if (app.globalData.studentId_) {
      this.setData({
        studentInfoId: app.globalData.studentId_,
      })
      this.homework_statistical(this.data.studentInfoId, this.data.homeworkClassid, this.data.section, this.data.subjectName, this.data.homeworkType);
    } else {
      let studentsInfo = app.globalData.studentsInfo ? app.globalData.studentsInfo : {};
      if (JSON.stringify(studentsInfo) != "{}" && studentsInfo.boundStudents != undefined) {
        this.setData({
          studentInfoId: studentsInfo.boundStudents[0].studentInfoId
        })
        this.homework_statistical(this.data.studentInfoId, this.data.homeworkClassid, this.data.section, this.data.subjectName, this.data.homeworkType);
      } else if (JSON.stringify(studentsInfo) != "{}" && studentsInfo.boundStudents == undefined) {
        this.setData({
          studentInfoId: studentsInfo.studentInfoId
        })
        this.homework_statistical(this.data.studentInfoId, this.data.homeworkClassid, this.data.section, this.data.subjectName, this.data.homeworkType);
      }
    }
    this.setData({
      studentName: app.globalData.studentName,
    })
    wx.setNavigationBarTitle({
      title: app.globalData.studentName + '的作业'
    })
    var that = this;
    setTimeout(function() {
      that.setData({
        show: true
      })
    }, 600)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  init_one: function(m_arr, t_rr, f_arr, w, h) { //初始化第一个图表
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

  onPullDownRefresh: function () {
    this.loadPage()
  },
  loadPage() {
    this.homework_statistical(this.data.studentInfoId, this.data.homeworkClassid, this.data.section, this.data.subjectName, this.data.homeworkType);
  },
  
  self_event: function(e) {
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
  selectorQuery: function() {
    var that = this;
    wx.createSelectorQuery().select('.container_').boundingClientRect(function(rect) {
      if (rect != null) {
        that.setData({
          selectorQuery_w: parseInt(rect.width),
          selectorQuery_h: parseInt(rect.height)
        })
      }
      that.homework_statistical(that.data.studentInfoId, that.data.homeworkClassid, that.data.section, that.data.subjectName, that.data.homeworkType);
    }).exec();
  },
  
  homework_statistical: function(id, workid, section, subname,type) {
    var _self = this;
    Http.Get('/wechat/homework/dailyWrongAnswer', {
        studentInfoId: id,
        homeworkClassId: workid,
        section: section,
        subjectAbbreviation: subname,
        homeworkType: type
      })
      .then(res => {
        if (res.message == 'SUCCESS') {
          wx.stopPullDownRefresh()
          var team = [];
          arr = [];
          if (res.infos) {
            _self.setData({
              subjectAbbreviation: res.infos.subjectAbbreviation,
              currentTime: res.currentTime,
              submitTime: res.infos.submitTime ? res.infos.submitTime : 0,
              isShowline: false,
              finishRate: res.infos.doneNum !=undefined ? res.infos.doneNum : 0,
              finishRates: res.infos.questionNum != undefined ? res.infos.questionNum : 0,
              tureRate: res.infos.trueRate != undefined ? res.infos.trueRate : 0,
              dailyWrongList: res.infos.dailyWrongList,
              homeworkName: res.infos.homeworkName,
              submitType: res.infos.submitType != undefined ? res.infos.submitType : '',
              score: res.infos.score ? res.infos.score : 0,
              score1: res.infos.totalScore ? res.infos.totalScore : 0,
              homeworkEndTime: res.infos.homeworkEndTime
            })

            if (res.infos.reviewType == 0) {
              this.setData({
                score1: '--',
                tureRate:'--'
              })
            }

            if (res.infos.reviewType != 0) {
              if (this.data.subjectAbbreviation == 'yingyu'){
                _self.data.score == 0 ? _self.selectComponent("#canvas_").drawCircle() : _self.selectComponent("#canvas_").startProgress();
              }else{
                _self.data.tureRate == 0 ? _self.selectComponent("#canvas_").drawCircle() : _self.selectComponent("#canvas_").startProgress();
              }
            }
            
            _self.data.finishRate == 0 ? _self.selectComponent("#canvas").drawCircle() : _self.selectComponent("#canvas").startProgress();
           
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