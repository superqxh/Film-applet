// pages/movies/more-movies/more-movies.js
var starZhuanArray = require('../../../utils/utils.js')
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: "",
        movies: {},
        Jump: "",
        start: 0,
        oneJson: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var title = options.title;
        this.setData({
            title: title,
        });
        var Jump = "";
        if (title == "正在上映的电影-北京") {
            Jump = app.rieko.doubanBase + "/v2/movie/in_theaters";
        } else if (title == "即将上映的电影") {
            Jump = app.rieko.doubanBase + "/v2/movie/coming_soon";
        } else if (title == "豆瓣电影Top250") {
            Jump = app.rieko.doubanBase + "/v2/movie/top250";
        };
        this.setData({
            Jump: Jump,
        });
        this.getMovieListData(Jump);
    },
    getMovieListData: function (url) {
        var _this = this;
        wx.request({
            url: url,
            data: {},
            method: 'GET',
            header: {
                "Content-Type": "text/xml"
            },
            success: function (res) {
                _this.processDoubanData(res.data)
            },
            fail: function () {
                //接口调用失败的回调函数
                console.log("暂无数据，请稍后重试");
            },
            complete: function () {
                //接口调用结束的回调函数（调用成功、失败都会执行）
            }
        });

    },
    processDoubanData: function (data) {
        // var start = 0;
        var movies = [];
        for (var i in data.subjects) {
            var subjects = data.subjects[i];
            var title = subjects.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            };
            var tem = {
                h1: data.title,
                title: title,
                images: subjects.images.small,
                star_Fen: starZhuanArray.starZhuanArray(subjects.rating.stars),//传过去的是数组 进行循环判断用什么五角星
                starts: subjects.rating.stars,
                average: subjects.rating.average,
                moviesId: subjects.id,
            };
            movies.push(tem);
        };
        var totalMovies = {};
        if (this.data.oneJson) {
            totalMovies = this.data.movies.concat(movies);
        } else {
            totalMovies = movies;
            this.data.oneJson = true;
        };

        this.data.start += 20;
        this.setData({
            movies: totalMovies,
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
    },

    //点击单个电影调到详情页面
    W_moviesTap: function (event) {
        var moviesId = event.currentTarget.dataset.moviesid;
        console.log(moviesId);
        wx.navigateTo({
            url: '/pages/movies/details-movies/details-movie?moviesid=' + moviesId,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.title,
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        // wx.showLoading({
        //     title: '数据加载中',
        // });
        this.data.start = 0;
        this.data.movies = {};
        this.data.oneJson = false;
        wx.showNavigationBarLoading();
        var NextUrl = this.data.Jump + "?start=0&count=20";
        this.getMovieListData(NextUrl);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // wx.showLoading({
        //     title: '数据加载中',
        // });
        wx.showNavigationBarLoading();
        var NextUrl = this.data.Jump + "?start=" + this.data.start + "&count=20";
        this.getMovieListData(NextUrl);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})