getApp();

Component({
    properties: {
        num: {
            type: Number,
            value: 1
        },
        hideNum: {
            type: Number,
            value: 0
        },
        author: {
            type: Boolean,
            value: !1
        },
        themeColor: {
            type: String,
            value: "red"
        },
        type: {
            type: String,
            value: ""
        },
        msg: {
            type: String,
            value: ""
        },
        hasMore: {
            type: Boolean,
            value: !0
        }
    },
    data: {},
    ready: function() {},
    methods: {}
});