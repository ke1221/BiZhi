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
		util.request(api.queryCatList,{pid:0}).then(function(res) {
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
  
  onShareAppMessage: function() {
  	var that = this;
  	// 设置菜单中的转发按钮触发转发事件时的转发内容
  	var shareObj = {
  		title: "lemon壁纸", // 默认是小程序的名称(可以写slogan等)
  		path: '/pages/index/index', // 默认是当前页面，必须是以‘/’开头的完整路径
  		imageUrl: 'https://img.yuzktyu.top/earthWord/1569374808061617036.jpg', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
  	};
  	return shareObj;
  },
	 pageJump: function(a) {
		var t = a.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
})