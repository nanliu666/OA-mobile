<template>
  <div>
    <van-field
      ref="vanField"
      v-model="value"
      v-bind="$attrs"
      readonly
      is-link
      :rules="rules"
      @click="fieldClick"
    />
    <van-popup
      v-model="show"
      position="bottom"
    >
      <van-datetime-picker
        v-model="data"
        :type="pickerType"
        title="选择年月日"
        :min-date="minData"
        @confirm="dateConfirm"
        @cancel="show = false"
      />
    </van-popup>
  </div>
</template>
<script>
const dateType = {
  date: 'yyyy-MM-dd',
  time: 'hh:mm',
  'year-month': 'yyyy-MM',
  'month-day': 'MM-dd',
  datetime: 'yyyy-MM-dd hh:mm:ss'
}

import { dateFormat } from '@/util/date.js'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    pickerType: {
      type: String,
      default: 'date'
    },
    rules: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show: false,
      data: new Date(),
      minData: new Date(1949, 0, 1)
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.data = new Date(val)
        }
      },
      immediate: true
    }
  },
  methods: {
    fieldClick() {
      this.show = !this.show
    },
    dateConfirm() {
      this.$emit('change', dateFormat(this.data, dateType[this.pickerType]))
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-cell:last-child::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 4.26667vw;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
// .container {
//   /deep/ .van-field__control {
//     color: rgb(150, 151, 153);
//   }
// }
</style>
