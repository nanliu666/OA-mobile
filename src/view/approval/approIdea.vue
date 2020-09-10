<template>
  <div
    class="idea"
    style="z-index: 999"
  >
    <StickyHeader
      :title="headerTitle"
      @leftClick="close"
    />
    <div class="content">
      <van-field
        v-model="message"
        rows="21"
        type="textarea"
        maxlength="2000"
        :show-word-limit="isshow"
        :placeholder="tip"
      />
    </div>
    <div class="footer">
      <div
        v-if="type == 'Pass'"
        class="footerButton"
        @click="agree"
      >
        确认同意
      </div>
      <div
        v-else
        class="footerButton"
        @click="reject"
      >
        确认拒绝
      </div>
    </div>
  </div>
</template>

<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import { getProcessDetail, createApprPass, createApprReject } from '@/api/approval'

export default {
  name: 'ApproIdea',
  components: {
    StickyHeader
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    processId: {
      type: String,
      default: ''
    },
    processInstanceId: {
      type: String,
      default: ''
    },
    taskId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      headerTitle: '审批意见',
      textarea: '',
      isshow: true,
      message: '',
      isOpinion: '',
      tip: ''
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    agree() {
      let params = {
        userId: this.$store.getters.userId,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        comment: this.message
      }
      if (this.isOpinion && !this.message) {
        this.$toast('审批意见必须填写')
      }
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      createApprPass(params)
        .then(() => {
          this.$toast.clear()
          this.$toast({ type: 'success', message: '已同意' })
          this.$emit('')
          this.$listeners.close()
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        })
        .catch(() => {
          this.$toast.clear()
        })
    },
    reject() {
      let params = {
        userId: this.$store.getters.userId,
        taskId: this.taskId,
        processInstanceId: this.processInstanceId,
        comment: this.message
      }
      if (this.isOpinion && !this.message) {
        this.$toast('审批意见必须填写')
      }
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      createApprReject(params)
        .then(() => {
          this.$toast.clear()
          this.$toast({ type: 'success', message: '已拒绝' })
          this.$listeners.close()
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        })
        .catch(() => {
          this.$toast.clear()
        })
    },
    getDetail() {
      let params = {
        processId: this.processId
      }
      getProcessDetail(params).then((res) => {
        let { tip, isOpinion } = res
        this.tip = tip ? top : '请输入留言'
        this.isOpinion = isOpinion
      })
    },
    close() {
      this.$emit('close')
    },
    leftClick() {
      // console.log(1)
    }
  }
}
</script>

<style lang="less" scoped>
.idea {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  .content {
    border-top: 8px solid #f5f6f6;
    position: absolute;
    width: 100%;
    height: 30%;
    .text {
      height: 100%;
      width: 100%;
    }
  }
  .footer {
    position: absolute;
    bottom: 0px;
    padding: 10px 6px;

    width: 100%;
    box-sizing: border-box;
    text-align: center;
    .footerButton {
      background: #207efa;
      height: 40px;
      line-height: 40px;
      color: #fff;
      border-radius: 8px;
    }
  }
}
</style>
