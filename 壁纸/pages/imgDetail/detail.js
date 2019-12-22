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
		hasLogin:false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(e) {
		var _this = this;
		var id = e.id;
		_this.setData({
			id: id
		})
		if (app.globalData.appFlag) {
			_this.setData({
				hasLogin: app.globalData.hasLogin,
			})
		} else {
			app.userInfoReadyCallback = res => {
				_this.setData({
					hasLogin: app.globalData.hasLogin,
				})
			}
		}
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
		var _this = this
		wx.getSetting({
			success (res) {
				console.log(res.authSetting)
				console.log(res.authSetting["scope.writePhotosAlbum"])
				if(res.authSetting["scope.writePhotosAlbum"] == false){
					wx.openSetting({
					  success (res) {
						
					  }
					})
				}else{
					var imgUrl = _this.data.paper.imgUrl
					var imgUrlNew = imgUrl.replace("http://","https://")
					wx.downloadFile({
					  url: imgUrlNew , 
					  success (res) {
						if (res.statusCode === 200) {
						  wx.saveImageToPhotosAlbum({
						  	filePath:res.tempFilePath,
						  	success(re) { 
						  		console.log(re)
						  	}
						  })
						}
					  }
					})
				}
			}
		})
	},
	wxLogin: function(e) {
		var _this = this
		if (e.detail.userInfo == undefined) {
			console.log(e)
			app.globalData.hasLogin = false;
			util.showErrorToast('微信登录失败1');
			return;
		}
		user.loginByWeixin(e.detail.userInfo).then(res => {
			_this.setData({
				hasLogin:true
			})
			app.globalData.hasLogin = true;
			_this.getPaper()
		}).catch((err) => {
			app.globalData.hasLogin = false;
			util.showErrorToast('微信登录失败2');
		});
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})
