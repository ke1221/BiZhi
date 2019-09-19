//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');
Page({
	data: {
		bannerList: [],
		newTopicList: [], // 最新专题
		hotTopicList: [], // 热门专题
		newPaperList: [],
		isFixd: false, // 元素滚动高度
		top: 0, // 滚动距离
		imgList: [], // 图片数组
		nav: 0, // nav 选中
	},
	onLoad: function(e) {
		var _this = this;
		if (app.globalData.appFlag) {
			_this.setData({
				lemonNum: app.globalData.lemonNum,
				hasLogin: app.globalData.hasLogin,
			})
		} else {
			app.userInfoReadyCallback = res => {
				_this.setData({
					lemonNum: app.globalData.lemonNum,
					hasLogin: app.globalData.hasLogin,
				})
			}
		}
		util.request(api.queryIndexInfo).then(function(res) {
			setTimeout(function() {
				wx.hideLoading();
			}, 300)
			if (res.errno === 0) {
				_this.setData({
					hotPaperList: res.data.hotPaperList,
					hotTopicList: res.data.hotTopicList,
					newPaperList: res.data.newPaperList,
					newTopicList: res.data.newTopicList,
					bannerList: res.data.bannerList,
					imgList: res.data.hotPaperList
				})
			}
		});
	},
	// 设置导航
	setNav(e) {
		var _this = this
		// 0 精选 1 最新
		let id = e.currentTarget.dataset.id || e.target.dataset.id;
		this.setData({
			nav: id
		})
		if (id == 0) {
			_this.setData({
				imgList: _this.data.hotPaperList,
			})
		} else {
			_this.setData({
				imgList: _this.data.newPaperList,
			})
		}
	},

	pageJump: function(a) {
		var t = a.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},

	// 监听页面滚动
	onPageScroll(e) {
		// 页面滚动距离
		let top = e.scrollTop;
		if (top >= this.data.top) {
			this.setData({
				isFixd: true
			})
		} else {
			this.setData({
				isFixd: false
			})
		}
	},
	onReady() {
		let query = wx.createSelectorQuery();
		//获取元素1距离页面顶部高度
		query.select('#scroll').boundingClientRect(res => {
			this.setData({
				top: res.top
			})
		}).exec()
	},
})
