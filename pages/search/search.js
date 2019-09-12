// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图片数组
    imgList: [
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4201969313,4039276947&fm=26&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1758103302,1609341380&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=110390888,2435026330&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1895333631,275948965&fm=26&gp=0.jpg'
    ],
    // 未搜索
    list: [],
    // 是否有传指定值
    name: '',
  },
  // 搜索事件
  search(e){
    // 输入的值
    let val = e.detail.value;
    // 这里应该执行搜索
    this.setData({
      list: this.data.imgList
    })
  },
  // 跳转详情
  toPath(e){
    let id = e.currentTarget.id || e.target.id;
    wx.navigateTo({
      url: '/pages/imgDateil/detail?id=' + id,
    });
  },
  onLoad(e){
    let name = e.name || '';
    if(name){
      this.setData({
        name
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})