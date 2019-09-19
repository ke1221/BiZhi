var app = getApp()
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// 是否有传指定值
		name: '',
		hotList:[],
		paperList: [],
		catDetail: {},
		pageNum: 1,
		pageSize: 10,
		pageFlag: true,
	},
	onLoad(e) {
		var _this = this
		_this.setData({
			paperList: [],
			pageNum: 1,
			pageFlag: true
		})
		_this.getHotSearchList();
		let name = e.name || '';
		if (name) {
			this.setData({
				name
			})
			_this.searchPaper();
		}
	},
	getHotSearchList: function() {
		var _this = this
		util.request(api.queryBasicDataList, {
			type: 'paperHotSearch'
		}).then(function(res) {
			if (res.errno === 0) {
				_this.setData({
					hotList: res.data
				})
			}
		});
	},
	searchPaper: function() {
		var _this = this
		wx.showLoading({
			title: '加载中',
		})
		util.request(api.queryPaperList, {
			pageNum: _this.data.pageNum,
			name: _this.data.name
		}).then(function(res) {
			setTimeout(function() {
				wx.hideLoading();
			}, 300)
			if (res.errno === 0) {
				var paperListNew = _this.data.paperList.concat(res.data.list)
				_this.setData({
					paperList: paperListNew
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
	// 搜索事件
	search(e) {
		var _this = this
		// 输入的值
		let val = e.detail.value;
		_this.setData({
			name: val,
			paperList: [],
			pageNum: 1,
			pageFlag: true
		})
		// 这里应该执行搜索
		_this.searchPaper()
	},
	searchHot(e){
		var _this = this
		var name = e.currentTarget.dataset.name
		_this.setData({
			name: name,
			paperList: [],
			pageNum: 1,
			pageFlag: true
		})
		// 这里应该执行搜索
		_this.searchPaper()
	},
	// 跳转详情
	toPath(e) {
		let id = e.currentTarget.id || e.target.id;
		wx.navigateTo({
			url: '/pages/imgDateil/detail?id=' + id,
		});
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

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
