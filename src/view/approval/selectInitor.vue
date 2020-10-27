<template>
  <div
    v-show="value.isShowInitiator"
    class="select-style"
  >
    <div>
      <sticky-header
        title="选择发起人"
        @leftClick="handleBack"
      />
      <van-search
        v-model="searchValue"
        class="select-search"
        shape="round"
        show-action
        placeholder="请输入员工姓名/工号搜索"
        @search="onSearch"
        @cancel="onCancel"
      />
    </div>
    <van-skeleton
      :loading="value.skeletonLoading"
      title
      class="skeleton-class"
      :row="3"
    >
      <div class="org-style">
        <div class="org-header">
          <svg
            class="icon iconImg"
            aria-hidden="true"
          >
            <use xlink:href="#iconbranch-bicolor" />
          </svg>
          <span class="icon-title">组织架构</span>
        </div>
        <div class="org-container">
          <initor-list :list.sync="value.orgData[0]" />
        </div>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import initorList from './initorList'
export default {
  name: 'SelectInitor',
  components: {
    initorList
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      searchValue: ''
    }
  },
  mounted() {},
  methods: {
    onSearch() {
      this.$emit('search', { search: this.searchValue })
    },
    onCancel() {},
    handleBack() {
      this.value.isShowInitiator = false
      this.$emit('input', this.value)
    }
  }
}
</script>
<style lang="less" scoped>
.skeleton-class {
  background-color: #fff;
}
.select-search {
  .van-cell {
    border-bottom: 0;
  }
}
.select-style {
  .org-style {
    background-color: #fff;
    .org-header {
      display: flex;
      padding: 10px 15px;
      align-items: center;
      .icon {
        width: 1.5em;
        height: 1.5em;
      }
      .icon-title {
        margin-left: 6px;
        font-size: 18px;
        font-weight: 550;
      }
    }
    .org-container {
      padding: 0 15px;
    }
  }
}
</style>
