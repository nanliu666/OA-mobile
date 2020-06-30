<template>
  <div>
    <van-cell
      :title="label"
      is-link
      :value="cellWord"
      @click="show = !show"
    />
    <van-popup
      v-model="show"
      position="bottom"
    >
      <van-area
        title="请选择"
        :area-list="areaList"
        :value="data"
        :columns-num="columnsNum"
        @confirm="areaConfirm"
        @cancel="handleCancel"
      />
    </van-popup>
  </div>
</template>
<script>
import areaList from './area'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Array],
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    columnsNum: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      show: false,
      data: '',
      dataArr: [],
      areaList: areaList,
      cellWord: ''
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val.length === 0) {
          this.cellWord = '请选择' + this.label
        } else {
          let arr = val.map((item) => {
            return item.name
          })
          this.cellWord = arr.join('')
        }
        if (val.length > 0) {
          if (val[val.length - 1].code === this.data) {
            return
          } else {
            this.data = val[val.length - 1].code
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    areaConfirm(arr) {
      this.data = arr[arr.length - 1].code
      this.$emit('change', arr)
      this.show = false
    },
    handleCancel() {
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
</style>
