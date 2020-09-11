<template>
  <div class="container">
    <date-picker
      :value="value[0]"
      :rules="rules"
      :label="startLabel"
      :picker-type="pickerType"
      :placeholder="placeholder"
      @change="handleChange([$event, value[1]])"
    />
    <date-picker
      :value="value[1]"
      :picker-type="pickerType"
      :rules="endRules"
      :label="endLabel"
      :placeholder="placeholder"
      @change="handleChange([value[0], $event])"
    />
    <van-cell
      v-if="autoCalc"
      title="自动计算时长（天）"
      :value="calcDuration"
    />
  </div>
</template>
<script>
export default {
  name: 'DateRangePicker',
  components: {
    datePicker: () => import('../vanFieldDatetimePicker/vanFieldDatetimePicker')
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    pickerType: {
      type: String,
      default: 'date'
    },
    startLabel: {
      type: String,
      default: '开始时间'
    },
    endLabel: {
      type: String,
      default: '结束时间'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    rules: {
      type: Array,
      default: () => []
    },
    autoCalc: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    endRules() {
      return [
        ...this.rules,
        {
          validator: (val) => {
            if (
              (!val && !this.value[0]) ||
              new Date(val).getTime() >= new Date(this.value[0]).getTime()
            ) {
              return true
            }
            return false
          },
          message: '结束时间应该大于开始时间'
        }
      ]
    },
    calcDuration() {
      const duration = new Date(this.value[1]).getTime() - new Date(this.value[0]).getTime()
      if (duration > 0) {
        return Math.floor(duration / (24 * 60 * 60 * 1000))
      } else {
        return 0
      }
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  margin: 8px 0;
  border-bottom: 1px solid #eee;
}
/deep/.van-cell {
  // padding: 6px 16px;
  border: none;
}
/deep/.van-cell:last-child:after {
  border: none;
}
</style>
