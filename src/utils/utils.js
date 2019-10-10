/**
 * (判断是不是苹果设备)
 * @returns true 是苹果     false 不是
 */
export const isAppleDevice = () => {
  // if (/GyPackage/i.test(navigator.userAgent)) {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}
// 判断是否为微信
export const isWeiXin = () => {
  let ua = window.navigator.userAgent
  if (ua.match(/MicroMessenger/i) == 'MicroMessenger' || ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

/*
* 是否移动设备：返回Boolean。
*/
export const isMobile = () =>{
  let myUA = window.navigator.userAgent.toLowerCase();
  let isMobile = /(?:micromessenger|mobile|iphone|ipod|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|windows phone|win ce|nokia)/i.test(myUA);
  if (isMobile) {
    return true
  }else{
    return false
  }
}

// 时间插件
export const formatDate = (timestamp, type, difference, utc) => {
  timestamp = timestamp || ''
  type = type || ''
  utc = utc || null
  difference = difference || null
  var getTimestamp = ''
  if (difference) {
    timestamp = +timestamp + difference * 60 * 60 * 1000
  }
  if (utc) {
    let u = new Date()
    let u2 = u.getTimezoneOffset() / 60
    // 获得本地时区utc=utc?parseFloat(utc):u2*60*60*1000
    // 格式化传入时间
    if (u2 < 0) {
      getTimestamp = timestamp + Math.abs(u2 * 60 * 60 * 1000)
      console.log(getTimestamp)
    } else {
      getTimestamp = timestamp - (u2 * 60 * 60 * 1000)
    }
  } else {
    getTimestamp = timestamp
  }
  const rt = new Date(getTimestamp)
  const y = rt.getFullYear()

  const hourStr = rt.getHours() < 10 ? ('0' + rt.getHours()) : rt.getHours()
  const minStr = rt.getMinutes() < 10 ? ('0' + rt.getMinutes()) : rt.getMinutes()
  const SecStr = rt.getSeconds() < 10 ? ('0' + rt.getSeconds()) : rt.getSeconds()

  let m = rt.getMonth() + 1
  let d = rt.getDate()
  m = m < 10 ? ('0' + m) : m
  d = d < 10 ? ('0' + d) : d

  if (hourStr && minStr && m && y) {
    if (type && type === 'HH:MM') {
      return hourStr + ':' + minStr
    }
    if (type && type === 'MM-DD') {
      return m + '-' + d
    }
    if (type && type === 'YYYY-MM-DD') {
      return y + '-' + m + '-' + d
    }
    if (type && type === 'YYYY-MM') {
      return y + '-' + m
    }
    if (type && type === '年月') {
      return y + '年' + m + '月'
    }
    if (type && type === '年-月-日') {
      return y + ' 年 ' + m + ' 月 ' + d + ' 日'
    }
    if (type && type === 'YYYY.MM.DD') {
      return y + '.' + m + '.' + d
    }
    if (type && type === 'YYYY-MM-DD HH:MM') {
      return y + '-' + m + '-' + d + ' ' + hourStr + ':' + minStr
    }
    if (type && type === 'YYYY-MM-DD HH:MM:SS') {
      return y + '-' + m + '-' + d + ' ' + hourStr + ':' + minStr + ':' + SecStr
    }

    if (type && type === 'common') {
      return (
        rt.getFullYear() + '年' +
        (rt.getMonth() + 1) + '月' +
        rt.getDate() + '日 ' +
        hourStr + ':' +
        minStr
      )
    }

    return (
      m + '月' +
      d + '日 ' +
      hourStr + ':' +
      minStr
    )
  } else {
    return ''
  }
}

// 获取地址栏参数
export const getUrlParam = () => {
  var url = decodeURI(location.search);  // 转换被转译的中文
  var object = {};
  if (url.indexOf("?") != -1) { //url中存在问号，也就说有参数。 
    var str = url.substr(1);  //得到?后面的字符串
    var strs = str.split("&");  //将得到的参数分隔成数组[id="123456",Name="bicycle"];
    for (var i = 0; i < strs.length; i++) {
      object[strs[i].split("=")[0]] = strs[i].split("=")[1]
    }
  }
  return object
} 


/**
 * 数字过长时单位转换
 * @param {Number} val 初始值
 * @param {String} unit 拼接的单位
 * @return {String} 格式化后的值 
 */
export const conversion = (val, unit = '万') => {
  if (val > 9999) {
    val = (val / 10000).toFixed(1)
    let valArr = val.split('.')
    if (valArr[1] === '0') {
      return (valArr[0] + unit)
    }
    return (val + unit)
  }
  return val
}
