var app = getApp();
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
Page({
    data: {
    	deviceHei: "",
		isanswer:'',
        userSetQsList: []
    },
    onLoad: function(opt) {
    	var _this = this
	 	wx.getSystemInfo({
            success: function(t) {
                _this.setData({
                    deviceHei: t.windowHeight
                });
            }
        });
        var askId = opt.askId
		var isAnswer = opt.isAnswer
		_this.setData({
			isAnswer:isAnswer
		})
		wx.showLoading({
		    title: "加载中..."
		});
		util.request(api.getUserSetQsList,{askId:askId}).then(function(res) {
			setTimeout(function() {
			    wx.hideLoading();
			}, 500)
			if (res.errno === 0) {
				_this.setData({
					userSetQsList:res.data
				})
			}
		});
    },
    onReady: function() {},
    onShow: function() {
    	
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});