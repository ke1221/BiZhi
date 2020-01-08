var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
	data:{
	},
	onLoad(){
	},
	onShow(){
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
})
