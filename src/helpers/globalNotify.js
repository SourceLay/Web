
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
    const errorTable = {
        '-100' : '操作失败',
        '-101' : '更新信息失败',
        '-102' : '获取信息失败',
        '-200' : '添加文件失败',
        '-201' : '取消分享文件失败',
        '-202' : '撤销取消分享文件失败',
        '-203' : '上传文件失败：存在同名文件',
        '-204' : '上传文件失败：前缀不符合格式',
        '-300' : '下载文件失败',
        '-301' : '下载文件超时',
        '-400' : '删除文件失败',
        '-401' : '删除普通文件失败',
        '-402' : '删除分享文件失败',
        '-500' : '点赞失败',
        '-501' : '点赞操作失败',
        '-502' : '点赞错误：点赞已存在',
        '-700' : '权限错误',
        '-701' : '权限错误：私密文件',
        '-702' : '权限错误：没有此文件权限',
        '-703' : '权限错误：不是此文件拥有者',
        '-704' : '权限错误：密码错误',
        '-705' : '权限错误：余额不足',
        '-800' : '违规操作',
        '-801' : '违规操作：存在不合理词汇'
    };
    return errorTable[code];
}

function globalErrorNotify(that, err, duration = 4500) {
    if (typeof(err) === "string") {
        globalNotify(that, err, 'error', duration, '错误');
        return;
    }

    if (!err.response) {
        console.log(err)
        return;
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

function globalSuccessNotify(that, content, duration = 4500) {
    globalNotify(that, content, 'info', duration, '提示');
}

export {globalNotify, globalSuccessNotify, globalErrorNotify}
