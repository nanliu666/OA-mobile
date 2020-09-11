<template>
  <div class="page">
    <van-nav-bar
      title="我的任务"
      left-arrow
      @click-left="goback"
    />
    <div class="task-box">
      <div class="jobName-row">
        <div class="jobName-box">
          <span>{{ recruitmentDetail.jobName }}</span>
          <span>{{ recruitmentDetail.emerType | CommonDictType(EmerType) }}</span>
        </div>
        <div class="isFinished">
          {{ recruitmentDetail.progress | filterProgress }}
        </div>
      </div>
      <div class="work-row">
        <span>{{ recruitmentDetail.workProperty | CommonDictType(WorkProperty) }}</span>
        <span class="interval">|</span>
        <span>{{ recruitmentDetail.educationalLevel | CommonDictType(EducationalLevel) }}</span>
        <span class="interval"> |</span>
        <span>{{ recruitmentDetail.workYear | CommonDictType(WorkYear) }}</span>
      </div>
    </div>
    <!-- 招聘进度 -->
    <div class="progress-box">
      <div class="title">
        招聘进度
      </div>
      <div class="item needNum">
        <span>计划招聘：</span> <span>{{ recruitmentDetail.needNum }}</span>
      </div>
      <div class="item entryNum">
        <span>已入职：</span> <span>{{ recruitmentDetail.entryNum }}</span>
      </div>
      <div class="item progress">
        <span>招聘进度：</span>
        <span>{{ parseInt((recruitmentDetail.entryNum / recruitmentDetail.needNum) * 100) }}%</span>
      </div>
      <div class="item candidateNum">
        <span>候选人数：</span> <span>{{ recruitmentDetail.candidateNum }}</span>
      </div>
    </div>
    <!-- 招聘需求详情 -->
    <div class="detail-box">
      <div class="title">
        招聘需求详情
      </div>
      <div class="item ">
        <span>申请人：</span> <span>{{ recruitmentDetail.userName }}</span>
      </div>
      <div class="item ">
        <span>申请时间：</span> <span>{{ recruitmentDetail.createTime }}</span>
      </div>
      <div class="item ">
        <span>申请公司：</span> <span>{{ recruitmentDetail.companyName }}</span>
      </div>
      <div class="item ">
        <span>用人部门：</span> <span>{{ recruitmentDetail.orgName }}</span>
      </div>
      <div class="item ">
        <span>职位：</span> <span>{{ recruitmentDetail.jobName }}</span>
      </div>
      <div class="item ">
        <span>岗位：</span> <span>{{ recruitmentDetail.positionName }}</span>
      </div>
      <div class="item ">
        <span>需求人数：</span> <span>{{ recruitmentDetail.needNum }}</span>
      </div>
      <div class="item ">
        <span>到岗日期：</span> <span>{{ recruitmentDetail.joinDate }}</span>
      </div>
      <div class="item ">
        <span>紧急程度：</span>
        <span>{{ recruitmentDetail.emerType | CommonDictType(EmerType) }}</span>
      </div>
      <div class="item ">
        <span>职位要求：</span> <span>{{ recruitmentDetail.requirement }}</span>
      </div>
      <div class="item ">
        <span>工作职责：</span> <span>{{ recruitmentDetail.duty }}</span>
      </div>
      <div class="item ">
        <span>招聘原因：</span>
        <span>{{ recruitmentDetail.reason | CommonDictType(RecruitmentReason) }}</span>
      </div>
      <div class="item ">
        <span>申请理由：</span> <span>{{ recruitmentDetail.remark }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecruitmentDetail } from '@/api/work'
export default {
  filters: {
    filterProgress(val) {
      if (!val) return
      let ProgressObj = {
        Approved: '招聘中',
        Finished: '已结束'
      }
      return ProgressObj[val]
    },
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
      recruitmentId: '',
      // 对象
      recruitmentDetail: {},
      // 字典组
      WorkProperty: [],
      EmerType: [],
      WorkYear: [],
      EducationalLevel: [],
      RecruitmentReason: []
    }
  },
  created() {
    this.loadData()
    this.getCommonDict()
  },
  methods: {
    loadData() {
      this.recruitmentId = this.$route.query.bizId
      getRecruitmentDetail({ recruitmentId: this.recruitmentId })
        .then((res) => {
          this.recruitmentDetail = res
        })
        .finally(() => {})
    },
    // 获取相关字典组
    getCommonDict() {
      let commonDictNameArr = [
        'WorkProperty',
        'EmerType',
        'WorkYear',
        'EducationalLevel',
        'RecruitmentReason'
      ]
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
    },
    // goback
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__title {
  font-size: 17px;
  color: #000000;
  letter-spacing: 0;
  line-height: 24px;
  font-weight: bold;
}
.page {
  //
  .task-box {
    width: calc(100% - 20px);
    margin: 10px;
    padding: 20px 24px;
    box-shadow: 0 8px 16px 0 rgba(#000000, 0.1);
    box-sizing: border-box;
    border-radius: 8px;
    .jobName-row {
      display: flex;
      justify-content: space-between;
      .jobName-box {
        font-size: 16px;
        color: #000000;
        line-height: 24px;
        :first-child {
          margin-right: 10px;
        }
      }
      .isFinished {
        margin-right: 16px;
        width: 60px;
        height: 24px;
        background: #edf8ff;
        border-radius: 6px;
        text-align: center;

        font-size: 12px;
        color: #6aafff;
        line-height: 24px;
      }
    }
    .work-row {
      font-size: 14px;
      color: #757c85;
      letter-spacing: 0;
      line-height: 14px;
      .interval {
        display: inline-block;
        margin: 10px;
      }
    }
  }
  // 招聘进度
  .progress-box {
    width: 100%;
    box-sizing: border-box;
    padding-left: 16px;
    padding-top: 10px;
    height: 153.5px;
    box-shadow: inset 0 -1px 0 0 #dddddd;
    .title {
      font-size: 17px;
      color: #000000;
      line-height: 25.5px;
      font-weight: bold;
    }
    .item {
      margin: 8px;
      font-size: 14px;
      letter-spacing: 0;
      line-height: 14px;
      :first-child {
        color: #757c85;
      }
      :nth-child(2) {
        color: #000000;
      }
    }
  }
  // 招聘需求详情
  .detail-box {
    margin-top: 8px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 16px;
    padding-top: 20px;

    .title {
      font-size: 17px;
      color: #000000;
      line-height: 25.5px;
      font-weight: bold;
    }
    .item {
      margin: 8px;
      font-size: 14px;
      letter-spacing: 0;
      line-height: 14px;
      :first-child {
        color: #757c85;
      }
      :nth-child(2) {
        color: #000000;
        line-height: 16px;
      }
    }
  }
}
</style>
