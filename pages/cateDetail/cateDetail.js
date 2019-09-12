// pages/cateDetail/cateDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图片数组
    imgList: [
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3985245024,4052706449&fm=26&gp=0.jpg',
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2452051823,219849646&fm=26&gp=0.jpg',
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=358839931,1836779078&fm=15&gp=0.jpg',
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2452051823,219849646&fm=26&gp=0.jpg',
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=358839931,1836779078&fm=15&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3985245024,4052706449&fm=26&gp=0.jpg',
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2452051823,219849646&fm=26&gp=0.jpg',
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=358839931,1836779078&fm=15&gp=0.jpg',
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2452051823,219849646&fm=26&gp=0.jpg',
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=358839931,1836779078&fm=15&gp=0.jpg',
    ]
  },
  onLoad(e){
    let name = e.name;
    wx.setNavigationBarTitle({
      title: name
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})