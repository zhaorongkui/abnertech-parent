// pages/track/track.js 
import * as echarts from '../../ec-canvas/echarts';
import Http from '../../utils/ajax.js';
import PublicFun from '../../utils/PublicFun.js';
const app = getApp();
var arr = [];
var f_arr = [];
var t_arr = [];
var m_arr = [];
var tap;
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
      top: 20,
      width: w / 1.15,
      height: h / 1.4,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      confine: false
    },
    xAxis: {
      name:'月',
      nameGap: 5,
      nameTextStyle: {
        padding: [10, 0, 0, 0]
      },
      type: 'category',
      boundaryGap: false,
      data: m_arr,
      axisLabel: {
        // formatter: function(value, index) {
        //   if (value == '') {
        //     return value;
        //   } else {
        //     return value + '月';
        //   }
        // },
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
    ec: {
      lazyLoad: true
    },
    navData: [],
    statisticalMonthPoint: [],
    currentTab: 0, //顶部滑动导航当前值
    navScrollLeft: 0, //向左偏移量
    studentInfoId: '',
    studentName: '',
    t_id: 1,
    finishRate: 0,
    tureRate: 0,
    isShow_z: true,
    currentSubject: '',
    currentSubject1: '',
    selectorQuery_w: '',
    selectorQuery_h: '',
    isShowline: false,
    weekinfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      currentTab: options.id,
      t_id: options.t_id,
      currentSubject: options.subject,
      navData: options.navData.split(',')
    })
    tap = options.id;
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    //导航初始选择
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      navScrollLeft: (this.data.currentTab - 2) * singleNavWidth
    })

    //获取学生id
    if (app.globalData.studentId_) {
      this.setData({
        studentInfoId: app.globalData.studentId_
      })
    } else {
      let studentsInfo = app.globalData.studentsInfo ? app.globalData.studentsInfo : {};
      if (JSON.stringify(studentsInfo) != "{}" && studentsInfo.boundStudents != undefined) {
        this.setData({
          studentInfoId: studentsInfo.boundStudents[0].studentInfoId
        })
      } else if (JSON.stringify(studentsInfo) != "{}" && studentsInfo.boundStudents == undefined) {
        this.setData({
          studentInfoId: studentsInfo.studentInfoId
        })
      }
    }
    this.setData({
      studentName: app.globalData.studentName
    })
    //折线图初始化
    this.oneComponent = this.selectComponent('#mychart');
    this.selectorQuery1();
  },

  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    tap = cur;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth,
      currentSubject: event.currentTarget.dataset.subject,
      currentSubject1: event.currentTarget.dataset.subject,
      statisticalMonthPoint: [],
      finishRate: 0,
      tureRate: 0,
      weekinfo: null,
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
    this.homework_statisticalSuject(this.data.studentInfoId, this.data.currentSubject, this.data.t_id)
    
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
  self_event: function(e) {
    this.setData({
      isShow_z: e.detail.isShow_z,
      t_id: e.detail.t_id,
      type: e.detail.t_id,
      currentSubject1: '',
      statisticalMonthPoint: [],
      finishRate: 0,
      tureRate: 0,
      weekinfo: null,
      navData: [],
    })
    tap = 0;
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
    if (that.data.t_id == 2) {
      wx.createSelectorQuery().select('.container_').boundingClientRect(function(rect) {
        that.setData({
          selectorQuery_w: parseInt(rect.width),
          selectorQuery_h: parseInt(rect.height)
        })
        that.homework_statistical(that.data.studentInfoId, that.data.currentSubject, that.data.t_id);
      }).exec()
    } else {
      that.homework_statistical(that.data.studentInfoId, that.data.currentSubject, that.data.t_id)
    }
    
  },
  selectorQuery1: function () {
    var that = this;
    if (that.data.t_id == 2) {
      wx.createSelectorQuery().select('.container_').boundingClientRect(function (rect) {
        that.setData({
          selectorQuery_w: parseInt(rect.width),
          selectorQuery_h: parseInt(rect.height)
        })
        that.homework_statisticalSuject(that.data.studentInfoId, that.data.currentSubject, that.data.t_id);
      }).exec()
    } else {
      that.homework_statisticalSuject(that.data.studentInfoId, that.data.currentSubject, that.data.t_id)
    }

  },
  homework_statistical: function(id, s,type) {
    var _self = this;
    Http.Get('/wechat/homework/statistical', {
        studentInfoId: id,
        cycleType: type
      })
      .then(res => {
        if (res.message == 'SUCCESS') {
          if (res.infos) {
            var arr=[];
            if (res.infos.subjectStatisticals != undefined){
              for (var j = 0; j < res.infos.subjectStatisticals.length; j++) {
                arr.push(res.infos.subjectStatisticals[j].subjectAbbreviation)
              }
              _self.setData({
                navData: arr,
              })
            }
           

            for (var i=0; i<_self.data.navData.length;i++){
              if (i == tap){
                _self.setData({
                  currentSubject: _self.data.navData[i],
                  currentTab: i
                })
              }else{
                _self.setData({
                  currentSubject: _self.data.navData[0],
                  currentTab: 0
                })
              }
            }

            _self.homework_statisticalSuject(_self.data.studentInfoId, _self.data.currentSubject, _self.data.t_id)
          }
        }
      })
      .catch(err => {
        PublicFun._showToast('网络错误');
      })
  },
  homework_statisticalSuject: function(id, s, type) {
    var _self = this;
    Http.Get('/wechat/homework/statisticalSuject', {
        studentInfoId: id,
        subjectAbbreviation: s,
        cycleType: type
      })
      .then(res => {
        if (res.message == 'SUCCESS') {
          if (res.infos) {
            if (!res.infos.hasOwnProperty('statisticalMonthPoint')) {
              _self.setData({
                finishRate: res.infos.finishRate ? parseInt(res.infos.finishRate).toFixed(0) : 0,
                tureRate: res.infos.tureRate ? parseInt(res.infos.tureRate).toFixed(0) : 0,
                statisticalMonthPoint: null,
                isShowline: false,
                weekinfo: res.infos
              })
            } else {
              _self.setData({
                finishRate: res.infos.finishRate ? parseInt(res.infos.finishRate).toFixed(0) : 0,
                tureRate: res.infos.tureRate ? parseInt(res.infos.tureRate).toFixed(0) : 0,
                statisticalMonthPoint: res.infos.statisticalMonthPoint,
                isShowline: false,
                weekinfo: res.infos
              })
              for (var j = 0; j < res.infos.statisticalMonthPoint.length; j++) {
                f_arr.push(res.infos.statisticalMonthPoint[j].finishRate);
                t_arr.push(res.infos.statisticalMonthPoint[j].tureRate);
                m_arr.push(res.infos.statisticalMonthPoint[j].month)
              }
            }
            if (_self.data.statisticalMonthPoint) {
              var team = [];
              team = PublicFun.uniq(m_arr);
              _self.init_one(team, t_arr, f_arr, _self.data.selectorQuery_w, _self.data.selectorQuery_h);
              t_arr = [];
              team = [];
              f_arr = [];
              m_arr = []
            }
            if (_self.data.currentSubject1 != '') {
              _self.data.finishRate == 0 ? _self.selectComponent("#canvas").drawCircle1() : _self.selectComponent("#canvas").startProgress();
              _self.data.tureRate == 0 ? _self.selectComponent("#canvas_").drawCircle1() : _self.selectComponent("#canvas_").startProgress();
            } else {
              setTimeout(function() {
                _self.data.finishRate == 0 ? _self.selectComponent("#canvas").drawCircle() : _self.selectComponent("#canvas").startProgress();
                _self.data.tureRate == 0 ? _self.selectComponent("#canvas_").drawCircle() : _self.selectComponent("#canvas_").startProgress();
              }, 200)
            }
          } else {
            _self.setData({
              isShowline: true,
            })
          }

        }
      })
      .catch(err => {
        PublicFun._showToast('网络错误');
      })
  },

  switch_tab: function(e) {
    this.setData({
      t_id: e.currentTarget.dataset.id
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
  }
})