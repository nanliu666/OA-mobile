<template>
  <div class="page">
    <div class="basic-info">
      <div class="basic">
        <div class="company">
          {{ userInfo.companyName }}
        </div>
        <div class="hello">
          你好，{{ userInfo.name }}（{{ userInfo.workNo }}）
        </div>
      </div>
      <van-image
        round
        class="avatarClass"
        :src="userInfo.avatarUrl"
      >
        <template v-slot:error>
          加载失败
        </template>
      </van-image>
    </div>
    <div class="workbox">
      <div class="iconbox">
        <div class="iconItem">
          <van-image
            class="iconImg"
            :src="userInfo.avatarUrl"
          >
            <template v-slot:error>
              加载失败
            </template>
          </van-image>
          <div class="title">
            审批
          </div>
        </div>
        <div class="iconItem">
          <van-image

            class="iconImg"
            :src="userInfo.avatarUrl"
          >
            <template v-slot:error>
              加载失败
            </template>
          </van-image>
          <div class="title">
            待办
          </div>
        </div>
        <div class="iconItem">
          <van-image
  
            class="iconImg"
            :src="userInfo.avatarUrl"
          >
            <template v-slot:error>
              加载失败
            </template>
          </van-image>
          <div class="title">
            日程
          </div>
        </div>
        <div class="iconItem">
          <van-image
            class="iconImg"
            :src="userInfo.avatarUrl"
          >
            <template v-slot:error>
              加载失败
            </template>
          </van-image>
          <div class="title">
            任务
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/user'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    getUserInfo({ userId: this.$store.state.user.userInfo.user_id }).then((res) => {
      this.userInfo = res
      this.$store.commit('SET_USER_DETAIL', res)
    })
  }
}
</script>

<style lang='less' scoped>
.page {
  height: 100%;
  background-color: #f5f6f6;
  overflow: scroll;
}
.basic-info {
  height: 145px;
  background-image: linear-gradient(180deg, #207efa 0%, #0ea6fe 100%);
  // padding: 17px 34px 60px 25px;
  padding: 0 34px 0px 25px;
  display: flex;
  justify-content: bet;
  .basic {
    flex: 1;
    margin-top: 34px;
    .company {
      font-size: 14px;
      color: #ffffff;
      margin-bottom: 4px;
    }
    .hello {
      font-size: 16px;
      color: #ffffff;
    }
  }
  .avatarClass {
    margin-top: 22px;
    width: 60px;
    height: 60px;
    /deep/ .van-image__loading {
      width: 60px;
      height: 60px;
    }
  }
}

.workbox {
  height: 70px;
  background-color: #fff;
  position: relative;
  .iconbox {
    display: flex;
    position: absolute;
    height: 103px;
    left: 16px;
    right: 16px;
    bottom: 8px;
    background-color: #fff;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    .iconItem{
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .iconImg{
        height: 41px;
        width: 41px;
      }
      .title{
        margin-top: 8px;
        font-size: 14px;
        color: #718199;
      }
    }
  }
}
</style>