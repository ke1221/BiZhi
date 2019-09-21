var app = getApp()
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
		navs:[
			'国产',
			'日韩',
			'欧美',
			'网红',
			'自拍',
			'道具',
		],
	paperList:[],
    pageNum: 1,
    pageSize: 10,
		pageFlag:true,
		act: 1
  },
  onLoad(e){
		// return;
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
  },
  getPaper:function(){
  	var _this = this
  	wx.showLoading({
  	  title: '加载中',
  	})
  	util.request(api.queryPaperList,{pageNum:_this.data.pageNum,catId:_this.data.id}).then(function(res) {
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
	// 切换导航
	setNav(e){
		let id = e.currentTarget.id || e.target.id;
		this.setData({
			act: id
		})
	}
})