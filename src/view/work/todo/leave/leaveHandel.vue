<template>
  <div class="page">
    <StickyHeader title="员工详情" />
    <div
      v-if="PersonData.status === 'WaitLeave'"
      class="tips"
    >
      提示：该员工因 {{ leavePersonData.reason | CommonDictType(LeaveReason) }} 预计在
      {{ leavePersonData.lastDate }} 离职。
    </div>
    <div class="header">
      <div class="name-row">
        <div class="name-box">
          {{ PersonData.name }}
        </div>
        <div class="status">
          {{ PersonData.status | filterStatus }}
        </div>
      </div>
      <div class="job-row">
        <span>{{ PersonData.orgName }}</span>
        <span>{{ PersonData.jobName }}</span>
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
          <template #recruitment>
            {{ PersonData.recruitment | CommonDictType(RecruitmentChannel) }}
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
        <infoShow :columns="statusList">
          <template #workProperty>
            {{ PersonData.workProperty | CommonDictType(WorkProperty) }}
          </template>
          <template #status>
            {{ PersonData.status | filterStatus }}
          </template>
          <template #stayYears>
            {{ PersonData.entryDate | filterstayYears }}
          </template>
        </infoShow>
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
        <infoShow :columns="leaveList">
          <template #reason>
            {{ leavePersonData.reason | CommonDictType(LeaveReason) }}
          </template>
        </infoShow>
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
import moment from 'moment'
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
    },
    CommonDictType: (value, CommonDictarr) => {
      if (!value) return ''
      let result = ''
      CommonDictarr.forEach((item) => {
        if (item.dictKey == value.trim()) {
          result = item.dictValue
          return
        }
      })

      return result
    },
    // 计算司龄
    filterstayYears(val) {
      if (!val) return
      let dateNow = moment().format('YYYY-MM-DD HH:mm')
      let entryDate = moment(val)
      let today = moment(dateNow)
      let duration = moment.duration(entryDate.diff(today))
      let res = `${duration.asYears()}`
      return parseInt(Math.abs(res))
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
        { label: '上级领导', value: '', prop: 'leaderName' },
        { label: '工作地址', value: '', prop: 'address' },
        { label: '工作城市', value: '', prop: 'workCity', slot: true },
        { label: '招聘渠道', value: '', prop: 'recruitment', slot: true },
        { label: '备注', value: '', prop: 'userRemark' }
      ],
      // 员工状态
      statusList: [
        { label: '工作性质', value: '', prop: 'workProperty', slot: true },
        { label: '员工状态', value: '', prop: 'status', slot: true },
        { label: '入职日期', value: '', prop: 'entryDate' },
        { label: '试用期', value: '', prop: 'probation' },
        { label: '转正日期', value: '', prop: 'formalDate' },
        { label: '司龄', value: '', prop: 'stayYears', slot: true }
      ],
      leaveList: [
        { label: '离职日期', value: '', prop: 'leaveDate' },
        { label: '离职申请日期', value: '', prop: 'applyDate' },
        { label: '离职原因', value: '', prop: 'reason', slot: true },
        { label: '离职原因说明', value: '', prop: 'remark' }
      ],
      // 字典组
      LeaveReason: [],
      RecruitmentChannel: [],
      WorkProperty: []
    }
  },
  created() {
    this.loadData()
    this.getCommonDict()
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

        res.subOrg.forEach((item, index) => {
          this.infoColumns.splice(
            `${6 + index * 2}`,
            0,
            { label: `附属部门名称${index + 1}`, value: item.subOrgName, prop: 'subOrgName' },
            { label: `附属职位名称${index + 1}`, value: item.subJobName, prop: 'subJobName' }
          )
        })
        this.statusList.forEach((item) => {
          item.value = res[item.prop]
        })
      })
    },
    // 获取相关字典组
    getCommonDict() {
      let commonDictNameArr = ['LeaveReason', 'RecruitmentChannel', 'WorkProperty']
      commonDictNameArr.forEach((item) => {
        this.$store.dispatch('CommonDict', item).then((res) => {
          // this.workPropertyList = res
          // 将res =》 [{dictKey:"",dictValue:"",id:""},{dictKey:"",dictValue:"",id:""}]
          let targetArr = []
          res.forEach((el) => {
            targetArr.push({ dictKey: el.dictKey, dictValue: el.dictValue, id: el.id })
          })
          this[item] = targetArr
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
// 提示
.tips {
  padding-left: 16px;
  color: #757c85;
  font-size: 14px;
  line-height: 28px;
}
.header {
  padding-left: 16px;
  background: #ffffff;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  margin-top: 1px;
  .name-row {
    display: flex;
    padding: 8px 0;
    .name-box {
      font-size: 16px;
      color: #000000;

      line-height: 24px;
      font-weight: bold;
    }
    .status {
      width: 60px;
      height: 24px;
      background: #edf8ff;
      border-radius: 6px;
      margin-left: 10px;
      font-size: 12px;
      color: #6aafff;
      text-align: center;
      line-height: 24px;
    }
  }
  .job-row {
    font-size: 14px;
    color: #757c85;
    :first-child {
      padding-right: 10px;
    }
  }
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
