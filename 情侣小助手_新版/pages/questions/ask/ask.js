var app = getApp()
Page({
  data: { 
    showModalStatus: false 
  }, 
  onLoad(){
  	
  },
  onShow(){
  	
  },
  answerBtn:function(e){
  	var _this = this
  	if(_this.data.answerFlag == 'none'){
  		_this.setData({
	  		answerFlag:'block'
	  	})
  	}else{
  		_this.setData({
	  		answerFlag:'none'
	  	})
  	}
  	
  },
  pre:function(e){
  	var _this = this
  	var i = _this.data.i
  	if(_this.data.i<=0){
  		wx.showToast({
	    	title: '前面没有拉！',
	    	duration:500
	    })
  	}else{
  		_this.setData({
  			i:i-1,
  			answerFlag:'none'
  		})
  	}
  },
  next:function(e){
  	var _this = this
  	var i = _this.data.i
  	if(_this.data.i>=_this.data.riddles.length-1){
  		wx.showToast({
	    	title: '后面没有拉！',
	    	duration:500
	    })
  	}else{
  		_this.setData({
  			i:i+1,
  			answerFlag:'none'
  		})
  	}
  },
  pay:function(){
		var that = this
		wx.getStorage({
			key: 'openid',
			success: function(res) {
				wx.request({
					//这里是后台的处理方法，url是自定义的，直接换成你自己的后台处理方法即可，Wx_Pay这个方法在下面写的有
					//后台用的php做处理，java的可以参考方法，道理都是一样的
					url: url + 'Wx_Pay',
					data: {
						//用户的openid
						openid: res.data,
						fee: that.data.totalPrice, //支付金额
						details: that.data.goodsList[0].goods_name, //支付商品的名称
					},
					success: function(result) {
						if(result.data) {
							//out_trade_no=res.data['out_trade_no'];
							wx.requestPayment({
								timeStamp: result.data['timeStamp'],
								nonceStr: result.data['nonceStr'],
								package: result.data['package'],
								signType: 'MD5',
								paySign: result.data['paySign'],
								'success': function(successret) {
									console.log('支付成功');
									//获取支付用户的信息
									wx.getStorage({
										key: 'userInfo',
										success: function(getuser) {
											//加入订单表做记录
											wx.request({
												url: url + 'Wx_AddOrder',
												data: {
													uname: getuser.data.nickName,
													goods: that.data.goodsList[0].goods_name,
													price: that.data.totalPrice,
													openid: res.data,
												},
												success: function(lastreturn) {
													console.log("存取成功");
												}
											})
										},
									})
								},
								'fail': function(res) {}
							})
						}
					}
				})
			},
		})
	},
	bindPickerChange:function(e){
	    this.setData({
	      i:Number (e.detail.value)
	  })
	}
})

