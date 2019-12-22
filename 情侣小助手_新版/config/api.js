// 以下是业务服务器API地址
// 本机开发时使用
var WxApiRoot = 'http://localhost:9090/';
// 局域网测试使用
//var WxApiRoot = 'http://192.168.1.105:8088/lovers-wx/';
// 云平台部署时使用
// var WxApiRoot = 'http://118.24.0.153:8080/wx/';
// 云平台上线时使用
// var WxApiRoot = 'https://mp.yuzkyut.top/';

module.exports = {
	AuthLoginByWeixin: WxApiRoot + 'loginByWx', //微信登录
	authLoginByCode:  WxApiRoot + 'loginByCode', //微信登录
	getQiniuUptoken: WxApiRoot + 'getUptoken', //七牛上传token
	indexImgList: WxApiRoot + 'image/getImg', //首页图片

	getLoverInfo: WxApiRoot + 'user/queryLoverInfo', //获取情侣信息
	addLover: WxApiRoot + 'user/addLover', //添加情侣
	removeLover: WxApiRoot + 'user/removeLover', //删除情侣

	addRemday: WxApiRoot + 'remday/insertRemday', //添加纪念日
	getRemdayList: WxApiRoot + 'remday/queryRemdayList', //查询纪念日列表
	getRemdayDetail: WxApiRoot + 'remday/queryRemdayDetail', //查询纪念日详情
	updateRemday: WxApiRoot + 'remday/updateRemday', //更新
	delRemday: WxApiRoot + 'remday/updateRemdayDelete', //删除

	getAlbumList: WxApiRoot + 'album/queryAlbumList', //查询相册列表
	getPhotoLoverList: WxApiRoot + 'photo/queryPhotoLoverList', //查询图片列表  按日期查所有
	queryAlbumDetail: WxApiRoot + 'album/queryAlbumDetail', //查询相册详细信息
	addAlbum: WxApiRoot + 'album/insertAlbum', //新增相册
	delAlbum: WxApiRoot + 'album/updateAlbumDelete', //删除相册
	getPhotoList: WxApiRoot + 'photo/queryPhotoList', //获取图片列表
	delPhoto: WxApiRoot + 'photo/updatePhotoDelete', //删除图片
	addPhoto: WxApiRoot + 'photo/insertPhoto', //删除图片

	// aiChat: WxApiRoot + 'chat/chat', //机器人聊天
	aiChat: WxApiRoot + 'chat/chatAi', //机器人聊天

	getPortraitCatList: WxApiRoot + 'portrait/queryPortraitCatList', //获取头像列表
	getPortraitList: WxApiRoot + 'portrait/queryPortraitList', //获取头像

	getRiddleCatList: WxApiRoot + 'riddle/queryRiddleCatList', //获取脑筋急转弯分组
	getRiddleList: WxApiRoot + 'riddle/queryRiddleNoPageList', //获取脑筋急转弯

	getSecretList: WxApiRoot + 'secret/querySecretList', //查询小秘密列表
	addSecret: WxApiRoot + 'secret/insertSecret', //添加小秘密
	getSecret: WxApiRoot + 'secret/querySecretDetail', //查询小秘密详情
	delSecret: WxApiRoot + 'secret/updateSecretDelete', //删除小秘密
	updateSecret: WxApiRoot + 'secret/updateSecret', //更新小秘密

	getPassWordList: WxApiRoot + 'password/queryPasswordManageList', //查询密码列表
	addPassWord: WxApiRoot + 'password/insertPasswordManage', //添加密码
	getPassWord: WxApiRoot + 'password/queryPasswordManageDetail', //获取密码详情
	updatePassWord: WxApiRoot + 'password/updatePasswordManage', //更新密码详情
	delPassWord: WxApiRoot + 'password/deletePasswordManage', //删除密码详情

	getQuestions: WxApiRoot + 'questions/getQuestionsRandom', //获取10个问题
	addAsk: WxApiRoot + 'questions/saveAsk', //第一个人回答的   问题组
	getUserRecord: WxApiRoot + 'questions/getUserRecord', //我的出题
	getUserSetQsList: WxApiRoot + 'questions/getUserSetQsList', //我的出题详情
	getAnswerRecord: WxApiRoot + 'questions/getAnswerRecord', //我的回答列表
	getAnswerItem: WxApiRoot + 'questions/getAnswerItem', //我的回答详情
	saveLoverAnswer: WxApiRoot + 'questions/saveLoverAnswer', //更新我的回答

	getConstellation: WxApiRoot + 'Constellation/queryConstellationJsonDetail', //获取星座

	AuthBindPhone: WxApiRoot + 'auth/bindPhone', //绑定微信手机号

	StorageUpload: WxApiRoot + 'storage/upload', //图片上传,

	getEarthyWordsToDay: WxApiRoot + 'earthyWords/queryEarthyWordsToDay', //今天土味情话,
	getEarthyWordsDetail: WxApiRoot + 'earthyWords/queryEarthyWordsDetail', //根据id获取土味情话
	getEarthyWordsList: WxApiRoot + 'earthyWords/queryEarthyWordsList', //土味情话列表

	UserIndex: WxApiRoot + 'user/index', //个人页面用户相关信息
	IssueList: WxApiRoot + 'issue/list', //帮助信息
	publicKey_pkcs1: '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCR+f9M5i/qzefzUM4CKltliQTEV38KQN5zhG4RAQ16xBYOwlaZI7G7lXwhFfV+UcaKENujQc+FgT9dx4x7aK0w/fpiCg2bwxTsDIGQTtWP4ns1Y82gYIKaE/Q9k98L6RHhZXEbcC4C+WKINaeST58ceZJYf+HNna3MY7CKr1yBIQIDAQAB-----END PUBLIC KEY-----'

};
