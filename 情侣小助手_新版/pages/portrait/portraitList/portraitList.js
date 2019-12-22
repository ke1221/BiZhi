var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
  data: { 
    portraitList: [],
    catId:'',
	pageNum: 1,
	pageSize: 15,
	pageFlag:true
  }, 
  onLoad(option){
  	var _this = this
  	var catId = option.id
  	_this.setData({
  		catId:catId
  	})
  	_this.getPortrait()
  },
  onReachBottom() {
  	console.log("kkk")
  	var _this = this
  	if(_this.data.pageFlag){
  		_this.getPortrait()
  	}else{
  		wx.showToast({
              title: "没有更多了",
              icon: "loading",
              duration: 500
          }) 
  	}
  },
  getPortrait:function(){
	  var _this = this
	  wx.showLoading({
	    title: '加载中',
	  })
	  util.request(api.getPortraitList,{pageNum:_this.data.pageNum,pageSize:_this.data.pageSize,catId:_this.data.catId}).then(function(res) {
	  	setTimeout(function() {
	  	    wx.hideLoading();
	  	}, 300)
		if (res.errno === 0) {
	  		var portraitListNew = _this.data.portraitList.concat(res.data.list)
	  		_this.setData({
	  			portraitList:portraitListNew
	  		})
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
  imgYu:function(event){
    	var src = event.currentTarget.dataset.src;//获取data-src
    	var imgList = [src];//获取data-list
    	//console.log(imgList)
 		//图片预览
    	wx.previewImage({
     		current: src, // 当前显示图片的http链接
      		urls: imgList // 需要预览的图片http链接列表
      	})
    }
});