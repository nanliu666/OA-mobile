<template>
  <div class="details">
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
    <div class="form_content">
      <div
        v-for="(item, index) in formData"
        :key="index"
      >
        <span class="text">{{ item.label }}</span>：<span>{{ item.value }}</span>
      </div>
    </div>
    <div class="progress_content">
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
                :class="[item.result]"
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
      <template>
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
                <span>{{ item.properties.title }}</span>
                <!--              <span class="time" >05-07 10：47</span>-->
              </div>
              <!--            <div class="status_start" >发起</div>-->
            </div>
            <!--          <div class="name">-->
            <!--            张三-->
            <!--          </div>-->
            <div
              v-if="item.properties.counterSign"
              class="countersign"
            >
              需要所有审批人同意
            </div>
            <div
              v-if="item.properties.counterSign === false"
              class="countersign"
            >
              1人同意即可
            </div>
            <div class="flex—wrap flex-center">
              <div
                v-for="user in item.properties.approvers"
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
      <!--      <div class="line">-->
      <!--        <div class="icon_header">-->
      <!--          <div class="iconfont icon-icon-personblue2 icon_Default" />-->
      <!--        </div>-->
      <!--        <div class="personalInfo">-->
      <!--          <div class="title_name flex flex-between">-->
      <!--            <div>-->
      <!--              <span>发起申请</span>-->
      <!--              <span class="time" >05-07 10：47</span>-->
      <!--            </div>-->
      <!--            &lt;!&ndash;            <div class="status_start" >发起</div>&ndash;&gt;-->
      <!--          </div>-->
      <!--          &lt;!&ndash;          <div class="name">&ndash;&gt;-->
      <!--          &lt;!&ndash;            张三&ndash;&gt;-->
      <!--          &lt;!&ndash;          </div>&ndash;&gt;-->
      <!--          &lt;!&ndash;          <div class='countersign'>&ndash;&gt;-->
      <!--          &lt;!&ndash;            需要所有审批人同意&ndash;&gt;-->
      <!--          &lt;!&ndash;          </div>&ndash;&gt;-->
      <!--          <div class="countersign">-->
      <!--            1人同意即可-->
      <!--          </div>-->
      <!--          <div class="flex—wrap flex-center">-->
      <!--            <div class="info">-->
      <!--              <div class="iconfont icon-usercircle icon_default" />-->
      <!--              <div class="info_text">-->
      <!--                李思思-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="info">-->
      <!--              <div class="iconfont icon-usercircle icon_default" />-->
      <!--              <div class="info_text">-->
      <!--                李思思-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="line">-->
      <!--        <div class="icon_header">-->
      <!--          <div class="iconfont icon-icon-personblue2 icon_Default" />-->
      <!--        </div>-->
      <!--        <div class="personalInfo">-->
      <!--          <div class="title_name flex flex-between">-->
      <!--            <div><span>发起申请</span> <span class="time">05-07 10：47</span></div>-->
      <!--            <div class="start">-->
      <!--              发起-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="name">-->
      <!--            张三-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="line">-->
      <!--        <div class="icon_header">-->
      <!--          <div class="iconfont icon-icon-personblue2 icon_Default" />-->
      <!--        </div>-->
      <!--        <div class="personalInfo">-->
      <!--          <div class="title_name flex flex-between">-->
      <!--            <div><span>发起申请</span> <span class="time">05-07 10：47</span></div>-->
      <!--            <div class="Approve">-->
      <!--              审批中-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="name">-->
      <!--            张三-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="line">-->
      <!--        <div class="icon_header">-->
      <!--          <div class="iconfont icon-icon-personblue2 icon_Default" />-->
      <!--        </div>-->
      <!--        <div class="personalInfo">-->
      <!--          <div class="title_name flex flex-between">-->
      <!--            <div><span>发起申请</span> <span class="time">05-07 10：47</span></div>-->
      <!--            <div class="Pass">-->
      <!--              同意-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="name">-->
      <!--            张三-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="line">-->
      <!--        <div class="icon_header">-->
      <!--          <div class="iconfont icon-icon-personblue2 icon_Default" />-->
      <!--        </div>-->
      <!--        <div class="personalInfo">-->
      <!--          <div class="title_name flex flex-between">-->
      <!--            <div><span>发起申请</span> <span class="time">05-07 10：47</span></div>-->
      <!--            <div class="Reject">-->
      <!--              已退回-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="name">-->
      <!--            张三-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="line">-->
      <!--        <div class="icon_header">-->
      <!--          <div class="iconfont icon-icon-personblue2 icon_Default" />-->
      <!--        </div>-->
      <!--        <div class="personalInfo">-->
      <!--          <div class="title_name flex flex-between">-->
      <!--            <div><span>发起申请</span> <span class="time">05-07 10：47</span></div>-->
      <!--            <div class="Cancel">-->
      <!--              已撤回-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="name">-->
      <!--            张三-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="line">-->
      <!--        <div class="icon_header">-->
      <!--          <div class="iconfont icon-icon-personblue2 icon_Default" />-->
      <!--        </div>-->
      <!--        <div class="personalInfo">-->
      <!--          <div class="title_name flex flex-between">-->
      <!--            <div>-->
      <!--              <span>发起申请</span>-->
      <!--              &lt;!&ndash;              <span class="time" >05-07 10：47</span>&ndash;&gt;-->
      <!--            </div>-->
      <!--            &lt;!&ndash;            <div class="status_start" >发起</div>&ndash;&gt;-->
      <!--          </div>-->
      <!--          &lt;!&ndash;          <div class="name">&ndash;&gt;-->
      <!--          &lt;!&ndash;            张三&ndash;&gt;-->
      <!--          &lt;!&ndash;          </div>&ndash;&gt;-->
      <!--          <div class="countersign">-->
      <!--            需要所有审批人同意-->
      <!--          </div>-->
      <!--          <div class="flex—wrap flex-center">-->
      <!--            <div class="info">-->
      <!--              <div class="iconfont icon-usercircle icon_default" />-->
      <!--              <div class="info_text">-->
      <!--                李思思-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="info">-->
      <!--              <div class="iconfont icon-usercircle icon_default" />-->
      <!--              <div class="info_text">-->
      <!--                李思思-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="info">-->
      <!--              <div class="iconfont icon-usercircle icon_default" />-->
      <!--              <div class="info_text">-->
      <!--                李思思-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="info">-->
      <!--              <div class="iconfont icon-usercircle icon_default" />-->
      <!--              <div class="info_text">-->
      <!--                李思思-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="info">-->
      <!--              <div class="iconfont icon-usercircle icon_default" />-->
      <!--              <div class="info_text">-->
      <!--                李思思-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="info">-->
      <!--              <div class="iconfont icon-usercircle icon_default" />-->
      <!--              <div class="info_text">-->
      <!--                李思思-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="info">-->
      <!--              <div class="iconfont icon-usercircle icon_default" />-->
      <!--              <div class="info_text">-->
      <!--                李思思-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="info">-->
      <!--              <div class="iconfont icon-usercircle icon_default" />-->
      <!--              <div class="info_text">-->
      <!--                李思思-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="info">-->
      <!--              <div class="iconfont icon-usercircle icon_default" />-->
      <!--              <div class="info_text">-->
      <!--                李思思-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="info">-->
      <!--              <div class="iconfont icon-usercircle icon_default" />-->
      <!--              <div class="info_text">-->
      <!--                李思思-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="line">-->
      <!--        <div class="icon_header">-->
      <!--          <div class="iconfont icon-icon-personblue2 icon_Default" />-->
      <!--        </div>-->
      <!--        <div class="personalInfo">-->
      <!--          <div class="title_name flex flex-between">-->
      <!--            <div>-->
      <!--              <span>发起申请</span>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="countersign">-->
      <!--            1人同意即可-->
      <!--          </div>-->
      <!--          <div class="flex—wrap flex-center">-->
      <!--            <div class="info">-->
      <!--              <div class="iconfont icon-usercircle icon_default" />-->
      <!--              <div class="info_text">-->
      <!--                李思思-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="info">-->
      <!--              <div class="iconfont icon-usercircle icon_default" />-->
      <!--              <div class="info_text">-->
      <!--                李思思-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import { getApplyDetail, getApplyRecord } from '@/api/approval'

export default {
  name: 'ApproDetails',
  components: {
    StickyHeader
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
      detailData: {},
      recordData: {},
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
      return this.nodeData.filter((item) => {
        if (item.type !== 'copy' && item.type !== 'start' && item.userList.length == 0) {
          return item
        }
      })
    }
  },
  async mounted() {
    await this.getDetails()
    await this.getRecord()
  },
  methods: {
    result(data, type) {
      let result = {
        Pass: '通过',
        Cancel: '已撤回',
        Reject: '已退回'
      }
      if (type === 'start' && result[data] == 'Pass') {
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
        apprNo: this.$route.query.apprNo
      }
      return new Promise((resolve, reject) => {
        getApplyRecord(params)
          .then((res) => {
            this.recordData = res.data
            resolve(true)
            this.PassApproval = JSON.parse(JSON.stringify(this.recordData))
            // this.recordData.map(item =>{
            //   item.result === "Pass"&&(this.PassApproval.push(item))
            //   item.result === "Cancel"&&(this.PassApproval.push(item))
            //   item.result === "Reject"&&(this.PassApproval.push(item))
            // })
            this.nodeData.map((it) => {
              it.userList = []
              this.recordData.map((item) => {
                item.nodeId == it.nodeId && it.userList.push(item)
              })
            })
          })
          .catch(() => {
            reject(false)
          })
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
.progress_content {
  background: #fff;
  padding: 40px 32px;
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
</style>
