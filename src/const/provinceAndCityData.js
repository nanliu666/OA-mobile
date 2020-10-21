const { regionData } = require('element-china-area-data')
const _ = require('lodash')

const REGION_DATA = _.map(_.cloneDeep(regionData), (region) => {
  // if (_.get(_.head(region.children), 'label') === '市辖区') {
  //   region.children = _.concat(
  //     ...region.children.map((child) => _.map(child.children, (c) => ({ ...c, children: [] })))
  //   )
  // }
  // 台湾省没有children属性,会出现显示bug
  if (_.startsWith(region.label, '台湾') && _.isEmpty(region.children)) {
    region.children = [
      {
        label: '全部',
        // 使用父级的value属性(城市code,反正目前也没有规定好)
        value: region.value
      }
    ]
  }
  return region
})

// 转换为vant格式
const AREA_JSON = {
  province_list: {}, // 省
  city_list: {}, // 市
  county_list: {} // 区
}

/**
 * @param {{label: string; value: string; children?:Array<any}} arr 传入的数组
 * @param {number} [type=0] 深度，用于区分省市区，0为省，2为区
 */
function toAreaJson(arr, type = 0) {
  _.each(arr, (item) => {
    switch (type) {
      case 0:
        _.set(AREA_JSON.province_list, item.value, item.label)
        break
      case 1:
        _.set(AREA_JSON.city_list, item.value, item.label)
        break
      case 2:
        _.set(AREA_JSON.county_list, item.value, item.label)
        break
    }
    if (!_.isEmpty(item.children)) {
      toAreaJson(item.children, type + 1)
    }
  })
}

toAreaJson(REGION_DATA)
export default REGION_DATA
export { AREA_JSON }
