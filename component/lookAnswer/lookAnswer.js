// component/lookAnswer/lookAnswer.js
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    background: ['../../assets/img/jxbg.png', '../../assets/img/jxbg.png', '../../assets/img/jxbg.png'],
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    current: 0,
    imgUrl: '777777'
  },

  // 当滑块切换时触发事件
  onSliderChangeEnd:function(e) {
    let that = this;
    that.setData({
      current: e.detail.current
    })
    console.log(that.data.current)
  },
  /* 获取滑块左右滑动时位置 */
  hotSwiperTransition: function(e) {
    // console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('1111111')

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('2222222')
    console.log(this.data.imgUrl)

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// Component({
//   lifetimes: {
//   ready: function() {
//     console.log(this,'------------------')
//   }
//   }
// })