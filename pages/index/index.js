//获取应用实例
import Http from '../../utils/ajax.js';
import PublicFun from '../../utils/PublicFun.js';
// var url = 'https://lochi-sit.oss-cn-beijing.aliyuncs.com/weichat/audio1.png';
var url = 'https://lochi.oss-cn-beijing.aliyuncs.com/weichat/audio1.png';
var op = {
  id: ''
}

const animation_ = wx.createAnimation({
  duration: 2000,
  timingFunction: 'ease',
  transformOrigin: "50% 50%",
  delay: 1000
})
const app = getApp();
var canOnePointMove = false
var onePoint = {
  x: 0,
  y: 0
}
var twoPoint = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0
}
var width = ""
var height = ""
var timer
var taskType = 0
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
    current: 'index',
    animationData: {},
    animationData_: {},
    animationData_player: {},
    actions2: [{
      name: '删除',
      color: '#ed3f14'
    }],
    showModal: false, //控制扫码关联弹窗的隐藏和显示
    showlayer: false,
    showBtnlayer: false,
    motto: 'Hello World',
    userInfo: {}, //用户信息
    hasUserInfo: false,
    homework_null_wgl: true,
    homework_null: false,
    homework_null_gl: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    studentInfoId: '', //学生信息
    studentName: '',
    boundInfo: null,
    homeworkYesterdayStatistical: [], //上周作业数据
    studentUnReadResourceList: [],
    historyHomeworkData: [], //作业任务
    homeworkData: [], //作业任务
    isChoose: 1,
    isMessage: 1,
    exitType: 'sousuo',
    isRelate: false,
    isAuthority: false,
    showlayer_: false,
    showPie: true,
    resourceType: '',
    resourcePathUrl: '',
    finishRate: 0,
    trueRate: 0,
    //图片放大缩小变量
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    scale: 1,
    isPlaying: false, //控制audio
    isShowline: false,
    teacherName: '',
    action: {
      method: ''
    },
    audio_t: 1,
    poster: url,
    taskType: 0,
    currentPage: 1,
    currentSubject: '',
    currentTime: '',
    subjectList: [],
    subjectType: -1,
    loading: true,
    homeworkType: '',
    homeworkClassId: '',
    timer: true,
    sxFlag: true,
    historyHomeworkDataNull: false,
    scrollLeft: 0,
    // toastFlag: false,
    // toastText: ''
    showMask: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  taskType: function(e) {
    taskType = e.currentTarget.dataset.t
    this.setData({
      taskType: e.currentTarget.dataset.t
    })
    if (this.data.subjectType >= 4) {
      this.setData({
        scrollLeft: 200
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  tapSub(e) {
    var self = this;
    this.setData({
      loading: true,
      currentPage: 1,
      subjectType: e.currentTarget.dataset.index,
      currentSubject: e.currentTarget.dataset.name,
      historyHomeworkData: []
    })

    if (app.globalData.isShow) {
      this.subjectList(app.globalData.studentId_)
      this.historyWork(this.data.currentPage, app.globalData.studentId_, this.data.currentSubject)
      this.displayWall(app.globalData.studentId_)
    } else {
      //this.exitSm()
      this.historyWork(this.data.currentPage, this.data.studentInfoId, this.data.currentSubject)
    }
    // self.historyWork(self.data.currentPage, self.data.studentInfoId, self.data.currentSubject)
  },
  loadPage() {
    app.globalData.showMasks = false
    this.setData({
      showMask: app.globalData.showMasks,
      currentPage: 1,
      studentUnReadResourceList: [],
      historyHomeworkData: [], //作业任务
      homeworkData: [], //作业任务
    })

    if (app.globalData.isShow) {
      this.homework(app.globalData.studentId_);
      this.subjectList(app.globalData.studentId_)
      this.historyWork(this.data.currentPage, app.globalData.studentId_, this.data.currentSubject)
      this.displayWall(app.globalData.studentId_)
    } else {
      this.exitSm()
    }

  },
  onPullDownRefresh: function() {
    this.loadPage()
  },
  navTo(e) {
    console.log(taskType)
    if (this.data.currentTime > e.currentTarget.dataset.time) {
      if (e.currentTarget.dataset.id == 1 || e.currentTarget.dataset.id == 2) {
        wx.navigateTo({
          url: '../work-detail-error/work-detail-error?id=' + e.currentTarget.dataset.classid + '&&name=' + e.currentTarget.dataset.subname + '&&section=' + e.currentTarget.dataset.section + '&&worktype=' + e.currentTarget.dataset.type
        })

      }
      if (e.currentTarget.dataset.id == 4) {
        wx.navigateTo({
          url: '../word-detail/word-detail?id=' + e.currentTarget.dataset.classid + '&&name=' + e.currentTarget.dataset.subname + '&&section=' + e.currentTarget.dataset.section + '&&worktype=' + e.currentTarget.dataset.type
        })

      }
      if (e.currentTarget.dataset.id == 3) {
        wx.navigateTo({
          url: '../english-detail/english-detail?id=' + e.currentTarget.dataset.classid + '&&name=' + e.currentTarget.dataset.subname + '&&section=' + e.currentTarget.dataset.section + '&&worktype=' + e.currentTarget.dataset.type
        })

      }
      if (e.currentTarget.dataset.id == 5) {
        wx.navigateTo({
          url: '../read-detail/read-detail?id=' + e.currentTarget.dataset.classid + '&&name=' + e.currentTarget.dataset.subname + '&&section=' + e.currentTarget.dataset.section + '&&worktype=' + e.currentTarget.dataset.type
        })

      }
      if (e.currentTarget.dataset.id == 6) {
        if (e.currentTarget.dataset.ztype != 1) {
          if (taskType == 1) {
            if (e.currentTarget.dataset.submittype != 1 && e.currentTarget.dataset.submittype != undefined) {
              wx.navigateTo({
                url: '../zuowen/zuowen?id=' + e.currentTarget.dataset.classid + '&&name=' + e.currentTarget.dataset.subname + '&&section=' + e.currentTarget.dataset.section + '&&worktype=' + e.currentTarget.dataset.type
              })
            }
          }

          if (taskType == 0) {
            // this.setData({
            //   toastFlag: true,
            //   toastText: '您的孩子正在奋笔疾书'
            // })
            // var self = this
            // setTimeout(function() {
            //   self.setData({
            //     toastFlag: false
            //   })
            // }, 2000)

            PublicFun._showToast('您的孩子正在奋笔疾书');
          }

        } else {
          this.setData({
            zType: e.currentTarget.dataset.ztype
          })
          clearInterval(timer)
          wx.navigateTo({
            url: '../zuowen/zuowen?id=' + this.data.homeworkClassId
          })
        }
      }
    } else {
      // this.setData({
      //   toastFlag: true,
      //   toastText: '作业未开始'
      // })
      // var self = this
      // setTimeout(function() {
      //   self.setData({
      //     toastFlag: false
      //   })
      // }, 2000)
      PublicFun._showToast('作业未开始');
    }

  },

  closeMask() {
    app.globalData.showMasks = false
    this.setData({
      showMask: app.globalData.showMasks
    })
  },

  onLoad: function(options) {
    this.setData({
      showMask: app.globalData.showMasks
    })

    var self = this
    timer = setInterval(function() {
      self.hideTip()
    }, 1000)
    if (!this.data.timer) {
      clearInterval(timer)
    }
    var _self = this;
    if (JSON.stringify(options) == "{}") {
      if (app.globalData.studentId_ && app.globalData.studentName) {
        op.id = app.globalData.studentId_;
        this.setData({
          exitType: 'saoma',
          studentName: app.globalData.studentName,
          homework_null_wgl: false,
          homework_null_gl: true
        })
        wx.setNavigationBarTitle({
          title: app.globalData.studentName + '的作业'
        })
      }
    } else {
      if (options.q != undefined) {
        var url = decodeURIComponent(options.q) // 使用decodeURIComponent解析  获取当前二维码的网址
        var studentId = PublicFun.getUrlParam('studentId', url);
        var studentName = PublicFun.getUrlParam('studentName', url);
        if (studentId != undefined && studentName != undefined) {
          options.studentId = studentId;
          app.globalData.isShow = false;
          app.globalData.studentId_ = studentId;
          app.globalData.studentName = studentName;
          this.setData({
            exitType: 'saoma',
            studentName: studentName,
            homework_null_wgl: false,
            homework_null_gl: true
          })
          wx.setNavigationBarTitle({
            title: studentName + '的作业'
          })
        }
      }
    }
    app.login(_self.parent);
    //this.audioCtx = wx.createInnerAudioContext();
  },
  hideTip() {
    let date = new Date(); // 获取当前时间
    let time = date.getTime() + 1000 * 60 * 60 * 24;
    let now = new Date(time);
    let hour = now.getHours(); // 时
    let min = now.getMinutes(); // 分
    let sec = now.getSeconds(); // 秒

    let h = 24 - hour; // 倒计时 时
    if (min > 0 || sec > 0) {
      h -= 1
    }
    let m = 60 - min; // 倒计时 分
    if (sec > 0) {
      m -= 1
    }
    if (m == 60) {
      m = 0
    }
    let s = 60 - sec; // 倒计时 秒
    if (s == 60) {
      s = 0
    }

    if (h <= 0 && m <= 0 && s <= 0) {
      this.setData({
        timer: false,
        homeworkClassId: ''
      })
    }
  },
  exitSm: function() {
    if (this.data.exitType == "saoma") {
      this.homework(app.globalData.studentId_);
      this.subjectList(app.globalData.studentId_)
      this.historyWork(this.data.currentPage, app.globalData.studentId_, this.data.currentSubject)
      this.displayWall(app.globalData.studentId_)
      this.load();
    } else {
      this.setData({
        exitType: 'sousuo'
      })
      this.relate();
    }
  },

  load: function() {
    var _self = this;
    if (app.globalData.userInfo) {
      this.setData({
        hasUserInfo: true,
        isAuthority: false,
        showBtnlayer: false
      })
      if (this.data.exitType == 'saoma') {
        this.relate();
      }
    } else {
      this.setData({
        isAuthority: true,
        showBtnlayer: true,
        showlayer: false
      })
    }
  },

  relate: function() {
    if (this.data.exitType == "saoma") {
      if (app.globalData.isShow) {
        this.setData({
          showlayer: false
        })
      } else {
        if (this.data.boundInfo) {
          if (app.globalData.studentId_ == this.data.studentInfoId) {
            this.setData({
              isRelate: false,
              showlayer: false
            })
          } else {
            this.setData({
              showlayer: true
            })
          }
        } else {
          this.setData({
            isRelate: true,
            showlayer: true
          })
        }
      }
    } else {
      if (this.data.boundInfo) {
        this.homework(this.data.studentInfoId);
        this.subjectList(this.data.studentInfoId)
        this.historyWork(this.data.currentPage, this.data.studentInfoId, this.data.currentSubject)
        this.displayWall(this.data.studentInfoId)
        this.setData({
          isRelate: false,
          showlayer: false,
          showPie: true,
          showModal: false
        })
        this.load();
      } else {
        this.setData({
          isRelate: true,
          showModal: true,
          showlayer_: true,
          showBtnlayer: false,
          showlayer: false,
          showPie: false
        })
      }
    }
  },
  parent: function(id) {
    var _self = this;
    Http.Get('/wechat/bound/info', {
        openId: id
      })
      .then(res => {
        if (res.message == 'SUCCESS') {
          if (res.infos) {
            app.globalData.parentId = res.infos.parentId;
            if (res.infos.boundStudents != undefined) {
              app.globalData.studentsInfo = res.infos;
              _self.setData({
                studentInfoId: res.infos.boundStudents[0].studentInfoId,
                boundInfo: res.infos.boundStudents,
              })
              if (_self.data.exitType == 'sousuo') {
                app.globalData.studentName = res.infos.boundStudents[0].studentName;
                app.globalData.studentId_ = res.infos.boundStudents[0].studentInfoId;
                wx.setNavigationBarTitle({
                  title: app.globalData.studentName + '的作业'
                })
              }
              // if (_self.data.studentInfoId) {
              _self.setData({
                homework_null_gl: true,
                homework_null_wgl: false,
              })
              // } else {
              //   _self.setData({
              //     homework_null_gl: false,
              //     homework_null_wgl: true,
              //   })
              // }
            }
            _self.setData({
              isChoose: res.infos.isChoose,
              isMessage: 0,
            })
            _self.exitSm();
            if (_self.data.showBtnlayer == false && _self.data.showlayer == false && _self.data.showModal == false && _self.data.showlayer_ == false) {
              _self.modal_animation();
            }
          } else {
            _self.exitSm();
            _self.setData({
              isChoose: 0,
              isMessage: 0,
            })
            //_self.scancode();
          }
        }
      })
      .catch(err => {
        PublicFun._showToast('网络错误');
      })
  },
  homework: function(id) {
    var _self = this;
    Http.Get('/wechat/homework/homeworkPageData', {
        studentInfoId: id
      })
      .then(res => {
        if (res.message == 'SUCCESS') {
          wx.stopPullDownRefresh()
          if (res.infos) {
            _self.setData({
              homework_null_wgl: false,
              homework_null_gl: false,
              isShowline: false,
              currentTime: res.currentTime
            })
            if (res.infos.studentUndisposedHomeworkList != undefined) {
              _self.setData({
                homeworkData: res.infos.studentUndisposedHomeworkList != undefined ? res.infos.studentUndisposedHomeworkList : [],
                homework_null: true
              })
            } else {
              _self.setData({
                homeworkData: [],
                homework_null: false
              })
            }

            if (res.infos.studentUnReadResourceList != undefined) {
              _self.setData({
                studentUnReadResourceList: res.infos.studentUnReadResourceList != undefined ? res.infos.studentUnReadResourceList : [],
                homework_null: true
              })
            } else {
              _self.setData({
                studentUnReadResourceList: [],
                homework_null: false
              })
            }
            if (res.infos.studentUnReadResourceList == undefined && res.infos.studentUndisposedHomeworkList == undefined) {
              if (app.globalData.studentName) {
                _self.setData({
                  homework_null_gl: true,
                  homework_null_wgl: false,
                  homework_null: false
                })
              }
              // if (_self.data.studentInfoId) {
              //   _self.setData({
              //     homework_null_gl: true,
              //     // homework_null_wgl: false,
              //     homework_null: false
              //   })
              // } else {
              //   _self.setData({
              //     homework_null_gl: false,
              //     //homework_null_wgl: true,
              //     homework_null: false
              //   })
              // }
            }
            if (res.infos.homeworkYesterdayStatistical != undefined) {
              _self.setData({
                homeworkYesterdayStatistical: res.infos.homeworkYesterdayStatistical ? res.infos.homeworkYesterdayStatistical : null,
                finishRate: res.infos.homeworkYesterdayStatistical.finishRate ? parseInt(res.infos.homeworkYesterdayStatistical.finishRate).toFixed(0) : 0,
                trueRate: res.infos.homeworkYesterdayStatistical.tureRate ? parseInt(res.infos.homeworkYesterdayStatistical.tureRate).toFixed(0) : 0,
                studentUnReadResourceList: res.infos.studentUnReadResourceList ? res.infos.studentUnReadResourceList : [],
              })

              _self.data.finishRate == 0 ? _self.selectComponent("#canvas").drawCircle() : _self.selectComponent("#canvas").startProgress();
              _self.data.trueRate == 0 ? _self.selectComponent("#canvas_").drawCircle() : _self.selectComponent("#canvas_").startProgress();
            } else {
              _self.setData({
                isShowline: true
              })
            }
          } else {
            _self.setData({
              isShowline: true
            })
          }

        }
      })
      .catch(err => {
        PublicFun._showToast('网络错误');
      })
  },
  historyWork: function(page, id, sub = '') {
    Http.Get('/wechat/homework/historyList', {
        currentPage: page,
        pageSize: 10,
        studentInfoId: id,
        subjectAbbreviation: sub
      })
      .then(res => {
        if (res.message == 'SUCCESS') {
          wx.stopPullDownRefresh()
          if (res.infos.length != 0) {
            this.setData({
              isShowline: false
            })
            var data = this.data.historyHomeworkData
            this.setData({
              historyHomeworkData: data.concat(res.infos),
              //homework_null: true
            })
            if (this.data.historyHomeworkData.length == 0) {
              this.setData({
                historyHomeworkDataNull: true
              })
            }
          } else {
            this.setData({
              homework_null: false,
              loading: false
            })
          }

          if (res.infos.length < 10) {
            this.setData({
              loading: false
            })
          }
        }
      })
  },
  displayWall: function(id) {
    Http.Get('/wechat/composition/hasCompositionDisplayWall', {
        studentInfoId: id,
      })
      .then(res => {
        if (res.message == 'SUCCESS') {
          this.setData({
            homeworkClassId: res.infos.homeworkClassId != undefined ? res.infos.homeworkClassId : ''
          })
        }
      })
  },
  subjectList: function(id) {
    Http.Get('/wechat/homework/subject', {
        studentInfoId: id,
      })
      .then(res => {
        if (res.message == 'SUCCESS') {
          if (res.infos.length != 0) {
            this.setData({
              subjectList: res.infos
            })
          }
        }
      })
  },
  onshow: function() {

  },
  player: function(e) {
    this.setData({
      resourceType: e.currentTarget.dataset.resourcetype,
      resourcePathUrl: e.currentTarget.dataset.resourcepathurl,
      teacherName: e.currentTarget.dataset.teachername,
      showPie: false,
      sxFlag: false
    })
    this.player_animation();
  },
  nav_to: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url + '?id=' + e.currentTarget.dataset.id
    })
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
    let url = '../' + detail.key + "/" + detail.key;
    wx.redirectTo({
      url: url,
    })
  },
  modal_c: function() {
    this.setData({
      showModal: false,
    })
  },
  modal_r: function() {
    this.setData({
      resourceType: '',
      showPie: true,
      scale: 1,
      left: 0,
      top: 0,
      sxFlag: true
    })
    onePoint = {
      x: 0,
      y: 0
    }
    twoPoint = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0
    }
    this.data.finishRate == 0 ? this.selectComponent("#canvas").drawCircle() : this.selectComponent("#canvas").startProgress();
    this.data.trueRate == 0 ? this.selectComponent("#canvas_").drawCircle() : this.selectComponent("#canvas_").startProgress();
  },
  modal_s: function() {
    this.setData({
      showModal: true,
    })
  },
  modal_g: function() {
    var _self = this;
    wx.showModal({
      title: '提示',
      content: '是否对该学生进行关联',
      success(res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '../related-students/related-students?id=' + app.globalData.studentId_,
          })
        } else if (res.cancel) {
          app.globalData.isShow = true;
          _self.setData({
            showlayer: false
          })
        }
      }
    })

  },
  getUserInfo: function(e) {
    var _self = this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        showBtnlayer: false,
      })

      this.relate();
      Http.Post('/wechat/bound/bindStudent', {
          bountRelation: '',
          openId: wx.getStorageSync('openid'),
          studentInfoId: ''
        })
        .then(res => {
          if (res.message == 'SUCCESS') {

          }
        })
        .catch(err => {
          PublicFun._showToast('网络错误');
        })
      if (this.data.exitType == "sousuo") {
        this.data.boundInfo ? '' : this.scancode();
      } else {
        if (!this.data.boundInfo) {
          wx.showModal({
            title: '提示',
            content: '是否对该学生进行关联',
            success(res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '../related-students/related-students?id=' + app.globalData.studentId_,
                })
              } else if (res.cancel) {
                app.globalData.isShow = true;
                _self.setData({
                  showlayer: false
                })
              }
            }
          })
        } else {
          if (app.globalData.studentId_ != _self.data.studentInfoId) {
            wx.showModal({
              title: '提示',
              content: '是否对该学生进行关联',
              success(res) {
                if (res.confirm) {
                  wx.reLaunch({
                    url: '../related-students/related-students?id=' + app.globalData.studentId_,
                  })
                } else if (res.cancel) {
                  app.globalData.isShow = true;
                  _self.setData({
                    showlayer: false
                  })
                }
              }
            })
          }
        }
      }
    }
  },
  scancode_: function() {
    this.scancode();
  },
  scancode: function() {
    var _self = this;
    wx.scanCode({
      success(res) {
        let id = PublicFun.getUrlParam('studentId', res.result);
        let name = PublicFun.getUrlParam('studentName', res.result);
        Http.Get('/wechat/student/info', {
            studentInfoId: id
          })
          .then(res => {
            if (res.message == 'SUCCESS') {
              app.globalData.studentsInfo = res.infos;
              app.globalData.studentName = res.infos.studentName;
              app.globalData.studentId_ = id;
              _self.setData({
                exitType: 'saoma',
                homework_null_wgl: false,
                homework_null_gl: true
              })
              wx.reLaunch({
                url: '../related-students/related-students?id=' + app.globalData.studentId_,
              })
            } else {
              PublicFun._showToast('请扫描正确的学生二维码')
            }
          })
          .catch(err => {
            PublicFun._showToast('网络错误');
          })

      }
    })
  },
  modal_animation: function() {
    const animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
      transformOrigin: "50% 50%",
      delay: 500
    })
    // const animation_ = wx.createAnimation({
    //   duration: 2000,
    //   timingFunction: 'ease',
    //   transformOrigin: "50% 50%",
    //   delay: 500
    // })
    var that = this;
    if (this.data.isChoose == 0) {
      setTimeout(function() {
        animation.top('0').step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 1000)

      setTimeout(function() {
        animation.top('-68rpx').step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 10000)
    }
  },
  player_animation: function() {
    const animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      transformOrigin: "50% 50%",
      delay: 500
    })
    var that = this;
    //animation.scale(300, 300).step();
    this.setData({
      animationData_player: animation.export()
    })
  },


  bindload: function(e) {
    var that = this
    width = e.detail.width
    height = e.detail.height
    if (width > 750) {
      height = 750 * height / width
      width = 750
    }
    if (height > 1200) {
      width = 1200 * width / height
      height = 1200
    }
    that.setData({
      width: width,
      height: height,
    })
  },
  touchstart: function(e) {
    var that = this
    if (e.touches.length < 2) {
      canOnePointMove = true
      onePoint.x = e.touches[0].pageX * 2
      onePoint.y = e.touches[0].pageY * 2
    } else {
      twoPoint.x1 = e.touches[0].pageX * 2
      twoPoint.y1 = e.touches[0].pageY * 2
      twoPoint.x2 = e.touches[1].pageX * 2
      twoPoint.y2 = e.touches[1].pageY * 2
    }
  },
  touchmove: function(e) {
    var that = this
    if (e.touches.length < 2 && canOnePointMove) {
      var onePointDiffX = e.touches[0].pageX * 2 - onePoint.x
      var onePointDiffY = e.touches[0].pageY * 2 - onePoint.y
      that.setData({
        left: that.data.left + onePointDiffX,
        top: that.data.top + onePointDiffY
      })
      onePoint.x = e.touches[0].pageX * 2
      onePoint.y = e.touches[0].pageY * 2
    } else if (e.touches.length > 1) {
      var preTwoPoint = JSON.parse(JSON.stringify(twoPoint))
      twoPoint.x1 = e.touches[0].pageX * 2
      twoPoint.y1 = e.touches[0].pageY * 2
      twoPoint.x2 = e.touches[1].pageX * 2
      twoPoint.y2 = e.touches[1].pageY * 2
      // 计算角度，旋转(优先)
      var perAngle = Math.atan((preTwoPoint.y1 - preTwoPoint.y2) / (preTwoPoint.x1 - preTwoPoint.x2)) * 180 / Math.PI
      var curAngle = Math.atan((twoPoint.y1 - twoPoint.y2) / (twoPoint.x1 - twoPoint.x2)) * 180 / Math.PI
      if (Math.abs(perAngle - curAngle) > 1) {

      } else {
        // 计算距离，缩放
        var preDistance = Math.sqrt(Math.pow((preTwoPoint.x1 - preTwoPoint.x2), 2) + Math.pow((preTwoPoint.y1 - preTwoPoint.y2), 2))
        var curDistance = Math.sqrt(Math.pow((twoPoint.x1 - twoPoint.x2), 2) + Math.pow((twoPoint.y1 - twoPoint.y2), 2))
        that.setData({
          scale: that.data.scale + (curDistance - preDistance) * 0.005
        })
      }
    }
  },
  touchend: function(e) {
    var that = this
    canOnePointMove = false
  },
  onReachBottom() {
    if (taskType == 1) {
      var page = this.data.currentPage
      page++
      this.setData({
        currentPage: page
      })
      if (app.globalData.isShow) {
        this.historyWork(this.data.currentPage, app.globalData.studentId_, this.data.currentSubject)
      } else {
        this.historyWork(this.data.currentPage, this.data.studentInfoId, this.data.currentSubject)
      }
    }

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
  onUnload: function() {

  },
  audioPlay: function(e) {
    if (e.currentTarget.dataset.t == 2) {
      this.setData({
        audio_t: 2
      })
      this.setData({
        action: {
          method: 'play'
        }
      });
    } else {
      this.setData({
        audio_t: 1
      })
      this.setData({
        action: {
          method: 'pause'
        }
      });
    }
  },
})