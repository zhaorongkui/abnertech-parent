// component/lookAnswer/lookAnswer.js
Page({
  onShareAppMessage() {
    return {
      title: 'swiper2',
      path: 'page/component/pages/swiper/swiper'
    }
  },
})

Component({
  properties: {
    lookres: Object, // 简化的定义方式
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
    infos: [],
    parmres: {},
    studentIndex: -1,
    studentShareUrlList: [],
    subjctShowe: true,
    shareBtnIndex: -1,
    touchS: 0,
    touchE: 0,
    blanks: '',
    blanksArr: []
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    ready() {
      // 在组件在视图层布局完成后执行
      // 父组件传过来的data,用this.data.res接收
      this.setData({
        infos: this.data.lookres.infos,
        parmres: this.data.lookres
      })

      if (this.infos.questionTypeCode === 5) {
        let a = ''
        let b = []
        let c = []
        if (this.infos.questionAnswer) {
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

    touchStart: function (e) {
      let sx = e.touches[0].pageX
      this.data.touchS = sx
    },
    touchMove: function (e) {
      let sx = e.touches[0].pageX;
      this.data.touchE = sx
    },
    touchEnd: function (e) {
      let self = this
      // let start = this.data.touchS
      // let end = this.data.touchE
      // console.log(start)
      // console.log(end)
      // 参考答案
      if (
        self.data.studentIndex === -1 &&
        self.infos.studentShareUrlList.length !== 0 &&
        self.data.touchS - self.data.touchE > 100
      ) {
        self.shareAnswer(self.data.studentIndex + 1)
      }

      if (self.data.studentIndex > -1) {
        let arryLength =
          self.infos.studentShareUrlList[self.data.studentIndex]
          .urlList.length - 1
        // 当最后一个同学不予许再往后滑切换
        if (
          self.data.studentIndex <
          self.infos.studentShareUrlList.length - 1
        ) {
          if (
            self.data.current === arryLength &&
            self.data.touchS - self.data.touchE > 100
          ) {
            self.shareAnswer(self.data.studentIndex + 1)
          }
        }
      }
      // 排除参考答案后，之外的所有同学答案第一页往左滑，切换
      if (
        self.data.current === 0 &&
        self.data.studentIndex !== -1 &&
        self.data.touchE - self.data.touchS > 100
      ) {
        self.shareAnswer(self.data.studentIndex - 1)
      }
    },

    // 切换分享同学答案按钮，切换轮播
    shareAnswer(index) {
      console.log(index)
      if (!index.currentTarget) {
        var self = this
        self.data.studentIndex = index
        this.activeIndex1 = 0
        index === -1 ? (this.data.subjctShowe = true) : (this.data.subjctShowe = false)
        this.data.shareBtnIndex = index
        if (
          index !== -1 &&
          index < this.infos.studentShareUrlList.length
        ) {
          this.data.studentShareUrlList = this.infos.studentShareUrlList[
            index
          ].urlList
        }
      }
      var self = this
      var index = index.currentTarget.dataset.index
      self.data.studentIndex = index
      this.activeIndex1 = 0
      index === -1 ? (this.data.subjctShowe = true) : (this.data.subjctShowe = false)
      this.data.shareBtnIndex = index
      if (
        index !== -1 &&
        index < this.infos.studentShareUrlList.length
      ) {
        this.data.studentShareUrlList = this.infos.studentShareUrlList[
          index
        ].urlList
      }
    }

  }
})