<script>
import renderItem from './renderItem'
import { deepClone } from './util'

function renderFrom(h) {
  const { formConfCopy } = this

  return (
    <div class="page">
      <sticky-header title="个人信息" />
      <van-form ref="form" input-align="right" show-error-message={false} submit-on-enter={false}>
        {renderFormItem.call(this, h, formConfCopy.fields)}
        {formBtns.call(this, h)}
      </van-form>
    </div>
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

function renderFormItem(h, elementList) {
  return elementList.map((scheme) => {
    const config = scheme.__config__
    return (
      <renderItem
        conf={scheme}
        rules={this.buildRules(scheme)}
        onInput={(event) => {
          this.$set(config, 'defaultValue', event)
          this.$set(this.form, scheme.__vModel__, event)
        }}
      />
    )
  })
}

export default {
  components: {
    renderItem
  },
  props: {
    formConf: {
      type: Object,
      required: true
    }
  },
  data() {
    const data = {
      formConfCopy: deepClone(this.formConf),
      form: {}
    }
    this.initFormData(data.formConfCopy.fields, data.form)
    return data
  },
  methods: {
    initFormData(componentList, formData) {
      componentList.forEach((cur) => {
        const config = cur.__config__
        if (cur.__vModel__) formData[cur.__vModel__] = config.defaultValue
        if (config.children) this.initFormData(config.children, formData)
      })
    },
    buildRules(field) {
      const config = field.__config__
      const rules = []
      if (config.required) {
        rules.push({ required: true, message: `请填写${config.label}` })
      }
      return rules
    },
    resetForm() {
      this.formConfCopy = deepClone(this.formConf)
      this.$refs.form.resetFields()
    },
    submitForm() {
      this.$refs.form
        .validate()
        .then(() => {
          this.$emit('submit', this.form)
        })
        .catch((error) => {
          this.$toast && this.$toast(error[0].message)
          this.$refs.form.scrollToField(error[0].name, { alignToTop: true })
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
