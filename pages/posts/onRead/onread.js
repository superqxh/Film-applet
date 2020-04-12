
var postsData = require("../../../data/posts-data.js");
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        "isPlayingMusic":true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        var Id = options.id;
        this.data.zhuangT = Id;
        var postsData_n = postsData.postsData[Id];
        this.setData({ "ReadData": postsData_n });

        var postsState = wx.getStorageSync("state");

        if (postsState) {
            var astate = postsState[Id];
            this.setData({
                "state": astate
            });
        } else {
            var postsState = {};
            postsState[Id] = false;
            wx.setStorageSync("state", postsState);
        };


        if (app.rieko.W_playingMusic && app.rieko.W_playingMusicId===Id) {
            this.setData({
                "isPlayingMusic": false
            });
        };
        
        wx.onBackgroundAudioPlay(function (){
            _this.setData({
                "isPlayingMusic": false
            });
            app.rieko.W_playingMusic= true;
            app.rieko.W_playingMusicId = Id;
        });
        wx.onBackgroundAudioPause(function () {
            _this.setData({
                "isPlayingMusic": true
            });
            app.rieko.W_playingMusic = false;
            app.rieko.W_playingMusicId =null;
        });
    },

    onclImg: function () {
        var postsState = wx.getStorageSync("state");

        var astate = postsState[this.data.zhuangT];
        astate = !astate;

        //   提示收藏是否成功
        //   if (astate){
        //       wx.showToast({
        //           title: '收藏成功',
        //           icon: 'success',
        //           duration: 2000
        //       });
        //   }else{
        //       wx.showToast({
        //           title: '取消收藏成功',
        //           icon: 'success',
        //           duration: 2000
        //       }); 
        //   }

        wx.showToast({
            title: astate ? '收藏成功' : '取消收藏成功',
            icon: 'success',
            duration: 2000
        });

        postsState[this.data.zhuangT] = astate;
        wx.setStorageSync("state", postsState);
        this.setData({
            "state": astate
        });
    },

    onFx: function (event) {
        wx.showActionSheet({
            itemList: [
                '分享到QQ',
                '分享到微信好友',
                '分享到微博',
                '分享到朋友圈'
            ],
            itemColor: "#405f80",
            success: function (res) {
                console.log(res.tapIndex)
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    },

    onMusic: function (event) {
        var isPlayingMusic = this.data.isPlayingMusic;

        if (isPlayingMusic) {
            wx.playBackgroundAudio({
                title: postsData.postsData[this.data.zhuangT].music.title,
                coverImgUrl: postsData.postsData[this.data.zhuangT].music.coverImgUrl,
                dataUrl: postsData.postsData[this.data.zhuangT].music.dataUrl
            });
            this.setData({
                "isPlayingMusic": false
            });
        }else{
            wx.pauseBackgroundAudio();
            this.setData({
                "isPlayingMusic": true
            });
        }
        
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