// component/radioQuestionAnswer/radioQuestionAnswer.js
Component({
  properties: {
    infos: Object
  },
  /**
   * 组件的初始数据
   */
  data: {
    infos: {}
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    ready() {
      this.setData({
        infos: this.data.infos
      })
      console.log(this.data.infos)
      // 在组件在视图层布局完成后执行
      // 父组件传过来的data,用this.data.res接收
      // console.log(this)
    }
  }
})