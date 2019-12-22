// pages/imgDateil/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图片详情
    src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2987970389,635181890&fm=26&gp=0.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    // 上个页面传递过来的具体 id
    let id = e.id;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})