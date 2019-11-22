// component/tabbar/tabbar.js
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
    current: 'index',
    list: [
      {
        "pagePath": "index",
        "text": "作业",
        "iconPath":"../../assets/zy-1.png",
        "selectedIconPath":"../../assets/zy.png"
      },
      {
        "pagePath": "track",
        "text": "作业跟踪",
        "iconPath": "../../assets/zygz-1.png",
        "selectedIconPath": "../../assets/zygz.png"
      },
      {
        "pagePath": "personal",
        "text": "作业跟踪",
        "iconPath": "../../assets/grzx-1.png",
        "selectedIconPath": "../../assets/grzx.png"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange({ detail }) {
      console.log(detail)
      this.setData({
        current: detail.key
      });
      let url = '../' + detail.key + "/" + detail.key
      console.log(url)
      wx.redirectTo({
        url: url
      })
    },
  }
})
