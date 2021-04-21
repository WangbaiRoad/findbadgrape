// pages/G_info/G_info.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    G:{
      G_name:"",
      G_area:"",
      G_rule:"",
      G_control:"",
      G_symptom:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      G:{
        G_name:app.globalData.G.G_name,
        G_area:app.globalData.G.G_area,
        G_rule:app.globalData.G.G_rule,
        G_control:app.globalData.G.G_control,
        G_symptom:app.globalData.G.G_symptom
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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