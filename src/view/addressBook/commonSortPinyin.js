/**
 * 由于通讯录首页和组织详情页同时存在这个方法所以抽离
 */
export const commonSortPinyin = (res) => {
  let arr = []
  let adressOptions = {}
  res.forEach((item) => {
    if (item.userId === item.leaderId) {
      adressOptions.orgHeadData = item
    } else {
      // 如果pinyin字段缺失，把它放到Z内
      if (item.pinyin === '') {
        item.pinyin = 'z'
      }
      let index = arr.findIndex((it) => {
        return it.sortTag === item.pinyin.toUpperCase()[0]
      })
      index > -1
        ? arr[index].data.push(item)
        : arr.push({ sortTag: item.pinyin.toUpperCase()[0], data: [item] })
    }
  })
  arr.sort((a, b) => {
    return a.sortTag.localeCompare(b.sortTag)
  })
  arr.forEach((item) => {
    item.data.sort((a, b) => {
      return a.pinyin.localeCompare(b.pinyin)
    })
  })
  adressOptions.pingyinArr = arr.map((item) => {
    return item.sortTag
  })
  adressOptions.pingyinSortData = arr
  return adressOptions
}
/**
 * 模拟实现TS的interface，公共的组织以及用户渲染的结构
 */
export const commonAdressOptionsType = {
  orgData: [],
  pingyinArr: [],
  pingyinSortData: [],
  orgHeadData: {}
}
