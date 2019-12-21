var app = getApp();
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
    data: {
        deviceHei: "",
        userSetQsAswer: [],
        curQuestion: [],
        curAswer: "",
        author: "",
        curQsNum: 1,  // 回答的第几个问题
        curQsNumR:1, // 问题list里面的第几个问题
        curQsInListNum: 0,
        qsNumCount:10,  // 现在有多少个问题
        selectList: []
    },
    radioChange: function(e) {
        var _this = this
        var answerId = e.currentTarget.dataset.value
        var selectList = _this.data.selectList
        var curQsNum = _this.data.curQsNum
        var curQsNumR = _this.data.curQsNumR
        var userSetQsAswer={"questionId":_this.data.curQuestion.questionId,"userAId":answerId}
		_this.data.userSetQsAswer.push(userSetQsAswer)
        // 答完10个问题   提交后台
        if(curQsNum == 10){
			var userAswer = _this.data.userSetQsAswer
			// for(var i=0;i<userAswer.length;i++){
			// 	userAswer[i].askid=askid
			// }
			var userAnserJson = JSON.stringify(userAswer)
			console.log({askItems:userAnserJson})
			var dataAsk = {askItems:userAswer}
			util.request(api.addAsk,dataAsk,'POST').then(function(res) {
			  if (res.errno === 0) {
				util.showSuccessToast("新增成功")
				setTimeout(function(){
					wx.redirectTo({
					  url: '/pages/questions/userRecord/userRecord'
					})
				},500)
			  }else if(res.errno === 502){
				 util.showErrorToast('没有对象');
				 setTimeout(function(){
				 	wx.navigateBack({
				 		delta:1
				 	})
				 },1000)
			  }else{
				  util.showErrorToast('新增失败');
				  setTimeout(function(){
				  	wx.navigateBack({
				  		delta:1
				  	})
				  },500)
			  }
			});
        }else{
        	if(curQsNumR == _this.data.qsNumCount){
        		wx.showLoading({
		            title: "加载中..."
		        });
				util.request(api.getQuestions).then(function(res) {
					setTimeout(function() {
					    wx.hideLoading();
					}, 500)
					if (res.errno === 0) {
						selectList = selectList.concat(res.data)
						_this.setData({
							curQsNumR:curQsNumR+1,
							curQsNum:curQsNum+1,
							selectList:selectList,
							curQuestion:selectList[curQsNumR],
							qsNumCount:_this.data.qsNumCount+10
						})
					}
				});
        	}else{
				setTimeout(function() {
				    _this.setData({
				    	curQsNumR:curQsNumR+1,
				    	curQsNum:curQsNum+1,
				    	curQuestion:selectList[curQsNumR]
				    })
				}, 500)
        	}
        }
    },
    get_num: function() {
        for (var t = this, e = t.data.userSetQsAswer, a = t.data.selectList, s = 0; s < a.length; s++) {
            for (var i = !0, n = 0; n < e.length; n++) if (i && a[s].subjectId == e[n].subjectId) {
                i = !1;
                break;
            }
            if (i) return s;
        }
    },
    newQsBtn: function() {
    	var _this =this
    	var curQsNumR = _this.data.curQsNumR
    	var selectList = _this.data.selectList
    	if(_this.data.qsNumCount == curQsNumR){
    		wx.showLoading({
	            title: "加载中..."
	        });
			util.request(api.getQuestions).then(function(res) {
				setTimeout(function() {
				    wx.hideLoading();
				}, 500)
				if (res.errno === 0) {
					selectList = selectList.concat(res.data)
					_this.setData({
						selectList:selectList,
						curQsNumR:curQsNumR+1,
						curQuestion:selectList[curQsNumR],
						qsNumCount:_this.data.qsNumCount+res.data.length
					})
				}
			});
    	}else{
	        this.setData({
	        	curQsNumR:curQsNumR+1,
	        	curQuestion:selectList[curQsNumR]
	        })
    	}
    	
    	
    },
    onLoad: function(e) {
        wx.showLoading({
            title: "加载中..."
        });
        var _this = this
		util.request(api.getQuestions).then(function(res) {
			setTimeout(function() {
			    wx.hideLoading();
			}, 500)
			if (res.errno === 0) {
				_this.setData({
					selectList:res.data,
					curQuestion:res.data[0],
					qsNumCount:res.data.length
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
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "你是我的默契好友吗？",
            desc: e.globalData.appName,
            path: "/pages/index/index"
        };
    },
    tochange: function() {}
});