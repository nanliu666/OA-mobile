<template>
  <div class="page">
    <stickyHeader title="意见反馈" />
    <van-field
      label="意见反馈"
      required
      readonly
    />
    <van-field
      v-model="content"
      rows="2"
      autosize
      type="textarea"
      maxlength="60"
      placeholder="请输入"
      show-word-limit
    />
    <div class="bottom">
      <div class="anonymous">
        <van-checkbox
          v-model="anonymous"
          shape="square"
        >
          匿名
        </van-checkbox>
        <div class="prompt">
          勾选匿名后，意见反馈内容将以匿名的方式提交
        </div>
      </div>

      <div>
        <van-button
          type="info"
          block
          :loading="loading"
          @click="submit"
        >
          提交
        </van-button>
      </div>
    </div>
    <van-overlay :show="resolvePopup">
      <div
        v-show="resolvePopup"
        class="rejectPopup"
      >
        <van-icon
          name="checked"
          class="resolveIcon"
        />
        <div class="title">
          提交成功
        </div>
        <div class="word">
          感谢您的宝贵意见反馈，我们会跟进处理
        </div>
        <div class="joinBtn">
          <van-button
            round
            block
            type="info"
            @click="backHome"
          >
            返回我的
          </van-button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import { postUserFeedback } from '@/api/user'
import { Toast } from 'vant'
export default {
  name: 'Feedback',
  components: {
    StickyHeader
  },
  data() {
    return {
      content: '',
      anonymous: false,
      loading: false,
      resolvePopup: false
    }
  },
  methods: {
    submit() {
      if (!this.content.trim()) {
        Toast('意见反馈不能为空')
        return
      }
      const params = {
        userId: this.$store.state.user.userInfo.user_id,
        content: this.content,
        isUnknown: this.anonymous ? 1 : 0
      }
      this.loading = true
      postUserFeedback(params)
        .then(() => {
          Toast('反馈成功')
          this.loading = false
          this.resolvePopup = true
        })
        .catch(() => {
          this.loading = false
        })
    },
    backHome() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  background-color: #f5f6f6;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .bottom {
    flex: 1;
    margin-top: 8px;
    background-color: #fff;
    padding: 24px 16px 16px;
    display: flex;
    flex-direction: column;
    /deep/ .van-checkbox__label {
      color: #000;
    }
    .anonymous {
      flex: 1;
      .prompt {
        margin-top: 8px;
        font-size: 14px;
        color: #757c85;
        line-height: 25px;
      }
    }
  }
}
.van-cell--required {
  border-bottom: 0;
  padding-bottom: 0;
}
.van-checkbox {
  border-radius: 3px;
  /deep/ .van-icon {
    border-radius: 3px;
  }
}
.rejectPopup {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  .title {
    font-size: 18px;
    color: #202940;
    margin-top: 20px;
  }
  .word {
    font-size: 14px;
    color: #0e001c;
    line-height: 25px;
  }
  .resolveIcon {
    color: #1677ff;
    font-size: 89px;
  }
  .rejectIcon {
    font-size: 89px;
    color: #757c85;
  }
}
.joinBtn {
  position: fixed;
  bottom: 0;
  margin-top: 20px;
  padding: 16px;
  width: calc(100% - 32px);
  background-color: #fff;
  /deep/ .van-button {
    border-radius: 5px;
  }
}
</style>
