var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
	data: {
		showLogin: false,
		hasLogin: false,
		pageNum: 1,
		pageSize: 15,
		pageFlag: true,
	},
	onLoad(option) {
		var _this = this
		_this.setData({
			hasLogin: app.globalData.hasLogin
		})
		_this.getList()
	},
	getList: function() {
		var _this = this
		wx.showLoading({
			title: '加载中',
		})
		util.request(api.getRemdayList, {
			pageNum: _this.data.pageNum
		}).then(function(res) {
			setTimeout(function() {
				wx.hideLoading();
			}, 300)
			if (res.errno === 0) {
				for (var i = 0; i < res.data.list.length; i++) {
					res.data.list[i].index = i
					if (res.data.list[i].dayname.length > 8) {
						res.data.list[i].dayname = res.data.list[i].dayname.substr(0, 6) + '...'
					}
					var dateNow = new Date((new Date()).toLocaleDateString())
					var dateOld = new Date(res.data.list[i].date)
					var total = Math.round((dateNow.getTime() - dateOld.getTime()) / (1000 * 60 * 60 * 24))
					res.data.list[i].timeLen = total + '天';
				}
				var remDayNew = _this.data.remDay.concat(res.data.list)
				_this.setData({
					remDay: remDayNew
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
	pageJump: function(a) {
		var t = a.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
	onReachBottom() {
		var _this = this
		if (_this.data.pageFlag) {
			_this.getList()
		} else {
			wx.showToast({
				title: "没有更多了",
				icon: "loading",
				duration: 500
			})
		}
	},
	loginDialog: function(t) {
		this.setData({
			hasLogin: t.detail.value,
			showLogin: !1
		})
	},
})
