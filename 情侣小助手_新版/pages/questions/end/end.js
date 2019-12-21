var app = getApp();

Page({
    data: {
    	
    },
    pageJump: function(a) {
        wx.navigateTo({
            url: a.currentTarget.dataset.url
        });
    },
    onLoad: function(t) {
        var _this = this
        _this.setData({
        	userInfo:app.globalData.userInfo
        })
    },
    onShareAppMessage: function() {
        var a = this;
        return {
            title: a.data.share_con,
            desc: t.globalData.appName,
            path: "/pages/answer/answer?sn=" + a.data.sn
        };
    },
    onUnload:function(){
//  	setTimeout(function() {
//          wx.navigateTo({
//              url: '/pages/questions/index/index'
//          });
//      }, 100);
		wx.navigateBack({
		  delta: 1
		})
    }
});