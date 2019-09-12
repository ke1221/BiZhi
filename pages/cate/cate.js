// pages/cate/cate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 热门搜索词
    hotList: [
      '一','两个','三个字','成吉思汗','这是五个字',
      '一','两个','三个字','成吉思汗','这是五个字',
    ],
    // 分类列表
    imgList: [
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3638429004,1717840478&fm=26&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3369374146,2273666090&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=551180330,2986440005&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1403936986,4231638334&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3930436285,1263327733&fm=26&gp=0.jpg'
    ],
    
  },
  // 跳转搜索页
  toSearch(e){
    let name = e.currentTarget.dataset.name || e.target.dataset.name;
    if(name){
      wx.navigateTo({
        url: '/pages/search/search?name=' + name,
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/search/search',
    });
  },
  // 跳转分类
  toCateDetail(e){
    let name = e.currentTarget.dataset.name || e.target.dataset.name;
    wx.navigateTo({
      url: '/pages/cateDetail/cateDetail?name=' + name,
    });
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})