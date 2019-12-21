var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
var constellations = require("../../../data/constellations.js")
Page({ 
  data: { 
    constellation:[],
    constellationLis:[],
    astroid:'',
    buttons:[{"id":0,"value":"今天"},{"id":1,"value":"明天"},{"id":2,"value":"本周"},{"id":3,"value":"本月"},{"id":"4","value":"本年"}],
    today:{},
    tomorrow:{},
    week:{},
    
    seldate:[true,false,false,false,false]
  }, 
  onLoad(opt){
    var _this = this
    _this.setData({
      constellationList:constellations.default,
      astroid:opt.astroid-1
    })
		
		util.request(api.getConstellation,{id:opt.astroid}).then(function(res) {
		  if (res.errno === 0) {
				var data = JSON.parse(res.data.content);
				console.log(data)
				var today = _this.get5star(data.showapi_res_body.day)
				var tomorrow = _this.get5star(data.showapi_res_body.tomorrow)
				var week = _this.get5star(data.showapi_res_body.week)
				var month = _this.get5star(data.showapi_res_body.month)
				_this.setData({
					constellation:data.showapi_res_body,
					today:today,
					tomorrow:tomorrow,
					week:week,
					month:month
				})
		  }
		});
//     app.promiseGet(app.globalData.URL+'/play/getFortune?constellationid='+opt.astroid,_this).then((res)=>{
//       if(res.data.result != 'fail'){
//         var today = _this.get5star(res.data.showapi_res_body.day)
//         var tomorrow = _this.get5star(res.data.showapi_res_body.tomorrow)
//         var week = _this.get5star(res.data.showapi_res_body.week)
//         var month = _this.get5star(res.data.showapi_res_body.month)
//         _this.setData({
//           constellation:res.data.showapi_res_body,
//           today:today,
//           tomorrow:tomorrow,
//           week:week,
//           month:month
//         })
//       }
// 
//     })
  },
  select_c:function(e){
    var seldate=[false,false,false,false,false]
    seldate[e.currentTarget.dataset.id] = true
    this.setData({
      seldate:seldate
    })
  },
   get5star:function(result){
     var date = {"summary":[],"love":[],"money":[],"career":[],"health":[]}
    for (var i =0; i < 5; i++) {
        if(i<result.summary_star){
          date.summary.push(true)
        }else{
          date.summary.push(false)
        }
        if(i<result.love_star){
          date.love.push(true)
        }else{
          date.love.push(false)
        }
        if(i<result.money_star){
          date.money.push(true)
        }else{
          date.money.push(false)
        }
        if(i<result.work_star){
          date.career.push(true)
        }else{
          date.career.push(false)
        }               
      }
      return date
   }
})