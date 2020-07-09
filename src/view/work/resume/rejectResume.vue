<template>
  <div class="page">
    <stickyHeader title="淘汰候选人" />
    <van-field-select-picker
      v-model="reason"
      class="content"
      label="淘汰原因"
      required
      input-align="right"
      placeholder="请选择淘汰原因"
      :columns="relationColumns"
    />
    <van-field
      class="content noBorderBottom"
      label="备注"
      readonly
    />
    <van-field
      v-model="content"
      rows="10"
      autosize
      type="textarea"
      maxlength="200"
      placeholder="请输入"
      show-word-limit
    />
    <div class="bottom">
      <div>
        <van-button
          type="info"
          block
          :loading="loading"
          @click="submit"
        >
          确认淘汰
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import VanFieldSelectPicker from '@/components/vanFieldSelectPicker/vanFieldSelectPicker'
import { rejectResume } from '@/api/work'
import { Toast } from 'vant'
export default {
  name: 'RejectResume',
  components: {
    StickyHeader,
    VanFieldSelectPicker
  },
  data() {
    return {
      content: '',
      loading: false,
      reason: '',
      relationColumns: [
        '不符合岗位条件',
        '专业技能欠缺',
        '沟通表达能力差',
        '候选人放弃',
        '薪资要求过高',
        '稳定性较差',
        '相关经验过少',
        '其他'
      ]
    }
  },
  methods: {
    submit() {
      if (!this.reason) {
        Toast('淘汰原因必须选择')
        return
      }
      const params = {
        userId: this.$store.state.user.userInfo.user_id,
        id: this.$route.query.id,
        remark: this.content,
        reason: this.reason
      }
      this.loading = true
      rejectResume(params)
        .then(() => {
          Toast('已淘汰')
          this.loading = false
          this.$router.go(-1)
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
  .content {
    margin-top: 8px;
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
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
.noBorderBottom {
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
