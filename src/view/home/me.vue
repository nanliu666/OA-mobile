<template>
  <div>
    <van-cell
      is-link
      class="userInfo"
      @click="toPersonalInfo"
    >
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <div
          class="person-cell"
        >
          <van-image
            round
            class="avatarClass"
            :src="userInfo.avatarUrl"
          />
          <div class="title">
            <div class="title-top">
              <span class="custom-title">{{ userInfo.name + '（' +userInfo.workNo + '）' }}</span>
              <van-tag
                type="primary"
                plain
              >
                {{ statusWord[userInfo.status] }}
              </van-tag>
            </div>
            <div class="title-bottom">
              <span class="custom-title">{{ userInfo.orgName + ' | '+ userInfo.jobName }}</span>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:error>
        加载失败
      </template>
    </van-cell>
    <div class="setting">
      <van-cell
        title="意见反馈"
        is-link
        @click="toFeedback"
      />
      <van-cell
        title="设置"
        is-link
        @click="toSetting"
      />
    </div>
  </div>
</template>
<script>
import {getUserInfo} from '@/api/user'
export default {
  data() {
    return {
      userInfo: {},
      statusWord: {
        onJob: '在职',
        Formal: '正式',
        Try: '试用期',
        WaitLeave: '待离职',
        Leaved: '已离职'
      },
    }
  },
  created(){
    getUserInfo({userId:this.$store.state.user.userInfo.user_id}).then(res =>{
      this.userInfo = res
      this.$store.commit('SET_USER_DETAIL', res)
    })
    
  },
  methods:{
    toFeedback(){
      this.$router.push('/me/feedback')
    },
    toSetting(){
      this.$router.push('/me/setting')
    },
    toPersonalInfo(){
      this.$router.push('/me/personalInfo')
    }
  }
}
</script>

<style lang='less' scoped>
.userInfo{
  height: 100px;
  padding: 20px 16px;
  .van-icon-arrow{
    line-height: 60px;
  }
}
.person-cell {
  display: flex;
  align-content: center;
  .title {
    margin-left: 14px;
    padding-top: 5px;
    .title-top {
      margin-bottom: 6px;
      .custom-title {
        font-size: 17px;
       
        margin-right: 11px;
      }
      .van-tag{
        padding: 5px 12px;
        font-size: 12px;
      }
    }
    .title-bottom {
      color: #888888;
    }
  }
}
.avatarClass {
  width: 60px;
  height: 60px;
}
.setting{
  margin-top: 8px;
}
</style>