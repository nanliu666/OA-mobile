<template>
  <div>
    <div
      v-show="!isAgree"
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
      <!-- 有修改权限的和无修改权限的展示原理不一样 -->
      <div
        v-if="!isIncludeCurrentApprove"
        class="form_content"
      >
        <div
          v-for="(item, index) in formDetailData"
          :key="index"
        >
          <span class="text">{{ item.label }}</span>：<span>{{ item.defaultValue }}</span>
        </div>
      </div>
      <dynamic-form
        v-show="isIncludeCurrentApprove"
        ref="formParser"
      />
      <div class="progress_content">
        <div
          v-for="(item, index) in showNodeData"
          :key="index"
          class="line"
          :class="{ active: index < PassApproval.length - 1 }"
        >
          <div class="icon_header">
            <svg
              class="icon iconImg"
              aria-hidden="true"
            >
              <use :[symbolKey]="`${getIcon(item)}`" />
            </svg>
          </div>
          <span v-if="item.appravalList">
            <van-icon
              v-if="item.appravalList[0].result !== 'Cancel' && item.appravalList[0].result == ''"
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
          </span>
          <div class="personalInfo">
            <div class="title_name flex flex-between">
              <div>
                <span>{{ item.type !== 'start' ? item.properties.title : '发起申请' }}</span>
                <span
                  v-if="item.appravalList && item.appravalList.length !== 0"
                  class="time"
                >{{
                  item.appravalList[0].approveTime
                }}</span>
              </div>
              <div
                v-if="item.appravalList && item.appravalList.length !== 0"
                class="Approve "
                :class="[
                  item.appravalList[0].result === 'Cancel'
                    ? 'Cancel'
                    : item.appravalList[0].nodeId === 'start'
                      ? 'start'
                      : item.appravalList[0].result
                ]"
              >
                {{ getResult(item.appravalList[0].result, item.appravalList[0].nodeId) }}
              </div>
            </div>
            <!-- 非起始/抄送节点，并且未经过的节点（result为空）才需要显示 -->
            <div
              v-if="
                item.type !== 'copy' &&
                  item.type !== 'start' &&
                  item.appravalList &&
                  item.appravalList[0].result === ''
              "
            >
              <div
                v-if="item.properties.counterSign"
                class="countersign"
              >
                需要所有审批人同意
              </div>
              <div
                v-if="!item.properties.counterSign"
                class="countersign"
              >
                1人同意即可
              </div>
            </div>
            <div
              v-if="item.appravalList"
              class="flex—wrap flex-center"
            >
              <div
                v-for="(user, index) in item.appravalList"
                :key="index"
                class="info"
              >
                <div class="iconfont icon-usercircle icon_default" />
                <div class="info_text">
                  {{ user.userName }}
                </div>
              </div>
            </div>
            <div
              v-if="!item.appravalList"
              class="flex—wrap flex-center"
            >
              <div
                v-for="(user, index) in item.userList"
                :key="index"
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
      </div>
      <!-- 有无审批权限按钮，当前审批列表存在当前用户 -->
      <div
        v-if="isIncludeCurrentApprove"
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
          v-if="isApplyUser"
          class="buttton"
          @click="handelUrge"
        >催办</span>
      </div>
    </div>
    <appro-idea
      v-show="isAgree"
      :type="type"
      :process-id="detailData.processId"
      :task-id="taskId"
      :process-instance-id="detailData.processInstanceId"
      @close="close"
    />
  </div>
</template>

<script>
import DynamicForm from '@/components/dynamic-form/render'
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import { getApplyDetail, getApplyRecord, createApprUrge, createApprCancel } from '@/api/approval'
import approIdea from './approIdea'
import { Base64 } from 'js-base64'
import { mapGetters } from 'vuex'

export default {
  name: 'ApproDetails',
  components: {
    StickyHeader,
    approIdea,
    DynamicForm
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
      symbolKey: 'xlink:href',
      // 仅展示的数据容器
      formDetailData: [],
      isIncludeCurrentApprove: false,
      type: '',
      taskId: '',
      isApplyUser: false,
      isAgree: false,
      isReject: false,
      isCancel: false,
      isFished: false,
      apprUserIdList: [],
      detailData: {},
      recordData: [],
      PassApproval: [],
      nodeData: [], // 原始nodeData
      showNodeData: [] //  根据当前状态，流转的记录合成的展示数据
    }
  },
  computed: {
    ...mapGetters(['userId']),
    // 拒绝/同意按钮是否显示 审批节点的审批人的用户id和当前用户相同显示
    isShowBtns() {
      let result = false
      this.apprUserIdList.forEach((item) => {
        if (item == this.$store.getters.userId) {
          result = true
        }
      })
      return result
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
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    await this.getDetails()
    await this.getRecord()
    this.initForm()
    this.$toast.clear()
  },
  methods: {
    getIcon(icon) {
      const iconSymbol = {
        copy: 'iconCC-bicolor',
        approver: 'iconseal-bicolor',
        start: 'iconrecruit-bicolor'
      }
      return `#${iconSymbol[icon.type]}`
    },
    close() {
      this.isAgree = false
    },
    handleAgree(type) {
      if (this.isIncludeCurrentApprove) {
        this.$refs.formParser.validate().then(() => {
          this.insetHandleAgree(type)
        })
      } else {
        this.insetHandleAgree(type)
      }
    },
    insetHandleAgree(type) {
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
      if (this.isIncludeCurrentApprove) {
        this.$refs.formParser.validate().then(() => {
          this.insetHandlerCancel()
        })
      } else {
        this.insetHandlerCancel()
      }
    },
    insetHandlerCancel() {
      let that = this
      this.$dialog.confirm({
        title: '标题',
        message: '确定撤回申请吗？',
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
        this.$toast.clear()
        this.$toast({ type: 'success', message: '撤回成功' })
        setTimeout(() => {
          this.$router.go(-1)
        }, 2000)
      })
    },
    getResult(data, type) {
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
            this.nodeData = res.nodeData ? JSON.parse(res.nodeData) : []
            resolve(true)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /**
     * 在processData数据内寻找当前节点
     */
    findCurrentNode(processData) {
      let currentNode = Object.create(null)
      const compareNodeId = this.recordData[this.recordData.length - 1].nodeId
      const loop = (node) => {
        if (node.nodeId === compareNodeId || node.type === compareNodeId) {
          currentNode = node
        } else {
          loop(node.childNode)
        }
      }
      loop(processData)
      return currentNode
    },
    /**
     * 判断当前进行节点审批人是否包含当前用户
     */
    getIsInclude() {
      this.isIncludeCurrentApprove =
        _.findIndex(this.PassApproval[this.PassApproval.length - 1], (item) => {
          return item.userId === this.userId
        }) > -1
    },
    /**
     * 获取仅在formPrivilege === 1 && 当前节点不是当前审批人时候
     */
    getFormDetail(formData) {
      formData.fields.map((field) => {
        if (field.__config__.defaultValue) {
          this.formDetailData.push(field.__config__)
        }
      })
    },
    /**
     * 处理生成符合动态表格的数据
     */
    handleFormData(processData, formData) {
      if (typeof formData === 'object') {
        const currentNode = this.findCurrentNode(processData)
        const formOperates = currentNode.properties.formOperates
        if (formOperates && formOperates.length > 0) {
          formOperates.map((item) => {
            formData.fields.map((formItem) => {
              if (item.formId === formItem.__config__.formId) {
                formItem.__config__.formPrivilege = item.formPrivilege
              }
            })
          })
        }
        this.$refs.formParser.init(formData)
      }
    },
    /**
     * 初始化表单生成器的数据，拼接成当前节点的表单权限的数据
     */
    initForm() {
      const { processData, formData } = JSON.parse(Base64.decode(this.detailData.formData))
      this.getIsInclude()
      // 仅展示的数据
      if (!this.isIncludeCurrentApprove) {
        this.getFormDetail(formData)
      } else {
        //动态表格数据
        this.handleFormData(processData, formData)
      }
    },
    /**
     * PassApproval存在会签/或签（即多人审批）数据处理
     */
    getPassApproval() {
      let group = _.groupBy(this.recordData, 'nodeId')
      this.showNodeData = _.cloneDeep(this.nodeData)
      _.mapKeys(group, (value, key) => {
        this.showNodeData.map((item) => {
          if (item.nodeId == key || item.type == key) {
            item.appravalList = []
            item.appravalList = value
          }
        })
        this.PassApproval.push(value)
      })
    },
    /**
     * 封装了原先的nodeData的数据处理，未修改其内容
     */
    handleNodeData() {
      let copNodeData = _.cloneDeep(this.showNodeData)
      copNodeData = copNodeData.filter((it) => {
        if (it.type !== 'copy') {
          return it
        }
      })
      copNodeData &&
        copNodeData.length > 0 &&
        copNodeData.map((it, index) => {
          let result = []
          it.appravalList &&
            it.appravalList.length > 0 &&
            it.appravalList.map((item) => {
              result.push(item.result)
            })
          if (it.appravalList && it.appravalList.length > 0) {
            if (result.includes('Reject')) {
              this.isReject = true
            } else if (result.includes('Cancel')) {
              this.isCancel = true
            } else if (index === copNodeData.length - 1 && result.includes('Pass')) {
              this.isFished = true
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
    },
    getRecord() {
      let params = {
        apprNo: this.$route.query.apprNo
      }
      return new Promise((resolve, reject) => {
        getApplyRecord(params)
          .then((res) => {
            this.recordData = res.data
            // 提交人跟当前用户是否同一个人
            this.isApplyUser = this.recordData[0].userId === this.userId
            this.getPassApproval()
            this.handleNodeData()
            resolve(true)
          })
          .catch((error) => {
            reject(error)
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
        apprNo: this.$route.query.apprNo,
        processInstanceId: this.detailData.processInstanceId
      })
        .then(() => {
          this.$toast.clear()
          this.$toast({ type: 'success', message: '催办成功' })
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
  margin-bottom: 10px;
  background: #fff;
  padding: 0 16px;
  // box-shadow: inset 0 1px 0 0 #dddddd, inset 0 -1px 0 0 #dddddd;

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

.progress_content {
  background: #fff;
  padding: 40px 32px 10px;
  margin-top: 6.5px;

  .line {
    border-left: 1.5px dashed rgba(0, 0, 0, 0.15);
    min-height: 100px;
    position: relative;

    .icon_header {
      position: absolute;
      top: -30px;
      left: -30px;
      height: 40px;
      width: 40px;
      line-height: 40px;
      text-align: center;
      overflow: hidden;
      padding: 0 8px;
      /*background: #ee0a24;*/
      background: #ffffff;

      .iconImg {
        width: 100%;
        height: 100%;
      }
    }

    .personalInfo {
      position: relative;
      top: -25px;
      left: 30px;
      min-height: 40px;
      padding-bottom: 40px;
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
  box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.15);
  position: fixed;
  bottom: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  background: #fff;
  border: 1.5px solid #f5f6f6;

  .buttton {
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: 70.5px;
    height: 32px;
    line-height: 32px;
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

.fail,
.success {
  border-radius: 50%;
  padding: 2px;
  position: absolute;
  top: -4px;
  left: 4px;
  font-size: 12px;
}
.fail {
  background: #ffd122;
}
.success {
  background: #7ad683;
}
</style>
