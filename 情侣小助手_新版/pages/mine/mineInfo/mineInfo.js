var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
	data: {
		isEdit: true,
		startDate: '1900-01-01',
		endDate: '2099-12-31',
		nickName:"",
		birthday:"",
		region: ["", "", ""],
		genderArr: [{
			key: 0,
			value: "不显示"
		}, {
			key: 1,
			value: "男"
		}, {
			key: 2,
			value: "女"
		}],
		genderIndex: -1,
		professionArr: [],
		professionIndex: -1,
	},
	onLoad() {
		var _this = this
		var userInfo = app.globalData.userInfo;
		var nowDate = util.formatDate(new Date(), 'yyyy-MM-dd');
		_this.setData({
			endDate: nowDate,
			professionId:userInfo.professionId,
			age:userInfo.age,
			constellation:userInfo.constellation,
			birthday:userInfo.birthday,
			genderIndex:userInfo.gender,
			gender:userInfo.gender,
			nickName:userInfo.nickName,
			region:[userInfo.province,userInfo.city,userInfo.area]
		})
		_this.getProfession();
	},
	onShow() {},
	edit: function() {
		var _this = this;
		_this.setData({
			isEdit: false,
		})
	},
	save: function() {
		var _this = this;
		_this.setData({
			isEdit: true,
		})
	},
	bindRegionChange: function(e) {
		this.setData({
			region: e.detail.value
		})
	},
	bindBirthdayChange: function(e) {
		this.setData({
		  birthday: e.detail.value
		})
		this.updateUser();
	},
	bindProfessionChange:function(e){
		this.setData({
			professionIndex: e.detail.value,
			professionId:_this.data.professionArr[e.detail.value].dataId
		})
	},
	bindGenderChange:function(e){
		this.setData({
			genderIndex: e.detail.value,
			gender:e.detail.value,
		})
	},
	getProfession:function(){
		var _this = this
		util.request(api.getBasicDataList,{type:"profession"}).then(function(res) {
			if (res.errno === 0) {
				var professionIndex = 0;
				for(var i=0;i<res.data.length;i++){
					if(_this.data.professionId == res.data.professionId){
						professionIndex = i;
						break
					}
				}
				_this.setData({
					professionArr:res.data,
					professionIndex:professionIndex
				})
			} else {
				util.showErrorToast("请重试")
			}
		})
	},
	updateUser:function(){
		var _this = this
		util.request(api.updateUser,{province:_this.data.region[0],city:_this.data.region[1],
				area:_this.data.region[2],gender:_this.data.gender,birthday:_this.data.birthday,
				constellation:_this.data.constellation,age:_this.data.age,
				professionId:_this.data.professionId}).then(function(res) {
			if (res.errno === 0) {
				var professionIndex = 0;
				for(var i=0;i<res.data.length;i++){
					if(_this.data.professionId == res.data.professionId){
						professionIndex = i;
						break
					}
				}
				_this.setData({
					professionArr:res.data,
					professionIndex:professionIndex
				})
			} else {
				util.showErrorToast("请重试")
			}
		})
	},
	onShareAppMessage: function(res) {
		var _this = this;
		return {
			title: '情侣小助手',
			path: '/pages/index/index',
			imageUrl: "https://img.yuzktyu.top/SHARE.jpg", //转发图片
			success: function(res) {
				console.log("转发成功。。")
			},
			fail: function(res) {
				console.log("转发失败。。")
			}
		}
	},
})
