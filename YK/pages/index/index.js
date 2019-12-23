//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    index: 0
  },

  onLoad: function () {
    

  },
  // 查看更多
  showMore(){
    console.log(this.data.index)
    this.setData({
      index: this.data.index == 0? 1 : 0
    })
  }
})
