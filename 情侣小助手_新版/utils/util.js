var api = require('../config/api.js');
var app = getApp();

function formatTime(date) {
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()

	var hour = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds()


	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatDate(d, format) {
	var date = new Date(d || new Date()),
		ymd = [
			digit(date.getFullYear(), 4), digit(date.getMonth() + 1), digit(date.getDate())
		],
		hms = [
			digit(date.getHours()), digit(date.getMinutes()), digit(date.getSeconds())
		];

	format = format || 'yyyy-MM-dd HH:mm:ss';

	return format.replace(/yyyy/g, ymd[0])
		.replace(/MM/g, ymd[1])
		.replace(/dd/g, ymd[2])
		.replace(/HH/g, hms[0])
		.replace(/mm/g, hms[1])
		.replace(/ss/g, hms[2]);
};

//数字前置补零
function digit(num, length, end) {
	var str = '';
	num = String(num);
	length = length || 2;
	for (var i = num.length; i < length; i++) {
		str += '0';
	}
	return num < Math.pow(10, length) ? str + (num | 0) : num;
};

function formatNumber(n) {
	n = n.toString()
	return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
	return new Promise(function(resolve, reject) {
		wx.request({
			url: url,
			data: data,
			method: method,
			header: {
				'Content-Type': 'application/json',
				'X-Lover-Token': wx.getStorageSync('token')
			},
			success: function(res) {

				if (res.statusCode == 200) {

					if (res.data.errno == 501) {
						// 清除登录相关内容
						try {
							wx.removeStorageSync('userInfo');
							wx.removeStorageSync('token');
						} catch (e) {
							// Do something when catch error
						}
						// 切换到登录页面
						wx.navigateTo({
							url: '/pages/login/index'
						});
					} else {
						resolve(res.data);
					}
				} else {
					reject(res.errMsg);
				}

			},
			fail: function(err) {
				reject(err)
			}
		})
	});
}

function redirect(url) {

	//判断页面是否需要登录
	if (false) {
		wx.redirectTo({
			url: '/pages/auth/login/login'
		});
		return false;
	} else {
		wx.redirectTo({
			url: url
		});
	}
}

function showErrorToast(msg) {
	wx.showToast({
		title: msg,
		image: '/static/icon/icon_error.png'
	})
}

function showSuccessToast(msg) {
	wx.showToast({
		title: msg,
		icon: 'success',
	})
}

function getRandomchar(n) {

	var strArr = ['a', 'b', 'c', 'd', 'e', 'f',
		'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
		't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
		'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
		'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
	];
	var redomString = '';
	var count = strArr.length;
	for (var i = 0; i < n; i++) {
		var index = parseInt(Math.random() * count);
		redomString += strArr[index];
	}
	return redomString
}
module.exports = {
	formatTime,
	request,
	redirect,
	showErrorToast,
	showSuccessToast,
	getRandomchar,
	formatDate
}
