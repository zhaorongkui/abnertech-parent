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
    studentIndex: null,
    studentShareUrlList: [],
    subjctShowe: true,
    shareBtnIndex: -1,
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
      // console.log(this.data.infos)
      // console.log(this.data.parmres)
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
    /* 获取滑块左右滑动时位置 */
    hotSwiperTransition: function (e) {
      console.log(e)
      if(e.detail.dx = 60) {
        console.log('往右滑')
        return
      }
      if(e.detail.dx = -60) {
        console.log('往左滑')
        return
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