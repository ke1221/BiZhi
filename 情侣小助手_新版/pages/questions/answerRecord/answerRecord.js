var app = getApp();
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
    data: {
        recordList: [],
        pageNum: 1,
        pageSize: 10,
        pageFlag:true
    },
    pageJump: function(a) {
        var e = a.currentTarget.dataset;
        wx.navigateTo({
            url: e.url
        });
    },
    onLoad: function(a) {
    	var _this = this
    },
    onShow: function() {
        var _this = this
		_this.setData({
			recordList: [],
			pageNum: 1,
			pageSize: 10,
			pageFlag:true,
			userInfo: wx.getStorageSync('userInfo'),
			loverInfo: app.globalData.loverInfo
		})
		_this.getAnswerRecord()
    },
    onShareAppMessage: function(a) {
        var t = this, n = {};
        return n.answerId = this.data.tmp_answerid, n.shareType = "checkAnswer_info", wx.showShareMenu({
            withShareTicket: !0
        }), {
            title: "你是我的默契好友吗？",
            desc: e.globalData.appName,
            path: "/pages/index/index",
            imageUrl: e.globalData.shareImg,
            success: function(s) {
                "button" == a.from && e.dealShareInfo(n, t.ShareCallBack);
            }
        };
    },
    getAnswerRecord:function(){
    	var _this = this
    	wx.showLoading({
            title: "加载中..."
        });
		util.request(api.getAnswerRecord,{pageNum:_this.data.pageNum}).then(function(res) {
			setTimeout(function() {
			    wx.hideLoading();
			}, 500)
			if (res.errno === 0) {
				var recordListNew = _this.data.recordList.concat(res.data.list)
				_this.setData({
					recordList:recordListNew
				})
				//判断是不是最后一页
				if(res.data.isLastPage){
					_this.setData({
						pageFlag : false
					})
				}else{
					_this.setData({
						pageNum : _this.data.pageNum+1
					})
				}
			}
		});
    },
});