var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
	data: {
		// 类型
		typeArr: [
			{id: 99,name: '普通纪念日'},
			{id: 1,name: '在一起'},
			{id: 2,name: '生日'},
			{id: 3,name: '倒数日'}
		],
		dayName:'',
		date:'',
		content:'',
		isTop:'2',
		type:'99',
		// 选择下标
		index: 3,
		// 置顶
		checked: false,
		// 多行
		textarea: '',
		// 加锁
		locked: false,
		startDate:'1900-01-01',
		endDate:'2099-12-31',
		nowDate:'',
	},
	onLoad(option) {
		var _this = this
		_this.setData({
			oid: option.oid
		})
		var nowDate = util.formatDate(new Date(),'yyyy-MM-dd');
		_this.setData({
			nowDate:nowDate,
		})
		_this.getRemdayDetail()
	},
	getRemdayDetail: function() {
		var _this = this
		util.request(api.getRemdayDetail, {
			oid: _this.data.oid
		}).then(function(res) {
			if (res.errno === 0) {
				var checked = false;
				var index = 0;
				var type = res.data.type
				if (res.data.isTop == 1) {
					checked = true
				}
				for (var i = 0; i < _this.data.typeArr.length; i++) {
					if (_this.data.typeArr[i].id == type) {
						index = i
					}
				}
				var startDate = '';
				var endDate = '';
				if(type == 1 || type == 2 || type==99){
					startDate = '1900-01-01',
					endDate = _this.data.nowDate
				}else if(type == 3){
					startDate = _this.data.nowDate,
					endDate = '2099-12-31'
				}
				_this.setData({
					oid: _this.data.oid,
					dayName: res.data.dayname,
					date: res.data.date,
					content: res.data.content,
					checked: checked,
					index: index,
					isTop:res.data.isTop,
					type:type,
					startDate:startDate,
					endDate:endDate,
				})
			}
		})
	},
	// 类型选择
	onTypeChange(e) {
		var _this = this
		let index = e.detail.value;
		var type = this.data.typeArr[index].id
		if(type == 1 || type == 2 || type==99){
			this.setData({
				index: index,
				type: type,
				startDate: '1900-01-01',
				endDate: _this.data.nowDate
			})
		}else if(type == 3){
			this.setData({
				index:index,
				type:type,
				startDate: _this.data.nowDate,
				endDate: '2099-12-31'
			})
		}
	},
	// 置顶
	onSwitch(e) {
		let checked = e.detail.value;
		if (checked) {
			this.setData({
				isTop: "1"
			})
		} else {
			this.setData({
				isTop: "2"
			})
		}
	},
	// 多行文本 确认
	onConfirm(e) {
		// console.log(e)
	},
	onTextArea(e) {
		let textarea = e.detail.value;
		this.setData({
			content: textarea
		})
	},
	inputDayName: function(e) {
		this.setData({
			dayName: e.detail.value
		})
	},
	bindDateChange: function(e) {
		this.setData({
			date: e.detail.value
		})
	},
	saveData: function(e) {
		wx.showLoading({
			title: '加载中',
		})
		var _this = this
		var dayName = this.data.dayName
		var date = this.data.date
		var content = this.data.content
		var isTop = this.data.isTop
		var type = this.data.type
		if (dayName != '' && date != '') {
			util.request(api.updateRemday, {
				oid: _this.data.oid,
				dayname: dayName,
				date: date,
				isTop: isTop,
				type: type,
				content: content
			}, 'GET').then(function(res) {
				if (res.errno === 0) {
					wx.hideLoading();
					util.showSuccessToast("更新成功")
					setTimeout(function() {
						wx.navigateBack({
							delta: 1
						})
						var pages = getCurrentPages()
						var prevPage = pages[pages.length - 2]
						prevPage.reLoad();
					}, 500)
				} else {
					util.showErrorToast('更新失败');
				}
			});
		} else {
			wx.showToast({
				title: '请输入...',
			})
		}
	},
})
