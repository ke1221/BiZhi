var app = getApp()
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../utils/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图片详情
		id:'',
    src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2987970389,635181890&fm=26&gp=0.jpg',
		paper:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
		var _this = this
    let id = e.id;
		_this.setData({
			id:id
		})
		_this.getPaper()
  },
	getPaper:function(){
		var _this = this
		util.request(api.queryWallpaperDetail,{id:_this.data.id}).then(function(res) {
		  if (res.errno === 0) {
				_this.setData({
					paper:res.data
				})
		  }
		});
	},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})