// pages/index/index.js
Page({
    ontap: function () {
        wx.navigateTo({
            url: '/pages/Welcome/Huan',//从父级跳转到子集 可以返回
        });

        // wx.redirectTo({
        //     url: '/pages/posts/post',//平级跳转 不可以返回
        //     success: function (res) {
        //         console.log(res)
        //     },
        //     fail: function (res) {
        //         console.log(2)
        //     }
        // });
    },

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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