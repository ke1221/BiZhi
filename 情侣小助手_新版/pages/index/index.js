var app = getApp()
var api = require('../../config/api.js');
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');
Page({
	data: {
		userInfo: null,
		loverInfo: null,
		hasLogin: false,
		hasLover: false,
		showLogin: false,
		index: 0,
		cardNum: 0,
		lover: null,
		loveValue: 0,
		isShowDate: false,
		loveDate: "",
		showChangeDate: false,
		loveDays: 0,
		startDate: '1900-01-01',
		endDate: '2099-12-31',
		indexBackImg:'',
	},
	onLoad() {
		var _this = this;
		// 当前时间  在一起的日期最晚到今天
		var nowDate = util.formatDate(new Date(), 'yyyy-MM-dd');
		// 从本地缓存取用户设置信息
		var indexBackImg = app.globalData.indexBackImg
		var userSet = wx.getStorageSync('userSet')
		if(userSet){
			indexBackImg = userSet.indexBackImg
		}
		_this.setData({
			endDate: nowDate,
			indexBackImg:indexBackImg,
		})
		if (app.globalData.appFlag) {
			// 从本地缓存取userInfo
			app.globalData.userInfo = wx.getStorageSync('userInfo')
			_this.setData({
				hasLogin: app.globalData.hasLogin,
				userInfo: app.globalData.userInfo
			})
			// 获取对象信息
			_this.getLoverInfo();
			// 绑定情侣
			_this.bindingLover();
			// 获取首页信息
			_this.getIndexInfo();
		} else {
			app.userInfoReadyCallback = res => {
				// 从本地缓存取userInfo
				app.globalData.userInfo = wx.getStorageSync('userInfo')
				_this.setData({
					hasLogin: app.globalData.hasLogin,
					userInfo: app.globalData.userInfo
				})
				// 获取对象信息
				_this.getLoverInfo();
				// 获取首页信息
				_this.getIndexInfo();
				// 绑定情侣
				_this.bindingLover();
			}
		}
	},
	onShow() {
		var _this = this
		if(!_this.data.hasLover && app.globalData.isGetLover){
			_this.getLoverInfo();
		}
	},
	reLoad() {

	},
	// 获取对象的信息
	getLoverInfo: function() {
		var _this = this
		util.request(api.getLoverInfo).then(function(res) {
			if (res.errno === 0) {
				app.globalData.loverInfo = res.data;
				app.globalData.hasLover = true;
			} else if (res.errno === 507) {
				app.globalData.hasLover = false;
			} else {
				util.showErrorToast("请重启再试")
			}
			_this.setData({
				hasLover: app.globalData.hasLover,
				loverInfo: app.globalData.loverInfo,
			})

		})
	},
	getIndexInfo: function() {
		var _this = this
		util.request(api.getIndexInfo).then(function(res) {
			if (res.errno === 0) {
				var loveValue = 0;
				var loveDate = '';
				var loveDays = 0;
				if (res.data.lover != null) {
					loveValue = res.data.lover.loveValue
					loveDate = res.data.lover.loveDate
					var dateNow = new Date((new Date()).toLocaleDateString())
					var dateOld = new Date(loveDate)
					loveDays = Math.round((dateNow.getTime() - dateOld.getTime()) / (1000 * 60 * 60 * 24))
				}
				if(res.data.userSet != null){
					app.globalData.indexBackImg = res.data.userSet.indexBackImg
					_this.setData({
						indexBackImg:app.globalData.indexBackImg,
					})
					// 用户设置信息缓存到本地
					wx.setStorageSync('userSet', res.data.userSet);
				}
				_this.setData({
					cardNum: res.data.cardNum,
					loveValue: loveValue,
					loveDate: loveDate,
					loveDays: loveDays,
				})
			} else {
				util.showErrorToast("请重启再试")
			}
		})
	},
	/**
	 * 先判断是不是转发  而且是绑定情侣转发 
	 * 是    后续绑定情侣  
	 * 不是  直接结束
	 */

	bindingLover: function() {
		var _this = this
		// 如果是自己点开自己发的邀请  则不绑定情侣
		if (_this.data.userInfo.userId == app.globalData.loverUserId) {
			return
		}
		if (app.globalData.forwardFlag == true && app.globalData.forwardType == 'lover') {
			wx.showModal({
				title: '亲：',
				content: '有本事你就照顾好自己，不然，就老老实实地让我来照顾你！！',
				cancelText: '滚！！',
				confirmText: '好的',
				success: function(res) {
					if (res.confirm) {
						_this.addLovers()
					} else if (res.cancel) {

					}
				}
			})
		}
	},
	addLovers: function() {
		var _this = this
		util.request(api.addLover, {
			loverUserId: app.globalData.loverUserId
		}).then(function(res) {
			if (res.errno === 0) {
				wx.showToast({
					title: "绑定成功"
				})
				_this.getLoverInfo();
				_this.getIndexInfo();
			} else {
				util.showErrorToast(res.errmsg)
			}
		});
	},
	onShareAppMessage: function(res) {
		var _this = this;
		if (!_this.data.hasLogin) {
			_this.setData({
				showLogin: true
			})
			return
		}
		if (res.from === 'button') {
			app.globalData.isGetLover = true;
			return {
				title: '余生有你',
				path: '/pages/index/index?forwardType=bindLover&userId=' + _this.data.userInfo.userId,
				imageUrl: "https://img.yuzktyu.top/SHARE.jpg", //转发图片
				success: function(res) {
					console.log("转发成功。。" + _this.data.userInfo.userId)
				},
				fail: function(res) {
					console.log("转发失败。。")
				}
			}
		}
	},
	
	changeLoveDate: function() {
		var _this = this
		if (!_this.data.hasLogin) {
			_this.setData({
				showLogin: true
			})
			return
		}
		if (!_this.data.hasLover) {
			return
		}
		this.setData({
			showChangeDate: true
		})
	},
	bindDateChange: function(e) {
		this.setData({
			loveDate: e.detail.value
		})
	},
	cancelChangeDate: function(e) {
		console.log(e)
		this.setData({
			showChangeDate: false
		})
	},
	confirmChangeDate: function() {
		var _this = this
		util.request(api.updateLoverDate, {
			loveDate: _this.data.loveDate
		}).then(function(res) {
			if (res.errno === 0) {
				//获取两人绑定的信息
				util.request(api.getLoveInfo).then(function(res) {
					if (res.errno === 0) {
						var dateNow = new Date((new Date()).toLocaleDateString())
						var dateOld = new Date(res.data.loveDate)
						var loveDays = Math.round((dateNow.getTime() - dateOld.getTime()) / (1000 * 60 * 60 * 24))
						_this.setData({
							loveValue: res.data.loveValue,
							loveDate: res.data.loveDate,
							loveDays: loveDays,
							showChangeDate: false,
						})
					} else {
						util.showErrorToast("请重试")
					}
				})
			} else {
				util.showErrorToast("请重启再试")
			}
		})
	},
	changeBackImg: function() {
		var _this = this;
		var n = ["使用默认背景", "从背景图库选择"];
		wx.showActionSheet({
			itemList: n,
			success: function(t) {
				switch (t.tapIndex) {
					case 0:
						util.request(api.updateUserSet,{indexBackImg:''}).then(function(res) {
							if (res.errno === 0) {
								app.globalData.indexBackImg = res.data.indexBackImg
								_this.setData({
									indexBackImg:app.globalData.indexBackImg,
								})
								// 缓存用户设置到本地
								wx.setStorageSync('userSet', res.data.userSet);
							} else {
								util.showErrorToast("请重试")
							}
						})
						break;
					case 1:
						wx.navigateTo({
							url: '/pages/backImgs/indexImg/list'
						});
						break;
					default:
						console.log("操作越界：", t);
				}
			},
			fail: function(e) {
				console.log("操作失败", e.errMsg);
			}
		});
	},
	// type = 0 试用 type = 1 设置
	setIndexBackImg:function(type,url){
		var _this = this
		// 1 设置  0  试用
		if(type == 1){
			util.request(api.updateUserSet,{indexBackImg:url}).then(function(res) {
				if (res.errno === 0) {
					app.globalData.indexBackImg = url
					_this.setData({
						indexBackImg:app.globalData.indexBackImg,
					})
					// 用户设置信息缓存到本地
					wx.setStorageSync('userSet', res.data);
				} else {
					util.showErrorToast("请重试")
				}
			})
		}
		if(type == 0){
			app.globalData.indexBackImg = url
			_this.setData({
				indexBackImg:app.globalData.indexBackImg,
			})
		}
	},
	// 跳页用
	pageJump: function(a) {
		var t = a.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
	pageJumpHasLover: function(e) {
		var _this = this
		if (!_this.data.hasLogin) {
			_this.setData({
				showLogin: true
			})
			return
		}
		if (!_this.data.hasLover) {
			util.showErrorToast(app.globalData.noLoverTitle)
			return
		}
		var t = e.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
	pageJumpHasLogin: function(e) {
		var _this = this;
		if (!_this.data.hasLogin) {
			_this.setData({
				showLogin: true
			})
			return
		}
		var t = e.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
	login: function() {
		var _this = this;
		if (!_this.data.hasLogin) {
			_this.setData({
				showLogin: true
			})
			return
		}
	},
	// 关闭登录弹框用
	loginDialog: function(t) {
		this.setData({
			hasLogin: t.detail.value,
			showLogin: !1
		})
	},
	// 查看更多
	showMore: function() {
		console.log(this.data.index)
		this.setData({
			index: this.data.index == 0 ? 1 : 0
		})
	},
	// 啥也不干   阻止冒泡
	none: function() {}
})
