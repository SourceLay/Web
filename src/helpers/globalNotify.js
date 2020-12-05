
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

function translateError(code) {
    // TODO 将 code 翻译成人能看的字符串
    return code;
}

function globalErrorNotify(that, err, duration = 4500) {
    if (typeof(err) === "string") {
        globalNotify(that, err, 'error', duration, '错误');
    }

    if (!err.response) {
        console.log(err)
    }
    
    let data = err.response.data;
    console.log(data);
    if (!data.errors) {
        globalNotify(that, '发生了未知错误。', 'error', duration, '错误');
    }

    let errors = data.errors;
    for (let error of errors) {
        if (error.detail) {
            for (let detail of error.detail) {
                globalNotify(that, detail, 'error', duration, '错误');
            }
        } else {
            let detail = translateError(error.code);
            globalNotify(that, detail, 'error', duration, '错误');
        }
    }    
}

export {globalNotify, globalErrorNotify}
