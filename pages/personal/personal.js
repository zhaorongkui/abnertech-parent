 // pages/personal/personal.js
 const app = getApp();
 import Http from '../../utils/ajax.js';
 import PublicFun from '../../utils/PublicFun.js';
var studentsInfo=null;
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     current: 'personal',
     show_tip: false,
     role_id: '',
     userInfo: null,
     parentName: '',
     studentName: '',
     parentInfo: null,
     isShow: true,
     isStudent: true
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     studentsInfo = app.globalData.studentsInfo ? app.globalData.studentsInfo : {};
     var userInfo = app.globalData.userInfo ? app.globalData.userInfo : {};
     this.setData({
       isShow: app.globalData.isShow,
       userInfo: userInfo
     })
     if (JSON.stringify(studentsInfo) != "{}" && studentsInfo.boundStudents != undefined) {
       this.setData({
         studentName: studentsInfo.boundStudents[0].studentName + '的',
         role_id: studentsInfo.boundStudents[0].bountRelation,
         isStudent: true,
         parentName: PublicFun.role(studentsInfo.boundStudents[0].bountRelation, ),
       })
     } else {
       this.setData({
         isStudent: false,
       })
     }
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function() {

   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function() {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function() {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function() {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function() {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {

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
   role_s: function() {
     if (!this.data.isShow) {
       this.setData({
         show_tip: !this.data.show_tip
       })
     } else {
       PublicFun._showToast('未关联不能切换角色')
       return false
     }
   },
   self_event_: function(e) {
     var _self = this;
     this.setData({
       show_tip: e.detail.show_tip,
     })
   },
   self_event: function(e) {
     var _self = this;
     this.setData({
       show_tip: e.detail.show_tip,
       role_id: e.detail.id,
       parentName: e.detail.name
     })
    
    if(JSON.stringify(studentsInfo) != "{}" && studentsInfo.boundStudents != undefined) {
       app.globalData.studentsInfo.boundStudents[0].bountRelation = e.detail.id;
     }  
     Http.Post('/wechat/bound/bindStudent', {
         bountRelation: _self.data.role_id,
         openId: wx.getStorageSync('openid')
       })
       .then(res => {
         if (res.message == 'SUCCESS') {
           PublicFun._showToast('角色切换成功')
         }
       })
       .catch(err => {
         PublicFun._showToast('网络错误');
       })
   },
   handleChange({
     detail
   }) {
     this.setData({
       current: detail.key
     });
     let url = '../' + detail.key + "/" + detail.key;
     wx.redirectTo({
       url: url,
     })
   },
   nav_to: function(e) {
     wx.navigateTo({
       url: e.currentTarget.dataset.url,
     })
   },
   scancode: function() {
     wx.scanCode({
       success(res) {
         let id = PublicFun.getUrlParam('studentId', res.result);
         let name = PublicFun.getUrlParam('studentName', res.result);
         Http.Get('/wechat/student/info', {
             studentInfoId: id
           })
           .then(res => {
             if (res.message == 'SUCCESS') {
               app.globalData.studentId_ = id;
               app.globalData.studentName = res.infos.studentName;
               wx.navigateTo({
                 url: '../related-students/related-students?id=' + app.globalData.studentId_,
               })

             } else {
               PublicFun._showToast('请扫描正确的学生二维码')
             }
           })
           .catch(err => {
             PublicFun._showToast('网络错误');
           })

       }
     })
   }
 })