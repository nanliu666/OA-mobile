<template>
  <div class="page">
    <StickyHeader title="员工详情" />
    <div class="info-box">
      <div class="name-row">
        <span>{{ personData.name }}</span><span>{{
          personData.status ? (personData.status == 7 ? '待入职' : '放弃入职') : ''
        }}</span>
      </div>
      <div class="job-row">
        <span>{{ personData.orgName }}</span>-
        <span>{{ personData.jobName }}</span>
      </div>
      <div class="detail-box">
        <div class="title">
          基本信息
        </div>
        <infoShow :columns="infoColumns">
          <template #sex>
            {{ personData.sex ? (personData.sex == 1 ? '男' : '女') : '' }}
          </template>
        </infoShow>
      </div>
      <div class="detail-box">
        <div class="title">
          入职信息
        </div>
        <infoShow :columns="entryData">
          <template #register>
            {{ personData.register ? (personData.register == 1 ? '已发送' : '没发送') : '' }}
          </template>
          <template #workProperty>
            {{ personData.workProperty | CommonDictType(WorkProperty) }}
          </template>
        </infoShow>
      </div>
    </div>
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
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import infoShow from '@/components/infoShow/infoShow'
import { getCandidateAcceptDetail } from '@/api/todo'
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
      personData: {},
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
    loading() {
      this.personId = this.$route.query.bizId
      getCandidateAcceptDetail({ personId: this.personId }).then((res) => {
        this.personData = res
        this.infoColumns.forEach((item) => {
          item.value = res[item.prop]
        })
        this.entryData.forEach((item) => {
          item.value = res[item.prop]
        })
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
  .info-box {
    .name-row {
      padding-left: 16px;
      font-size: 16px;
      margin-bottom: 5px;
      :first-child {
        font-weight: bold;
        margin-right: 10px;
      }
    }
    .job-row {
      padding-left: 16px;
      font-size: 14px;
      color: #757c85;
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
