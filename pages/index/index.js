//获取应用实例
const app = getApp()

Page({
  data: {
    // banner
    banners: [
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=141805336,1095348939&fm=26&gp=0.jpg'
    ],
    // 最新专题
    items: [
      'http://img0.imgtn.bdimg.com/it/u=1960221205,1965281057&fm=26&gp=0.jpg',
      'http://img5.imgtn.bdimg.com/it/u=509910466,3412253569&fm=26&gp=0.jpg',
      'http://img3.imgtn.bdimg.com/it/u=696748186,1937455013&fm=26&gp=0.jpg',
    ],
    // 热门专题
    hots: [
      'http://img2.imgtn.bdimg.com/it/u=178023479,27614907&fm=26&gp=0.jpg',
      'http://img1.imgtn.bdimg.com/it/u=1520694087,525315406&fm=26&gp=0.jpg',
      'http://img5.imgtn.bdimg.com/it/u=3552174002,4189658071&fm=26&gp=0.jpg'
    ],
    // 元素滚动高度
    isFixd: false,
    // 滚动距离
    top: 0,
    // 最新精选图片数组
    imgList: [
      'http://img5.imgtn.bdimg.com/it/u=2073472624,2771038811&fm=26&gp=0.jpg',
      'http://img1.imgtn.bdimg.com/it/u=1022587504,2020707693&fm=26&gp=0.jpg',
      'http://img4.imgtn.bdimg.com/it/u=2109312336,9657286&fm=26&gp=0.jpg',
      'http://img3.imgtn.bdimg.com/it/u=2855626285,4263060342&fm=26&gp=0.jpg',
      'http://img3.imgtn.bdimg.com/it/u=232541656,584448353&fm=26&gp=0.jpg',
      'http://img4.imgtn.bdimg.com/it/u=3990154756,418045714&fm=26&gp=0.jpg',
    ],
    // nav 选中
    nav: 0,
  },
  // 设置导航
  setNav(e){
    // 0 精选 1 最新
    let id = e.currentTarget.dataset.id || e.target.dataset.id;
    this.setData({
      nav: id
    })
  },
  // 跳转详情
  toPath(e){
    let id = e.currentTarget.id || e.target.id;
    wx.navigateTo({
      url: '/pages/imgDateil/detail?id=' + id,
    });
  },
  // 跳转分类
  toCateDetail(e){
    let name = e.currentTarget.dataset.name || e.target.dataset.name;
    wx.navigateTo({
      url: '/pages/cateDetail/cateDetail?name=' + name,
    });
  },
  // 跳转专题页面
  toHotList(){
    wx.navigateTo({
      url: '/pages/hot/hot',
    });
  },
  // 监听页面滚动
  onPageScroll(e) {
    // 页面滚动距离
    let top = e.scrollTop;
    if(top >= this.data.top){
      this.setData({isFixd:true})
    }else{
      this.setData({isFixd:false})
    }
  },
  onReady() {
    let query = wx.createSelectorQuery();
    //获取元素1距离页面顶部高度
    query.select('#scroll').boundingClientRect(res => { 
      this.setData({
        top: res.top
      })
    }).exec()
  }
})
