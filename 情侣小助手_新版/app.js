var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./utils/user.js');

App({
	globalData: {
		appFlag:false,
		loverUserId: "",
		userInfo: null,
		loverInfo: null,
		hasLover: false,
		hasLogin: false,
		forwardFlag: '',
		forwardType: '', // lover:绑定情侣 
		noMore: "讨厌~ 把人家看光了~",
		noLoverTitle: "么得对象",
		indexBackImg:'https://img.yuzktyu.top/list/1577341522869179027.jpg',
		isGetLover:false, // 用于分享给对象绑定的时候  判断是否请求对象信息
		cardNum:0,
	},
	onLaunch: function(opt) {
		var _this = this
		// 来源是1007  说明是转发进入
		if(opt.scene==1007){
			console.log("转发进入"+opt.query.userId)
			if(opt.query.forwardType == 'bindLover' && opt.query.userId != ''){
				_this.globalData.forwardFlag = true
				_this.globalData.forwardType = 'lover'
				_this.globalData.loverUserId = opt.query.userId
			}
		}
		user.checkLogin().then(function() {
			_this.globalData.hasLogin = true;
			wx.getUserInfo({
				success: res => {
					user.loginByWeixin(res.userInfo).then(res => {
						_this.globalData.appFlag = true
						if (_this.userInfoReadyCallback) {
							_this.userInfoReadyCallback(res)
						}
					}).catch((err) => {
						_this.globalData.hasLogin = false;
						util.showErrorToast('微信登录失败1');
					});
				},
				fail: function() {
					_this.globalData.hasLogin = false;
					user.loginByCode().then(res => {
						if (_this.userInfoReadyCallback) {
							_this.userInfoReadyCallback(res)
						}
					}).catch((err) => {
						util.showErrorToast('微信登录失败2');
						console.log(err)
					});
				}
			})
		}).catch(() => {
			_this.globalData.hasLogin = false;
			user.loginByCode().then(res => {
				if (_this.userInfoReadyCallback) {
					_this.userInfoReadyCallback(res)
				}
			}).catch((err) => {
				util.showErrorToast('微信登录失败3');
			});
		});
		
		
		// var _this = this
		// _this.globalData.forwardFlag = opt.scene
		// if(opt.scene==1007){
		// 	console.log("转发进入"+opt.query.userId)
		// 	if(opt.query.userId != null && opt.query.userId !=''){
		// 		_this.globalData.forwardType = 'lover'
		// 		_this.globalData.loverUserId = opt.query.userId
		// 	}
		// }

		// // 登录
		// user.checkLogin().then(function(){
		// 	// _this.getLoverInfo();
		// }).catch(() => {
		// 	var query = '';
		// 	var rediret_url = '';
		// 	for(var i in opt.query){
		// 		if(i){
		// 			query = query + i + '='+opt.query[i]+"&"
		// 		}
		// 	}
		// 	if(query){
		// 		rediret_url = opt.path+"?"+query;
		// 	}else{
		// 		rediret_url = opt.path;
		// 	}
		// 	wx.reLaunch({
		// 		url:'/pages/login/index?redirect_url='+encodeURIComponent(`/${rediret_url}`)
		// 	})
		// });
	},
	onShow: function(options) {}
})
