var app = getApp()
var api = require('../../config/api.js');
var util = require('../../utils/util.js');
Page({ 
  data: { 
    showModalStatus: false ,
    img:''
  }, 
  onLoad: function(){
    var _this = this
		util.request(api.indexImgList,{imgName:"removeImg"}).then(function(res) {
			if (res.errno === 0) {
				var i = Math.floor(Math.random()*res.data.list.length)
				_this.setData({
					img:res.data.list[i]
				})
			}
		});
  },
  removeBtn:function(e){
    var _this = this
    wx.showModal({
        title: '确定要解除么',
        confirmText:'确定',
        cancelText:'算了',
        content: '',
        success: function(res) {
          if (res.confirm) {
			util.request(api.removeLover).then(function(res) {
			  if (res.errno === 0) {
					util.showSuccessToast("解绑成功")
					app.globalData.loverInfo = null;
					setTimeout(function(){
						wx.navigateBack({
							delta:1
						})
					},500)
			  }else{
				 util.showErrorToast('解绑失败');
				}
			});
          
          } else if (res.cancel) {
            
          }
        }
    })
  }
})