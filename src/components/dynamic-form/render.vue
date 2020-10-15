<script>
import renderItem from './renderItem'
import { deepClone } from './util'

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

function renderFormItem(h, elementList = []) {
  return elementList.map((scheme) => {
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

const rowTemplates = {
  detail(h, element) {
    return (
      <div class="parser-item parser-item__detail">
        {element.children.map((child, index) => (
          <div class="parser-item__detail--item">
            <div class="parser-item__detail--header">
              <span class="parser-item__detail--title">
                {element.__config__.label}
                {element.children.length > 1 ? index + 1 : ''}
              </span>
              {index > 0 ? (
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
        <div
          class="parser-item__detail--footer"
          onClick={() => {
            addElementChild.call(this, element)
          }}
        >
          ＋ 添加{element.__config__.label}
        </div>
      </div>
    )
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
    return (
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
        if (field.__config__.type === 'detail') {
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
      const form = this.form
      if (options && Array.isArray(form[field.__vModel__])) {
        content = options
          .filter((option) => form[field.__vModel__].includes(option.value))
          .map((option) => option.label)
          .join(',')
      } else if (options) {
        content = options
          .filter((option) => form[field.__vModel__] === option.value)
          .map((option) => option.label)
          .join(',')
      } else if (field.__config__.type === 'daterange') {
        content = form[field.__vModel__].join(' 至 ')
      } else {
        content = form[field.__vModel__]
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
            content: this.getFieldContent(item),
            span: item.__pc__.span || 12
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
