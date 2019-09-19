// pages/cate/cate.js
var app = getApp()
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');
Page({

  data: {
  },
	onLoad:function(e){
		var _this = this
	},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
		
  },
	 pageJump: function(a) {
		var t = a.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
})