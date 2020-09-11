<template>
  <div>
    <div
      v-if="!isAgree"
      class="details"
    >
      <stickyHeader title="审批详情" />
      <div class="nav flex flex-center">
        <div class="flex flex-center">
          <div>
            <span class="iconfont icon-usercircle hander_icon" />
          </div>
          <div>
            <div class="title_name">
              {{ detailData.title }}申请
            </div>
            <div
              class="status"
              :class="[detailData.status]"
            >
              {{ detailData.status | status }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="formData.length > 0"
        class="form_content"
      >
        <div
          v-for="(item, index) in formData"
          :key="index"
        >
          <span class="text">{{ item.label }}</span>：<span>{{ item.content }}</span>
        </div>
      </div>
      <div
        class="progress_content"
        :class="[!isFished && !isCancel && !isReject ? 'progress_bottom' : '']"
      >
        <template>
          <div
            v-for="(item, i) in PassApproval"
            :key="i"
            class="line  active"
            :class="[i === PassApproval.length - 1 ? 'record' : '']"
          >
            <div class="icon_header">
              <div class="iconfont icon-icon-personblue2 icon_Default" />
            </div>
            <van-icon
              v-if="item.result !== 'Cancel' && item.result == ''"
              name="fail"
              color="#fff"
              class="fail"
            />
            <van-icon
              v-else
              name="success"
              color="#fff"
              class="success"
            />
            <div class="personalInfo">
              <div class="title_name flex flex-between">
                <div v-if="item.nodeId === 'start'">
                  <span>发起申请</span> <span class="time">{{ item.approveTime }}</span>
                </div>
                <div v-else>
                  <span>{{ item.nodeName }}</span> <span class="time">{{ item.approveTime }}</span>
                </div>
                <div
                  class="Approve "
                  :class="[
                    item.result === 'Cancel'
                      ? 'Cancel'
                      : item.nodeId === 'start'
                        ? 'start'
                        : item.result
                  ]"
                >
                  {{ result(item.result, item.nodeId) }}
                </div>
              </div>
              <div class="name">
                {{ item.userName }}
              </div>
            </div>
          </div>
        </template>
        <template v-if="!isReject && !isCancel">
          <div
            v-for="item in showNodeData"
            :key="item.nodeId"
            class="line"
          >
            <div class="icon_header">
              <div class="iconfont icon-icon-personblue2 icon_Default" />
            </div>
            <div class="personalInfo">
              <div class="title_name flex flex-between">
                <div>
                  <span>{{ item.properties && item.properties.title }}</span>
                  <!--              <span class="time" >05-07 10：47</span>-->
                </div>
                <!--            <div class="status_start" >发起</div>-->
              </div>
              <!--          <div class="name">-->
              <!--            张三-->
              <!--          </div>-->
              <div
                v-if="item.properties && item.properties.counterSign"
                class="countersign"
              >
                需要所有审批人同意
              </div>
              <div
                v-if="item.properties && item.properties.counterSign === false"
                class="countersign"
              >
                1人同意即可
              </div>
              <div class="flex—wrap flex-center">
                <div
                  v-for="user in item.userList"
                  :key="user.id"
                  class="info"
                >
                  <div class="iconfont icon-usercircle icon_default" />
                  <div class="info_text">
                    {{ user.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div
        v-if="!isFished && !isCancel && !isReject"
        class="footer"
      >
        <span
          v-if="isShowCancel && isApplyUser"
          class="buttton cannal"
          @click="handleCannal"
        >撤回</span>
        <span
          v-if="isShowBtns"
          class="buttton"
          @click="handleAgree('Reject')"
        >拒绝</span>
        <span
          v-if="isShowBtns"
          class="buttton"
          @click="handleAgree('Pass')"
        >同意</span>
        <span
          v-if="!isCancel && !isReject && !isFished && isApplyUser"
          class="buttton"
          @click="handelUrge"
        >催办</span>
      </div>
    </div>
    <appro-idea
      v-if="isAgree"
      :type="type"
      :process-id="detailData.processId"
      :task-id="taskId"
      :process-instance-id="processInstanceId"
      @close="close"
    />
  </div>
</template>

<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import { getApplyDetail, getApplyRecord, createApprUrge, createApprCancel } from '@/api/approval'
import approIdea from './approIdea'

export default {
  name: 'ApproDetails',
  components: {
    StickyHeader,
    approIdea
  },
  filters: {
    status(data) {
      let status = {
        Pass: '通过',
        Approve: '审批中',
        Cancel: '取消申请',
        Reject: '已回退'
      }
      return status[data]
    }
  },
  data() {
    return {
      type: '',
      taskId: '',
      newData: [],
      processInstanceId: '',
      applyUserId: '',
      apprNo: '',
      isAgree: false,
      isReject: false,
      activeStep: 0,
      isCancel: false,
      isFished: false,
      apprUserIdList: [],
      detailData: {},
      recordData: [],
      PassApproval: [],
      active: 1,
      nodeData: [],
      formData: [
        { text: '审批管理', val: '20200507000086' },
        { text: '所属部门', val: '销售部' },
        { text: '审批管理', val: '20200507000086' },
        { text: '所属部门', val: '销售部' },
        { text: '审批管理', val: '20200507000086' },
        { text: '所属部门', val: '销售部' },
        { text: '审批管理', val: '20200507000086' },
        { text: '所属部门', val: '销售部' }
      ]
    }
  },
  computed: {
    showNodeData: function() {
      return this.newData.filter((item) => {
        if (
          item.type !== 'copy' &&
          item.type !== 'start' &&
          item.appravalList &&
          item.appravalList.length == 0
        ) {
          return item
        }
      })
    },
    // 拒绝同意是否显示 审批节点的审批人的用户id和当前用户相同显示
    isShowBtns() {
      let result = false
      this.apprUserIdList.forEach((item) => {
        if (item == this.$store.getters.userId) {
          result = true
        }
      })
      return result
    },
    // 提交人跟当前用户是否同一个人
    isApplyUser: function() {
      if (this.$store.getters.userId !== this.applyUserId) {
        return false
      } else {
        return true
      }
    },
    // 撤回按钮是否显示
    isShowCancel() {
      let res = false
      let result = []

      this.recordData.map((it) => {
        result.push(it.result)
      })
      !result.includes('Pass') &&
        !result.includes('Reject') &&
        !result.includes('Cancel') &&
        (res = true)
      return res
    }
  },
  async mounted() {
    await this.getDetails()
    await this.getRecord()
  },
  methods: {
    close() {
      this.isAgree = false
    },
    handleAgree(type) {
      this.isAgree = true
      this.type = type
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        done()
        this.createApprCancel()
      } else {
        done()
      }
    },
    handleCannal() {
      let that = this
      this.$dialog.confirm({
        title: '标题',
        message: '确定撤销申请吗？',
        beforeClose: that.beforeClose
      })
    },
    createApprCancel() {
      let params = {
        processInstanceId: this.detailData.processInstanceId
      }
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })

      createApprCancel(params).then(() => {
        //   console.log(res)
        this.$toast.clear()
        this.$toast({ type: 'success', message: '撤回成功' })
        setTimeout(() => {
          this.$router.go(-1)
        }, 2000)
      })
    },
    result(data, type) {
      let result = {
        Pass: '通过',
        Cancel: '已撤回',
        Reject: '已退回'
      }
      if (data === 'Cancel') {
        return '取消申请'
      }
      if (type === 'start') {
        return '发起'
      } else {
        return result[data] || '审批中'
      }
    },
    getDetails() {
      let params = {
        apprNo: this.$route.query.apprNo
      }
      return new Promise((resolve, reject) => {
        getApplyDetail(params)
          .then((res) => {
            this.detailData = res
            this.apprNo = res.apprNo
            resolve(true)
            this.formData = res.formData ? JSON.parse(res.formData) : []
            this.nodeData = res.nodeData ? JSON.parse(res.nodeData) : []
          })
          .catch(() => {
            reject(false)
          })
      })
    },
    getRecord() {
      let params = {
        apprNo: this.apprNo
      }
      return new Promise((resolve, reject) => {
        getApplyRecord(params)
          .then((res) => {
            this.recordData = res.data
            this.applyUserId = this.recordData[0].userId
            this.processInstanceId = res.processInstanceId
            this.PassApproval = JSON.parse(JSON.stringify(this.recordData))
            this.nodeData.map((it) => {
              it.appravalList = []
              this.recordData.map((item) => {
                item.nodeId == it.nodeId && it.appravalList.push(item)
                item.nodeId === it.type && it.appravalList.push(item)
              })
            })
            this.newData = this.nodeData
            let nodeData = JSON.parse(JSON.stringify(this.nodeData))
            nodeData = nodeData.filter((it) => {
              if (it.type !== 'copy') {
                return it
              }
            })
            nodeData &&
              nodeData.length > 0 &&
              nodeData.map((it, index) => {
                let result = []
                it.appravalList &&
                  it.appravalList.length > 0 &&
                  it.appravalList.map((item) => {
                    result.push(item.result)
                  })
                if (it.appravalList && it.appravalList.length > 0) {
                  if (result.includes('Reject')) {
                    this.isReject = true
                    this.activeStep = index
                  } else if (result.includes('Cancel')) {
                    this.isCancel = true
                    this.activeStep = index
                  } else if (result.includes('')) {
                    this.activeStep = index
                  } else if (index === nodeData.length - 1 && result.includes('Pass')) {
                    this.isFished = true
                    this.activeStep = index
                  }
                }
                if (it.type === 'start') {
                  it.result === 'Cancel' && (this.isCancel = true)
                }
              })
            if (!this.isCancel && !this.isReject && !this.isFished) {
              this.apprUserIdList = []
              this.recordData.forEach((item, index) => {
                if (item.result === '' && index != 0) {
                  this.apprUserIdList.push(item.userId)
                }
              })
            }
            this.processInstanceId = this.detailData.processInstanceId
            this.recordData.map((it) => {
              this.$store.getters.userId === it.userId && (this.taskId = it.taskId)
            })
            resolve(true)
          })
          .catch(() => {
            reject(false)
          })
      })
    },
    // 点击催一下
    handelUrge() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      createApprUrge({
        apprNo: this.apprNo,
        processInstanceId: this.processInstanceId
      })
        .then(() => {
          this.$toast.clear()
          this.$toast({ type: 'success', message: '催办成功' })
          // this.$message({
          //   type: 'success',
          //   message: '催办成功'
          // })
        })
        .catch(() => {
          this.$toast.clear()
          this.$toast('今天已经催办过了')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.details {
  background-color: #f5f6f6;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.header {
  background: #fff;
  height: 45px;
  line-height: 45px;
  text-align: center;
}

.nav {
  height: 100px;
  margin-top: 10px;
  background: #fff;
  padding: 0 16px;
  box-shadow: inset 0 1px 0 0 #dddddd, inset 0 -1px 0 0 #dddddd;

  .hander_icon {
    display: inline-block;
    width: 60px;
    height: 60px;
    font-size: 60px;
    color: #cfd3d6;
    margin-right: 14px;
  }

  .title_name {
    font-size: 17px;
    line-height: 25.5px;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis; //超出部分以省略号显示
    white-space: nowrap;
    width: 275px;
    /*font-weight: 0;*/
  }

  .status {
    width: 60px;
    line-height: 24px;
    background: #edf8ff;
    color: #6aafff;
    font-size: 12px;
    text-align: center;
    margin-top: 6.5px;
  }

  .Approve {
    color: #6aafff;
  }

  .Pass {
    color: #7ad683;
  }

  .Reject {
    color: #ff6464;
  }

  .Cancel {
    color: #ff6464;
  }
}

.flex {
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
}

.flex—wrap {
  display: flex;
  display: -webkit-flex;
  flex-flow: row wrap;
}

.flex-center {
  align-items: center;
  /*justify-content: center;*/
}

.flex-between {
  justify-content: space-between;
}

.flex-around {
  justify-content: space-around;
}

.form_content {
  margin-top: 6.5px;
  min-height: 50px;
  background: #fff;
  padding: 20px 18px;
  box-shadow: inset 0 1px 0 0 #dddddd, inset 0 -1px 0 0 #dddddd;

  > div {
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 8px;
    color: #202940;
    letter-spacing: 0;
  }

  .text {
    color: #757c85;
  }
}

.progress_bottom {
  margin-bottom: 87px;
  border-bottom: 8px solid #f5f6f6;
}

.progress_content {
  background: #fff;
  padding: 40px 32px;
  padding-bottom: 0;
  margin-top: 6.5px;

  .line {
    border-left: 1.5px solid rgba(0, 0, 0, 0.15);
    min-height: 100px;
    position: relative;

    .icon_header {
      position: absolute;
      top: -30px;
      left: -30px;
      height: 60px;
      width: 60px;
      line-height: 60px;
      text-align: center;
      overflow: hidden;
      padding: 8px 0;
      /*background: #ee0a24;*/
      background: #ffffff;

      .icon_Default {
        border-radius: 50%;
        color: #6aafff;
        font-size: 30px;
        background: #edf8ff;
      }
    }

    .personalInfo {
      position: relative;
      top: -15px;
      left: 30px;
      min-height: 40px;
      padding-bottom: 100px;
      padding-left: 15px;

      .title_name {
        font-size: 14px;
        color: #202940;
        letter-spacing: 0;
      }

      .time {
        font-size: 14px;
        color: #757c85;
        letter-spacing: 0;
        margin-left: 8px;
      }

      .Approve {
        font-size: 17px;
        color: #ffd122;
        letter-spacing: 0;
        margin-right: 16px;
      }

      .start,
      .Pass {
        margin-right: 16px;
        color: #7ad683;
        font-size: 17px;
        letter-spacing: 0;
      }

      .Reject,
      .Cancel {
        font-size: 17px;
        color: #ff6464;
        letter-spacing: 0;
        margin-right: 16px;
      }

      .name {
        font-size: 14px;
        color: #757c85;
        letter-spacing: 0;
      }

      .countersign {
        margin-top: 4px;
        font-size: 14px;
        color: #757c85;
        letter-spacing: 0;
      }

      .info {
        padding: 8px;
        padding-left: 0;
        text-align: center;

        .info_text {
          margin-top: 4px;
        }

        .icon_default {
          display: inline-block;
          height: 40px;
          width: 40px;
          text-align: center;
          line-height: 40px;
          border-radius: 50%;
          font-size: 40px;
          color: #cfd3d6;
        }
      }
    }
  }

  .active {
    border-left: 1.5px solid #207efa;
  }

  .record {
    border-left: 1.5px solid rgba(0, 0, 0, 0.15);
  }

  .line:last-child {
    border-left: 1px solid transparent;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  text-align: center;
  line-height: 87px;
  height: 87px;
  width: 100%;
  background: #fff;
  border: 1.5px solid #f5f6f6;

  .buttton {
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: 70.5px;
    height: 47px;
    line-height: 47px;
    background: #207efa;
    border-radius: 5px;
    color: #fff;
    margin: 0 5px;
    font-size: 18px;
  }

  .cannal {
    background: #f2f2f2;
    color: #202940;
    letter-spacing: 0;
  }
}

.fail {
  background: #ffd122;
  border-radius: 50%;
  padding: 2px;
  position: absolute;
  top: 18px;
  left: 12px;
  font-size: 12px;
}

.success {
  background: #7ad683;
  border-radius: 50%;
  padding: 2px;
  position: absolute;
  top: 18px;
  left: 12px;
  font-size: 12px;
}
</style>
