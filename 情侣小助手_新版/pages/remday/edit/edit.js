var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
	data: {
		dayName: '',
		date: '',
		content: '',
		key: '',
		month_date: '',
		// 类型
		typeArr: [{
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
		checked: false,
		// 多行
		textarea: '',
		// 加锁
		locked: false,
	},
	onLoad(option) {
		var _this = this
		_this.setData({
			oid: option.oid
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
				if (res.data.isTop == 1) {
					checked = true
				}
				for (var i = 0; i < _this.data.typeArr.length; i++) {
					console.log(_this.data.typeArr[i].id)
					console.log(res.data.type)
					if (_this.data.typeArr[i].id == res.data.type) {
						index = i
					}
				}
				console.log(index)
				_this.setData({
					oid: _this.data.oid,
					dayName: res.data.dayname,
					date: res.data.date,
					content: res.data.content,
					checked: checked,
					index: index,
					isTop:res.data.isTop,
					type:res.data.type,
				})
			}
		})
	},
	// 类型选择
	onTypeChange(e) {
		console.log(e)
		let index = e.detail.value;
		var type = this.data.typeArr[index].id
		this.setData({
			index: index,
			type: type
		})
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
