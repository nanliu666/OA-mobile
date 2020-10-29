import { deepClone } from './util'

const eventDict = {
  radio: 'change',
  date: 'change',
  'image-upload': 'change',
  'file-upload': 'change',
  checkbox: 'change',
  daterange: 'change'
}

function vModel(self, dataObject, defaultValue) {
  dataObject.props.value = defaultValue

  dataObject.on[eventDict[self.conf.__config__.type] || 'input'] = (val) => {
    self.$emit('input', val)
  }
}
export default {
  name: 'RenderItem',
  components: {
    tips: () => import('./components/Tips'),
    FileUpload: () => import('./components/fileUploader.vue'),
    ImageUpload: () => import('./components/imageUploader'),
    LocationPicker: () => import('./components/LocationPicker'),
    vanFieldSelectPicker: () => import('../vanFieldSelectPicker/vanFieldSelectPicker.vue'),
    vanFieldDatetimePicker: () => import('../vanFieldDatetimePicker/vanFieldDatetimePicker.vue'),
    multiPicker: () => import('../multi-picker/MultiPicker.vue'),
    dateRangePicker: () => import('../date-range-picker/DateRangePicker.vue'),
    relevantAppr: () => import('./components/RelevantAppr')
  },
  render(h) {
    const MONEY_LABEL =
      this.conf.__config__.type === 'money'
        ? ` ${((currency) => {
            switch (currency) {
              case 'CNY':
                return '（人民币/元）'
              case 'USD':
                return '（美元/元）'
              default:
                return ''
            }
          })(this.conf.__config__.currency)}`
        : ''

    const dataObject = {
      attrs: {
        label: `${this.conf.__config__.label}${MONEY_LABEL}`,
        required: this.required
      },
      props: {
        rules: this.rules
      },
      on: {},
      style: {},
      nativeOn: {}
    }
    const confClone = deepClone(this.conf)
    // 如果slots文件夹存在与当前tag同名的文件，则执行文件中的代码
    // const childFunc = componentChild[confClone.__config__.type]
    // if (childFunc) {
    //   children.push(childFunc(h, confClone))
    // }
    // 将json表单配置转化为vue render可以识别的 “数据对象（dataObject）”
    const privateProps = ['__config__', '__slot__', '__mobile__', '__pc__', 'renderKey']
    Object.keys(confClone).forEach((key) => {
      const val = confClone[key]
      if (privateProps.includes(key)) {
        return
      }
      if (key === '__vModel__') {
        vModel(this, dataObject, confClone.__config__.defaultValue, confClone)
      } else if (dataObject[key]) {
        dataObject[key] = { ...dataObject[key], ...confClone[key] }
      } else {
        dataObject.attrs[key] = val
      }
    })
    confClone.__mobile__ &&
      Object.keys(confClone.__mobile__).forEach((key) => {
        if (dataObject[key]) {
          dataObject[key] = { ...dataObject[key], ...confClone.__mobile__[key] }
        }
      })
    if (confClone.__slot__.options) {
      if (confClone.__config__.type === 'radio') {
        dataObject.props.columns = confClone.__slot__.options
      } else {
        dataObject.props.options = confClone.__slot__.options
      }
    }

    return h(this.conf.__mobile__.tag, dataObject)
  },
  props: ['conf', 'rules', 'required']
}
