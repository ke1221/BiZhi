var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
	data: {
		items: [{
				name: '0',
				value: '自己'
			},
			{
				name: '1',
				value: '所有人'
			}
		],
		albumName: "",
		albumDesc: "",
		permissions: ""
	},
	onLoad(opt) {
		var _this = this;
		_this.setData({
			albumId:opt.albumId
		})
		_this.getAlbumDetail();
	},
	getAlbumDetail:function(){
		var _this = this
		util.request(api.queryAlbumDetail, {
			albumId: _this.data.albumId
		}).then(function(res) {
			if (res.errno === 0) {
				console.log(res)
				_this.setData({
					albumDesc:res.data.albumDesc,
					albumName:res.data.albumName
				})
			} else {
				util.showErrorToast(res.errmsg);
			}
		});
	},
	radioChange: function(e) {
		this.setData({
			permissions: e.detail.value
		})
	},
	inputAlbumName: function(e) {
		this.setData({
			albumName: e.detail.value
		})
	},
	inputContent: function(e) {
		this.setData({
			albumDesc: e.detail.value
		})
	},
	saveData: function(e) {
		var _this = this
		var albumName = this.data.albumName
		var permissions = this.data.permissions
		var albumDesc = this.data.albumDesc
		if (albumName != '' && permissions != '' && albumDesc != '') {
			util.request(api.addAlbum, {
				albumName: albumName,
				permissions: permissions,
				albumDesc: albumDesc
			}, 'POST').then(function(res) {
				if (res.errno === 0) {
					util.showSuccessToast(res.errmsg)
					setTimeout(function() {
						wx.navigateBack({
							delta: 1
						})
						var pages = getCurrentPages()
						var prevPage = pages[pages.length - 2]
						prevPage.reLoad();
					}, 500)
				} else {
					util.showErrorToast(res.errmsg);
				}
			});
		} else {
			wx.showToast({
				title: '请输入...',
			})
		}
	},
})
