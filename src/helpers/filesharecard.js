
function size(size){
    let ret = "";
    if (size < 1024) {
        ret = size + " Bytes";
    } else if (size < 1024 * 1024) {
        ret = (size / 1024).toFixed(2) + "Kb"
    } else if (size < 1024 * 1024 * 1024) {
        ret = (size / 1024 / 1024).toFixed(2) + "Mb"
    } else {
        ret = (size / 1024 / 1024 / 1024).toFixed(2) + "Gb"
    }
    return ret;
}

function render(fileInfo, shareInfo, share_id) {
    if (typeof(fileInfo) === 'undefined' || fileInfo === null) {
        return "[fileshare]" + share_id + "[/fileshare]";
    }

    if (typeof(shareInfo) === 'undefined' || shareInfo === null) {
        return "[fileshare]" + share_id + "[/fileshare]";
    }

    let ret = '<div class="xbbcode-flieshare-block" shareId="'+ shareInfo.attributes.id +'">';

    let name = fileInfo.attributes.name;
    // let parts = name.split('.');
    // let ext = '';
    // if (parts.length > 0) {
    //     ext = parts[parts.length - 1];
    // }
    // console.log(ext);

    ret += '<div class="xbbcode-flieshare-block-icon">';

    ret += '<svg t="1606812892435" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3272" width="200" height="200"><path d="M576.274286 0a128 128 0 0 1 90.514285 37.485714L876.8 247.515429a128 128 0 0 1 37.485714 90.514285V932.571429a91.428571 91.428571 0 0 1-91.428571 91.428571H201.142857a91.428571 91.428571 0 0 1-91.428571-91.428571V91.428571a91.428571 91.428571 0 0 1 91.428571-91.428571z m0 36.571429H201.142857a54.857143 54.857143 0 0 0-54.857143 54.857142v841.142858a54.857143 54.857143 0 0 0 54.857143 54.857142h621.714286a54.857143 54.857143 0 0 0 54.857143-54.857142V338.011429c0-2.962286-0.146286-5.924571-0.438857-8.868572H640a54.857143 54.857143 0 0 1-54.765714-51.638857L585.142857 274.285714V37.010286A91.446857 91.446857 0 0 0 576.292571 36.571429zM731.428571 676.571429a18.285714 18.285714 0 0 1 0 36.571428H310.857143a18.285714 18.285714 0 0 1 0-36.571428h420.571428z m-128-182.857143a18.285714 18.285714 0 0 1 0 36.571428H310.857143a18.285714 18.285714 0 0 1 0-36.571428h292.571428z m37.485715-430.372572A91.392 91.392 0 0 0 621.714286 48.676571V274.285714a18.285714 18.285714 0 0 0 16.146285 18.157715L640 292.571429h225.627429a91.392 91.392 0 0 0-14.683429-19.2z" p-id="3273"></path></svg>'

    ret += '</div>'


    ret += '<div class="xbbcode-flieshare-block-basic">';

    ret += '<div class="xbbcode-flieshare-block-filename">' + name + '</div>';

    ret += '<div class="xbbcode-flieshare-block-size">' + size(fileInfo.attributes.size) + '</div>';

    ret += '</div>';

    if (shareInfo.attributes.shared_type === 2 && shareInfo.attributes.paid === false) {
        ret += '<div class="xbbcode-flieshare-block-protected">' + '购买后下载文件' + '</div>'; 
    } else if (shareInfo.attributes.shared_type === 2 && shareInfo.attributes.paid === true) {
        ret += '<div class="xbbcode-flieshare-block-protected">' + '已购买可下载文件' + '</div>'; 
    } else if (shareInfo.attributes.shared_type === 1 && shareInfo.attributes.paid === false) {
        ret += '<div class="xbbcode-flieshare-block-protected">' + '密码保护分享' + '</div>';
    } else if (shareInfo.attributes.shared_type === 1 && shareInfo.attributes.paid === true) {
        ret += '<div class="xbbcode-flieshare-block-protected">' + '[可下载] 密码保护分享' + '</div>';
    }

    ret += '</div>';
    return  ret ;
}

export default render;
