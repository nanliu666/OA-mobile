<template>
  <div class="test-form">
    <render
      :form-conf="formConf"
      @submit="sumbitForm"
    />
  </div>
</template>

<script>
import render from '../render.vue'

export default {
  components: {
    render
  },
  props: {},
  data() {
    return {
      formConf: {
        fields: [
          {
            __config__: {
              name: '单行文本',
              label: '单行文本',
              type: 'input',
              layout: 'colFormItem',
              icon: 'icon-basics-textfield-outlined',
              shouldPrint: true,
              required: true
            },
            __slot__: {},
            __pc__: {
              span: 24,
              tag: 'el-input'
            },
            __mobile__: {
              tag: 'van-field',
              renderType: 'input'
            },
            __vModel__: 'field1',
            placeholder: '请输入',
            maxlength: 20
          },
          {
            __config__: {
              name: '多行文本',
              label: '多行文本',
              type: 'textarea',
              layout: 'colFormItem',
              icon: 'icon-basics-mtext-outlined',
              shouldPrint: true,
              required: true
            },
            __slot__: {},
            __pc__: {
              span: 24,
              tag: 'el-input'
            },
            __mobile__: {
              renderType: 'input',
              tag: 'van-field',
              props: {
                autosize: true
              }
            },
            __vModel__: 'field2',
            placeholder: '请输入',
            type: 'textarea',
            rows: '2',
            maxlength: 200
          },
          {
            __config__: {
              name: '说明',
              type: 'desc',
              layout: 'colFormItem',
              icon: 'icon-basics-explain-outlined',
              shouldPrint: true,
              required: true
            },
            __slot__: {},
            __pc__: {
              span: 24,
              tag: 'div'
            },
            __mobile__: { renderType: 'desc', tag: 'tips' },
            placeholder: '请输入说明文字'
          },
          {
            __config__: {
              name: '数字',
              label: '数字',
              type: 'number',
              layout: 'colFormItem',
              icon: 'icon-basics-digit-outlined',
              shouldPrint: true,
              required: true
            },
            __slot__: {},
            __pc__: {
              span: 24,
              tag: 'el-input-number',
              style: { width: '100%' }
            },
            __mobile__: {
              renderType: 'input',
              tag: 'van-field',
              props: {
                type: 'number'
              }
            },
            __vModel__: 'field3',

            placeholder: '请输入'
          },
          {
            __config__: {
              name: '单选框组',
              label: '单选框组',
              type: 'radio',
              icon: 'icon-basics-radio-outlined',
              defaultValue: undefined,
              layout: 'colFormItem',
              required: true,
              shouldPrint: true
            },
            __slot__: {
              options: [
                {
                  label: '选项一',
                  value: 1
                },
                {
                  label: '选项二',
                  value: 2
                }
              ]
            },
            __pc__: {
              span: 24,
              tag: 'el-radio-group',
              style: {
                width: '100%'
              },
              props: {
                size: 'medium'
              }
            },
            __mobile__: {
              renderType: 'select',
              tag: 'van-field-select-picker'
            },
            __vModel__: 'field4',
            placeholder: '请选择'
          },
          {
            __config__: {
              name: '多选框组',
              label: '多选框组',
              type: 'checkbox',
              icon: 'icon-basics-checkbox-outlined',
              defaultValue: [],
              layout: 'colFormItem',
              required: true,
              shouldPrint: true
            },
            __slot__: {
              options: [
                {
                  label: '选项一',
                  value: 1
                },
                {
                  label: '选项二',
                  value: 2
                }
              ]
            },
            __pc__: {
              span: 24,
              tag: 'el-checkbox-group',
              style: {
                width: '100%'
              }
            },
            __mobile__: {
              renderType: 'select',
              tag: 'multi-picker'
            },
            __vModel__: 'field5',
            placeholder: '请选择'
          },
          {
            __config__: {
              name: '日期',
              label: '日期',
              type: 'date',
              icon: 'icon-basics-date-outlined',
              span: 24,
              layout: 'colFormItem',
              shouldPrint: true,
              required: true,
              defaultValue: null
            },
            __slot__: {},
            __pc__: {
              span: 24,
              tag: 'el-date-picker',
              attrs: {
                type: 'date',
                format: 'yyyy-MM-dd'
              },
              style: { width: '100%' }
            },
            __mobile__: {
              renderType: 'select',
              tag: 'van-field-datetime-picker',
              props: {
                pickerType: 'date'
              }
            },
            __vModel__: 'field6',
            placeholder: '请选择'
          },
          {
            __config__: {
              name: '数字',
              label: '数字',
              type: 'number',
              layout: 'colFormItem',
              icon: 'icon-basics-digit-outlined',
              shouldPrint: true,
              required: true
            },
            __slot__: {},
            __pc__: {
              span: 24,
              tag: 'el-input-number',
              style: { width: '100%' },
              props: {
                'controls-position': 'right'
              }
            },
            __mobile__: {
              renderType: 'input',
              tag: 'van-field',
              props: {
                type: 'number'
              }
            },
            __vModel__: 'field7',
            placeholder: '请输入'
          },
          {
            __config__: {
              name: '日期区间',
              label: '日期区间',
              type: 'daterange',
              icon: 'icon-basics-daterange-outlined',
              layout: 'colFormItem',
              defaultValue: ['2019-09-01'],
              shouldPrint: true,
              required: true
            },
            __slot__: {},
            __pc__: {
              span: 24,
              tag: 'el-date-picker',
              props: {
                type: 'daterange',
                'range-separator': '至',
                'start-placeholder': '开始日期',
                'end-placeholder': '结束日期',
                format: 'yyyy-MM-dd'
              },
              style: { width: '100%' }
            },
            __mobile__: {
              renderType: 'daterange',
              noLabel: true,
              tag: 'date-range-picker',
              props: {
                startLabel: '开始时间',
                endLabel: '结束时间',
                placeholder: '请选择',
                autoCalc: true,
                pickerType: 'datetime'
              }
            },
            __vModel__: 'field7'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    sumbitForm(data) {
      // eslint-disable-next-line no-console
      console.log('sumbitForm提交数据：', data)
    }
  }
}
</script>
