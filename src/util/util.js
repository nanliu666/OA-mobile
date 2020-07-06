import { validatenull } from './validate'
//表单序列化
export const serialize = (data) => {
  let list = []
  Object.keys(data).forEach((ele) => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&')
}
export const getObjType = (obj) => {
  var toString = Object.prototype.toString
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}
export const getViewDom = () => {
  return window.document.getElementById('avue-view').getElementsByClassName('el-scrollbar__wrap')[0]
}
/**
 * 对象深拷贝
 */
export const deepClone = (data) => {
  var type = getObjType(data)
  var obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    //不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
  if (status) {
    document.body.className = document.body.className + ' grayMode'
  } else {
    document.body.className = document.body.className.replace(' grayMode', '')
  }
}
/**
 * 设置主题
 */
export const setTheme = (name) => {
  document.body.className = name
}

/**
 * 加密处理
 */
export const encryption = (params) => {
  let { data, type, param, key } = params
  let result = JSON.parse(JSON.stringify(data))
  if (type == 'Base64') {
    param.forEach((ele) => {
      result[ele] = btoa(result[ele])
    })
  } else if (type == 'Aes') {
    param.forEach((ele) => {
      result[ele] = window.CryptoJS.AES.encrypt(result[ele], key).toString()
    })
  }
  return result
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback()
  }
  document.addEventListener('fullscreenchange', function() {
    listen()
  })
  document.addEventListener('mozfullscreenchange', function() {
    listen()
  })
  document.addEventListener('webkitfullscreenchange', function() {
    listen()
  })
  document.addEventListener('msfullscreenchange', function() {
    listen()
  })
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  var isFullscreen =
    document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
  return isFullscreen
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  }
}
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen()
  }
}
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length != 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id == id) {
          return menu[i]
        } else {
          if (menu[i].children[j].children.length != 0) {
            return findParent(menu[i].children[j].children, id)
          }
        }
      }
    }
  }
}
/**
 * 递归过滤节点，生成新的树结构
 * @param {Node[]} nodes 要过滤的节点
 * @param {node => boolean} predicate 过滤条件，符合条件的节点保留
 * @return 过滤后的节点
 */
export const filterTree = (nodes, predicate) => {
  // 如果已经没有节点了，结束递归
  if (!(nodes && nodes.length)) {
    return []
  }

  const newChildren = []
  for (const node of nodes) {
    if (predicate(node)) {
      // 如果节点符合条件，直接加入新的节点集
      newChildren.push(node)
      node.children = filterTree(node.children, predicate)
    }
    // else {
    // 	// 如果当前节点不符合条件，递归过滤子节点，
    // 	// 把符合条件的子节点提升上来，并入新节点集
    // 	newChildren.push(...filterTree(node.children, predicate));
    // }
  }
  return newChildren
}
/**
 * 原地排序树节点
 * @param {*} nodes
 * @param {*} compareFunction 比较函数
 */
export const sortTree = (nodes, compareFunction) => {
  nodes.sort(compareFunction)
  nodes.forEach((node) => {
    if (node.children && node.children.length > 0) {
      sortTree(node.children, compareFunction)
    }
  })
}
/**
 * 树结构转一维数组
 */
export const flatTree = (tree, res = []) => {
  tree.forEach((node) => {
    const copy = deepClone(node)
    delete copy.children
    res.push(copy)
    if (node.children && node.children.length > 0) {
      flatTree(node.children, res)
    }
  })
  return res
}
/**
 * 判断2个对象属性和值是否相等
 */

/**
 * 动态插入css
 */

export const loadStyle = (url) => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}
/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
  delete obj1.close
  var o1 = obj1 instanceof Object
  var o2 = obj2 instanceof Object
  if (!o1 || !o2) {
    /*  判断不是对象  */
    return obj1 === obj2
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
    //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object
    var t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = ''
  if (validatenull(dic)) return value
  if (typeof value == 'string' || typeof value == 'number' || typeof value == 'boolean') {
    let index = 0
    index = findArray(dic, value)
    if (index != -1) {
      result = dic[index].label
    } else {
      result = value
    }
  } else if (value instanceof Array) {
    result = []
    let index = 0
    value.forEach((ele) => {
      index = findArray(dic, ele)
      if (index != -1) {
        result.push(dic[index].label)
      } else {
        result.push(value)
      }
    })
    result = result.toString()
  }
  return result
}
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value == value) {
      return i
    }
  }
  return -1
}
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len ? len : 4)
  if (date) random = random + Date.now()
  return random
}
/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height

  const left = width / 2 - w / 2 + dualScreenLeft
  const top = height / 2 - h / 2 + dualScreenTop
  const newWindow = window.open(
    url,
    title,
    // eslint-disable-next-line max-len
    'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      top +
      ', left=' +
      left
  )

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
}

export const formatDate = (value) => {
  let fomatValue = new Date(value)
  let year = fomatValue.getFullYear()
  let month = fomatValue.getMonth() + 1
  let day = fomatValue.getDay()
  return {
    year: year,
    month: month,
    day: day
  }
}

/**
 * 判断两个日期时间段是否有交集
 */
export const judgeRepeatedTime = (section1, section2) => {
  let section1Start = new Date(section1[0]).getTime()
  let section1End = new Date(section1[1]).getTime()
  let section2Start = new Date(section2[0]).getTime()
  let section2End = new Date(section2[1]).getTime()
  if (section2Start < section1End && section1Start < section2End) {
    return true
  } else {
    return false
  }
}

/**
 * 生成唯一自增id
 */
export const createUniqueID = (() => {
  var i = 0
  return function() {
    return i++
  }
})()

export const getFormDifferent = (arr, originArr, key = 'id') => {
  let deleteList = []
  let addList = []
  let updateList = []
  arr &&
    arr.forEach((item) => {
      let index = originArr.findIndex((it) => it[key] === item[key])
      if (index < 0) {
        addList.push({
          operatorType: 'Add',
          ...item
        })
      } else if (index >= 0) {
        if (JSON.stringify(item) !== JSON.stringify(originArr[index])) {
          updateList.push({
            ...item,
            operatorType: 'Update'
          })
        }
      }
    })
  originArr &&
    originArr.forEach((item) => {
      if (arr.findIndex((it) => it[key] === item[key]) < 0) {
        deleteList.push({
          ...item,
          operatorType: 'Del'
        })
      }
    })
  return [...deleteList, ...addList, ...updateList]
}


// 获取组织路径
export const getOrgPath = (orgTree) =>{
  function deep(arr, pathArr = []){
    arr.forEach(item =>{
      item.orgPath = [...pathArr,{orgId: item.orgId, orgName: item.orgName}]
      if(item.children && item.children.length > 0){
        deep(item.children, item.orgPath)
      }
    })
  }
  deep(orgTree)
}
