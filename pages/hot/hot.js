// pages/hot/hot.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 专题列表
    list: [
      1,2,3
    ]
  },
  // 跳转专题详情
  toHotDetail(e){
    // 获取id
    let id = e.currentTarget.dataset.id || e.target.dataset.id;
    wx.navigateTo({
      url: '/pages/hotDetail/hotDetail',
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})