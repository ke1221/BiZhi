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
		cardNum:0,
		lover:null,
		loveValue:0,
	},
	onLoad() {
		var _this = this;
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
	onShow(){
		
	},
	reLoad() {

	},
	getLoverInfo: function() {
		var _this = this
		util.request(api.getLoverInfo).then(function(res) {
			console.log(res)
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
			console.log(res)
			if (res.errno === 0) {
				var loveValue = 0;
				if(res.data.lover!= null){
					loveValue = res.data.lover.loveValue
				}
				_this.setData({
					cardNum:res.data.cardNum,
					loveValue:loveValue,
				})
			}else {
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
		if(_this.data.userInfo.userId == app.globalData.loverUserId){
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
			}else{
				util.showErrorToast(res.errmsg)
			}
		});
	},
	onShareAppMessage: function (res) {
		var _this = this;
	    if (res.from === 'button') {
	       return {
		      	title: '余生有你',
			  	path: '/pages/index/index?forwardType=bindLover&userId='+_this.data.userInfo.userId,
			  	imageUrl:"https://img.yuzktyu.top/SHARE.jpg",        //转发图片
			  	success: function(res) {
		       		console.log("转发成功。。"+_this.data.userInfo.userId)
		     	},
		     	fail: function(res) {
		        	console.log("转发失败。。")
		        }
		    }
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
		if(!_this.data.hasLogin){
			_this.setData({
				showLogin:true
			})
			return
		}
		if(!_this.data.hasLover){
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
		if(!_this.data.hasLogin){
			_this.setData({
				showLogin:true
			})
			return
		}
		var t = e.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
	// 关闭登录弹框用
	loginDialog: function(t) {
		this.setData({
			hasLogin: t.detail.value,
			showLogin: !1
		})
	},
	// 查看更多
	showMore(){
	  console.log(this.data.index)
	  this.setData({
	    index: this.data.index == 0? 1 : 0
	  })
	},
})
