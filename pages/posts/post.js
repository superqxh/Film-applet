// pages/posts/post.js

var postsData = require('../../data/posts-data.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [

            '/img/cat.png',

            '/img/crab.png'

        ],

        indicatorDots: false,

        autoplay: true,

        interval: 5000,

        duration: 500,
    },

    onPostTap: function (event) {
        var Id = event.currentTarget.dataset.id;
        
        wx.navigateTo({
            url: './onRead/onread?id='+Id,
        })
    },

    onSwiper: function (event){
        var Id = event.currentTarget.dataset.id;
        console.log(Id);
        wx.navigateTo({
            url: './onRead/onread?id='+Id,
        }) 
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 从服务器获取的数据


        this.setData({ "post_data": postsData.postsData });
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