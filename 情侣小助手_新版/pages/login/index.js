var app = getApp()
var api = require('../../config/api.js');
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');
Page({ 
   data: {
    redirect_url:''
  },
  onLoad(opt){
	  var _this = this;
	  console.log(opt)
	  _this.setData({
		  redirect_url:decodeURIComponent(opt.redirect_url)
	  })
  },
  onShow(){
  },
  // 微信登录
  wxLogin: function(e) {
  	var _this = this
    if (e.detail.userInfo == undefined) {
		console.log(e)
      app.globalData.hasLogin = false;
      util.showErrorToast('微信登录失败');
      return;
    }
    user.checkLogin().catch(() => {
      user.loginByWeixin(e.detail.userInfo).then(res => {
				_this.getLoverInfo();
        app.globalData.hasLogin = true;
				wx.reLaunch({
					url:_this.data.redirect_url
				})
      }).catch((err) => {
        app.globalData.hasLogin = false;
        util.showErrorToast('微信登录失败');
      });
    });
  },
	getLoverInfo: function(){
		var _this = this
		util.request(api.getLoverInfo).then(function(res) {
			if (res.errno === 0) {
				app.globalData.loverInfo = res.data;
			}else if(res.errno === 100){
				//_this.bindingLover();
			}
		})
	},
})