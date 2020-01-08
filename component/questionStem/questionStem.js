// component/questionStem/questionStem.js

Component({
  properties: {
    // stemres: Object
  },
  /**
   * 组件的初始数据
   */
  data: {
    stemObj: {},
    stemres: {
      infos: {
        // questionStem: '<p>知识点一&nbsp;&nbsp;&nbsp;&nbsp;二次函数y=ax²+k的图象</p> \n<p>二次函数y=ax²+k的图象是一条抛物线.</p> \n<p>知识点二&nbsp;&nbsp;&nbsp;&nbsp;二次函数y=ax²+k的性质</p> \n<p><img src="http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/question/shuxue/20180829/21cbc12916554a5c8459579624d5f285.png" title="" alt=""></p> \n<p>知识点三&nbsp;&nbsp;&nbsp;&nbsp;二次函数y=ax²与y=ax²±k（k&gt;0）的图象的位置关系</p> \n<p><img src="http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/question/shuxue/20180829/4186b2113a10475f88ea15f10f7ee0c8.png" title="" alt="">；</p> \n<p><img src="http://lochi-sit.oss-cn-beijing.aliyuncs.com/img/question/shuxue/20180829/f2bbfa43167c4ad59b8b6a239c66a426.png" title="" alt="">.</p> \n<p>口诀：上加下减.</p>'
      }
    }
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    ready() {
      // 在组件在视图层布局完成后执行
      // 父组件传过来的data,用this.data.res接收
      let that = this
      // let stemStr = 'stemres.infos.questionStem'
      // var jsonDa = (this.data.stemres.infos.questionStem).replace(/<img/g, "<img bindtap='ooo' class='click'");
      // console.log(jsonDa)
      // this.setData({
      //   [stemStr]: jsonDa
      // })
      // const query = wx.createSelectorQuery().in(this)
      // query.select('.questionDis').boundingClientRect((rect) => {
      //   console.log(rect,)
      // }).exec()
    }
  },
  methods: {
    ooo(){
      console.log('000')
    }
  }
})