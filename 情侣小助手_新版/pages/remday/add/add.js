var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
	data:{
		dayName:'',
		date:'',
		content:'',
		key:'',
		month_date:''
	},
	onLoad(option){
		var _this = this
	
	},
	inputDayName:function(e){
		this.setData({
			dayName:e.detail.value
		})
	},
	inputContent:function(e){
		this.setData({
			content:e.detail.value
		})
	},
    bindDateChange: function(e) {
		this.setData({
		  date: e.detail.value
		})
	},
    saveData:function(e){
		wx.showLoading({
		  title: '加载中',
		})
    	var _this = this
    	var dayName = this.data.dayName
    	var date = this.data.date
    	var content = this.data.content
    	if(dayName!='' && date!=''){
			util.request(api.addRemday,{dayname:dayName,date:date,content:content},'POST').then(function(res) {
			  if (res.errno === 0) {
				  wx.hideLoading();
				util.showSuccessToast("新增成功")
				setTimeout(function(){
					wx.navigateBack({
						delta:1
					})
					var pages = getCurrentPages()
					var prevPage = pages[pages.length-2]
					prevPage.reLoad();
				},500)
			  }else{
				 util.showErrorToast('新增失败');
			  }
			});
    	}
    	else{
    		wx.showToast({
		    title: '请输入...',
		    })
    	}
    },
})