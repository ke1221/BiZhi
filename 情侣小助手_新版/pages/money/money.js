var app = getApp()
Page({ 
  data: { 
    about:''
  }, 
  onLoad:function(){
    var _this = this
    app.promiseGet(app.globalData.URL+'/general/getAbout?tyope=zhushou',_this).then((res)=>{
      _this.setData({
        about:res.data
      })
    })
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
   
})