Component({
  properties: {
    res: Object, // 简化的定义方式
  },
  /**
   * 组件的初始数据
   */
  data: {
    infos: {},
    parmres: {}
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    ready() {
      console.log(this.data.res)
      // 在组件在视图层布局完成后执行
      // 父组件传过来的data,用this.data.res接收
      if(this.data.res) {
         this.setData({
           infos: this.data.res.infos,
           parmres: this.data.res
         })
      }
     
    }
  }
})