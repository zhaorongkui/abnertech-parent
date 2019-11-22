// component/cvs/cvs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    finishRate: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //控制progress
    count: 0, // 设置 计数器 初始为0
    count1: 0, // 设置 计数器 初始为0
    count2: 0, // 设置 计数器 初始为0
    count3: 0, // 设置 计数器 初始为0
    countTimer: null, // 设置 定时器
    countTimer1: null, // 设置 定时器
    width: "",
    height: "",
  },
  ready() {
    var that = this;
    wx.createSelectorQuery().select('.cav-w').boundingClientRect(function(rect) {
      that.setData({
        width: parseInt(rect.width / 7),
        height: parseInt(rect.width / 7)
      })
    }).exec()
  },
  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 画progress进度
     */
    drawCircle: function(step) {
      var that = this;
      this.setData({
        count1: 0,
      });
      this.countTimer1 = setInterval(() => {
        this.data.count1 += 5;
        if (this.data.count1 <= 100) {
          var cxt_arc = wx.createCanvasContext('canvasProgress', this);
          cxt_arc.setLineWidth(6); //绘线的宽度
          cxt_arc.setStrokeStyle('#72a4f0'); //绘线的颜色
          cxt_arc.setLineCap('round'); //线条端点样式
          cxt_arc.beginPath(); //开始一个新的路径
          cxt_arc.arc(this.data.width, this.data.height, this.data.width - 3, -Math.PI * 1 / 2, 2 * Math.PI * (this.data.count1 / 100) - Math.PI * 1 / 2, false);
          cxt_arc.stroke(); //对当前路径进行描边
          cxt_arc.draw();
        } else {
          clearInterval(this.countTimer1);
        }
      }, 20)
    },
    drawCircle1: function (step) {
      var that = this;
      this.setData({
        count1: 0,
      });
      // this.countTimer1 = setInterval(() => {
      //   this.data.count1++;
      //   if (this.data.count1 <= 100) {
          var cxt_arc = wx.createCanvasContext('canvasProgress', this);
          cxt_arc.setLineWidth(6); //绘线的宽度
          cxt_arc.setStrokeStyle('#72a4f0'); //绘线的颜色
          cxt_arc.setLineCap('round'); //线条端点样式
          cxt_arc.beginPath(); //开始一个新的路径
          cxt_arc.arc(this.data.width, this.data.height, this.data.width - 3, 0, 2 * Math.PI , false);
          cxt_arc.stroke(); //对当前路径进行描边
          cxt_arc.draw();
      //   } else {
      //     clearInterval(this.countTimer1);
      //   }
      // }, 20)
    },
    /**
     * 开始progress
     */
    startProgress: function() {
      var that = this;
      this.setData({
        count: 0,
      });
      // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
      this.countTimer = setInterval(() => {
        this.data.count+=1;
        if (this.data.count <= parseInt(that.data.finishRate)) {
          // 使用 wx.createContext 获取绘图上下文 context
          var cxt_arc = wx.createCanvasContext('canvasProgress', this);
          cxt_arc.setLineWidth(6); //绘线的宽度
          cxt_arc.setStrokeStyle('#72a4f0'); //绘线的颜色
          cxt_arc.setLineCap('round'); //线条端点样式
          cxt_arc.beginPath(); //开始一个新的路径
          cxt_arc.arc(this.data.width, this.data.height, this.data.width - 3, 0, 2 * Math.PI, false);
          cxt_arc.stroke(); //对当前路径进行描边
          //这部分是白色部分
          cxt_arc.setLineWidth(6);
          cxt_arc.setStrokeStyle('#fff');
          cxt_arc.setLineCap('round')
          cxt_arc.beginPath(); //开始一个新的路径
          cxt_arc.arc(this.data.width, this.data.height, this.data.width - 3, -Math.PI * 1 / 2, 2 * Math.PI * (this.data.count / 100) - Math.PI * 1 / 2, false);
          cxt_arc.stroke(); //对当前路径进行描边
          cxt_arc.draw();
        } else {
          clearInterval(this.countTimer);
        }
      }, 20)
    },
  }
})