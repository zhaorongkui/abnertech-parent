// component/lookAnswer/lookAnswer.js
Component({
  properties: {
    // lookres: Object, // 简化的定义方式
  },
  /**
   * 组件的初始数据
   */
  data: {
    background: ['../../assets/img/jxbg.png', '../../assets/img/jxbg.png', '../../assets/img/jxbg.png'],
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    current: 0,
    infos: {
      "questionId": 4359,
      "revisionQuestionId": 350,
      "questionNumber": "3",
      "workbookChapterId": 2889,
      "questionSourceId": 1,
      "questionTypeCode": 6,
      "subjectAbbreviation": "shuxue",
      "questionProperty": 1,
      "workbookName": "（测试勿动）初中数学|练一练",
      "textbookName": "（勿动！测试）九年级|数学|上册",
      "revisionStudentAnswer": {
        "hasAnswer": 1,
        "submitTime": 1577959804000,
        "answerState": 2,
        "answerType": 1,
        "studentAnswerFiles": [{
          "fileSort": 1,
          "answerFileUrl": "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/20200102/16321577959803280unknown.jpg"
        }]
      },
      "studentShareUrlList": [{
        "studentInfoId": 1651,
        "urlList": ["http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376186ABN20171200047.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376197ABN20171200047.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/1661559110383283ABN20171200069.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376205ABN20171200047.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376209ABN20171200047.jpg"]
      }, {
        "studentInfoId": 1652,
        "urlList": ["http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376186ABN20171200047.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376197ABN20171200047.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/1661559110383283ABN20171200069.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376205ABN20171200047.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376209ABN20171200047.jpg"]
      }, {
        "studentInfoId": 1653,
        "urlList": ["http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376186ABN20171200047.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376197ABN20171200047.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/1661559110383283ABN20171200069.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376205ABN20171200047.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376209ABN20171200047.jpg"]
      }, {
        "studentInfoId": 1654,
        "urlList": ["http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376186ABN20171200047.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376197ABN20171200047.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/1661559110383283ABN20171200069.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376205ABN20171200047.jpg", "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/shuxue/20190529/16511559098376209ABN20171200047.jpg"]
      }],
      "workbookChapterPage": 1,
      "questionSourceName": "练习册",
      "questionYytypeName": "简答题",
      "revisionId": 71,
      "studentInfoId": 1655,
      "questionTypeName": "主观题",
      "homeworkId": 2761,
      "questionStem": "<p>某商贩购进一批苹果到集贸市场出售，已知卖出的苹果数量x与售价y的关系如下表：已知卖出的苹果数量x与售价y的关系如下表：已知卖出的苹果数量x与售价y的关系如下表：已知卖出的苹果数量x与售价y的关系如下表：已知卖出的苹果数量x与售价y的关系如下表：已知卖出的苹果数量x与售价y的关系如下表：已知卖出的苹果数量x与售价y的关系如下表：已知卖出的苹果数量x与售价y的关系如下表：已知卖出的苹果数量x与售价y的关系如下表：已知卖出的苹果数量x与售价y的关系如下表：已知卖出的苹果数量x与售价y的关系如下表：</p>",
      "homeworkStudentAnswer": {
        "isTrue": 1,
        "hasAnswer": 1,
        "answerState": 2,
        "answerType": 1,
        "hasRewive": 1,
        "studentAnswerFiles": [{
          "fileSort": 1,
          "answerFileUrl": "/img/homework/20200102/16321577959751088unknown.jpg",
          "answerFileUrlStr": "http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/homework/20200102/16321577959751088unknown.jpg"
        }]
      },
      "workbookChapterNameList": ["第一章 有理数"],
      "questionAnswer": "<p>某商贩购进一批苹果到集贸市场出售，已知卖出的苹果数量x与售价y的关系如下表：</p>",
      "questionInfoId": 1253,
      "questionType": 1,
      "questionAnalysis": "<p>某商贩购进一批苹果到集贸市场出售，已知卖出的苹果数量x与售价y的关系如下表：</p>"
    },
    parmres: {},
    studentIndex: -1,
    studentShareUrlList: [],
    subjctShowe: true,
    shareBtnIndex: -1,
    touchS: 0,
    touchE: 0,
    blanks: '',
    blanksArr: [],
    scrollWidth: 0,
    imgheights: []
  },
  lifetimes: {
    onShareAppMessage() {
      return {
        title: 'swiper2',
        path: 'page/component/pages/swiper/swiper'
      }
    },
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    ready() {
      var that = this;
      wx.getSystemInfo({
        success: function (res) {
          //获取屏幕的宽度并保存
          that.setData({
            scrollWidth: res.windowWidth
          });
        }
      });
      // 在组件在视图层布局完成后执行
      // 父组件传过来的data,用this.data.res接收
      this.setData({
        infos: this.data.lookres.infos,
        parmres: this.data.lookres
      })

      if (this.data.infos.questionTypeCode === 5) {
        let a = ''
        let b = []
        let c = []
        if (this.data.infos.questionAnswer) {
          JSON.parse(this.infos.questionAnswer).forEach((item, index) => {
            item.answer.forEach(items => {})
            a = item.answer.join('或')
            this.data.blanksArr.push(a)
          })
          //重新组数组
          this.data.blanksArr.forEach((item, index) => {
            this.data.blanks += `${index + 1}、${decodeURIComponent(
              item
            )}&nbsp;&nbsp;&nbsp;&nbsp;`
          })
        }
      }
    }
  },
  methods: {
    // 当滑块切换时触发事件
    onSliderChangeEnd: function (e) {
      let that = this;
      that.setData({
        current: e.detail.current
      })
      console.log(that.data.current)
    },
    // 滑动开始的坐标
    touchStart: function (e) {
      let sx = e.touches[0].pageX
      this.data.touchS = sx
    },
    touchMove: function (e) {
      let sx = e.touches[0].pageX;
      this.data.touchE = sx
    },
    // 滑动结束的坐标
    touchEnd: function (e) {
      let self = this
      // let start = this.data.touchS
      // let end = this.data.touchE
      // 参考答案
      if (
        self.data.studentIndex === -1 &&
        self.data.infos.studentShareUrlList.length !== 0 &&
        self.data.touchS - self.data.touchE > 130
      ) {
        self.shareAnswer(self.data.studentIndex + 1)
      }

      if (self.data.studentIndex > -1) {
        let arryLength =
          self.data.infos.studentShareUrlList[self.data.studentIndex]
          .urlList.length - 1
        // 当最后一个同学不予许再往后滑切换
        if (
          self.data.studentIndex <
          self.data.infos.studentShareUrlList.length - 1
        ) {
          if (
            self.data.current === arryLength &&
            self.data.touchS - self.data.touchE > 130
          ) {
            self.shareAnswer(self.data.studentIndex + 1)
          }
        }
      }
      // 排除参考答案后，之外的所有同学答案第一页往左滑，切换
      if (
        self.data.current === 0 &&
        self.data.studentIndex !== -1 &&
        self.data.touchE - self.data.touchS > 130
      ) {
        self.shareAnswer(self.data.studentIndex - 1)
      }
    },

    // 切换分享同学答案按钮，切换轮播
    shareAnswer(index) {
      var self = this
      if (!index.currentTarget) {
        self.setData({
          studentIndex: index,
          shareBtnIndex: index,
          current: 0
        })
        let show = true
        index === -1 ? (show = true) : (show = false)
        self.setData({
          subjctShowe: show
        })
        if (
          index !== -1 &&
          index < this.data.infos.studentShareUrlList.length
        ) {
          self.setData({
            studentShareUrlList: this.data.infos.studentShareUrlList[index].urlList
          })
        }
      } else {
        var index = index.currentTarget.dataset.index
        self.setData({
          studentIndex: index,
          shareBtnIndex: index,
          current: 0
        })
        let show = true
        index === -1 ? (show = true) : (show = false)
        self.setData({
          subjctShowe: show
        })
        if (
          index !== -1 &&
          index < self.data.infos.studentShareUrlList.length
        ) {
          self.setData({
            studentShareUrlList: this.data.infos.studentShareUrlList[index].urlList
          })
        }
      }
    },
    /*** 预览图片****/
    previewImage: function (e) {
      var url = e.currentTarget.dataset.src;
      wx.previewImage({
        current: url, // 当前显示图片的http链接 
        urls: this.data.studentShareUrlList // 需要预览的图片http链接列表  
      })
    },
    //等比缩放图片并保存
    imageLoad: function (e) {
      //获取图片真实宽度  
      var imgwidth = e.detail.width,
        imgheight = e.detail.height,
        //宽高比  
        ratio = imgwidth / imgheight;
      //计算的高度值  
      var viewHeight = parseInt(this.data.scrollWidth) / ratio;
      var imgheight = viewHeight.toFixed(0);
      var imgheightarray = this.data.imgheights;
      //把每一张图片的高度记录到数组里
      imgheightarray.push(imgheight);
      this.setData({
        imgheights: imgheightarray,
      });
    }
  }
})