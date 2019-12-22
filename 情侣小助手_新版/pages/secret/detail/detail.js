var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
Page({ 
  data: { 
    secret:{}
  }, 
  onLoad(opt){
	  var _this = this
	  _this.setData({
	  	id:opt.id
	  })
  },
	onEditorReady() {
		var _this = this
		util.request(api.getSecret,{id:_this.data.id}).then(function(data) {
		  if (data.errno === 0) {
					_this.setData({
						secret:data.data
					})
					wx.createSelectorQuery().select('#editor').context(function (res) {
						_this.editorCtx = res.context
						_this.editorCtx.setContents({
							html:data.data.content
						})
					}).exec()
		  }
		});
	}, 
	onStatusChange(e) {
	  const formats = e.detail
	  this.setData({ formats })
	},
  del:function(event){
    	var _this = this
    	wx.showModal({
		  title: '要删除嘛？',
		  cancelText:"不删了",
		  confirmText:"删了吧",
		  success: function(res) {
		    if (res.confirm) {
		      	var secretId = event.currentTarget.dataset.id;//获取data-id
				util.request(api.delSecret,{id:secretId},'POST').then(function(res) {
				  if (res.errno === 0) {
					util.showSuccessToast(res.errmsg)
					setTimeout(function(){
						wx.navigateBack({
							delta:1
						})
					},500)
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
	 pageJump: function(a) {
		var t = a.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	}
})