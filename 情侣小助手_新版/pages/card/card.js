var app = getApp()
var api = require('../../config/api.js');
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');
Page({
	//isSign  0  未到日期  1 我打卡  对方没打 2 当天对方打卡  我没打卡  3 两人都打卡   4 过去的日期  自己没打卡  需要补签
	/**
	 * 页面的初始数据
	 */
	data: {
		days: [],
		signUp: [],
		cur_year: 0,
		cur_month: 0,
		cur_day:0,
		cardNum:0,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		//获取当前年月  
		const date = new Date();
		const cur_year = date.getFullYear();
		const cur_month = date.getMonth() + 1;
		const cur_day = date.getDate();
		const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
		this.calculateEmptyGrids(cur_year, cur_month);
		this.calculateDays(cur_year, cur_month);
		this.setData({
			cur_year:cur_year,
			cur_month:cur_month,
			cur_day:cur_day,
			weeks_ch:weeks_ch,
			cardNum:app.globalData.cardNum
		})
		//获取当前用户当前任务的签到状态
		this.onGetSignUp();
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	},
	// 获取当月共多少天
	getThisMonthDays: function(year, month) {
		return new Date(year, month, 0).getDate()
	},

	// 获取当月第一天星期几
	getFirstDayOfWeek: function(year, month) {
		return new Date(Date.UTC(year, month - 1, 1)).getDay();
	},

	// 计算当月1号前空了几个格子，把它填充在days数组的前面
	calculateEmptyGrids: function(year, month) {
		var that = this;
		//计算每个月时要清零
		that.setData({
			days: []
		});
		const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
		if (firstDayOfWeek > 0) {
			for (let i = 0; i < firstDayOfWeek; i++) {
				var obj = {
					date: null,
					isSign: false
				}
				that.data.days.push(obj);
			}
			this.setData({
				days: that.data.days
			});
			//清空
		} else {
			this.setData({
				days: []
			});
		}
	},

	// 绘制当月天数占的格子，并把它放到days数组中
	calculateDays: function(year, month) {
		var that = this;
		const thisMonthDays = this.getThisMonthDays(year, month);
		for (let i = 1; i <= thisMonthDays; i++) {
			var obj = {
				date: i,
				isSign: 0
			}
			that.data.days.push(obj);
		}
		this.setData({
			days: that.data.days
		});
	},

	//匹配判断当月与当月哪些日子签到打卡
	onJudgeSign: function() {
		var _this = this;
		var signs = _this.data.signUp;
		var listMyCard = _this.data.listMyCard;
		var listTaCard = _this.data.listTaCard;
		
		var daysArr = _this.data.days;
		for (var i = 0; i < listMyCard.length; i++) {
			console.log(i)
			var current = new Date(listMyCard[i].cardDate);
			var year = current.getFullYear();
			var month = current.getMonth() + 1;
			var day = current.getDate();
			day = parseInt(day);
			for (var j = 0; j < daysArr.length; j++) {
				//年月日相同并且已打卡
				if (year == _this.data.cur_year && month == _this.data.cur_month ) {
					if( daysArr[j].date == day){
						console.log("a"+ daysArr[j].date)
						daysArr[j].isSign = 1;
					}
				}
			}
		}
		console.log(daysArr)
		for (var i = 0; i < listTaCard.length; i++) {
			var current = new Date(listTaCard[i].cardDate);
			var year = current.getFullYear();
			var month = current.getMonth() + 1;
			var day = current.getDate();
			
			day = parseInt(day);
			for (var j = 0; j < daysArr.length; j++) {
				//年月日相同并且已打卡
				if (year == _this.data.cur_year && month == _this.data.cur_month ) {
					if( daysArr[j].date == day){
						if(daysArr[j].isSign == 1){
							daysArr[j].isSign = 3
						}
					}else{
						if(daysArr[j].date == _this.data.cur_day){
							if(daysArr[j].isSign == 0){
								daysArr[j].isSign = 2
							}
						}
					}
				}
			}
		}
		for (var j = 0; j < daysArr.length; j++) {
			//年月日相同并且已打卡
			if (year == _this.data.cur_year && month == _this.data.cur_month ) {
				if(daysArr[j].date < _this.data.cur_day && daysArr[j].isSign == 0){
					daysArr[j].isSign = 4;
				}
			}
		}
		
		_this.setData({
			days: daysArr
		});
	},

	// 切换控制年月，上一个月，下一个月
	handleCalendar: function(e) {
		const handle = e.currentTarget.dataset.handle;
		const cur_year = this.data.cur_year;
		const cur_month = this.data.cur_month;
		if (handle === 'prev') {
			let newMonth = cur_month - 1;
			let newYear = cur_year;
			if (newMonth < 1) {
				newYear = cur_year - 1;
				newMonth = 12;
			}
			this.calculateEmptyGrids(newYear, newMonth);
			this.calculateDays(newYear, newMonth);
			this.onGetSignUp();
			this.setData({
				cur_year: newYear,
				cur_month: newMonth
			})
		} else {
			let newMonth = cur_month + 1;
			let newYear = cur_year;
			if (newMonth > 12) {
				newYear = cur_year + 1;
				newMonth = 1;
			}
			this.calculateEmptyGrids(newYear, newMonth);
			this.calculateDays(newYear, newMonth);
			this.onGetSignUp();
			this.setData({
				cur_year: newYear,
				cur_month: newMonth
			})
		}
	},

	//获取当前用户该任务的签到数组
	onGetSignUp: function() {
		var _this = this;
		util.request(api.getUserCardList).then(function(res) {
			if (res.errno === 0) {
				app.globalData.cardNum = res.data.cardNum;
				_this.setData({
					cardNum:res.data.cardNum,
					listMyCard:res.data.listMyCard,
					listTaCard:res.data.listTaCard
				})
			} else {
				util.showErrorToast(res.errmsg)
			}
			//获取后就判断签到情况
			_this.onJudgeSign();
		})
	},
	card:function(){
		util.request(api.insertUserCard).then(function(res) {
			if (res.errno === 0) {
				util.showSuccessToast("打卡成功")
			} else {
				util.showErrorToast(res.errmsg)
			}
		})
	},
	repairCard:function(e){
		var date = e.target.dataset.date
		console.log(e)
		util.request(api.insertUserCard).then(function(res) {
			if (res.errno === 0) {
				util.showSuccessToast("打卡成功")
			} else {
				util.showErrorToast(res.errmsg)
			}
		})
	}
})
