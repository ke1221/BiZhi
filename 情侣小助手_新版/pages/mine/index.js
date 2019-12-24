var app = getApp()
var api = require('../../config/api.js');
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');
Page({
	data:{
		hiddenmodalput: true,
		userInfo:{},
		loverInfo:{},
		userName:'',
		pageUrl:'',
		hasLogin: false,
		hasLover: false,
	},
	onLoad(){
		wx.setNavigationBarTitle({
		    title: '我们'
		})
	},
	onShow(){
		var _this = this
		_this.setData({
			userInfo: app.globalData.userInfo,
			hasLogin: app.globalData.hasLogin,
			hasLover: app.globalData.hasLover,
			loverInfo: app.globalData.loverInfo
		})
	},
	onShareAppMessage: function (res) {
		var _this = this;
	    if (res.from === 'button') {
	       // 来自页面内转发按钮
	       console.log(_this.data.userInfo)
	       return {
		      	title: '余生有你',
			  	path: '/pages/index/index?userId='+_this.data.userInfo.userId,
			  	imageUrl:"https://img.yuzktyu.top/SHARE.jpg",        //转发图片
			  	success: function(res) {
		       		console.log("转发成功。。"+_this.data.userInfo.userId)
		     	},
		     	fail: function(res) {
		        	console.log("转发失败。。")
		        }
		    }
	    }
	},
	pageJump: function(a) {
		var t = a.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
})
