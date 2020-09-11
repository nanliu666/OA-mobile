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
              label: '姓名',
              type: 'input',
              layout: 'colFormItem',
              icon: 'icon-basics-textfield-outlined',
              shouldPrint: true,
              required: true,
              formId: 1,
              renderKey: 1594366310537
            },
            __slot__: {},
            __pc__: { span: 24, tag: 'el-input', props: {} },
            __mobile__: { tag: 'van-field', renderType: 'input', props: {} },
            placeholder: '请输入',
            maxlength: 20,
            __vModel__: 'field1'
          },
          {
            __config__: {
              name: '多行文本',
              label: '简介',
              type: 'textarea',
              layout: 'colFormItem',
              icon: 'icon-basics-mtext-outlined',
              shouldPrint: true,
              required: true,
              formId: 2,
              renderKey: 1594366311850
            },
            __slot__: {},
            __pc__: { span: 24, tag: 'el-input', props: { type: 'textarea', rows: '2' } },
            __mobile__: {
              renderType: 'textarea',
              tag: 'van-field',
              props: { autosize: true, type: 'textarea' }
            },
            placeholder: '请输入',
            maxlength: 200,
            __vModel__: 'field2'
          },
          {
            __config__: {
              name: '说明',
              type: 'desc',
              layout: 'colFormItem',
              icon: 'icon-basics-explain-outlined',
              shouldPrint: true,
              required: true,
              formId: 3,
              renderKey: 1594366312931
            },
            __slot__: {},
            __pc__: { span: 24, tag: 'div', props: {} },
            __mobile__: { renderType: 'desc', tag: 'tips', props: {} },
            placeholder: '请输入说明文字'
          },
          {
            __config__: {
              name: '数字',
              label: '年龄',
              type: 'number',
              layout: 'colFormItem',
              icon: 'icon-basics-digit-outlined',
              shouldPrint: true,
              required: true,
              formId: 4,
              renderKey: 1594366314046
            },
            __slot__: {},
            __pc__: {
              span: 24,
              tag: 'el-input-number',
              style: { width: '100%' },
              props: { 'controls-position': 'right' }
            },
            __mobile__: { renderType: 'input', tag: 'van-field', props: { type: 'number' } },
            placeholder: '请输入',
            __vModel__: 'field4'
          },
          {
            __config__: {
              name: '单选',
              label: '性别',
              type: 'radio',
              icon: 'icon-basics-radio-outlined',
              layout: 'colFormItem',
              required: true,
              shouldPrint: true,
              formId: 5,
              renderKey: 1594366316213
            },
            __slot__: {
              options: [
                { label: '男', value: '男' },
                { label: '女', value: '女' }
              ]
            },
            __pc__: {
              span: 24,
              tag: 'el-radio-group',
              props: { size: 'medium' },
              style: { width: '100%' }
            },
            __mobile__: { renderType: 'select', tag: 'van-field-select-picker', props: {} },
            placeholder: '请选择',
            __vModel__: 'field5'
          },
          {
            __config__: {
              name: '多选',
              label: '爱好',
              type: 'checkbox',
              icon: 'icon-basics-checkbox-outlined',
              defaultValue: [],
              layout: 'colFormItem',
              shouldPrint: true,
              required: true,
              formId: 6,
              renderKey: 1594366317319
            },
            __slot__: {
              options: [
                { label: '运动', value: '运动' },
                { label: '娱乐', value: '娱乐' },
                { label: '游戏', value: '游戏' }
              ]
            },
            __pc__: { span: 24, tag: 'el-checkbox-group', style: { width: '100%' }, props: {} },
            __mobile__: { renderType: 'select', tag: 'multi-picker', props: {} },
            placeholder: '请选择',
            __vModel__: 'field6'
          },
          {
            __config__: {
              name: '日期',
              label: '生日',
              type: 'date',
              icon: 'icon-basics-date-outlined',
              defaultValue: null,
              span: 24,
              layout: 'colFormItem',
              shouldPrint: true,
              required: true,
              formId: 7,
              renderKey: 1594366318313
            },
            __slot__: {},
            __pc__: {
              span: 24,
              tag: 'el-date-picker',
              props: { type: 'date', format: 'yyyy-MM-dd' },
              style: { width: '100%' }
            },
            __mobile__: {
              renderType: 'select',
              tag: 'van-field-datetime-picker',
              props: { pickerType: 'date', props: {} }
            },
            placeholder: '请选择',
            __vModel__: 'field7'
          },
          {
            __config__: {
              name: '日期区间',
              label: '日期区间',
              type: 'daterange',
              icon: 'icon-basics-daterange-outlined',
              layout: 'colFormItem',
              defaultValue: [],
              shouldPrint: true,
              required: true,
              formId: 8,
              renderKey: 1594366319250
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
                pickerType: 'date',
                startLabel: '开始时间',
                endLabel: '结束时间',
                placeholder: '请选择',
                autoCalc: true
              }
            },
            __vModel__: 'field8'
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
