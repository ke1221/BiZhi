var app = getApp()
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgList: [],
		pageNum: 1,
		pageSize: 15,
		pageFlag: true,
	},
	onLoad(e) {
		var _this = this
		_this.setData({
			noMore: app.globalData.noMore
		})
		_this.setData({
			imgList: [],
			pageNum: 1,
			pageFlag: true
		})
		_this.getImgList();
	},
	getImgList: function() {
		var _this = this
		wx.showLoading({
			title: '加载中',
		})
		util.request(api.getIndexImgList, {
			pageNum: _this.data.pageNum,
			pageSize: _this.data.pageSize
		}).then(function(res) {
			setTimeout(function() {
				wx.hideLoading();
			}, 300)
			if (res.errno === 0) {
				var imgListNew = _this.data.imgList.concat(res.data.list)
				_this.setData({
					imgList: imgListNew
				})
				//判断是不是最后一页
				if (res.data.isLastPage) {
					_this.setData({
						pageFlag: false
					})
				} else {
					_this.setData({
						pageNum: _this.data.pageNum + 1
					})
				}
			}
		});
	},
	// 上拉加载
	onReachBottom() {
		var _this = this
		if (_this.data.pageFlag) {
			_this.getPaper();
		} else {
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
