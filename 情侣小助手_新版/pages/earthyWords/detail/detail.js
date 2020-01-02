var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var dateTime = require("../../../utils/dateTime.js");
// 在页面中定义插屏广告
let interstitialAd = null
Page({ 
   data: {
    nodes:"",
	earthyWords:{}
  },
  onLoad(opt){
	var _this = this
	if(opt.id){
		_this.getEarthy(opt.id)
	}else{
		_this.getEarthyToday();
	}

	// 在页面onLoad回调事件中创建插屏广告实例
	// if (wx.createInterstitialAd) {
	//   interstitialAd = wx.createInterstitialAd({
	// 	adUnitId: 'adunit-a3cc8ce0d9b29fc5'
	//   })
	//   interstitialAd.onLoad(() => {})
	//   interstitialAd.onError((err) => {})
	//   interstitialAd.onClose(() => {})
	// }
  },
  onShow(){
  },
	getEarthyToday: function(){
		var _this = this
		wx.showLoading({
		  title: '加载中',
		})
		util.request(api.getEarthyWordsToDay).then(function(res) {
			setTimeout(function() {
			    wx.hideLoading();
			}, 300)
			if (res.errno === 0) {
				res.data.day = dateTime(res.data.date).format("DD");
				res.data.date = dateTime(res.data.date).format("MMM.YYYY"), 
				_this.setData({
					earthyWords:res.data
				})
			}else if(res.errno === 100){
				
			}
		})
	},
	getEarthy: function(id){
		var _this = this
		wx.showLoading({
		  title: '加载中',
		})
		util.request(api.getEarthyWordsDetail,{id:id}).then(function(res) {
			setTimeout(function() {
			    wx.hideLoading();
			}, 300)
			if (res.errno === 0) {
				res.data.day = dateTime(res.data.date).format("DD");
				res.data.date = dateTime(res.data.date).format("MMM.YYYY"), 
				_this.setData({
					earthyWords:res.data
				})
				// 在适合的场景显示插屏广告
				if (interstitialAd) {
				  interstitialAd.show().catch((err) => {
					console.error(err)
				  })
				}
			}else if(res.errno === 100){
				
			}
		})
	},
	getOneDetails: function(e) {
	    var _this = this
		var id = e.target.dataset.id;
	    if (id==null) return ;
		setTimeout(function(e) {
		   _this.getEarthy(id);
	   }, 100);
		// o("/api/one/" + n).then(function(t) {
	 //        setTimeout(function(e) {
	 //            wx.setNavigationBarTitle({
	 //                title: t.volume + " - ONE · 一个"
	 //            }), t.day = a(t.post_date).format("DD"), t.date = a(t.post_date).format("MMM.YYYY"), 
	 //            i.setData({
	 //                oneInfo: t,
	 //                loading: !1
	 //            });
	 //        }, 500);
	 //    });
	},
	pageJump: function(a) {
	    var t = a.currentTarget.dataset;
	    wx.navigateTo({
	        url: t.url
	    });
	}
})