var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
	data: {
		remDay:[],
		showLogin: false,
		hasLogin: false,
		pageNum: 1,
		pageSize: 10,
		pageFlag: true,
	},
	onLoad(option) {
		var _this = this
		_this.setData({
			hasLogin: app.globalData.hasLogin
		})
		_this.getList()
	},
	getList: function() {
		var _this = this
		wx.showLoading({
			title: '加载中',
		})
		util.request(api.getRemdayList, {
			pageNum: _this.data.pageNum
		}).then(function(res) {
			setTimeout(function() {
				wx.hideLoading();
			}, 300)
			if (res.errno === 0) {
				for (var i = 0; i < res.data.list.length; i++) {
					if (res.data.list[i].dayname.length > 8) {
						res.data.list[i].dayname = res.data.list[i].dayname.substr(0, 6) + '...'
					}
					var dateNow = new Date((new Date()).toLocaleDateString())
					var dateOld = new Date(res.data.list[i].date)
					var total = Math.round((dateNow.getTime() - dateOld.getTime()) / (1000 * 60 * 60 * 24))
					// 1 在一起  2 生日 3 倒数日 99 其他
					var yearNum = parseInt(total/365)
					var yaer = res.data.list[i].date.substring(0,4);
					var yearNew = parseInt(yearNum)+parseInt(yaer)
					var dateNew = yearNew+res.data.list[i].date.substring(4,10)
					if(res.data.list[i].type == '1'){
						res.data.list[i].timeLen = "第"+total+"天";
						if(total==100){
							res.data.list[i].title = '今天是100天纪念日'
						}else if(total==520){
							res.data.list[i].title = '今天是520天纪念日'
						}else if(total==1314){
							res.data.list[i].title = '今天是1314天纪念日'
						}else if(total<100){
							res.data.list[i].title = (100-total ) +'天后100天纪念日'
						}else if(total>365 && total<520){
							res.data.list[i].title = (520-total ) +'天后520天纪念日'
						}else if(total>1095 && total<1314){
							res.data.list[i].title = (1314-total ) +'天后1314天纪念日'
						}else{
							// 到现在几年
							var yaerNum = parseInt(total/365)
							var mdNow = util.formatDate(dateNow,"MM-dd");
							var mdOld = util.formatDate(res.data.list[i].date,"MM-dd");
							if(mdNow == mdOld){
								res.data.list[i].title = '今天是'+yaerNum+'周年纪念日'
							}else{
								// 过完最后的一个纪念日的下个纪念日时间
								var year = yaerNum +1 +parseInt(res.data.list[i].date.substring(0,4))
								var dateStr = year+res.data.list[i].date.substring(4,10)
								var dateNew = new Date(dateStr)
								var overTotal = Math.round((dateNew.getTime() - dateNow.getTime()) / (1000 * 60 * 60 * 24))
								res.data.list[i].title = overTotal +'天后'+(yaerNum+1)+'周年纪念日'
							}
						}
					}else if(res.data.list[i].type == '2'){
						// 过完最后的一个纪念日的下个纪念日时间
						var yaerNum = parseInt(total/365)
						var year = yaerNum +1 +parseInt(res.data.list[i].date.substring(0,4))
						var dateStr = year+res.data.list[i].date.substring(4,10)
						var dateNew = new Date(dateStr)
						var overTotal = Math.round((dateNew.getTime() - dateNow.getTime()) / (1000 * 60 * 60 * 24))
						res.data.list[i].timeLen = "还有"+overTotal+"天";
						res.data.list[i].title = yaerNum+1+'岁生日'
					}else if(res.data.list[i].type == '3'){
						if(total<0){
							res.data.list[i].timeLen = "还有"+ -total+"天";
						}else{
							res.data.list[i].timeLen = "第"+ total+"天";
						}
					}else{
						res.data.list[i].timeLen = "第"+ total+"天";
					}
				}
				var remDayNew = _this.data.remDay.concat(res.data.list)
				_this.setData({
					remDay: remDayNew
				})
				//判断是不是最后一页
				if (res.data.isLastPage) {
					_this.setData({
						pageFlag: false
					})
				} else {
					_this.setData({
						pageNum: _this.data.pageNum + 1
					})
				}
			}
		});
	},
	pageJump: function(a) {
		var t = a.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
	onReachBottom() {
		var _this = this
		if (_this.data.pageFlag) {
			_this.getList()
		} else {
			wx.showToast({
				title: "没有更多了",
				icon: "loading",
				duration: 500
			})
		}
	},
	onPullDownRefresh(){
		 var _this = this
		 _this.setData({
			 remDay:[],
			 pageNum: 1,
			 pageFlag: true,
		 })
		 _this.getList()
	 },
	loginDialog: function(t) {
		this.setData({
			hasLogin: t.detail.value,
			showLogin: !1
		})
	},
	reLoad:function(){
		var _this = this
		_this.setData({
		  remDay:[],
		  pageNum:1,
		  pageFlag:true
		})
		// 获取纪念日信息
		_this.getList()
	}
})
