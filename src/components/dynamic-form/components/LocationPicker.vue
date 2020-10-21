<template>
  <div class="location-picker">
    <van-field
      readonly
      clickable
      name="area"
      :value="location"
      label="地区选择"
      placeholder="点击选择省市区"
      @click="visible = true"
    />
    <van-popup
      v-model="visible"
      position="bottom"
    >
      <van-area
        :area-list="AREA_JSON"
        @cancel="visible = false"
        @confirm="handleConfirm"
      />
    </van-popup>
    <van-field
      v-model="form.details"
      class="location-picker__input"
      placeholder="(选填)请输入详细地址"
    />
  </div>
</template>

<script>
import provinceAndCityData, { AREA_JSON } from 'src/const/provinceAndCityData'

export default {
  name: 'LocationPicker',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        ...this.value
      },
      visible: false
    }
  },
  computed: {
    // 将城市码转为文本显示
    location() {
      const { provinceAndCityData } = this
      let result = ''
      ;(function findCode(arr, location, target) {
        _.each(arr, (item) => {
          if (item.value === target) {
            location.push(item.label)
            result = location.join('/')
            return false
          } else if (!_.isEmpty(item.children)) {
            findCode(item.children, _.concat(location, item.label), target)
          }
        })
        return
      })(provinceAndCityData, [], this.form.location)
      return result
    },
    AREA_JSON: () => AREA_JSON,
    provinceAndCityData: () => provinceAndCityData
  },
  watch: {
    form: {
      deep: true,
      handler(nextProp) {
        this.$emit('input', nextProp)
      }
    }
  },

  methods: {
    // 处理确定事件
    handleConfirm(values) {
      this.form.location = _.get(_.last(values), 'code', '')
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.location-picker {
  &__cascader {
    width: 100%;
  }
  &__input {
    margin-top: 0.5rem;
  }
}
</style>
