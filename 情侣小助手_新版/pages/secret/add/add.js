var app = getApp()
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var qiniuUploader = require("../../../utils/qiniuUploader");
Page({
  data: {
    formats: {},
    bottom: 0,
		name:"",
    readOnly: false,
    placeholder: '开始输入...',
    _focus: false,
  },
	inputName:function(e){
		this.setData({
			name:e.detail.value
		})
	},
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {
    wx.loadFontFace({
      family: 'Pacifico',
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success: console.log
    })
  },
  onEditorReady() {
    const _this = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      _this.editorCtx = res.context
    }).exec()
  },

  undo() {
    this.editorCtx.undo()
  },
  redo() {
    this.editorCtx.redo()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const _this = this
		util.initQiniu();
    wx.chooseImage({
      count: 1,
      success: function (res) {
				qiniuUploader.upload(res.tempFilePaths[0], (res) => {
							 console.log(res)
							 _this.editorCtx.insertImage({
							   src: res.imageURL,
							   data: {
							     id: 'abcd',
							     role: 'god'
							   },
							   success: function () {
							     console.log('insert image success')
							   }
							 })
							
						}, (error) => {
							console.error('error: ' + JSON.stringify(error));
						});
      }
    })
  },
  save(){
		var _this = this;
		if(_this.data.name==""){
			wx.showToast({
					title: '请输入名称',
			})
			return 
		}
		_this.editorCtx.getContents({
			success: function (res) {
				util.request(api.addSecret,{content:res.html,name:_this.data.name},'POST').then(function(res) {
					if (res.errno === 0) {
					util.showSuccessToast(res.errmsg)
					setTimeout(function(){
						wx.navigateBack({
							delta:1
						})
						var pages = getCurrentPages()
						var prevPage = pages[pages.length-2]
						prevPage.reLoad();
					},500)
					}else{
					 util.showErrorToast(res.errmsg);
					}
				});
			}
		});
  }
})
