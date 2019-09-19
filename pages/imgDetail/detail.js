var app = getApp()
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		// 图片详情
		id: '',
		paper: {},
		isLike:false,
		isCollect:false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(e) {
		var _this = this
		let id = e.id;
		_this.setData({
			id: id
		})
		_this.getPaper()
	},
	getPaper: function() {
		var _this = this
		util.request(api.queryWallpaperDetail, {
			id: _this.data.id
		}).then(function(res) {
			if (res.errno === 0) {
				_this.setData({
					paper: res.data,
					isLike:res.data.isLike==1,
					isCollect:res.data.isCollect==1
				})
			}
		});
	},
	// 点赞
	likePaper:function(){
		var _this = this
		util.request(api.likePaper, {
			wallpaperId: _this.data.id
		}).then(function(res) {
			if (res.errno === 0) {
				_this.setData({
					isLike:true
				})
			}
		});
	},
	// 取消点赞
	unlikePaper:function(){
		var _this = this
		util.request(api.unLikePaper,{
			wallpaperId: _this.data.id
		}).then(function(res) {
			if (res.errno === 0) {
				_this.setData({
					isLike:false
				})
			}
		});
	},
	// 收藏
	collectPaper:function(){
		var _this = this
		util.request(api.collectPaper,{
			wallpaperId: _this.data.id
		}).then(function(res) {
			if (res.errno === 0) {
				_this.setData({
					isCollect: true
				})
			}
		});
	},
	// 取消收藏
	unCollectPaper:function(){
		var _this = this
		util.request(api.unCollectPaper, {
			wallpaperId: _this.data.id
		}).then(function(res) {
			if (res.errno === 0) {
				_this.setData({
					isCollect: false
				})
			}
		});
	},
	// 下载
	downloadPaper:function(){
		
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})
