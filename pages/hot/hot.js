var app = getApp()
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 专题列表
    list: [
      1,2,3
    ],
		topicList:[]
  },
	onLoad:function(){
		var _this = this
		util.request(api.queryTopicList).then(function(res) {
			setTimeout(function() {
			    wx.hideLoading();
			}, 300)
		  if (res.errno === 0) {
				_this.setData({
					topicList:res.data.list
				})
		  }
		});
	},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
	pageJump: function(a) {
		console.log(a)
		var t = a.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
})