<template>
  <div>
    <van-field
      ref="vanField"
      :value="showingLabel"
      v-bind="$attrs"
      readonly
      is-link
      :rules="rules"
      @click="show = !show"
    />
    <van-popup
      v-model="show"
      position="bottom"
      class="multi-select-pop"
      :style="{ height: '40%' }"
    >
      <div class="header">
        <button @click.prevent="cancel">
          取消
        </button>
        <button @click.prevent="submit">
          确定
        </button>
      </div>
      <van-list>
        <van-cell
          v-for="item in options"
          :key="item[__props__.value]"
          is-link
          center
          :title="item.formatter ? item.formatter(item, options) : item[__props__.label]"
          @click="handleCheck(item)"
        >
          <template #right-icon>
            <div
              :class="{
                'van-checkbox__icon van-checkbox__icon--square': true,
                'van-checkbox__icon--checked':
                  data.findIndex((i) => i[__props__.value] === item[__props__.value]) !== -1
              }"
            >
              <i class="van-icon van-icon-success" />
            </div>
          </template>
        </van-cell>
      </van-list>
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
    value: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show: false,
      data: []
    }
  },
  computed: {
    __props__() {
      return Object.assign({ label: 'label', value: 'value' }, this.props)
    },
    showingLabel() {
      return this.data
        .map((item) =>
          item.formatter ? item.formatter(item, this.options) : item[this.__props__.label]
        )
        .join(',')
    }
  },
  mounted() {
    this.data = this.options.filter((item) => this.value.includes(item[this.__props__.value]))
  },
  methods: {
    submit() {
      this.$emit(
        'change',
        this.data.map((item) => item[this.__props__.value])
      )
      this.show = false
    },
    cancel() {
      this.data = this.options.filter((item) => this.value.includes(item[this.__props__.value]))
      this.show = false
    },
    handleCheck(item) {
      let index = this.data.findIndex((i) => i[this.__props__.value] === item[this.__props__.value])
      if (index !== -1) {
        this.data.splice(index, 1)
      } else {
        this.data.push(item)
      }
    }
  }
}
</script>

<style lang="less">
@import '@/styles/variables.less';
.multi-select-pop {
  .header {
    display: flex;
    justify-content: space-between;
    height: 44px;
    align-items: center;
    border-bottom: 1px solid #ebedf0;
  }
  button {
    border: none;
    background: none;
    color: @primaryColor;
    padding: 0 16px;
  }
}
</style>
