var app = getApp()
var api = require('../../config/api.js');
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');
Page({
	data:{
		hiddenmodalput: true,
		userInfo:{},
		loverInfo:{},
		userName:'',
		pageUrl:'',
		menus:[
			{
				'catName':'情 侣',
				'menu':[
					{'imgUrl':'https://img.yuzktyu.top/ZGEJdc8tx4Stmkyw6NpDyt4P.png','name':'相册','url':'/pages/photo/list/list','lover':false},
					{'imgUrl':'https://img.yuzktyu.top/HyZ6RQr7F3G6DEhMWbT7tamC.png','name':'小日记','url':'/pages/secret/list/list','lover':false},
					{'imgUrl':'https://img.yuzktyu.top/cK6b4t6HJyaBFCeQPHZissSZ.png','name':'默契考验','url':'/pages/questions/index/index','lover':true},
					{'imgUrl':'https://img.yuzktyu.top/cTXKfmTAn6w3WQXAEt4TScnx.png','name':'情侣头像','url':'/pages/portrait/groupList/groupList','lover':false},
					{'imgUrl':'https://img.yuzktyu.top/nEX86KDFkp2siSP28R2z3CnE.png','name':'土味情话','url':'/pages/earthyWords/detail/detail','lover':false}
				]
			},
			{
				'catName':'小工具',
				'menu':[
					{'imgUrl':'https://img.yuzktyu.top/a48PYDkDC5p3rXZYm82RwNmc.png','name':'小小涂鸦','url':'/pages/doodle/doodle','lover':false},
					{'imgUrl':'https://img.yuzktyu.top/bMD4JekbQAf5QyF6BD4nHH8G.png','name':'时差','url':'/pages/time/time','lover':false},
					{'imgUrl':'https://img.yuzktyu.top/X4fWTDa8apTnfTryGCXaY8Xz.png','name':'密码管理','url':'/pages/password/list/list','lover':false},
					{'imgUrl':'https://img.yuzktyu.top/RkJrMb74PjBriQws7nkyD2es.png','name':'亲戚关系计算','url':'/pages/relation/relation','lover':false},
					{'imgUrl':'https://img.yuzktyu.top/zPC77x7ep6KcjCT3Y7eJKy2d.png','name':'智能陪聊','url':'/pages/chatBox/chatBox','lover':false},
					{'imgUrl':'https://img.yuzktyu.top/nHmQDP4zHPKPMyJKcGwWk7Ta.png','name':'脑筋急转弯','url':'/pages/riddle/riddleCat/riddleCat','lover':false}
				]
			},
			{
				'catName':'运 势',
				'menu':[
					{'imgUrl':'https://img.yuzktyu.top/58kbdhZHJiCZEF4WBeBW3p4h.png','name':'星座运势','url':'/pages/constellation/list/list','lover':false}
				]
			},
			// {
			// 	'catName':'娱 乐',
			// 	'menu':[
			// 		
			// 	]
			// },
		],
	},
	onLoad(){
		wx.setNavigationBarTitle({
		    title: '我们'
		})
	},
	onShow(){
		var _this = this
		_this.setData({
			userInfo: wx.getStorageSync('userInfo'),
			loverInfo: app.globalData.loverInfo
		})
	},
	onShareAppMessage: function (res) {
		var _this = this;
	    if (res.from === 'button') {
	       // 来自页面内转发按钮
	       console.log(_this.data.userInfo)
	       return {
		      	title: '余生有你',
			  	path: '/pages/index/index?userId='+_this.data.userInfo.userId,
			  	imageUrl:"https://img.yuzktyu.top/SHARE.jpg",        //转发图片
			  	success: function(res) {
		       		console.log("转发成功。。"+_this.data.userInfo.userId)
		     	},
		     	fail: function(res) {
		        	console.log("转发失败。。")
		        }
		    }
	    }
	},
	pageJump: function(a) {
		var t = a.currentTarget.dataset;
		var lover = a.currentTarget.dataset.lover
		if(lover){
			if(app.globalData.loverInfo==null || app.globalData.loverInfo ==''){
				util.showErrorToast('么得对象');
				return;
			}
		}
		wx.navigateTo({
			url: t.url
		});
	},
	pageJumpHaveLover:function(a){
		console.log(app.globalData.loverInfo)
			if(app.globalData.loverInfo==null || app.globalData.loverInfo==""){
				util.showErrorToast("没对象无法使用")
				return
			}
			var t = a.currentTarget.dataset;
		    setTimeout(function() {
		        wx.navigateTo({
		        	url: t.url
		        });
		    }, 200);
	},
	pageJumpHavePhone: function(a) { 
		var _this = this
		if(app.globalData.openid ==""){
			wx.showToast({title: "没有授权"});
		}
		app.promiseGet(app.globalData.URL+'/user/getUserJsonDetail?openid='+app.globalData.openid,_this).then((res)=>{
			app.globalData.user = res.data;
			if(res.data.isauth == 1){
				var t = a.currentTarget.dataset;
				wx.navigateTo({
					url: t.url
				});
			}else{
				this.setData({
					pageUrl:a.currentTarget.dataset.url,
					hiddenmodalput: !this.data.hiddenmodalput
				})
			}
		})
	},
	 //取消按钮  
	cancel: function () {
	  this.setData({
	    hiddenmodalput: true
	  });
	},
	//确认  
	confirm: function () {
		var _this = this
	  _this.setData({
	    hiddenmodalput: true
	  })
	  app.promiseGet(app.globalData.URL+'/user/updateUserAuth?openid='+app.globalData.openid+'&userid='+app.globalData.user.userid+'&username='+_this.data.userName,_this).then((res)=>{
		if(res.data.success){
			wx.showToast({title: res.data.msg});
			setTimeout(function() {
				app.promiseGet(app.globalData.URL+'/user/getUserJsonDetail?openid='+app.globalData.openid,_this).then((res)=>{
					app.globalData.user = res.data;
					wx.navigateTo({
						url: _this.data.pageUrl
					});
				})
			}, 1000)
		}else{
			wx.showToast({title: res.data.msg});
		}
	  })
	},
	inputUserName:function(e){
		this.setData({
			userName:e.detail.value
		})
	}
})
