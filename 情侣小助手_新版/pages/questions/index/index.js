var app = getApp();

Page({
    data: {
        deviceHei: 0,
        modalHidden: !0
    },
    helpShow: function() {
        var a = this;
        a.setData({
            modalHidden: !a.data.modalHidden
        });
    },
    pageJump: function(a) {
        setTimeout(function() {
            wx.navigateTo({
                url: a.currentTarget.dataset.url
            });
        }, 100);
    },
    onLoad: function(a) {
        var _this = this;
		wx.getSystemInfo({
			success: function(a) {
				_this.setData({
					deviceHei: a.windowHeight
				});
			}
		});
    },
    onShow: function() {
        var _this = this;
		_this.setData({
			userInfo: wx.getStorageSync('userInfo'),
			loverInfo:app.globalData.loverInfo
		})
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
})