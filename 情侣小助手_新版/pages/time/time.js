//index.js
//获取应用实例
Page({
  data: {
  	cities:[['北京','温哥华','巴黎','伊斯坦布尔','莫斯科','东京','纽约'],
  						[8,  -7,    1,        2,      3,    9,   -5]],
  	myCityindex:1,
  	youCityindex:1,
  	myTimeZone:8,    // 我的时区
  	youTimeZone:-7,  // 你的时区
  	localTime:'',   // 当地时间
  	targetTime:'',  // 目标地时间
  	weeks:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
  	// 当地年月日时分秒 星期
    localYear:'',
    localMonth:'',
    localDate:'',
    localHours:'',
    localMinutes:'',
    localseconds:'',
    localDay:'',
    // 目标地年月日时分秒 星期
    targetYear:'',
    targetMonth:'',
    targetDate:'',
    targetHours:'',
    targetMinutes:'',
    targetseconds:'',
    targetDay:''
  },

  onLoad: function () {
  	this.init();
  	var timer = setInterval(this.setTime,500)
  },
  init:function(){
  	var nowDate = new Date
  	for(var i=0;i<this.data.cities.length;i++){
  		//console.log(-nowDate.getTimezoneOffset()/60 == this.data.cities[1][i])
  		if(-nowDate.getTimezoneOffset()/60 == this.data.cities[1][i]){
  			this.setData({
  				myCityindex:i,
  				myTimeZone:this.data.cities[1][i]
  			})
  		}
  	}
  	
  },
  setTime:function(){
  	// 获取现在时间
		var nowDate = new Date
		// 标准时间的毫秒数
		// localTime.getTimezoneOffset() 获取当地时间与标准时间的差  单位分钟
  	var utcTime = nowDate.getTime() + nowDate.getTimezoneOffset()*60*1000
  	//
  	// 根据时区算出当地时间 
  	var localTime = new Date(utcTime + this.data.myTimeZone*60*60*1000)
  	// 目标地时间
  	var targetTime = new Date(utcTime + this.data.youTimeZone*60*60*1000)
  	//console.log(localTime.getSeconds())
  	this.setData({
  		localYear:localTime.getFullYear(),
		  localMonth:localTime.getMonth()+1,
		  localDate:localTime.getDate(),
	    localHours:localTime.getHours(),
	    localMinutes:(localTime.getMinutes()<10?'0'+localTime.getMinutes():localTime.getMinutes()),
	    localseconds:(localTime.getSeconds()<10?'0'+localTime.getSeconds():localTime.getSeconds()),
	    localDay:this.data.weeks[localTime.getDay()],
	    // 目标地年月日时分秒 星期
	    targetYear:targetTime.getFullYear(),
	    targetMonth:targetTime.getMonth()+1,
	    targetDate:targetTime.getDate(),
	    targetHours:targetTime.getHours(),
	    targetMinutes:(targetTime.getMinutes()<10?'0'+targetTime.getMinutes():targetTime.getMinutes()),
	    targetseconds:(targetTime.getSeconds()<10?'0'+targetTime.getSeconds():targetTime.getSeconds()),
	    targetDay:this.data.weeks[targetTime.getDay()]
	    
  	})
  },
  myCityChange: function(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      myCityindex: e.detail.value,
      myTimeZone:this.data.cities[1][e.detail.value]
    })
  },
  youCityChange: function(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      youCityindex: e.detail.value,
      youTimeZone:this.data.cities[1][e.detail.value]
    })
  },
})
