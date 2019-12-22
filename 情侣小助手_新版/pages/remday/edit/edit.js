var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
	data:{
		dayname:'',
		date:'',
		content:'',
		oid:''
	},
	onLoad(option){
		var _this = this
		var oid = option.oid
		
		util.request(api.getRemdayDetail,{oid:oid}).then(function(res) {
			if (res.errno === 0) {
				_this.setData({
					oid:oid,
					dayname:res.data.dayname,
					date:res.data.date,
					content:res.data.content
				})
			}
		})
	},
	inputDayName:function(e){
		this.setData({
			dayname:e.detail.value
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
    	var _this=this
    	var dayname = this.data.dayname
    	var date = this.data.date
    	var content = this.data.content
    	var oid = this.data.oid
    	if(dayname!='' && date!='' && content!=''){
    		util.request(api.updateRemday,{oid:oid,dayname:dayname,date:date,content:content},'POST').then(function(res) {
    		  if (res.errno === 0) {
				util.showSuccessToast(res.errmsg)
				setTimeout(function(){
					wx.navigateBack({
						delta:1
					})
					_this.getPrevData();
				},500)
    		  }else{
				 util.showErrorToast(res.errmsg);
    		  }
    		});
    	}
    	else{
    		wx.showToast({
		    	title: '请输入...',
		    })
    	}
    },
    delData:function(e){
    	var _this = this
    	wx.showModal({
		    title: '',
		    confirmText:'狠心删除',
		    cancelText:'放你一马',
		    content: '你真的要删除我嘛？',
		    success: function(res) {
			    if (res.confirm) {
					util.request(api.delRemday,{oid:_this.data.oid},'POST').then(function(res) {
					  if (res.errno === 0) {
						util.showSuccessToast(res.errmsg)
						setTimeout(function(){
							wx.navigateBack({
								delta:1
							})
							_this.getPrevData();
						},500)
					  }else{
						 util.showErrorToast(res.errmsg);
					  }
					});
			    } else if (res.cancel) {
			    	//console.log("不删除")	
			    }
		    }
		})
    },
     // 从index页面获取纪念日数据
    getPrevData:function(){
    	var pages = getCurrentPages()
		var prevPage = pages[pages.length-2]
		prevPage.reLoad()
    }
})