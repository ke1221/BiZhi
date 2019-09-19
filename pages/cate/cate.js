// pages/cate/cate.js
var app = getApp()
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 热门搜索词
    hotList: [],
		catList:[],
  },
	onLoad:function(e){
		var _this = this
		_this.getCatList();
		_this.getHotSearchList();
	},
	getCatList:function(){
		var _this = this
		util.request(api.queryCatList).then(function(res) {
		  if (res.errno === 0) {
				_this.setData({
					catList:res.data
				})
		  }
		});
	},
	getHotSearchList:function(){
		var _this = this
		util.request(api.queryBasicDataList,{type:'paperHotSearch'}).then(function(res) {
		  if (res.errno === 0) {
				_this.setData({
					hotList:res.data
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
		var t = a.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
})