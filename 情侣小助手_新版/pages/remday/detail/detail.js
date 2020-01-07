var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
Page({
    data: {
        cnvshow: !1,
		oid:0,
		dayname:'',
		content:'',
		dayDesc:'第',
		backImg:'https://img.yuzktyu.top/list/1577341522869179027.jpg',
		type:1,
    },
    onLoad: function(t) {
		var _this = this
		_this.setData({
			oid:t.oid
		})
		_this.getRemdayDetail()
    },
    onShow: function() {
		
    },
	getRemdayDetail:function(){
		var _this = this
		util.request(api.getRemdayDetail,{oid:_this.data.oid}).then(function(res) {
			if (res.errno === 0) {
				var dateNow = new Date((new Date()).toLocaleDateString())
				var dateOld = new Date(res.data.date)
				var total = Math.round((dateNow.getTime() - dateOld.getTime()) / (1000 * 60 * 60 * 24))
				var dayDesc = '第'
				if(total<0){
					total = -total
					dayDesc = '还有'
				}
				_this.setData({
					oid:_this.data.oid,
					dayname:res.data.dayname,
					date:res.data.date,
					content:res.data.content,
					total:total,
					dayDesc:dayDesc,
					backImg:res.data.backImg,
					type:res.data.type,
				})
			}
		})
	},
    edit: function() {
        wx.navigateTo({
            url: "/pages/remday/edit/edit?oid=" + this.data.oid
        });
    },
	setRemdayBackImg: function(type,backImg) {
		var _this = this
		
		if(type == 0){
			_this.setData({
				backImg:backImg
			})
			return;
		}
		if(type == 1){
			util.request(api.updateRemday, {
				oid: _this.data.oid,
				backImg:backImg
			}, 'GET').then(function(res) {
				if (res.errno === 0) {
					util.showSuccessToast("设置成功")
					_this.setData({
						backImg:backImg
					})
				} else {
					util.showErrorToast('设置失败');
				}
			});
		}
	},
    getBgimg: function() {
        var t, a = this;
        a.setData({
            picCanvasSty: "width:760px;height:1100px;"
        }), wx.showLoading({
            title: "正在生成海报",
            mask: !0
        }), a.setData({
            cnvshow: !0
        }), a.hidelist(), wx.getImageInfo({
            src: "https://img.yuzktyu.top/imgLibrary/1577175052080008070.png",
            success: function(e) {
				console.log(e)
                t = e.path
				a.makePicture(t);
            },
            fail: function(e) {
                console.log("接口访问失败", e), t = "/image/bgimage/card.jpg", a.makePicture(t);
            }
        });
    },
    makePicture: function(e) {
        this.drawPic("https://img.yuzktyu.top/imgLibrary/1577175052080008070.png", e);
    },
    drawPic: function(e, t) {
        var a = this
		var ctx = wx.createCanvasContext("canvas_pic");
        ctx.drawImage(t,0, 0, 1080, 1920,0, 0, 1080, 1920)
        ctx.draw(true)
		// var s = "title";
  //       var o = "2019";
		// var n = "年";
  //       var d= "ff";
  //       i.rect(0, 0, 760, 1100), 
		// i.setFillStyle("white"), 
		// i.fill(), i.draw(!0),
		// i.setFillStyle("white"), 
  //       i.setShadow(0, 2, 8, "#aaaaaa"),
		// i.fillRect(30, 40, 690, 900), 
		// i.draw(!0), 
		// i.setShadow(0, 0, 0, "white"), 
        // i.drawImage(t, 30, 40, 690, 900), 
		// i.rect(30, 40, 690, 900), 
		// i.setFillStyle("black"), 
  //       i.setGlobalAlpha(.2), 
		// i.fill(), 
		// i.setGlobalAlpha(1), 
		// i.setFillStyle("white"), 
		// i.setFontSize(54), 
  //       i.setTextAlign("center"),
		// i.fillText(s, 375, 178), 
		// i.setFillStyle("white"),
		// i.setFontSize(85), 
  //       i.setTextAlign("center"), 
		// i.fillText(n, 375, 500), 
		// i.setFillStyle("white"), 
		// i.setFontSize(30), 
  //       i.setTextAlign("center"), 
		// i.fillText(d, 375, 850), 
		// i.setFillStyle("#000000"), 
		// i.setFontSize(27), 
  //       i.setTextAlign("right"), 
		// i.fillText("纪念日助手", 600, 990), 
		// i.setFillStyle("#000000"), 
  //       i.setFontSize(25), 
		// i.setTextAlign("right"), 
		// i.fillText("记录岁月记录爱", 600, 1025), 
		// i.drawImage(e, 630, 960, 100, 100), 
        setTimeout(function() {
            // a.saveImg();
			wx.canvasToTempFilePath({
				canvasId: 'canvas_pic',
				success: function(res) {
					wx.saveImageToPhotosAlbum({
						filePath:res.tempFilePath,
						success(re) { 
							console.log(re)
						}
					})
				},
				fail: function(error) {
				}
			})
        }, 90);
    },
    saveImg: function() {
        var e = this;
        wx.canvasToTempFilePath({
            canvasId: "canvas_pic",
            success: function(t) {
                var a = t.tempFilePath;
                wx.previewImage({
                    current: a,
                    urls: [ a ]
                }), e.setData({
                    cnvshow: !1
                }), wx.hideLoading(), wx.saveImageToPhotosAlbum({
                    filePath: a,
                    success: function(e) {
                        wx.hideLoading(), wx.showToast({
                            title: "已保存到相册",
                            icon: "success",
                            duration: 1500
                        });
                    },
                    fail: function() {
                        wx.hideLoading(), wx.getSetting({
                            success: function(e) {
                                e.authSetting["scope.writePhotosAlbum"] ? wx.showToast({
                                    icon: "loading",
                                    title: "海报生成失败请重试",
                                    duration: 1200
                                }) : wx.showModal({
                                    title: "请求访问手机相册",
                                    content: "",
                                    confirmText: "去开启",
                                    confirmColor: "#ef4244",
                                    success: function(e) {
                                        e.confirm && wx.openSetting({});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    dateAction: function(t) {
		var _this = this;
		var n;
		if(_this.data.type == 1){
			n = [ "更换背景图", "编辑" ];
		}else{
			n = [ "更换背景图", "编辑", "删除" ];
		}
		wx.showActionSheet({
			itemList: n,
			success: function(t) {
				switch (t.tapIndex) {
				  case 0:
					wx.navigateTo({
						url: '/pages/backImgs/remdayImg/list'
					});
					break;
				  case 1:
					_this.edit();
					break;
				  case 2:
					_this.btnDelet();
					break;
				  default:
					console.log("操作越界：", t);
				}
			},
			fail: function(e) {
				console.log("操作失败", e.errMsg);
			}
		});
    },
    btnDelet: function() {
        var _this = this;
        wx.showModal({
            title: "确定删除?",
            content: "时光一逝永不回",
            confirmColor: "#ef4244",
            success: function(a) {
                a.confirm ? (_this.setData({
                    deloading: !0
                }), 
				util.request(api.delRemday,{oid:_this.data.oid},'GET').then(function(res) {
					  if (res.errno === 0) {
						util.showSuccessToast(res.errmsg)
						setTimeout(function(){
							wx.navigateBack({
								delta:1
							})
							_this.getPrevData();
						},500)
					  }else{
						 util.showErrorToast(res.errmsg);
					  }
					})) : a.cancel;
            }
        });
    },
	// 从index页面获取纪念日数据
	getPrevData:function(){
		var pages = getCurrentPages()
		var prevPage = pages[pages.length-2]
		prevPage.reLoad()
	},
});