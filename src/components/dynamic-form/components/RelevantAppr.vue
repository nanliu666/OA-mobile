<template>
  <div class="relevant-appr">
    <van-field
      readonly
      clickable
      name="area"
      label="关联审批"
      placeholder="请选择"
      @click="visible = true"
    />
    <ul v-if="value.length > 0">
      <li
        v-for="item in value"
        :key="item.apprNo"
      >
        <span class="ellipsis">{{ item.title }}</span>
        <span class="handler">
          <span
            v-if="item.status"
            class="status"
            :style="{
              backgroundColor: getStatus(item.status).backgroundColor,
              color: getStatus(item.status).color
            }"
            v-text="getStatus(item.status).text"
          />
          <i
            class="icon-tips-close-outlined"
            @click="handleDelete(item)"
          />
        </span>
      </li>
    </ul>
    <relevant-appr-picker
      :visible.sync="visible"
      :appr-types="apprTypes"
      :value="value"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script>
import RelevantApprPicker from './RelevantApprPicker'
import { STATUS_TO_TEXT } from '@/const/approve'
export default {
  name: 'RelevantAppr',
  components: {
    RelevantApprPicker
  },
  props: {
    apprTypes: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: [],
      visible: false
    }
  },
  methods: {
    getStatus(status) {
      return STATUS_TO_TEXT[status]
    },
    handleDelete(item) {
      this.$emit(
        'input',
        this.value.filter((i) => i.apprNo !== item.apprNo)
      )
    }
  }
}
</script>

<style lang="less" scoped>
.relevant-appr {
  ul {
    padding: 16px;
    background-color: #fff;
    li {
      background: rgba(21, 119, 255, 0.05);
      border: 1px solid @blue;
      border-radius: 4px;
      border-radius: 4px;
      margin-bottom: 16px;
      padding: 0 16px;
      line-height: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      .handler {
        .status {
          margin-right: 10px;
        }
      }
      i {
        color: @blue;
        font-size: 12px;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}
</style>
