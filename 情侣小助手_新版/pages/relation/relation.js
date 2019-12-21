var app = getApp();

var relationship = require("../../utils/relationship.js");

Page({
    data: {
        second_height: 0,
        screenData: "我",
        result: "",
        id1: "丈夫",
        id2: "妻子",
        id3: "back",
        id4: "clean",
        id5: "爸爸",
        id6: "妈妈",
        id7: "哥哥",
        id8: "弟弟",
        id9: "姐姐",
        id10: "妹妹",
        id11: "儿子",
        id12: "女儿",
        id13: "each",
        id14: "=",
        id15: "?",
        isTrue: !1,
        sex: 1
    },
    onLoad: function(t) {
		
	},
    onShareAppMessage: function() {
		
	},
    switchChange: function(t) {
		if(t.detail.value){
			this.setData({
			    sex: 0
			})
		}else{
			this.setData({
			    sex: 1
			})
		}
    },
    clickButton: function(e) {
        var screenData = this.data.screenData;
		var result = this.data.result;
		var id = e.currentTarget.dataset.id;
        if (id == this.data.id3) {
            if ("我" == screenData) return;
            screenData = screenData.substring(0, screenData.length - 3);
            result = d = relationship({
                text: screenData,
                sex: this.data.sex,
                reverse: !1,
                type: "default"
            });
        } else if (id == this.data.id4){
			screenData = "我";
			result = ""; 
		} else {
            var screenData = screenData.substring(0, screenData.length)
			var d = relationship({
                text: screenData,
                sex: this.data.sex,
                reverse: !1,
                type: "default"
            });
            if (id == this.data.id14) {
                if (screenData.length >= 22) return void (result = "关系有点远，年长就叫老祖宗吧~");
                result = d;
            } else if (id == this.data.id13) {
                if (screenData.length >= 22) return void (result = "关系有点远，年长就叫老祖宗吧~");
				if(this.data.isTrue){
					d = relationship({
					    text: screenData,
					    sex: this.data.sex,
					    reverse: !1,
					    type: "default"
					})
					this.setData({
					    isTrue: !1
					})
				}else{
					d = relationship({
					    text: screenData,
					    sex: this.data.sex,
					    reverse: !0,
					    type: "default"
					})
					this.setData({
					    isTrue: !0
					})
				}
                result = d;
            } else {
				if(screenData.length >= 22){
					result = "关系有点远，年长就叫老祖宗~\n同龄人就叫帅哥美女吧"
				}else{
					1 == this.data.sex && id == this.data.id1 && "我" == screenData || 0 == this.data.sex && id == this.data.id2 && "我" == screenData || (d = relationship({
					    text: screenData = screenData + "的" + id,
					    sex: this.data.sex,
					    reverse: !1,
					    type: "default"
					}), this.isNull(d) && (d = "关系太复杂啦，人家算不出来嘛"), result = d);
				}
			}
        }
        this.setData({
            screenData: screenData,
            result: result
        });
    },
    isNull: function(t) {
        return 0 == t.length;
    }
});