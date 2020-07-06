<template>
  <div class="page">
    <stickyHeader title="设置" />
    <van-cell
      title="账号与安全"
      is-link
      @click="toAccountSafe"
    />
    <van-cell
      title="关于百利宏控股"
      
      is-link
    >
      <template #title>
        <span>关于百利宏控股</span><span class="versionClass">版本1.0.0</span>
      </template>
    </van-cell>
    <div class="btn">
      <van-button
        block
        type="info"
        @click="loginout"
      >
        退出登录
      </van-button>
    </div>
  </div>
</template>
<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
export default {
    name: 'Setting',
    components: {
        StickyHeader
  },
  methods:{
      loginout(){
          this.$store.commit('SET_USER_INFO',{})
          this.$router.push({path:'/login'})
      },
      toAccountSafe(){
        this.$router.push('/me/accountSafe')
      }
  }
}
</script>

<style lang='less' scoped>
.page{
    background-color: #f5f6f6;
  min-height: 100%;
}
.versionClass{
    font-size: 14px;
color: #757C85;
margin-left: 11px;
}
.van-cell__title{
    font-size: 17px;
}
.btn{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    padding: 16px;
    background-color: #fff;
}
</style>