var app = getApp()
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');

Component({
    properties: {
        showLogin: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    ready: function() {},
    methods: {
        onGotUserInfo: function(e) {
			var _this = this
			if (e.detail.userInfo == undefined) {
				app.globalData.hasLogin = false;
				util.showErrorToast('微信登录失败1');
				return;
			}
			user.loginByWeixin(e.detail.userInfo).then(res => {
				app.globalData.hasLogin = true;
				this.triggerEvent("login", {
				    value: !0
				});
			}).catch((err) => {
				app.globalData.hasLogin = false;
				util.showErrorToast('微信登录失败2');
			});
            // var t = this;
            // e.detail.userInfo ? (o.userInfo = e.detail.userInfo, n.checkSession({
            //     cb: function(e) {
            //         t.triggerEvent("login", {
            //             value: !0
            //         });
            //     }
            // })) : wx.showToast({
            //     title: "授权失败，请开启权限",
            //     icon: "none",
            //     duration: 2e3
            // });
        },
        cancelLogin: function() {
            this.triggerEvent("login", {
                value: !1
            });
        }
    }
});