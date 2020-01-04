// component/groupQuestionAnswers/groupQuestionAnswers.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    groupres: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    list: [],
    height:0
  },

  lifetimes: {
    attached() {
      var self = this
      this.setData({
        list: this.data.groupres.childQuestionInfoList
      })
      // 在组件实例进入页面节点树时执行
    },
    ready() {
      this.domHeight(this.data.currentIndex)
    }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange(e) {
      this.setData({
        currentIndex: e.detail.current
      })

      this.triggerEvent('handelIndex', {
        passValue: e.detail.current
      })

      let screenWidth = wx.getSystemInfoSync().windowWidth;
      let itemWidth = screenWidth / 5;
      let scrollX = itemWidth * e.detail.current - itemWidth * 2;
      let maxScrollX = (this.data.list.length + 1) * itemWidth;

      if (scrollX < 0) {
        scrollX = 0;
      } else if (scrollX >= maxScrollX) {
        scrollX = maxScrollX;
      }

      this.setData({
        x: scrollX
      })
    },

    selectLeftBnt() {
      var index = this.data.currentIndex
      index--
      this.setData({
        currentIndex: index
      })
      if (index <= 0){
        index = 0
         this.setData({
           currentIndex : index
         })
      }

      this.triggerEvent('handelIndex', {
        passValue: index
      })
      
      let screenWidth = wx.getSystemInfoSync().windowWidth;
      let itemWidth = screenWidth / 5;
      let scrollX = itemWidth * index - itemWidth * 2;
      let maxScrollX = (this.data.list.length + 1) * itemWidth;

      if (scrollX < 0) {
        scrollX = 0;
      } else if (scrollX >= maxScrollX) {
        scrollX = maxScrollX;
      }

      this.setData({
        x: scrollX
      })
    },
    selectRightBnt() {
      
      var index = this.data.currentIndex
      index++
      this.setData({
        currentIndex: index
      })
      if (index > this.data.list.length - 1) {
        index = this.data.list.length - 1
        this.setData({
          currentIndex: index
        })
      }

      this.triggerEvent('handelIndex', {
        passValue: index
      })

      let screenWidth = wx.getSystemInfoSync().windowWidth;
      let itemWidth = screenWidth / 5;
      let scrollX = itemWidth * index - itemWidth * 2;
      let maxScrollX = (this.data.list.length + 1) * itemWidth;

      if (scrollX < 0) {
        scrollX = 0;
      } else if (scrollX >= maxScrollX) {
        scrollX = maxScrollX;
      }

      this.setData({
        x: scrollX
      })
    },

    switchTap(e) {

      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })
      this.triggerEvent('handelIndex', {
        passValue: e.currentTarget.dataset.index
      })
      let screenWidth = wx.getSystemInfoSync().windowWidth;

      let itemWidth = screenWidth / 5;

      let { index, type } = e.currentTarget.dataset;



      const { nav_list } = this.data;

      let scrollX = itemWidth * index - itemWidth * 2;

      let maxScrollX = (nav_list.length + 1) * itemWidth;

      if (scrollX < 0) {
        scrollX = 0;
      } else if (scrollX >= maxScrollX) {
        scrollX = maxScrollX;
      }

      this.setData({
        x: scrollX
      })
    },
    domHeight(index) {
      var height = 0
      var self = this
      const query = wx.createSelectorQuery().in(this)
      query.selectAll('.tips').boundingClientRect()
      query.selectAll('.choseItem').boundingClientRect()
      query.exec(function (res) {
        height =  Number(res[0][index].height) + Number(res[1][index].height)
        
        self.setData({
          height: height*2 + 50
        })
      })
    }
  }
})
