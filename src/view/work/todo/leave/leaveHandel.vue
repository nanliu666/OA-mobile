<template>
  <div class="page">
    <StickyHeader title="员工详情" />
    <div
      v-if="PersonData.status === 'WaitLeave'"
      class="tips"
    >
      提示：该员工因 {{ leavePersonData.reason }} 预计在 {{ leavePersonData.lastDate }} 离职。
    </div>
    <div class="header">
      <div class=" avatar" />
      <div class="content">
        <div class="name-row">
          <span>{{ PersonData.name }}</span>
          <span>{{ PersonData.status | filterStatus }}</span>
        </div>
        <div class="job-row">
          <span>{{ PersonData.orgName }}</span>
          <span>{{ PersonData.jobName }}</span>
        </div>
      </div>
    </div>
    <!-- 基本信息 -->
    <div class="detail-box">
      <div class="title">
        基本信息
      </div>
      <div class="content">
        <infoShow :columns="infoColumns">
          <template #workCity>
            {{ `${PersonData.workProvinceName}${PersonData.workCityName}` }}
          </template>
        </infoShow>
      </div>
    </div>
    <!-- 员工状态 -->
    <div class="detail-box">
      <div class="title">
        员工状态
      </div>
      <div class="content">
        <infoShow :columns="statusList" />
      </div>
    </div>
    <!-- 离职信息 -->
    <div
      v-if="PersonData.status === 'Leaved'"
      class="detail-box"
    >
      <div class="title">
        离职信息
      </div>
      <div class="content">
        <infoShow :columns="leaveList" />
      </div>
    </div>
    <!-- btn -->
    <div class="btn">
      <van-button
        block
        type="info"
      >
        请在web端处理该待办
      </van-button>
    </div>
  </div>
</template>

<script>
import { getLeaveInfo, getStaffBasicInfo } from '@/api/todo'
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import infoShow from '@/components/infoShow/infoShow'
export default {
  name: 'LeaveHandel',
  components: {
    StickyHeader,
    infoShow
  },
  filters: {
    filterStatus(val) {
      if (!val) return
      let obj = {
        Leaved: '已离职',
        WaitLeave: '待离职'
      }
      return obj[val]
    }
  },
  data() {
    return {
      // 离职员工ID
      userId: '',
      // 员工信息
      leavePersonData: {},
      PersonData: {},
      // 基本信息配置
      infoColumns: [
        { label: '工号', value: '', prop: 'workNo' },
        { label: '公司邮箱', value: '', prop: 'email' },
        { label: '入职公司', value: '', prop: 'companyName' },
        { label: '岗位', value: '', prop: 'positionName' },
        { label: '部门', value: '', prop: 'orgName' },
        { label: '职位', value: '', prop: 'jobName' },
        { label: '工作地址', value: '', prop: 'address' },
        { label: '工作城市', value: '', prop: 'workCity', slot: true },
        { label: '招聘渠道', value: '', prop: 'recruitment' },
        { label: '备注', value: '', prop: 'userRemark' }
      ],
      // 员工状态
      statusList: [
        { label: '工作性质', value: '', prop: 'workProperty' },
        { label: '员工状态', value: '', prop: 'status' },
        { label: '入职日期', value: '', prop: 'entryDate' },
        { label: '试用期', value: '', prop: 'probation' },
        { label: '转正日期', value: '', prop: 'formalDate' }
      ],
      leaveList: [
        { label: '离职日期', value: '', prop: 'leaveDate' },
        { label: '离职申请日期', value: '', prop: 'applyDate' },
        { label: '离职原因', value: '', prop: 'reason' },
        { label: '离职原因说明', value: '', prop: 'reason' },
        { label: '备注', value: '', prop: 'remark' }
      ]
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.userId = this.$route.query.biz_id
      getLeaveInfo({ userId: this.userId }).then((res) => {
        this.leavePersonData = res
        this.leaveList.forEach((item) => {
          item.value = res[item.prop]
        })
      })
      getStaffBasicInfo({ userId: this.userId }).then((res) => {
        this.PersonData = res
        // 基本信息
        this.infoColumns.forEach((item) => {
          item.value = res[item.prop]
        })
        this.statusList.forEach((item) => {
          item.value = res[item.prop]
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  padding-bottom: 72px;
}
.detail-box {
  width: 100%;
  box-sizing: border-box;
  padding-left: 16px;
  padding-top: 20px;

  .title {
    margin-bottom: 8px;
    font-size: 17px;
    color: #000000;
    line-height: 25.5px;
    font-weight: bold;
  }
  .content {
    border-bottom: 1px solid #dddddd;
    padding: 10px 0;
  }
}
.btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  padding: 16px;
  background-color: #fff;
}
</style>
