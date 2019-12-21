var qiniuUploader = require("../../../utils/qiniuUploader");
var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
//获取应用实例
var app = getApp()
Page({
	data: {
		imageObject: ['/images/image.png','/images/image.png'],
		filePath: [],
		fileList: [],
		images:[],
		albumId: "",
		imgUrl:'',
		urls:[],
		pageNum: 1,
		pageSize: 10,
		pageFlag:true
	},
	//事件处理函数
	onLoad: function(option) {
		var _this = this;
		_this.setData({
			albumId: option.albumId
		})
		_this.setData({
		  images:[],
		  pageNum:1,
		  pageFlag:true
		})
		_this.getImg();
	},
	onShow(){
		
	},
	imgYu:function(event){
    	var src = event.currentTarget.dataset.src;//获取data-src
    	var imgList = [src];//获取data-list
    	//console.log(imgList)
 		//图片预览
    	wx.previewImage({
     		current: src, // 当前显示图片的http链接
      		urls: imgList // 需要预览的图片http链接列表
      	})
    },
    deleteImg:function(event){
    	var _this = this
    	wx.showModal({
		  title: '要删除嘛？',
		  cancelText:"不删了",
		  confirmText:"删了吧",
		  success: function(res) {
		    if (res.confirm) {
		      	var photoId = event.currentTarget.dataset.id;//获取data-src
		   		util.request(api.delPhoto,{photoId:photoId}).then(function(res) {
		   		  if (res.errno === 0) {
		   			util.showSuccessToast(res.errmsg)
					_this.setData({
					  images:[],
					  pageNum:1,
					  pageFlag:true
					})
		   			_this.getImg();
		   		  }else{
		   			 util.showErrorToast(res.errmsg);
		   		  }
		   		});
		    } else if (res.cancel) {
		      console.log('用户点击取消')
		    }
		  }
		})
    },
	getImg:function(){
		var _this = this
		wx.showLoading({
		  title: '加载中',
		})
		util.request(api.getPhotoList,{pageNum:_this.data.pageNum,albumId:_this.data.albumId}).then(function(res) {
			setTimeout(function() {
			    wx.hideLoading();
			}, 300)
			if (res.errno === 0) {
				var imagesNew = _this.data.images.concat(res.data.list)
				_this.setData({
					images:imagesNew
				})
				if(_this.data.images.length>0){
					_this.setData({
						imgUrl:_this.data.images[0].url
					})
				}else{
					util.request(api.indexImgList,{imgName:"photoTitleImg"}).then(function(res) {
					  if (res.errno === 0) {
							_this.setData({
								imgUrl:res.data.list[0]
							})
					  }
					});
				}
				//判断是不是最后一页
				if(res.data.isLastPage){
					_this.setData({
						pageFlag : false
					})
				}else{
					_this.setData({
						pageNum : _this.data.pageNum+1
					})
				}
			}
		});
	},
	
  startUpload: function () {
	var _this = this
  	var res = _this.data.fileList
	var length = res.tempFilePaths.length;
  	for(var i = 0; i < length; i++) {
  		var filePath = res.tempFilePaths[i];
  		// 交给七牛上传
  		qiniuUploader.upload(filePath, (res) => {
			 console.log(res)
			// 数据库写图片
			util.request(api.addPhoto,{url:res.imageURL,albumId:_this.data.albumId}).then(function(res) {
				length--;
			  if (res.errno === 0) {
				util.showSuccessToast("新增成功")
				if(length ==0 ){
					_this.setData({
					  images:[],
					  pageNum:1,
					  pageFlag:true
					})
					_this.getImg();
				}
			  }else{
				 util.showErrorToast('新增失败');
			  }
			});
  //			that.setData({
  //				'imageObject': res
  //			});
  		}, (error) => {
  			console.error('error: ' + JSON.stringify(error));
  		});
  	}
	
  },
  didPressChooesImage:function () {
	var _this = this
	util.initQiniu();
  	// 微信 API 选文件
  	wx.chooseImage({
  			count: 9,
  			success: function(res) {
  				var filePath = [];
  				for(var i = 0; i < res.tempFilePaths.length; i++) {
  					filePath[i] = res.tempFilePaths[i];
  				}
  				_this.setData({
  					filePath: filePath,
  					fileList: res
  				})
  				_this.startUpload()
  				//    	for(var i=0;i<res.tempFilePaths.length;i++){
  				//    		var filePath = res.tempFilePaths[i];
  				//    		
  				//	        // 交给七牛上传
  				//	        qiniuUploader.upload(filePath, (res) => {
  				//	          that.setData({
  				//	            'imageObject': res
  				//	          });
  				//	        }, (error) => {
  				//	          console.error('error: ' + JSON.stringify(error));
  				//	        });
  				//    	}
  
  			}
  		}
  		// , {
  		//   region: 'ECN',
  		//   domain: 'balxqjka.btk.clouddn.com',
  		//   uptokenURL: 'myServer.cpm/api/uptoken'
  		// }
  	)
  },
  onReachBottom() {
  	var _this = this
  	if(_this.data.pageFlag){
  		_this.getImg();
  	}else{
  		wx.showToast({
              title: "没有更多了",
              icon: "loading",
              duration: 500
          }) 
  	}
  }
});
