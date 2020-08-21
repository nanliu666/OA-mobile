<template>
  <div class="tips">
    {{ placeholder }}
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.tips {
  padding: 2.667vw 4.267vw;
  font-size: 3.733vw;
  line-height: 6.4vw;
  color: #757c85;
}
</style>
