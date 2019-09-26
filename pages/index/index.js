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
				hasLogin: app.globalData.hasLogin,
			})
		} else {
			app.userInfoReadyCallback = res => {
				_this.setData({
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
})
