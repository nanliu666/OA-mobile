<template>
  <div>
    <div @click="show = !show">
      <van-field
        v-if="!$slots.default"
        ref="vanField"
        :value="showingLabel"
        v-bind="$attrs"
        readonly
        is-link
        :rules="rules"
      />
      <slot />
    </div>
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
        <template v-if="options.length > 0">
          <van-cell
            v-for="item in options"
            :key="item[__props__.value]"
            :is-link="!__props__.disable || !__props__.disable(item)"
            center
            :title="
              __props__.formatter ? __props__.formatter(item, options) : item[__props__.label]
            "
            :class="{ 'picker-option__disable': __props__.disable && __props__.disable(item) }"
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
        </template>
        <template v-else>
          <van-empty description="暂无数据" />
        </template>
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
    },
    single: {
      type: Boolean,
      default: false
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
          this.__props__.formatter
            ? this.__props__.formatter(item, this.options)
            : item[this.__props__.label]
        )
        .join(',')
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.data = this.options.filter((item) => value.includes(item[this.__props__.value]))
      }
    }
  },
  mounted() {},
  methods: {
    submit() {
      this.show = false
      this.$emit(
        'change',
        this.data.map((item) => item[this.__props__.value]),
        this.data
      )
    },
    cancel() {
      this.show = false
      this.data = this.options.filter((item) => this.value.includes(item[this.__props__.value]))
    },
    handleCheck(item) {
      if (this.__props__.disable && this.__props__.disable(item)) {
        return
      }
      let index = this.data.findIndex((i) => i[this.__props__.value] === item[this.__props__.value])
      if (index !== -1) {
        this.data.splice(index, 1)
      } else {
        if (this.single) {
          this.data = [item]
          this.submit()
        } else {
          this.data.push(item)
        }
      }
    }
  }
}
</script>

<style lang="less">
@import '@/styles/variables.less';
.multi-select-pop {
  padding-top: 44px;
  .header {
    position: absolute;
    top: 0;
    width: 100%;
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
  .van-list {
    height: 40vh;
    overflow: auto;
  }
  .picker-option__disable {
    opacity: 0.5;
  }
}
</style>
