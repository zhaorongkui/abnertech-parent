import PublicFun from '../../utils/PublicFun.js';
import Http from '../../utils/ajax.js';
const phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
const app = getApp();

Page({
  data: {
    btnTxt: '获取验证码',
    isGetCode: false,
    Loading: false,
    countDown: 60,
    formData: {
      phone: '',
      code: ''
    },
    checkboxChecked: true,
    parentId: '',
    showClearP: false,
    showClearV: false,
    inputVal: ''
  },
  onLoad(options) {
    this.setData({
      parentId: app.globalData.parentId
    })
  },

  formSubmit(e) {
    let _self = this,
      formData = e.detail.value,
      errMsg = '';
    if (!formData.phone) {
      errMsg = '手机号不能为空！';
      PublicFun._showToast(errMsg);
      return false
    }
    if (formData.phone) {
      if (!phoneRexp.test(formData.phone)) {
        errMsg = '手机号格式有误！';
        PublicFun._showToast(errMsg);
        return false
      }
    }
    if (!formData.code) {
      errMsg = '验证码不能为空！';
      PublicFun._showToast(errMsg);
      return false
    }
    if (!this.data.checkboxChecked) {
      errMsg = '请确认已经阅读用户使用协议';
      PublicFun._showToast(errMsg);
      return false
    }

    Http.Post('/wechat/bound/bindPhone', {
        parentId: _self.data.parentId,
        parentPhone: _self.data.formData.phone,
        phoneCheckCode: _self.data.formData.code
      })
      .then(res => {
        if (res.message == 'SUCCESS') {
          PublicFun._showToastSuccess();
          setTimeout(function() {
            wx.navigateBack()
          }, 2000)
        } else {
          PublicFun._showToast(res.message);
        }
      })
      .catch(err => {
        PublicFun._showToast('网络错误');
      })
  },
  clearIntP: function() {
    this.setData({
      inputValP: '',
      showClearP: false,
    })
  },
  clearIntV: function() {
    this.setData({
      inputValV: '',
      showClearV: false,
    })
  },
  getPhoneCode() {
    let _self = this,
      formData = _self.data.formData,
      errMsg = '';
    errMsg = !formData.phone ? '手机号不能为空！' :
      formData.phone && !phoneRexp.test(formData.phone) ? '手机号格式有误！' :
      '';
    if (errMsg) {
      PublicFun._showToast(errMsg);
      return false
    }

    //判断手机号是否相同
    Http.Get('/wechat/bound/isCommonPhone', {
        parentId: _self.data.parentId,
        phone: _self.data.formData.phone,
      }).then(res => {
        if (res.infos.isCommonPhone == 0) {
          _self.sendsms(_self);
        }else{
          PublicFun._showToast('相同手机号不能重复绑定');
        }
      })
      .catch(err => {
        PublicFun._showToast('网络错误');
      })

  },
  sendsms: function(_s) {
    //连接服务器进行获取验证码操作
    Http.Get('/wechat/sms/sendSms', {
        typeNum: 6,
        phoneNum: _s.data.formData.phone,
      }).then(res => {
        if (res.flag == '1') {
          PublicFun._showToast(res.infos);
          _s.setData({
            isGetCode: true
          })
          _s.timer();
        } else {
          PublicFun._showToast(res.message);
          _s.setData({
            isGetCode: false
          })
        }
      })
      .catch(err => {
        PublicFun._showToast('网络错误');
      })
  },
  timer() { //验证码倒计时
    let _self = this,
      countDown = _self.data.countDown;
    let clock = setInterval(() => {
      countDown--
      if (countDown >= 0) {
        _self.setData({
          countDown: countDown
        })
      } else {
        clearInterval(clock)
        _self.setData({
          countDown: 60,
          isGetCode: false,
          btnTxt: '获取验证码'
        })
      }
    }, 1000)
  },
  Input(e) { //输入检索
    let _self = this,
      formData = _self.data.formData,
      inputType = e.currentTarget.dataset.id,
      inputValue = e.detail.value;
    inputType === 'phone' ?
      formData.phone = inputValue : formData.code = inputValue;
    _self.setData({
      formData
    })
    this.setData({
      inputValP: formData.phone,
    })
    if (formData.phone != '') {
      _self.setData({
        showClearP: true
      })
    }
  },
  Input_(e) { //输入检索
    let _self = this,
      formData = _self.data.formData,
      inputType = e.currentTarget.dataset.id,
      inputValue = e.detail.value;
    inputType === 'code' ?
      formData.code = inputValue : formData.phone = inputValue;
    _self.setData({
      formData
    })
    this.setData({
      inputValV: formData.code
    })
    if (formData.code != '') {
      _self.setData({
        showClearV: true
      })
    }

  },
  checkboxChange(e) {
    let checkboxChecked = e.detail.value.length ? true : false;
    this.setData({
      checkboxChecked: checkboxChecked
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var shareObj = {
      title: "",
      path: '/pages/index/index',
      imageUrl: '',
      success: function (res) { },
      fail: function () { },
      complete: function () { }
    }
    return shareObj;
  },
})