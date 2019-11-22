// component/nav/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    t_id:{
      type:Number,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    t_id: 1,
    isShow_z: true,
  },
  ready:function(){
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switch_tab: function(e) {
      this.setData({
        t_id: e.currentTarget.dataset.id
      })
      if (e.currentTarget.dataset.id == 2) {
        this.triggerEvent('_self', {
          isShow_z: false,
          t_id: e.currentTarget.dataset.id
        });
      } else {
        this.triggerEvent('_self', {
          isShow_z: true,
          t_id: e.currentTarget.dataset.id
        });
      }
    },
  }
})