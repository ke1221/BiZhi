var app = getApp()
var api = require('../../config/api.js');
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');
Page({
  data: {
  	inputTemp:'',
  	inputValue: '',
    returnValue: '',
    allContentList: [],
    num:0,
		intoView:''
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  submitTo:function(e){
    var _this = this
	var allContentList = _this.data.allContentList;
    allContentList.push({"value": _this.data.inputValue,"from":"user"})
    _this.setData({
      allContentList: allContentList,
	  inputTemp:''
    })
		util.request(api.aiChat,_this.data.inputValue,'POST').then(function(res) {
		  if (res.errno === 0) {
				allContentList.push({"value": res.data,"from":"ai"});
				_this.setData({
					allContentList:allContentList,
					intoView:'a'+allContentList.length
				})
				wx.setStorageSync('chatInfo', _this.data.allContentList);
		  }else{
				util.showErrorToast('发送失败');
			}
		});
  },
  onLoad: function(){
		var _this = this
		var chatInfo = wx.getStorageSync('chatInfo');
		if(chatInfo != ""){
			_this.setData({
				allContentList:chatInfo,
				intoView:'a'+chatInfo.length
			})
		}
		
     // 设置标题
		wx.setNavigationBarTitle({
			title: '智能陪聊',
			success:function(){
				
			},
			fail: function(){
				
			}
		})
  },
})