// component/subjectiveQuestionAnswer/subjectiveQuestionAnswer.js
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
}),
Component({
  properties: {
    res: Object, // 简化的定义方式
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
        infos: this.data.res.infos,
        parmres: this.data.lookres
      })

      // if (this.data.infos.questionTypeCode === 5) {
      //   let a = ''
      //   let b = []
      //   let c = []
      //   if (this.data.infos.questionAnswer) {
      //     JSON.parse(this.infos.questionAnswer).forEach((item, index) => {
      //       item.answer.forEach(items => {})
      //       a = item.answer.join('或')
      //       this.data.blanksArr.push(a)
      //     })
      //     //重新组数组
      //     this.data.blanksArr.forEach((item, index) => {
      //       this.data.blanks += `${index + 1}、${decodeURIComponent(
      //         item
      //       )}&nbsp;&nbsp;&nbsp;&nbsp;`
      //     })
      //   }
      // }
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
  }
})