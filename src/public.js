// 防抖
export function _debounce(fn, delay) {
  delay = delay || 200;
  var timer;
  return function() {
    var th = this;
    var args = arguments;
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      timer = null;
      fn.apply(th, args);
    }, delay);
  };
}
// 节流
export function _throttle(fn, interval) {
  var last;
  var timer;
  interval = interval || 200;
  return function() {
    var th = this;
    var args = arguments;
    var now = +new Date();
    if(last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        last = now;
        fn.apply(th, args);
      }, interval);
    }else{
      last = now;
      fn.apply(th, args);
    }
  }
}
//获取时间
export function getTime(time) {
  console.log('time')
  let second = new Date() - new Date(time)
  if(second < 1000 * 10){
    return '刚刚'
  }else if(second < (1000 * 60)){
    return new Date(time).getSeconds() + '秒前'
  }else if(second < (1000 * 60 * 60)){
    return Math.floor(second / (1000 * 60))  + '分钟前'
  }else if(second < (1000 * 60 * 60 * 24)){
    return Math.floor(second / (1000 * 60 * 60)) + '小时前'
  }else if(second < 2678400000){
    return Math.floor(second / (24 * 3600 * 1000)) + '天前'
  }else if(second < 31622400000){
    return new Date(time).getMonth() + '月前'
  }else{
    return new Date().getFullYear() - new Date(time).getFullYear() + '年前'
  }
}
//获取帖子是否为特殊Tag
export function getPostTag(id, title, star) {
  let tag = title.slice(0, 4)
  if(this.included['users.' + id].relationships.groups.data[0].id == 1 && ['[公告]', '[活动]', '[版规]'].includes(tag)){
    if(tag == '[公告]'){
      return 'tag-notice'
    }else if(tag == '[活动]'){
      return 'tag-activity'
    }else if(tag == '[版规]'){
      return 'tag-rule'
    }
  }else if(star){
    return 'tag-star'
  }else{
    return 'tag-default'
  }
}
//获取帖子标题
export function getPostTitle(title) {
  console.log('123')
  if(['[公告]', '[活动]', '[版规]'].includes(title.slice(0, 4))){
    return title.slice(4)
  }else{
    let s = title;
    let check_status = false;
    let check_str = '';
    let tags = [];
    let last_valid = 0;
    let i = 0;
    for (i = 0; i < s.length; i++) {
      let c = s[i];
      if (check_status) {
        check_str = check_str + c;
        if (c == ']') {
          if (!['[公告]', '[活动]', '[版规]'].includes(check_str)) {	// 这里可以判断一下 check_str 是否合法，如果
            tags.push(check_str);
            check_status = false;
            last_valid = i + 1;
          } else {
            break;
          }
        } else if (c == '[') {	// 这里表示标签中不允许出现的符号
          break;
        }
      } else {
        if (c == '[') {
          check_str = '[';
          check_status = true;
        }
        else if (c == ' ') {
          continue;
        }
        else break;
      }
    }
    let final = ''
    tags.forEach(tag => {
      final += "<span>" + tag + "</span>"
    })
    return '<div>' + final + '</div>' + s.substring(last_valid).trim();
  }
}