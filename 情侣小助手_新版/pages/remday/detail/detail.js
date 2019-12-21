var e, t, a, i, o = new Date(), n = getApp(), d = "", r = "记录岁月记录爱";
Page({
    data: {
        isLogin: !0,
        isSafe: n.globalData.isSafe,
        pageType: "detail",
        dateType: "",
        copyed: !1,
        day: {},
        yearshow: !1,
        newShare: "shareHid",
        memoryList: [],
        memoryLoading: !1,
        imgurl: n.globalData.imgurl,
        bgImgend: "?x-oss-process=image/resize,m_fill,h_900,w_690",
        lstImgend: "?x-oss-process=image/resize,m_fill,h_210,w_210",
        lstImgend1: "?x-oss-process=image/resize,m_lfit,h_470,w_470",
        more: !0,
        cardbg: "",
        dateCard: "date-card",
        cardTitle: "card-title",
        year: o.getFullYear(),
        cnvshow: !1
    },
    onLoad: function(t) {
        // var a = this;
        // getCurrentPages().length > 1 ? a.setData({
        //     backShow: !0
        // }) : a.setData({
        //     backShow: !1
        // });
        // var i = decodeURIComponent(t.scene);
        // i.length > 30 ? (e = i, this.setData({
        //     pageType: "share"
        // })) : (e = t.dateId, t.pageType && this.setData({
        //     pageType: t.pageType
        // }), "marry" != t.shareNew && "love" != t.shareNew || (this.setData({
        //     newShare: "newshareOn"
        // }), setTimeout(function() {
        //     a.setData({
        //         newShare: "shareHid"
        //     });
        // }, 1e4))), this.newMemorylst();
    },
    onShow: function() {
        // var e = this;
        // s.checkLogin(function() {
        //     e.setData({
        //         isLogin: !0
        //     });
        // }, function() {
        //     e.setData({
        //         isLogin: !1
        //     });
        // }), d = wx.getStorageSync("sessionKey"), this.requestData(), this.getUserInfobysk();
    },
    getUserInfobysk: function(e) {
        e = wx.getStorageSync("sessionKey"), wx.request({
            url: n.globalData.apiurl + "/getUserInfoBySessionKey",
            data: {
                sessionKey: e
            },
            header: {
                "content-type": "application/x-www-form-urlencoded",
                charset: "UTF-8"
            },
            success: function(e) {
                i = e.data.id;
            },
            fail: function(e) {}
        });
    },
    newMemorylst: function() {
        a = 1, this.requestMemory(e, a, 5);
    },
    onReachBottom: function() {
        this.data.memoryLoading || this.requestMemory(e, a, 5);
    },
    requestData: function() {
        var a = this;
        "" != e && "undefined" != e && null != e ? wx.request({
            url: n.globalData.apiurl + "/getMaDetailByDateId",
            data: {
                dateId: e
            },
            header: {},
            method: "GET",
            dataType: "json",
            success: function(e) {
                404 == e.data.status || "undefined" == e.data.status ? wx.showModal({
                    title: "事件已被删除",
                    content: "",
                    showCancel: !1,
                    confirmColor: "#ef4244",
                    success: function() {
                        wx.reLaunch({
                            url: "/pages/index/index"
                        });
                    }
                }) : (a.setData({
                    day: e.data.date,
                    dateType: e.data.date.dateType,
                    cardbg: e.data.date.dateBg
                }), Boolean(e.data.aUserImg) && Boolean(e.data.bUserImg) && a.setData({
                    aUserImg: e.data.aUserImg,
                    bUserImg: e.data.bUserImg
                }), "birthday" == e.data.date.dateType && (t = "生日"));
            },
            fail: function(e) {}
        }) : wx.showModal({
            title: "事件不存在",
            content: "",
            showCancel: !1,
            confirmColor: "#ef4244",
            success: function() {
                wx.reLaunch({
                    url: "/pages/index/index"
                });
            }
        }), this.getCopystate();
    },
    newStyle: function(e) {
        this.setData({
            dateCard: "date-card2",
            cardTitle: "card-title2"
        });
    },
    backstyle: function() {
        this.setData({
            cardbg: "",
            dateCard: "date-card",
            cardTitle: "card-title"
        });
    },
    tabNumber: function() {
        var e = this;
        e.setData({
            yearshow: !e.data.yearshow
        });
    },
    edit: function() {
        wx.navigateTo({
            url: "/pages/adday/adday?actionType=edit&dateId=" + e
        });
    },
    hidelist: function() {
        this.setData({
            newShare: "shareHid",
            ingTips: !1
        });
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
            src: n.globalData.apiurl + "/date/getDateImage?dateId=" + e,
            success: function(e) {
                t = e.path, a.makePicture(t);
            },
            fail: function(e) {
                console.log("接口访问失败", e), t = "/image/bgimage/card.jpg", a.makePicture(t);
            }
        });
    },
    makePicture: function(e) {
        this.drawPic("/image/bgimage/daysbox.jpeg", e);
    },
    drawPic: function(e, t) {
        var a = this, i = wx.createCanvasContext("canvas_pic", this);
        if ("birthday" == a.data.day.dateType) s = a.data.day.dateTitle + "生日"; else var s = a.data.day.dateTitle;
        var o = this.data.day.middYear;
        if (null != o && "" != o && void 0 != o && a.data.yearshow) {
            n = a.data.day.startYear + a.data.day.middYear + "年";
            a.data.day.middDay && (n = n + a.data.day.middDay + a.data.day.endYear);
        } else if (null != a.data.day.remark2 && "null" != a.data.day.remark2) n = a.data.day.remark + a.data.day.remark1 + a.data.day.remark2; else var n = a.data.day.remark + a.data.day.remark1;
        if (a.data.day.gc) d = a.data.day.remarko; else var d = a.data.day.lunarCh;
        i.rect(0, 0, 760, 1100), i.setFillStyle("white"), i.fill(), i.draw(!0), i.setFillStyle("white"), 
        i.setShadow(0, 2, 8, "#aaaaaa"), i.fillRect(30, 40, 690, 900), i.draw(!0), i.setShadow(0, 0, 0, "white"), 
        i.drawImage(t, 30, 40, 690, 900), i.rect(30, 40, 690, 900), i.setFillStyle("black"), 
        i.setGlobalAlpha(.2), i.fill(), i.setGlobalAlpha(1), i.setFillStyle("white"), i.setFontSize(54), 
        i.setTextAlign("center"), i.fillText(s, 375, 178), i.setFillStyle("white"), i.setFontSize(85), 
        i.setTextAlign("center"), i.fillText(n, 375, 500), i.setFillStyle("white"), i.setFontSize(30), 
        i.setTextAlign("center"), i.fillText(d, 375, 850), i.setFillStyle("#000000"), i.setFontSize(27), 
        i.setTextAlign("right"), i.fillText("纪念日助手", 600, 990), i.setFillStyle("#000000"), 
        i.setFontSize(25), i.setTextAlign("right"), i.fillText("记录岁月记录爱", 600, 1025), i.drawImage(e, 630, 960, 100, 100), 
        i.draw(!0), setTimeout(function() {
            a.saveImg();
        }, 90);
    },
    saveImg: function() {
        var e = this;
        wx.canvasToTempFilePath({
            destWidth: 760,
            destHeight: 1100,
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
    getInvite: function(e) {
        var t = this;
        wx.showLoading({
            title: "加入共享",
            icon: "none",
            mask: !0
        }), t.data.isLogin ? t.joinInvite() : "getUserInfo:ok" == e.detail.errMsg && s.login(function() {
            t.joinInvite();
        });
    },
    joinInvite: function() {
        if (this.data.day.userId == i) return wx.showModal({
            title: "自己无法共享",
            content: "早日找到有缘人哦",
            showCancel: !1,
            confirmText: "好的",
            confirmColor: "#ef4244"
        }), void wx.hideLoading();
        d = wx.getStorageSync("sessionKey"), console.log(e, "sk:", d), "" != e && d.length > 0 && wx.request({
            url: n.globalData.apiurl + "/updateShareDateList",
            method: "POST",
            data: {
                dateId: e,
                sessionKey: d
            },
            header: {
                "content-type": "application/x-www-form-urlencoded",
                charset: "UTF-8"
            },
            success: function(t) {
                wx.hideLoading(), console.log(t), t.data.success ? (wx.showToast({
                    title: "加入成功"
                }), wx.reLaunch({
                    url: "/pages/detail/detail?pageType=detail&dateId=" + e
                })) : wx.showToast({
                    title: t.data.messagae
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "加入失败,请重试"
                });
            }
        });
    },
    btnCopyin: function(e) {
        var t = this;
        t.data.isLogin ? (wx.showLoading({
            title: "保存",
            mask: !0
        }), t.copyin()) : "getUserInfo:ok" == e.detail.errMsg && (wx.showLoading({
            title: "保存",
            mask: !0
        }), s.login(function() {
            t.copyin();
        }));
    },
    getCopystate: function(t) {
        var a = this;
        "share" == this.data.pageType && wx.request({
            url: n.globalData.apiurl + "/isAttentionDate",
            data: {
                dateId: e,
                sessionKey: d
            },
            header: {
                "content-type": "application/x-www-form-urlencoded",
                charset: "UTF-8"
            },
            success: function(e) {
                e.data && (a.setData({
                    copyed: e.data.has
                }), e.data.has && "function" == typeof t ? wx.showToast({
                    title: "已保存"
                }) : "function" == typeof t && t());
            }
        });
    },
    dateAction: function(t) {
        if ("detail" == this.data.pageType) {
            var a = this, s = a.data.day;
            var n = [ "更换背景图", "生成海报", "编辑", "删除" ];
            wx.showActionSheet({
                itemList: n,
                success: function(t) {
                    switch (t.tapIndex) {
                      case 0:
                        wx.chooseImage({
                            count: 1,
                            sizeType: [ "compressed" ],
                            sourceType: [ "album" ],
                            success: function(t) {
                                var i = t.tempFilePaths[0];
                                a.upbgimg(e, i);
                            }
                        });
                        break;

                      case 1:
                        a.getBgimg();
                        break;

                      case 2:
                        a.edit();
                        break;

                      case 3:
                        Boolean(s.shareUserId) ? a.outGroup() : a.btnDelet(e);
                        break;

                      default:
                        console.log("操作越界：", t);
                    }
                },
                fail: function(e) {
                    console.log("操作失败", e.errMsg);
                }
            });
        }
    },
    btnDelet: function(e) {
        var t = this;
        wx.showModal({
            title: "确定删除?",
            content: "时光一逝永不回",
            confirmColor: "#ef4244",
            success: function(a) {
                a.confirm ? (t.setData({
                    deloading: !0
                }), wx.request({
                    url: n.globalData.apiurl + "/deleteDate",
                    data: {
                        sessionKey: n.globalData.sessionKey,
                        dateId: e
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        wx.reLaunch({
                            url: "/pages/index/index"
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "网络异常请重试",
                            icon: "loading"
                        });
                    }
                })) : a.cancel;
            }
        });
    },
    upbgimg: function(e, t) {
        var a = this;
        wx.showLoading({
            title: "上传图片",
            mask: !0
        }), wx.uploadFile({
            url: n.globalData.apiurl + "/updateDateBg",
            filePath: t,
            name: "image",
            formData: {
                dateId: e
            },
            success: function(e) {
                var t = JSON.parse(e.data);
                t.success && a.setData({
                    cardbg: t.imageUrl
                }), wx.hideLoading();
            }
        });
    },
    goUpnote: function() {
        wx.navigateTo({
            url: "/pages/upphoto/upphoto?dateId=" + e + "&&memType=photo"
        });
    },
    requestMemory: function(e, t, i) {
        var s = this;
        s.setData({
            memoryLoading: !0
        }), wx.request({
            url: n.globalData.apiurl + "/date/getDateHistoryInfo",
            data: {
                dateId: e,
                page: t,
                record: i
            },
            header: {},
            success: function(e) {
                e.data.list.length > 0 ? (1 == a ? s.setData({
                    memoryList: e.data.list
                }) : s.setData({
                    memoryList: s.data.memoryList.concat(e.data.list)
                }), a++) : s.setData({
                    more: !1
                }), s.setData({
                    memoryLoading: !1
                });
            },
            fail: function() {
                s.setData({
                    memoryLoading: !1
                });
            }
        });
    },
    showaction: function(e) {
        console.log(e);
        var t = e.target.id, a = this, i = e.target.dataset.index;
        wx.showActionSheet({
            itemList: [ "删除" ],
            success: function(e) {
                0 == e.tapIndex && "" != i && void 0 != i && a.deletMemory(i, t);
            }
        });
    },
    deletMemory: function(e, t) {
        var a = this;
        "" != e && wx.request({
            url: n.globalData.apiurl + "/date/deleteHis",
            data: {
                hisId: e
            },
            header: {},
            success: function(e) {
                e.data.success ? (a.data.memoryList.splice(t, 1), a.setData({
                    memoryList: a.data.memoryList
                })) : wx.showToast({
                    title: "删除失败请重试",
                    icon: "loading",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常请重试",
                    icon: "loading",
                    duration: 1e3
                });
            }
        });
    },
    bigPhotos: function(e) {
        for (var t = this, a = e.target.id, i = e.currentTarget.dataset.index, s = [], o = 0; o < t.data.memoryList[i].images.length; o++) s.push(t.data.imgurl + t.data.memoryList[i].images[o]);
        wx.previewImage({
            current: s[a],
            urls: s
        });
    },
    goHome: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    redMoney: function() {
        wx.navigateTo({
            url: "/pages/minigift/minigift?dateId=" + e
        });
    },
    onShareAppMessage: function(t) {
        if (console.log(t.target.id), "invite" == t.target.id) {
            r = "【共享邀请】跟我一起记录美好时光吧";
            a = "invite";
        } else {
            r = "";
            var a = "share";
        }
        return {
            title: r,
            path: "/pages/detail/detail?pageType=" + a + "&dateId=" + e + "&dateType=" + this.data.dateType
        };
    },
    nothing: function() {}
});