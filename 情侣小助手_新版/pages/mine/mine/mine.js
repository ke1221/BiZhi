var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
	data:{
		hiddenmodalput: true,
		userInfo:{},
		loverInfo:{},
		userName:'',
		pageUrl:'',
		hasLogin: false,
		hasLover: false,
		cardNum:0,
	},
	onLoad(){
		
	},
	onShow(){
		var _this = this
		_this.setData({
			userInfo: app.globalData.userInfo,
			hasLogin: app.globalData.hasLogin,
			hasLover: app.globalData.hasLover,
			loverInfo: app.globalData.loverInfo,
			cardNum:app.globalData.cardNum,
			loveValue:app.globalData.loveValue,
		})
	},
	onShareAppMessage: function (res) {
		var _this = this;
		return {
			title: '情侣小助手',
			path: '/pages/index/index',
			imageUrl:"https://img.yuzktyu.top/SHARE.jpg",        //转发图片
			success: function(res) {
				console.log("转发成功。。")
			},
			fail: function(res) {
				console.log("转发失败。。")
			}
		}
	},
	pageJump: function(a) {
		var t = a.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
	pageJumpHasLover: function(e) {
		var _this = this
		if (!_this.data.hasLogin) {
			_this.setData({
				showLogin: true
			})
			return
		}
		if (!_this.data.hasLover) {
			util.showErrorToast(app.globalData.noLoverTitle)
			return
		}
		var t = e.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
	pageJumpHasLogin: function(e) {
		var _this = this;
		if (!_this.data.hasLogin) {
			_this.setData({
				showLogin: true
			})
			return
		}
		var t = e.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
	login: function() {
		var _this = this;
		if (!_this.data.hasLogin) {
			_this.setData({
				showLogin: true
			})
			return
		}
	},
	// 关闭登录弹框用
	loginDialog: function(t) {
		this.setData({
			hasLogin: t.detail.value,
			showLogin: !1
		})
	},
})
