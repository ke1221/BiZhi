var app = getApp();
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
    data: {
        deviceHei: "",
        userSetQsAswer: [],
		askItems:[],
        curQuestion: {},
        curAswer: "",
        curQsNum: 1,
    },
    radioChange: function(e) {
        var _this = this
        var answerId = e.currentTarget.dataset.value
        var selectList = _this.data.selectList
        var curQsNum = _this.data.curQsNum
        _this.data.askItems[curQsNum-1].loverAId = answerId
        if(curQsNum == 10){
			wx.showLoading({
			  title: '加载中',
			})
			
			util.request(api.saveLoverAnswer, _this.data.askItems,'POST').then(function(res) {
				setTimeout(function() {
				    wx.hideLoading();
				}, 500)
				if (res.errno === 0) {
					setTimeout(function() {
					    wx.hideLoading();
					}, 500)
					wx.navigateBack({
						delta: 1
					})
				}else{
					util.showErrorToast('回答失败');
					wx.navigateBack({
						delta: 1
					})
				}
			});
        }else{
			setTimeout(function() {
			    _this.setData({
			    	curQsNum:curQsNum+1,
			    	curQuestion:selectList[curQsNum]
			    })
			}, 500)
        }
    },
    onLoad: function(e) {
        wx.showLoading({
            title: "加载中..."
        });
        var _this = this
		util.request(api.getAnswerItem,{askId:e.askId}).then(function(res) {
			setTimeout(function() {
			    wx.hideLoading();
			}, 500)
			if (res.errno === 0) {
				_this.setData({
					selectList:res.data.questions,
					curQuestion:res.data.questions[0],
					askItems:res.data.askItems
				})
			}
		});
        wx.getSystemInfo({
            success: function(t) {
            	console.log(t)
                _this.setData({
                    deviceHei: t.windowHeight
                });
            }
        });
    },
    onReady: function() {},
    jumpApp: function(t) {
        e.jumpApp(t);
    },
    onShow: function() {
    },
    onHide: function() {},
    onUnload: function() {},
});