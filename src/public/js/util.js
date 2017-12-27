/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse () {
  let url = window.location.search
  let obj = {}
  // 匹配'?'或'&'字符其中一个，而后不匹配集合中的'?'或'&'一个或多个，'='号连接，而后而后不匹配集合中的'?'或'&'一个或多个
  let reg = /[?&][^?&]+=[^?&]+/g
  // 在字符串内检索指定的值，或找到一个或多个正则表达式的匹配,返回匹配结果的数组
  let arr = url.match(reg)
  // ['?id=12345, '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.slice(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}
