
// that传页面的this;
// msg传消息体;
// type传字符串类型 success/warning/info/error 默认info;
// duration设置持续时间，默认4000ms，0代表永久;
// title设置标题，默认为提示
function globalNotify(that, msg, type, duration, title) {
    that.$notify({
        title: (title === undefined ? '提示' : title),
        position: 'bottom-right', // 右下角
        message: (msg === undefined ? '无' : msg),
        type: (type === undefined ? 'info' : type),
        duration: (duration === undefined ? 4000 : duration)
    });
}

export default globalNotify;
