<template>
  <div class="page">
    <stickyHeader title="账号与安全" />
    <van-cell
      is-link
      @click="toChangePhone"
    >
      <template #title>
        <span>修改手机号码</span><span class="versionClass">{{ userDetail.phonenum }}</span>
      </template>
    </van-cell>
    <van-cell
      title="修改登录密码"
      is-link
      @click="toChangePassword"
    />
  </div>
</template>
<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
export default {
      name: 'AccountSafe',
    components: {
        StickyHeader
  },
  data () {
      return {
          userDetail: {}
      }
  },
  created(){
      this.userDetail = this.$store.state.user.userDetail
  },
  methods:{
      toChangePhone(){
          this.$router.push('/me/changePhone')
      },
      toChangePassword(){
          this.$router.push('/me/changePassword')
      },
  }
}
</script>

<style lang='less' scoped>
.page{
    background-color: #f5f6f6;
  min-height: 100%;
}
.van-cell__title{
    font-size: 17px;
}
.versionClass{
    font-size: 14px;
color: #757C85;
margin-left: 11px;
}
</style>