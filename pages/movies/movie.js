// pages/movies/movie.js
var starZhuanArray = require('../../utils/utils.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Zh_movies:{},//正在热映
    soon_movies:{},//即将热映
    Top250_movies:{},//豆瓣top250电影
    searchContent:{},//搜索的内容
    searchContentShow:false,
    clearShow:false,
    moviesBoxShow:true,
    searchUrl:"",
    start:0,
    searchNr:false,
    test:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      var in_theatersUrl = app.rieko.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
      var comingSoonUrl = app.rieko.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
      var top250Url = app.rieko.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

      this.getMovieListData(in_theatersUrl,'Zh_movies');
      this.getMovieListData(comingSoonUrl,'soon_movies');
      this.getMovieListData(top250Url,'Top250_movies');
    
  },
    getMovieListData: function (url,name) {
        var  _this = this;
        wx.request({
            url: url,
            data: {},
            method: 'GET',
            header: {
                "Content-Type": "text/xml"
            },
            success: function (res) {
                _this.processDoubanData(res.data,name)
            },
            fail: function () {
                //接口调用失败的回调函数
            },
            complete: function () {
                //接口调用结束的回调函数（调用成功、失败都会执行）
            }
        });
        
    },
    processDoubanData: function (data,name) {
        var movies = [];
        var _this = this;
        for (var i in data.subjects){
            var subjects = data.subjects[i];
            var title = subjects.title;
            if(title.length>=6){
                title = title.substring(0,6)+"...";
            };
            var tem = {
                h1: data.title,
                title:title,
                images: subjects.images.small,
                star_Fen: starZhuanArray.starZhuanArray(subjects.rating.stars),//传过去的是数组 进行循环判断用什么五角星
                starts: subjects.rating.stars,
                average: subjects.rating.average,
                moviesId: subjects.id,
            };
            movies.push(tem);
        };
        var movies_json = {};
        if (name == "searchContent"){
            this.data.start += 20;
            if (this.data.searchNr){
                var moviesSearch = _this.data.searchContent.movies.concat(movies);
                movies_json[name] = {
                    movies: moviesSearch
                };
            }else{
                movies_json[name] = {
                    movies: movies
                };
                this.data.searchNr = true;
            };
        }else{
            movies_json[name] = {
                movies: movies
            };
        };
        this.setData(movies_json);
        wx.hideNavigationBarLoading();
    },

    moreTap:function(event){
      var title = event.currentTarget.dataset.title;
      wx.navigateTo({
        url: '/pages/movies/more-movies/more-movies?title=' + title,
      })
    },

    SearchFocus:function(event){
        var test = event.detail.value;
        this.setData({
            searchContentShow:true,
            clearShow:true,
            moviesBoxShow:false,
            test:test,
        });
    },

    clearTap:function(){
        this.setData({
            searchContentShow: false,
            clearShow: false,
            moviesBoxShow: true,
            searchContent:{},
            searchNr:false,
        });
    },

    SearchBlur:function(event){
        var _this = this;
        var test = event.detail.value;
        if (!test){
            _this.setData({
                searchContentShow: false,
                clearShow: false,
                moviesBoxShow: true,
            });
        }else{
            if (_this.data.test != test){
                var searchUrl = app.rieko.doubanBase + "/v2/movie/search?q=" + test;
                _this.setData({
                    searchUrl: searchUrl,
                    searchContentShow: true,
                    clearShow: true,
                    moviesBoxShow: false,
                    searchContent: {},
                    searchNr: false,
                });
                _this.getMovieListData(searchUrl, 'searchContent');
            };
           
        };
    },

    //点击单个电影调到详情页面
    W_moviesTap:function(event){
        var moviesId = event.currentTarget.dataset.moviesid;
        wx.navigateTo({
            url: '/pages/movies/details-movies/details-movie?moviesid=' + moviesId,
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.data.moviesBoxShow){
            wx.showNavigationBarLoading();
            var NextUrl = this.data.searchUrl + "&start=" + this.data.start + "&count=20";
            this.getMovieListData(NextUrl, 'searchContent');
        }
        
    },
})