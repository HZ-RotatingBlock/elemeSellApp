/**
 * 日期格式化
 * @param date 时间戳
 * @param fmt  格式化格式
 * @returns {*}
 */
export function formatDate (date, fmt) {
  // 年份替换
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').slice(4 - RegExp.$1.length))
  }
  // 月日时分秒替换
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let key in o) {
    if (new RegExp(`(${key})`).test(fmt)) {
      let str = o[key] + ''
      // 若只写单个字符则返回单个字符，若不为单个字符，则返回添加0后的字符串
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
// 辅助方法---字符串补0
// 例子：若str为9则被截取返回为09，若str为12,则被截取返回为12
function padLeftZero (str) {
  return ('00' + str).slice(str.length)
}
