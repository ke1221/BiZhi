var constellations = require("../../../data/constellations.js")
Page({ 
  data: { 
     constellationList:[]
  }, 
  onLoad(){
    var _this = this
    _this.setData({
    	constellationList:constellations.default
    })
  },
	pageJump: function(a) {
		var t = a.currentTarget.dataset;
		wx.navigateTo({
			url: t.url
		});
	}
})