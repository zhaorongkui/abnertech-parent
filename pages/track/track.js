// pages/track/track.js 
import * as echarts from '../../ec-canvas/echarts';
import Http from '../../utils/ajax.js';
import PublicFun from '../../utils/PublicFun.js';

const app = getApp();
var arr = [];
var f_arr = [];
var t_arr = [];
var m_arr = [];

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
      name: '月',
      nameGap:5,
      nameTextStyle:{
       padding:[10,0,0,0]
      },
      type: 'category',
      boundaryGap: false,
      data: m_arr,
      axisLabel: {
        // formatter: function(value, index) {
        //   console.log(value)
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
    tips: false,
    tip: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.studentId_) {
      this.setData({
        studentInfoId: app.globalData.studentId_,
      })
      this.homework_statistical(this.data.studentInfoId, this.data.t_id);
    } else {
      let studentsInfo = app.globalData.studentsInfo ? app.globalData.studentsInfo : {};
      if (JSON.stringify(studentsInfo) != "{}" && studentsInfo.boundStudents != undefined) {
        this.setData({
          studentInfoId: studentsInfo.boundStudents[0].studentInfoId
        })
        this.homework_statistical(this.data.studentInfoId, this.data.t_id)
      } else if (JSON.stringify(studentsInfo) != "{}" && studentsInfo.boundStudents == undefined) {
        this.setData({
          studentInfoId: studentsInfo.studentInfoId
        })
        this.homework_statistical(this.data.studentInfoId, this.data.t_id)
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
  showTip() {
    if (this.data.tip) {
      this.setData({
        tips: true
      })
      this.data.tip = !this.data.tip
    } else {
      this.setData({
        tips: false
      })
      this.data.tip = !this.data.tip
    }

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
    var shareObj = {　　　　
             title: "",
             path: '/pages/index/index',
      　　　　imageUrl: '',
      　　　　success: function(res) {},
      　　　　fail: function() {},
      　　　　complete: function() {}　　
         }
    return shareObj;
  },
  nav_to: function(e) {
    wx.navigateTo({
      url: '../track-detail/track-detail?id=' + e.currentTarget.dataset.idx + '&subject=' + e.currentTarget.dataset.subject + '&navData=' + this.data.subjectData + '&t_id=' + this.data.t_id
    })
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
      that.homework_statistical(that.data.studentInfoId, that.data.t_id);
    }).exec();
  },
  homework_statistical: function(id, type) {
    var _self = this;
    Http.Get('/wechat/homework/statistical', {
        studentInfoId: id,
        cycleType: type
      })
      .then(res => {
        if (res.message == 'SUCCESS') {
          arr = [];
          if (res.infos) {
            _self.setData({
              isShowline: false,
              finishRate: res.infos.finishRate ? res.infos.finishRate : 0,
              tureRate: res.infos.tureRate ? res.infos.tureRate : 0,
            })
            if (res.infos.statisticalMonthPoint != undefined) {
              _self.setData({
                statisticalMonthPoint: res.infos.statisticalMonthPoint,
              })
              for (var j = 0; j < res.infos.statisticalMonthPoint.length; j++) {
                f_arr.push(res.infos.statisticalMonthPoint[j].finishRate);
                t_arr.push(res.infos.statisticalMonthPoint[j].tureRate);
                m_arr.push(res.infos.statisticalMonthPoint[j].month)
              }
            } else {
              _self.setData({
                statisticalMonthPoint: null,
              })
            }
            if (_self.data.statisticalMonthPoint) {
              var team = [];
              team = PublicFun.uniq(m_arr);
              _self.init_one(team, t_arr, f_arr, _self.data.selectorQuery_w, _self.data.selectorQuery_h);
              t_arr = [];
              team = [];
              f_arr = [];
              m_arr = [];
            }

            if (res.infos.rankRate != undefined) {
              _self.setData({
                rankRate: res.infos.rankRate == 100 ? '99.9' : parseInt(res.infos.rankRate).toFixed(0),
              })
            } else {
              _self.setData({
                rankRate: 0,
              })
            }

            if (res.infos.subjectStatisticals != undefined) {
              _self.setData({
                subjectStatisticals: res.infos.subjectStatisticals,
              })
              for (var j = 0; j < res.infos.subjectStatisticals.length; j++) {
                arr.push(res.infos.subjectStatisticals[j].subjectAbbreviation)
              }
              _self.setData({
                subjectData: arr,
                isShowline: false
              })
            } else {
              _self.setData({
                subjectStatisticals: [],
              })
            }
            setTimeout(function() {
              _self.data.finishRate == 0 ? _self.selectComponent("#canvas").drawCircle() : _self.selectComponent("#canvas").startProgress();
              _self.data.tureRate == 0 ? _self.selectComponent("#canvas_").drawCircle() : _self.selectComponent("#canvas_").startProgress();
            }, 300)
            setTimeout(function() {
              _self.setData({
                show: true
              })
            }, 600)
          } else {
            _self.setData({
              isShowline: true,
              statisticalMonthPoint: null
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