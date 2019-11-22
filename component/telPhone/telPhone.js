// component/telPhone/telPhone.js
const animation = wx.createAnimation({
  duration: 1000,
  timingFunction: 'ease',
})
const animation_o = wx.createAnimation({
  duration: 300,
  timingFunction: 'ease',
})
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgurl: '../../assets/close.png',
    animationData: {},
    animationData_o: {},
    showT: true,
    show: false,
    tel: '400-016-2123'
  },
  ready: function() {
    var _self = this;
    this.animation = animation
    this.animation_o = animation_o
    this.setData({
      showT: wx.getStorageSync('showT')
    })
    this.setData({
      show: wx.getStorageSync('show')
    })

    if (this.data.showT) {
      animation.width('90%').step()
      this.setData({
        animationData: animation.export(),
      })

      setTimeout(function() {
        animation_o.opacity(1).step()
        this.setData({
          animationData_o: animation_o.export()
        })
      }.bind(this), 1000)
    }
    setTimeout(function(){
      _self.tel_c()
    },3000)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tel_c: function() {
      animation_o.opacity(0).step();
      this.setData({
        animationData_o: animation_o.export(),
      })
      
      setTimeout(function() {
        animation.width(48).step();
        this.setData({
          animationData: animation.export(),
          imgurl: '../../assets/telphone.png',
          show: true
        })
      }.bind(this), 500);
      wx.setStorage({
        key: 'showT',
        data: false
      })
      wx.setStorage({
        key: 'show',
        data: true
      })
    },
    callPhone: function(e) {
      var phone = e.currentTarget.dataset.ph;
      wx.makePhoneCall({
        phoneNumber: phone
      })
    }
  }
})