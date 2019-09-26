// 以下是业务服务器API地址
// 本机开发时使用
var WxApiRoot = 'http://192.168.1.157:9090/';
// 局域网测试使用
//var WxApiRoot = 'http://192.168.1.105:8088/lovers-wx/';
// 云平台上线时使用
var WxApiRoot = 'https://paper.mp.yuzkyut.top/';

module.exports = {
  
  AuthLoginByWeixin: WxApiRoot + 'loginByWx', // 授权之后登录
	authLoginByCode:WxApiRoot + 'loginByCode', // 未授权登录
	queryIndexInfo:WxApiRoot + 'queryIndexInfo', // 首页信息
	
	queryCatList:WxApiRoot + 'queryWallpaperCatList', // 分类列表
	queryCatDetail:WxApiRoot + 'queryWallpaperCatDetail', // 分类详情
	
	queryTopicList:WxApiRoot + 'queryWallpaperTopicList', // 专题列表
	queryTopicDetail:WxApiRoot + 'queryWallpaperTopicDetail', // 专题详情
	queryPaperList:WxApiRoot + 'queryWallpaperList', // 壁纸列表
	queryWallpaperDetail:WxApiRoot + 'queryWallpaperJsonDetail', // 壁纸详情
	queryBasicDataList:WxApiRoot + 'queryBasicDataList', // 基础数据
	queryBannerList:WxApiRoot + 'queryBannerList', // banner
	
	likePaper:WxApiRoot + 'insertWallpaperLike', // 点赞
	unLikePaper:WxApiRoot + 'updateWallpaperLikeDelete', // 取消点赞
	
	collectPaper:WxApiRoot + 'insertWallpaperCollect', // 收藏
	unCollectPaper:WxApiRoot + 'updateWallpaperCollectDelete', // 取消收藏
	
	queryMyWallpaperList:WxApiRoot + 'queryMyWallpaperList', // 我的收藏
}