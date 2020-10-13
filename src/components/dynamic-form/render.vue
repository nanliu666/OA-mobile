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
    // 只读权限在发起审批时，默认值修改，删除必填校验，不可点击操作
    if (scheme.__config__.formPrivilege === 1) {
      scheme.__config__.defaultValue = scheme.__config__.defaultValue
        ? scheme.__config__.defaultValue
        : '流程设置，无需填写'
      scheme.__config__.required = false
      scheme.__mobile__.tag = 'van-field'
      scheme.__mobile__.props.readonly = true
    }
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
  })
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
      this.$nextTick(() => {
        this.$refs.form.resetValidation()
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
</style>
