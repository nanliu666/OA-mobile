<template>
  <div class="page">
    <StickyHeader title="员工详情" />
    <div class="header">
      <div class="name-row">
        <div class="name-box">
          {{ WaitPersonData.name }}
        </div>
        <div
          v-if="WaitPersonData.status"
          class="status"
        >
          {{ WaitPersonData.status ? (WaitPersonData.status == 7 ? '待入职' : '') : '' }}
        </div>
      </div>
      <div class="job-row">
        <span>{{ WaitPersonData.orgName }}</span>-
        <span>{{ WaitPersonData.jobName }}</span>
      </div>
      <!-- 基本信息 -->
      <div class="detail-box">
        <div class="title">
          基本信息
        </div>
        <infoShow :columns="infoColumns">
          <template #sex>
            {{ WaitPersonData.sex ? (WaitPersonData.sex == 1 ? '男' : '女') : '' }}
          </template>
        </infoShow>
      </div>
      <div class="detail-box">
        <div class="title">
          入职信息
        </div>
        <infoShow :columns="entryData">
          <!-- 试用期 -->
          <template #probation>
            {{ employmentData.probation }}
          </template>
          <!-- 入职公司 -->
          <template #companyName>
            {{ employmentData.companyName }}
          </template>
          <!-- 工作性质 -->
          <template #workProperty>
            {{ employmentData.workProperty | CommonDictType(WorkProperty) }}
          </template>
          <!-- 入职登记表 -->
          <template #register>
            {{ WaitPersonData.register === 1 ? '已发送' : '未发送' }}
          </template>
        </infoShow>
      </div>
    </div>
    <div class="info-botton-btn">
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
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import infoShow from '@/components/infoShow/infoShow'
import { getOfferApply, getWaitEmploy } from '@/api/todo'
export default {
  name: 'Entry',
  components: {
    StickyHeader,
    infoShow
  },
  filters: {
    // CommonDictarr字典组数组
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
    }
  },
  data() {
    return {
      personId: '',
      // 待入职信息
      WaitPersonData: {},
      // 录用信息
      employmentData: {},
      // 字典组
      WorkProperty: [],
      // 基本信息配置
      infoColumns: [
        { label: '姓名', value: '', prop: 'name' },
        { label: '性别', value: '', prop: 'sex', slot: true },
        { label: '手机号码', value: '', prop: 'phonenum' },
        { label: '邮箱', value: '', prop: 'email' }
      ],
      // 入职信息
      entryData: [
        { label: '预计入职日期', value: '', prop: 'entryDate' },
        { label: '试用期', value: '', prop: 'probation', slot: true },
        { label: '入职公司', value: '', prop: 'companyName', slot: true },
        { label: '部门', value: '', prop: 'orgName' },
        { label: '职位', value: '', prop: 'jobName' },
        { label: '岗位', value: '', prop: 'positionName' },
        { label: '工作性质', value: '', prop: 'workProperty', slot: true },
        { label: '入职登记表', value: '', prop: 'register', slot: true }
      ]
    }
  },
  created() {
    this.loading()
    this.getCommonDict()
  },
  methods: {
    async loading() {
      this.personId = this.$route.query.bizId
      let applyId = ''
      await getWaitEmploy({ personId: this.personId }).then((res) => {
        this.WaitPersonData = res
        // console.log('this.WaitPersonData==', this.WaitPersonData)
        // 基本信息
        this.infoColumns.forEach((item) => {
          item.value = res[item.prop]
        })
        this.entryData.forEach((item) => {
          item.value = res[item.prop]
        })
        // 录用申请ID
        applyId = res.applyId
      })
      if (!applyId) return
      getOfferApply({ id: applyId }).then((res) => {
        this.employmentData = res
      })
    },
    // 获取相关字典组
    getCommonDict() {
      let commonDictNameArr = ['WorkProperty']
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
  .header {
    background: #ffffff;
    padding: 15px 0;
    margin-top: 1px;
    .name-row {
      display: flex;
      padding: 0 16px;

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
      border-bottom: 1px solid #f2f2f2;
      padding: 0px 16px 10px;
      span {
        font-size: 14px;
        color: #757c85;
        letter-spacing: 0;
        line-height: 14px;
      }
    }
  }
  .detail-box {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 16px;
    border-bottom: 1px solid #f2f2f2;
    &:last-child {
      border-bottom: 0;
    }
    .title {
      margin-bottom: 8px;
      font-size: 17px;
      color: #000000;
      line-height: 25.5px;
      font-weight: bold;
    }
  }
}
</style>
