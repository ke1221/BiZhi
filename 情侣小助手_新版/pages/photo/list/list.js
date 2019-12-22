////获取应用实例
var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
	data: {
		albumList: [],
		photoList: [],
		showLogin: false,
		hasLogin: false,
		pageNumAlbum: 1,
		pageSizeAlbum: 10,
		pageFlagAlbum: true,
		pageNumPhoto: 1,
		pageSizePhoto: 10,
		pageFlagPhoto: true,
	},
	onLoad() {
		var _this = this
		_this.setData({
			hasLogin: app.globalData.hasLogin
		})
		_this.getPhoto();
		console.log(_this.data.photoList)
	},
	onShow() {

	},
	editAlbum: function(e) {
		var _this = this
		var id = e.target.dataset.albumid
		wx.showActionSheet({
		  itemList: ['删除相册', '编辑相册'],
		  success (res) {
		    if(res.tapIndex == 0){
				_this.deleteAlbum(id)
		    }else if(res.tapIndex == 1){
				wx.navigateTo({
					url: "/pages/photo/edit/edit?albumId="+id
				});
		    }
		  },
		  fail (res) {
		    console.log(res.errMsg)
		  }
		})
	},
	deleteAlbum: function(id) {
		var _this = this
		wx.showModal({
			title: '要删除嘛？',
			cancelText: "不删了",
			confirmText: "删了吧",
			success: function(res) {
				if (res.confirm) {
					util.request(api.delAlbum, {
						albumId: id
					}).then(function(res) {
						if (res.errno === 0) {
							util.showSuccessToast(res.errmsg)
							_this.setData({
								albumList: [],
								pageNum: 1,
								pageFlag: true
							})
							_this.getAlbum();
						} else {
							util.showErrorToast(res.errmsg);
						}
					});
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	pageJump: function(a) {
		var t = a.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	},
	getAlbum: function() {
		var _this = this
		wx.showLoading({
			title: '加载中',
		})
		util.request(api.getAlbumList, {
			pageNum: _this.data.pageNumAlbum
		}).then(function(res) {
			setTimeout(function() {
				wx.hideLoading();
			}, 300)
			if (res.errno === 0) {
				var albumListNew = _this.data.albumList.concat(res.data.list)
				_this.setData({
					albumList: albumListNew
				})
				//判断是不是最后一页
				if (res.data.isLastPage) {
					_this.setData({
						pageFlag: false
					})
				} else {
					_this.setData({
						pageNumAlbum: _this.data.pageNumAlbum + 1
					})
				}
			}
		});
	},
	getPhoto: function() {
		var _this = this
		wx.showLoading({
			title: '加载中',
		})
		util.request(api.getPhotoLoverList, {
			pageNum: _this.data.pageNumPhoto,pageSize:_this.data.pageSizePhoto
		}).then(function(res) {
			setTimeout(function() {
				wx.hideLoading();
			}, 300)
			if (res.errno === 0) {
				var photoList = _this.data.photoList;
				var photoListNew = res.data.list;
				for(var i=0;i<photoListNew.length;i++){
					var date = util.formatDate(photoListNew[i].uploadDate,"yyyy-MM")
					if(photoList.length==0){
						console.log("aaa")
						var map = {}
						map['date'] = date
						var photos = [];
						photos.push(photoListNew[i])
						map['photos'] = photos
						photoList.push(map)
					}else{
						if(date == photoList[photoList.length-1].date){
							console.log(date)
							photoList[photoList.length-1].photos.push(photoListNew[i])
						}else{
							var map = {}
							map['date'] = date
							var photos = [];
							photos.push(photoListNew[i])
							map['photos'] = photos
							photoList.push(map)
						}
					}
				}
				_this.setData({
					photoList: photoList
				})
				//判断是不是最后一页
				if (res.data.isLastPage) {
					_this.setData({
						pageFlag: false
					})
				} else {
					_this.setData({
						pageNumAlbum: _this.data.pageNumAlbum + 1
					})
				}
			}
		});
	},
	lower() {
		var _this = this
		if (_this.data.pageFlagAlbum) {
			_this.getAlbum()
		} else {
			wx.showToast({
				title: "没有更多了",
				icon: "loading",
				duration: 500
			})
		}
	},
	reLoad() {
		var _this = this
		_this.setData({
			albumList: [],
			pageNum: 1,
			pageFlag: true
		})
		// 获取纪念日信息
		_this.getAlbum()
	},
})
