Component({
  properties: {
    answerres: Object, // 简化的定义方式
  },
  /**
   * 组件的初始数据
   */
  data: {
    infos: null,
    parmres: {}
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    ready() {
      // 在组件在视图层布局完成后执行
      // 父组件传过来的data,用this.data.res接收
      if(this.data.answerres) {
        this.setData({
          infos: this.data.answerres.infos,
          parmres: this.data.answerres
        })
      }
    }
  },
  methods:{
    handelIndex(e){
      this.triggerEvent('handelIndex', {
        passValue: e.detail.passValue
      })
      
    }
  }
})