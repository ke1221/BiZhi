var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		cardNum: 0,
		loveValue: 0,
		loveDays: 0,
		remdayCount:0,
		photoCount:0,
		secretCount:0,
		loverInfo:{},
		isShowRemove:false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var _this = this
		_this.setData({
			cardNum: app.globalData.cardNum,
			loveValue: app.globalData.loveValue,
			loveDays: app.globalData.loveDays,
			loverInfo: app.globalData.loverInfo,
		})
		_this.getLoveCountInfo()
	},
	getLoveCountInfo: function() {
		var _this = this
		util.request(api.getLoveCountInfo).then(function(res) {
			if (res.errno === 0) {
				_this.setData({
					remdayCount:res.data.remdayCount,
					photoCount:res.data.photoCount,
					secretCount:res.data.secretCount,
				})
			} else {
				util.showErrorToast(res.errmsg)
			}
		});
	},
	showRemove:function(){
		var _this = this;
		_this.setData({
			isShowRemove:true
		})
	},
	cancelRemove: function(e) {
		this.setData({
			isShowRemove: false
		})
	},
	confirmRemove: function(e) {
		var oid = e.target.dataset.oid;
		var _this = this
		util.request(api.removeLover).then(function(res) {
			if (res.errno === 0) {
				util.showSuccessToast("解绑成功")
				_this.setData({
					isShowRemove: false,
				})
				app.globalData.loverInfo = null;
				app.globalData.hasLover = false;
				app.globalData.loveValue = 0;
				app.globalData.loveDays = 0;
				setTimeout(function(){
					wx.navigateBack({
						delta:1
					})
				},500)
			} else {
				util.showErrorToast("请重试")
			}
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
