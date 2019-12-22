var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var dateTime = require("../../../utils/dateTime.js");
Page({ 
   data: {
    nodes:"",
	earthyWordsList:[],
	pageNum: 1,
	pageSize: 10,
	pageFlag:true
  },
  onLoad(opt){
	  this.getEarthy()
  },
  onShow(){
  },
	getEarthy: function(){
		var _this = this
		util.request(api.getEarthyWordsList,{pageNum:_this.data.pageNum}).then(function(res) {
		  if (res.errno === 0) {
				var earthyWordsListNew = _this.data.earthyWordsList.concat(res.data.list)
				_this.setData({
					earthyWordsList:earthyWordsListNew
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
			_this.getEarthy()
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
	}
})