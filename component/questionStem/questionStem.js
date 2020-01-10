// component/questionStem/questionStem.js

Component({
  properties: {
    stemres: Object
  },
  /**
   * 组件的初始数据
   */
  data: {
    imgs:[]
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    ready() {
      // 在组件在视图层布局完成后执行
      // 父组件传过来的data,用this.data.res接收
      let that = this
      console.log(this.data.stemres)
      var nodes = this.data.stemres.infos.questionStem
      
      if (nodes.indexOf("src") >= 0) {
        //正则匹配所有图片路径
        var imgs = [];
        nodes = nodes.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(match, capture) {
          imgs.push(capture);
          that.setData({
            imgs: imgs
          });
          return '';
        });
        console.log(this.data.imgs)
        //清除图片后正则匹配清除所有p标签
        nodes = nodes.replace(/<p(([\s\S])*?)<\/p>/g, function(match, capture) {
          return '';
        });
      }

    }
  },
  methods: {
    ooo() {
      console.log('000')
    }
  }
})