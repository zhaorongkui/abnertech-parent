// component/tip/tip.js
import PublicFun from '../../utils/PublicFun.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    right: {
      type: String,
      value: ''
    },
    top: {
      type: String,
      value: ''
    },
    bool: {
      type: Boolean,
      value: ''
    },
    role_id: {
      type: Number,
      value: ''
    },
    role_name: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [{
        name: '爸爸',
        id: '1'
      },
      {
        name: '妈妈',
        id: '2'
      },
      {
        name: '爷爷',
        id: '3'
      },
      {
        name: '奶奶',
        id: '4'
      },
      {
        name: '姥爷',
        id: '5'
      },
      {
        name: '姥姥',
        id: '6'
      },
      {
        name: '叔叔/大爷',
        id: '7'
      },
      {
        name: '婶婶/姨',
        id: '8'
      },
      {
        name: '舅舅/舅妈',
        id: '9'
      },
    ],
    show: false,
    role_id: '1',
    roleId:'',
    roleName: '',
    role_name: '',
    animationData: {},
    animationData_: {}
  },
  created() {
    
  },
  ready() {
    this.setData({
      roleId:this.data.role_id,
      roleName: this.data.role_name
    })
    this.animation();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    role_s: function(e) {
      this.setData({
        role_id: e.currentTarget.dataset.id,
        role_name: e.currentTarget.dataset.name,
      })
    },
    cancel: function() {
      var _self = this;
      this.triggerEvent('_self_', {
        show_tip: false,
        name: this.data.roleName,
        role_id: this.data.roleId
      });
    },
    confirm: function() {
      var _self = this;
      this.triggerEvent('_self', {
        show_tip: false,
        id: _self.data.role_id,
        name: PublicFun.role(_self.data.role_id)
      });
    },
    animation: function() {
      const animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        transformOrigin: "50% 50%",
        delay: 0
      })
      const animation_ = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        transformOrigin: "50% 50%",
        delay: 300
      })
      var that = this;
      animation.width('654rpx').height('445rpx').step();
      this.setData({
        animationData: animation.export()
      })
      setTimeout(function() {
        animation_.opacity(1).step();
        this.setData({
          animationData_: animation_.export()
        })
      }.bind(this), 600);
    }
  }
})