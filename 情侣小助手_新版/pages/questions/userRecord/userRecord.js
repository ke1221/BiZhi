var app = getApp();
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
    data: {
        recordList: [],
        default_avatar: "/image/person.png",
        answerId: null,
        pageNum: 1,
        pageSize: 10,
        pageFlag:true
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
		_this.getUserRecord()
    },
    getUserRecord:function(){
    	var _this = this
    	wx.showLoading({
            title: "加载中..."
        });
		util.request(api.getUserRecord,{pageNum:_this.data.pageNum}).then(function(res) {
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
 	onReachBottom() {
 		var _this = this
 		if(_this.data.pageFlag){
 			_this.getUserRecord()
 		}else{
 			wx.showToast({
	            title: "没有更多了",
	            icon: "loading",
	            duration: 500
	        }) 
 		}
  	},
    pageJump: function(a) {
        var t = a.currentTarget.dataset;
        wx.navigateTo({
            url: t.url
        });
    },
    onLoad: function(a) {
    	var _this = this
    },
    bindchange: function(a) {
        this.setData({
            payPrice: a.detail.value
        });
    }
});