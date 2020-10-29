<script>
import renderItem from './renderItem'
import { deepClone } from './util'
import provinceAndCityData from 'src/const/provinceAndCityData'

function renderFrom(h) {
  const { formConfCopy } = this

  return (
    <van-form ref="form" input-align="right" show-error-message={false} submit-on-enter={false}>
      {renderFormItem.call(this, h, formConfCopy.fields)}
      {formConfCopy.showButton && formBtns.call(this, h)}
    </van-form>
  )
}

// eslint-disable-next-line no-unused-vars
function formBtns(h) {
  return (
    <div class="submit">
      <van-button block type="info" onClick={this.submitForm}>
        保存
      </van-button>
    </div>
  )
}
// formPrivilege为2的隐藏不显示
function spliceRenderList(elementList) {
  let renderList = []
  elementList.map((item) => {
    if (item.__config__.formPrivilege !== 2) {
      renderList.push(item)
    }
  })
  return renderList
}
function renderFormItem(h, elementList = []) {
  let renderList = spliceRenderList(elementList)
  return renderList.map((scheme) => {
    const config = scheme.__config__
    const layout = layouts[config.layout]

    if (layout) {
      return layout.call(this, h, scheme)
    }
    throw new Error(`没有与${config.layout}匹配的layout`)
  })
}

function renderItemList(h, list) {
  if (!Array.isArray(list)) return null
  return renderFormItem.call(this, h, list)
}
function toLocation({ location, details }) {
  let result = ''
  ;(function findCode(arr, locations, target) {
    _.each(arr, (item) => {
      if (item.value === target) {
        locations.push(item.label)
        result = locations.join('')
        return false
      } else if (!_.isEmpty(item.children)) {
        findCode(item.children, _.concat(locations, item.label), target)
      }
    })
    return
  })(provinceAndCityData, [], location)
  return `${result} ${details}`
}
const rowTemplates = {
  detail(h, element) {
    const formPrivilege = element.__config__.formPrivilege
    const addPart = (
      <div
        class="parser-item__detail--footer"
        onClick={() => {
          addElementChild.call(this, element)
        }}
      >
        ＋ 添加{element.__config__.label}
      </div>
    )
    const detailWrapItem = () => {
      return (
        <div class="parser-item parser-item__detail">
          {element.children.map((child, index) => (
            <div class="parser-item__detail--item">
              <div class="parser-item__detail--header">
                <span class="parser-item__detail--title">
                  {element.__config__.label}
                  {element.children.length > 1 ? index + 1 : ''}
                </span>
                {index > 0 && element.__config__.formPrivilege === 0 ? (
                  <div
                    onClick={() => {
                      element.children.splice(index, 1)
                    }}
                    class="parser-item__detail--button"
                  >
                    删除
                  </div>
                ) : null}
              </div>
              <div class="parser-item__detail--content">{renderItemList.call(this, h, child)}</div>
            </div>
          ))}
          {formPrivilege === 0 ? addPart : ''}
        </div>
      )
    }
    let renderItem = ''
    // formPrivilege表单权限验证，0可编辑，1只读，2隐藏
    switch (formPrivilege) {
      case 1:
        // 是否在详情页，详情页与发起审批页展示不一
        if (this.formConfCopy.isDetail) {
          // 详情页，有默认值显示默认值，无默认值不显示这个标签
          let defaultValueList = []
          element.children.forEach((item) => {
            item.map((deepItem) => {
              defaultValueList.push(deepItem.__config__.defaultValue)
            })
          })
          renderItem = _.some(defaultValueList, Boolean) ? detailWrapItem() : ''
        } else {
          // 审批发起页面，只读权限表现为置灰处理
          renderItem = detailWrapItem()
        }
        break
      case 2:
        renderItem = ''
        break
      default:
        // 兼容旧版本
        renderItem = detailWrapItem()
        break
    }
    return renderItem
  }
}
// formId最大值
function getMaxId(fieldList) {
  if (fieldList.length) {
    return fieldList.reduce((maxId, cmp) => {
      cmp.__config__.formId > maxId && (maxId = cmp.__config__.formId)
      if (Array.isArray(cmp.children)) {
        let children = _.flatten(cmp.children)
        maxId = children.reduce((max, child) => Math.max(max, child.__config__.formId), maxId)
      }
      return maxId
    }, 0)
  }
  return 0
}

function addElementChild(element) {
  const childCopy = JSON.parse(JSON.stringify(element.__config__.children))
  const nextId = getMaxId(this.formConfCopy.fields) + 1
  childCopy.forEach((item, index) => {
    let formId = nextId + index
    item.__vModel__ = 'field' + formId
    item.__config__.formId = formId
  })
  element.children.push(childCopy)
}

const layouts = {
  colFormItem(h, scheme) {
    const config = scheme.__config__
    const formPrivilege = config.formPrivilege
    const defaultRender = (
      <renderItem
        conf={scheme}
        rules={this.buildRules(scheme)}
        required={config.required}
        onInput={(event) => {
          this.$set(config, 'defaultValue', event)
          this.$set(this.form, scheme.__vModel__, event)
        }}
      />
    )
    const fieldWrap = function(slot) {
      return (
        <van-field prop={scheme.__vModel__} label={`${config.label ? `${config.label}:` : ''}`}>
          {slot}
        </van-field>
      )
    }
    const uploadImageRender = function() {
      const fileList = scheme.__config__.defaultValue
      return fileList.map((item) => {
        return <van-image class="thumbnail-image" fit="fill" src={item.url} />
      })
    }
    const uploadFileRender = function() {
      const fileList = scheme.__config__.defaultValue
      return fileList.map((item) => {
        return (
          <li class="file-li">
            <van-icon name="description" style="margin-right: 4px;" />
            <div class="file-name">{item.localName}</div>
          </li>
        )
      })
    }
    const isUpload = function() {
      const type = ['image', 'file']
      return _.some(type, (item) => item === scheme.__config__.type)
    }
    const valueRender = fieldWrap(<span slot="input">{this.getFieldContent(scheme)}</span>)
    let wrapItem = valueRender
    if (isUpload()) {
      const uploadRender = fieldWrap(
        <div slot="input">
          {scheme.__config__.type === 'image' ? uploadImageRender() : uploadFileRender()}
        </div>
      )
      const uploadWrapItem = function() {
        return <div class="upload-show-field">{uploadRender}</div>
      }
      wrapItem = uploadWrapItem()
    }
    let renderJSX = ''
    // formPrivilege表单权限验证，0可编辑(默认)，1只读，2隐藏
    switch (formPrivilege) {
      case 1:
        // 是否在详情页，详情页与发起审批页展示不一
        if (this.formConfCopy.isDetail) {
          // 详情页，有默认值显示默认值，无默认值不显示这个标签
          if (scheme.__config__.type === 'desc') {
            renderJSX = defaultRender
          } else if (scheme.__config__.type === 'relevant') {
            // 关联审批
            scheme.__mobile__.props.hasOperate = false
            renderJSX = defaultRender
          } else {
            scheme.__mobile__.props.disabled = true
            renderJSX = scheme.__config__.defaultValue ? wrapItem : ''
          }
        } else {
          // 审批发起页面，只读权限表现为置灰处理
          scheme.__mobile__.props.disabled = true
          renderJSX = defaultRender
        }
        break
      case 2:
        renderJSX = ''
        break
      default:
        // 兼容旧版本与权限为0--可编辑
        scheme.__mobile__.props.disabled = false
        renderJSX = defaultRender
        break
    }
    return renderJSX
  },
  rowFormItem(h, scheme) {
    if (rowTemplates[scheme.__config__.type]) {
      return rowTemplates[scheme.__config__.type].call(this, h, scheme)
    }
    return null
  }
}
export default {
  props: {
    formConf: {
      type: Object,
      default: () => ({})
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formConfCopy: {},
      form: {}
    }
  },
  computed: {},
  watch: {
    form: {
      handler(val) {
        this.$emit('update:formData', val)
      },
      deep: true
    }
  },
  mounted() {
    this.init(this.formConf)
  },
  methods: {
    init(conf) {
      if (_.isEmpty(conf)) {
        return
      }
      const form = {}
      this.formConfCopy = deepClone(conf)
      this.initFormData(conf.fields, form)
      this.form = form
      this.resolveFields(this.formConfCopy.fields)
      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },
    resolveFields(fields) {
      fields.forEach((field) => {
        if (field.__config__.type === 'detail' && !this.formConfCopy.isDetail) {
          addElementChild.call(this, field)
        }
      })
    },
    // 构建data属性
    initFormData(componentList = [], formData) {
      componentList.forEach((cur) => {
        const config = cur.__config__
        if (cur.__vModel__) formData[cur.__vModel__] = config.defaultValue
        if (config.children) this.initFormData(config.children, formData)
      })
    },
    // 构建校验规则
    buildRules(field) {
      const config = field.__config__
      const rules = []
      if (config.required) {
        rules.push({ required: true, message: `请填写${config.label}` })
      }
      return rules
    },
    // 重置方法
    resetForm() {
      // this.formConfCopy = deepClone(this.formConf)
      this.$refs.form.resetValidation()
    },
    getFieldContent(field) {
      let options = field.__slot__.options
      let content
      if (options && Array.isArray(field.__config__.defaultValue)) {
        content = options
          .filter((option) => field.__config__.defaultValue.includes(option.value))
          .map((option) => option.label)
          .join(',')
      } else if (options) {
        content = options
          .filter((option) => field.__config__.defaultValue === option.value)
          .map((option) => option.label)
          .join(',')
      } else if (field.__config__.type === 'daterange') {
        content = field.__config__.defaultValue.join(' 至 ')
      } else if (field.__config__.type === 'locationPicker') {
        content = toLocation(field.__config__.defaultValue)
      } else {
        content = field.__config__.defaultValue
      }
      return content
    },
    // 将form对象封装成包含字段信息的对象数组
    genFormFields(form) {
      const formFields = []
      this.formConfCopy.fields.forEach((item) => {
        if (typeof item.__vModel__ !== 'undefined') {
          formFields.push({
            label: item.__config__.label,
            prop: item.__vModel__,
            value: form[item.__vModel__],
            content: this.getFieldContent(item)
          })
        }
      })
      return formFields
    },
    // 内部按钮调用的提交方法
    _submitForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        // 触发sumit事件
        this.$emit('submit', { formData: this.form, formFields: this.genFormFields(this.form) })
        return true
      })
    },
    // 外部调用的提交方法
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form
          .validate()
          .then(() => {
            resolve({ formData: this.form, formFields: this.genFormFields(this.form) })
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  render(h) {
    return renderFrom.call(this, h)
  }
}
</script>
<style lang="less" scoped>
@import '@/styles/variables.less';
.upload-show-field {
  .van-field {
    flex-direction: column;
  }
  /deep/ .van-cell__title {
    margin-bottom: 4px;
  }
  .file-li {
    margin-bottom: 10px;
    list-style: none;
    width: calc(100vw - 30px);
    display: flex;
    align-items: center;
    .file-name {
      max-width: calc(100% - 20px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .file-li:last-child {
    margin-bottom: 0;
  }
  .thumbnail-image {
    margin-bottom: 10px;
    display: block;
    border: 1px solid #ccc;
    padding: 4px;
    border-radius: 4px;
    width: calc(100vw - 40px);
  }
}
.page {
  background-color: #f7f9fa;
  height: 100vh;
}
.submit {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 16px;
  background-color: white;
  /deep/ .van-button {
    border-radius: 5px;
    width: calc(100% - 32px);
  }
}
.parser-item {
  &__detail {
    &--header {
      display: flex;
      line-height: 32px;
      padding: 0 10px;
      font-size: 14px;
      align-items: center;
      justify-content: space-between;
    }
    &--button {
      cursor: pointer;
      color: @primaryColor;
    }

    &--footer {
      margin: 8px 0;
      text-align: center;
      background: #fff;
      line-height: 40px;
      height: 40px;
      border-bottom: 1px solid #ebedf0;
      color: @primaryColor;
    }
  }
}
</style>
