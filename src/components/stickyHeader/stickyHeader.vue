<template>
  <van-sticky>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
    />
  </van-sticky>
</template>
<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    leftClick: {
      type: Function,
      required: false
    }
  },
  methods: {
    onClickLeft() {
      if (this.leftClick) {
        this.leftClick()
        return
      }
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar {
  background-color: #207efa;
}

/deep/ .van-icon-arrow-left {
  color: #d8d8d8;
}
/deep/ .van-nav-bar__title {
  color: #d8d8d8;
}
</style>
