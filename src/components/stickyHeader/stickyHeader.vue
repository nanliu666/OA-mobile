<template>
  <van-sticky>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #title>
        <slot name="title" />
      </template>
      <template #right>
        <slot name="right" />
      </template>
    </van-nav-bar>
    <slot name="footer" />
  </van-sticky>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClickLeft() {
      if (this.$listeners.leftClick) {
        this.$listeners.leftClick()
        return
      }
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
// /deep/ .van-icon-arrow-left {
//   color: #d8d8d8;
// }
// /deep/ .van-nav-bar__title {
//   color: #d8d8d8;
// }
</style>
