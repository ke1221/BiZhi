var app = getApp()
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
	paperList:[],
	catDetail:{},
    pageNum: 1,
    pageSize: 10,
    pageFlag:true,
  },
  onLoad(e){
	var _this = this
    let name = e.name;
		var id = e.id
    wx.setNavigationBarTitle({
      title: name
    }),
	_this.setData({
		id:id
	})
	_this.setData({
	  paperList:[],
	  pageNum:1,
	  pageFlag:true
	})
	_this.getPaper();
	_this.getCatDetail();
  },
  getPaper:function(){
  	var _this = this
  	wx.showLoading({
  	  title: '加载中',
  	})
  	util.request(api.queryPaperList,{pageNum:_this.data.pageNum,topicId:_this.data.id}).then(function(res) {
  		setTimeout(function() {
  		    wx.hideLoading();
  		}, 300)
  	  if (res.errno === 0) {
  			var paperListNew = _this.data.paperList.concat(res.data.list)
  			_this.setData({
  				paperList:paperListNew
  			})
  			//判断是不是最后一页
  			if(res.data.isLastPage){
  				_this.setData({
  					pageFlag : false
  				})
  			}else{
  				_this.setData({
  					pageNum : _this.data.pageNum+1
  				})
  			}
  	  }
  	});
  },
  getCatDetail:function(){
  	var _this = this
  	util.request(api.queryTopicDetail,{id:_this.data.id}).then(function(res) {
  	  if (res.errno === 0) {
  			_this.setData({
  				catDetail:res.data
  			})
  	  }
  	});
  },
  /**
   * 用户点击右上角分享
   */
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
	// 上拉加载
	onReachBottom() {
		var _this = this
		if(_this.data.pageFlag){
			_this.getPaper();
		}else{
			wx.showToast({
	            title: "没有更多了",
	            icon: "loading",
	            duration: 500
	        }) 
		}
	},
	pageJump: function(a) {
		var t = a.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
})