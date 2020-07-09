<template>
  <div>
    <van-field
      ref="vanField"
      :value="showingLabel"
      v-bind="$attrs"
      readonly
      is-link
      @click="show = !show"
    />
    <van-popup
      v-model="show"
      position="bottom"
    >
      <van-picker
        :columns="columns"
        show-toolbar
        :title="$attrs.label"
        :value-key="columnLabel"
        @cancel="show = !show"
        @confirm="onConfirm"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    columnLabel: {
      type: String,
      default: 'label'
    },
    columnValue: {
      type: String,
      default: 'value'
    },
    value: {
      type: [String, Number, Boolean],
      default: ''
    }
  },
  data() {
    return {
      show: false,
      selectItem: {}
    }
  },
  computed: {
    showingLabel() {
      if (this.columnsItemIsObj) {
        return this.selectItem[this.columnLabel] || ''
      } else {
        return this.selectItem
      }
    },
    columnsItemIsObj() {
      return this.columns.every((item) => {
        return Object.prototype.toString.call(item) === '[object Object]'
      })
    }
  },
  watch: {
    value: {
      handler(val) {
        if (this.columnsItemIsObj) {
          this.selectItem = this.columns.find((item) => item[this.columnValue] === val) || ''
        } else {
          this.selectItem = val
        }
      },
      immediate: true
    }
  },
  methods: {
    onConfirm(item) {
      let value
      if (this.columnsItemIsObj) {
        value = item[this.columnValue]
      } else {
        value = item
      }

      this.$emit('change', value)
      this.selectItem = item
      this.show = !this.show
    },
    onChange(picker, value, index) {
      if (index > this.columns.length - 5) {
        this.$emit('willToBottom')
      }
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
</style>
