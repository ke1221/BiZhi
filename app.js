//app.js
var user = require('./utils/user.js');
var util = require('./utils/util.js');
App({
  onLaunch: function () {
    var _this = this
    user.checkLogin().then(function(){
    	_this.globalData.hasLogin = true;
    	wx.getUserInfo({
    		success: res => {
    			console.log("aaa")
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
    		fail:function() {
    			_this.globalData.hasLogin = false;
    			user.loginByCode().then(res => {
    				if (_this.userInfoReadyCallback) {
    					_this.userInfoReadyCallback(res)
    				}
    			}).catch((err) => {
    				util.showErrorToast('微信登录失败2');
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
  },
  globalData: {
    userInfo: null,
		hasLogin:false,
  }
})