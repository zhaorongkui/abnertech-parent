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
    infos: {},
    parmres: {},
    scrollWidth: 0,
    imgheights: [],
    imageUrls: []
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    ready() {
      var that = this;
      wx.getSystemInfo({
        success: function (res) {
          //获取屏幕的宽度并保存
          that.setData({
            scrollWidth: res.windowWidth
          });
        }
      });
      // console.log(this.data.res)
      // 在组件在视图层布局完成后执行
      // 父组件传过来的data,用this.data.res接收
      this.setData({
        infos: this.data.res.infos
        // parmres: this.data.lookres
      })
      this.data.infos.homeworkStudentAnswer.studentAnswerFiles.forEach(item => {
        this.data.imageUrls.push(item.answerFileUrlStr)
      })
      console.log(this.data.imageUrls)
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
    },
    /*** 预览图片****/
    previewImage: function (e) {
      var url = e.currentTarget.dataset.src;
      wx.previewImage({
        current: url, // 当前显示图片的http链接 
        urls: this.data.imageUrls // 需要预览的图片http链接列表  
      })
    },
    //等比缩放图片并保存
    imageLoad: function (e) {
      //获取图片真实宽度  
      var imgwidth = e.detail.width,
        imgheight = e.detail.height,
        //宽高比  
        ratio = imgwidth / imgheight;
      //计算的高度值  
      var viewHeight = parseInt(this.data.scrollWidth) / ratio;
      var imgheight = viewHeight.toFixed(0);
      var imgheightarray = this.data.imgheights;
      //把每一张图片的高度记录到数组里
      imgheightarray.push(imgheight);
      this.setData({
        imgheights: imgheightarray,
      });
    }
  }
})