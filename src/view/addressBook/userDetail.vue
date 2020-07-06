<template>
  <div class="page">
    <stickyHeader>
      <template #title>
        <div>
          <van-image
            round
            class="avatarClass"
            :src="userInfo.avatarUrl"
          />
          <div class="title">
            <div class="title-top">
              <span class="custom-title">{{ userInfo.name }}</span>
            </div>
            <div class="title-bottom">
              <span class="custom-title">{{ '（' +userInfo.workNo + '）' }}</span>
            </div>
          </div>
        </div>
      </template>
    </stickyHeader>
    <div class="detail">
      <van-cell is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="cell-top">
            手机号码
          </div>
          <div
            class="cell-bottom"
            style="color:#207efa"
            @click="showPhoneCopy"
          >
            {{ userInfo.phonenum }}
          </div>
        </template>
      </van-cell>
      <van-cell is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="cell-top">
            公司邮箱
          </div>
          <div
            v-longpress="copyEmail"
            class="cell-bottom"
          >
            {{ userInfo.email }}
          </div>
        </template>
      </van-cell>
      <van-cell
        is-link
        @click="toOrgDetail"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="cell-top">
            部门
          </div>
          <div class="cell-bottom">
            {{ userInfo.orgName }}
          </div>
        </template>
      </van-cell>
      <van-cell is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="cell-top">
            职位
          </div>
          <div class="cell-bottom">
            {{ userInfo.jobName }}
          </div>
        </template>
      </van-cell>
      <van-cell
        is-link
        @click="toLeaderDetail"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="cell-top">
            上级领导
          </div>
          <div class="cell-bottom">
            {{ userInfo.leaderName }}
          </div>
        </template>
      </van-cell>
    </div>
    <van-action-sheet
      v-model="copyPhoneShow"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="phoneActionSelect"
      @cancel="onCancel"
    />
  </div>
</template>
<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import { getUserInfo } from '@/api/user'
import { Toast, Dialog } from 'vant'
export default {
  components: {
    StickyHeader
  },
  data() {
    return {
      userInfo: {
        name: 'SugarKing',
        workNo: '0253',
        phonenum: '18888888888',
        email: 'maomao@bailihong.com.cn',
        orgName: '交互设计一组',
        jobName: '交互设计师',
        leaderName: '王嘉尔'
      },
      copyPhoneShow: false,
      actions: [{ name: '呼叫' }, { name: '复制' }]
    }
  },
  created() {
    getUserInfo({ userId: this.$route.params.userId }).then((res) => {
      this.userInfo = res
    })
  },
  methods: {
    showPhoneCopy() {
      this.copyPhoneShow = true
    },
    phoneActionSelect(action) {
      if (action.name === '呼叫') {
        Dialog.confirm({
          message: '+86 ' + this.userInfo.phonenum,
          confirmButtonText: '呼叫',
          width: 260
        }).then(() => {
          window.location.href = 'tel://' + this.userInfo.phonenum
          this.copyPhoneShow = false
        })
      } else if (action.name === '复制') {
        this.$copyText(this.userInfo.phonenum)
          .then(() => {
            Toast('已复制')
            this.copyPhoneShow = false
          })
          .catch(() => {
            Toast('复制失败')
            this.copyPhoneShow = false
          })
      }
    },
    copyEmail() {
      this.$copyText(this.userInfo.email)
        .then(() => {
          Toast('已复制')
        })
        .catch(() => {
          Toast('复制失败')
        })
    },
    toOrgDetail() {
      this.$router.push('/addressBook/orgDetail/' + this.userInfo.orgId)
    },
    toLeaderDetail() {
      this.$router.push('/addressBook/userDetail/' + this.userInfo.leaderId)
    }
  }
}
</script>

<style lang='less' scoped>
.page {
  background-color: #f5f6f6;
  min-height: 100%;
}
/deep/ .van-nav-bar {
  height: 150px;
  align-items: flex-start;
}
/deep/.van-nav-bar__left {
  align-items: flex-start;
  padding-top: 16px;
}
/deep/ .van-nav-bar__title {
  margin-top: 20px;
}
.avatarClass {
  width: 60px;
  height: 60px;
}
.detail {
  margin-top: 8px;
  border-top: 1px solid #eeeeee;
}
.title {
  .title-top {
    .custom-title {
      font-size: 17px;
      color: #000000;
    }
  }
  .title-bottom {
    .custom-title {
      font-size: 14px;
      color: #207efa;
    }
  }
}
.cell-bottom {
  margin-top: 8px;
  font-size: 17px;
}
.cell-top {
  font-size: 14px;
  color: #888888;
}
.van-cell {
  align-items: center;
}
</style>