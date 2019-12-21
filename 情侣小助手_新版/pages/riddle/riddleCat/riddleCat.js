var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({ 
  data: { 
    riddleCatList: [],
	pageNum: 1,
	pageSize: 10,
	pageFlag:true
  }, 
	onLoad(){
		var _this = this
		_this.setData({
		  riddleCatList:[],
		  pageNum:1,
		  pageFlag:true
		})
		_this.getRiddleCatList()
	},
	getRiddleCatList:function(){
		wx.showLoading({
		  title: '加载中',
		})
		var _this = this
		util.request(api.getRiddleCatList,{pageNum:_this.data.pageNum}).then(function(res) {
			setTimeout(function() {
			    wx.hideLoading();
			}, 300)
		  if (res.errno === 0) {
				var riddleCatListNew = _this.data.riddleCatList.concat(res.data.list)
				_this.setData({
					riddleCatList:riddleCatListNew
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
	pageJump: function(a) {
		var t = a.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
	onReachBottom() {
		var _this = this
		if(_this.data.pageFlag){
			_this.getRiddleCatList();
		}else{
			wx.showToast({
	            title: "没有更多了",
	            icon: "loading",
	            duration: 500
	        }) 
		}
	}
})
