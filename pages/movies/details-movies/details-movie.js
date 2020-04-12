// pages/movies/details-movies/details-movie.js
var starZhuanArray = require('../../../utils/utils.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      movies:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var moviesId = options.moviesid;
    var detailsId = app.rieko.doubanBase + "/v2/movie/subject/" + moviesId;
    this.GetDetailMoviesData(detailsId);
  },

  GetDetailMoviesData: function (url){
        var _this = this;
        wx.request({
            url: url,
            data: {},
            method: 'GET',
            header: {
                "Content-Type": "text/xml"
            },
            success: function (res) {
                _this.HandleDetailMoviesData(res.data);
            },
            fail: function () {
                //接口调用失败的回调函数
            },
            complete: function () {
                //接口调用结束的回调函数（调用成功、失败都会执行）
            }
        })
    },

    HandleDetailMoviesData:function (data){
        if(data){
            var directors = "";
            if (data.directors){
                directors = data.directors[0].name;
            };
            var movies = {
                images: data.images ? data.images.large : "",
                title:data.title,
                year:data.year,
                countries: data.countries[0],//国家
                wishCount: data.wish_count,//喜欢人数
                commentsCount: data.comments_count,//评论数
                originalTitle: data.original_title,//原标题
                star_Fen: starZhuanArray.starZhuanArray(data.rating.stars),
                directors: directors,//导演
                casts: this.castsProcessingData(data.casts).join("/"),//影人 姓名
                name: this.castsProcessingData(data.casts),
                genres: data.genres.join("、"),//类型
                summary: data.summary,//简介
                castsImg: this.castsImgProcessingData(data.casts),// 处理影人图片数据
                average: data.rating.average,
            };
            this.setData({
                movies: movies,
            });
        };
        console.log(movies);
    },
    // 处理影人数据
    castsProcessingData:function(data){
        var casts = [];
        for(var i in data){
            var castsData = data[i];
            casts.push(castsData.name); 
        };
        console.log(casts);
        return casts;
    },

    // 处理影人图片数据
    castsImgProcessingData: function (data) {
        var castsImg = [];
        for (var i in data) {
            var castsImgData = data[i];
            castsImg.push(castsImgData.avatars.large);
        };
        console.log(castsImg);
        return castsImg;
    },
    //点击后查看大图
    deImgTap:function(event){
      console.log(event);
      var src = event.currentTarget.dataset.imghttp;
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: [src] // 需要预览的图片http链接列表
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