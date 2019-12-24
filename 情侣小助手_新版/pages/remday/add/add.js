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
		month_date:'',
		// 类型
		type: [
			{
				id: 1,
				name: '在一起'
			},
			{
				id: 2,
				name: '生日'
			},
			{
				id: 3,
				name: '倒数日'
			},
			{
				id: 99,
				name: '其他'
			}
		],
		// 选择下标
		index: 0,
		// 置顶
		checked: true,
		// 多行
		textarea: '',
		// 加锁
		locked: false,
	},
	onLoad(option){
		var _this = this
	
	},
	// 类型选择
	onTypeChange(e){
		console.log(e)
		let index = e.detail.value;
	
	},
	// 置顶
	onSwitch(e){
		let checked = e.detail.value;	
		this.setData({
			checked
		})
	},
	// 多行文本 确认
	onConfirm(e){
		// console.log(e)
	},
	onTextArea(e){
		let textarea = e.detail.value; 
		this.setData({
			textarea
		})
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