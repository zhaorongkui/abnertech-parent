// component/CorrectResults/CorrectResults.js
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
    parmres: {}
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    ready() {
      // 在组件在视图层布局完成后执行
      // 父组件传过来的data,用this.data.res接收
      this.setData({
        infos: this.data.res.infos
        // parmres: this.data.lookres
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
  }
})