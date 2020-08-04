<template>
  <div class="page">
    <StickyHeader title="招聘需求" />
    <div class="task-box">
      <div class="jobName-row">
        <div class="jobName-box">
          <span class="jobName-title">招聘需求：{{ recruitmentDetail.jobName }}</span>
          <!-- <span>{{ recruitmentDetail.emerType | CommonDictType(EmerType) }}</span> -->
        </div>
        <div class="isFinished">
          {{ recruitmentDetail.status | filterStatus }}
        </div>
      </div>
      <div class="submit-row">
        <infoShow :columns="submitColumns" />
      </div>
    </div>
    <!-- 分配信息 -->
    <div
      v-if="recruitmentDetail.status !== 'UnHandle'"
      class="distribution-box"
    >
      <div class="title">
        分配信息
      </div>
      <div
        v-for="(item, index) in allocatList"
        :key="index"
        class="item"
      >
        <!-- 左侧 -->
        <div class="left-content">
          <svg
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-approval-recruit-bicolor" />
          </svg>
        </div>
        <!-- 主要内容 -->
        <div class="main-content">
          <div class="title-row">
            {{ `${item.name}(${item.workNo})` }}
          </div>
          <div class="complete-row">
            <div class="num">
              {{ parseInt((item.entryNum / item.taskNum) * 100) }}%
            </div>
            <div class="progress-box">
              <van-progress
                :show-pivot="false"
                color="#72e7ae"
                track-color="#d7d7d7"
                :percentage="parseInt((item.entryNum / item.taskNum) * 100)"
              />
              <div class="progress-text">
                计划招聘{{ item.entryNum }}人 已入职{{ item.taskNum }}人
              </div>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
    <!-- 招聘需求详情 -->
    <div class="detail-box">
      <div class="title">
        招聘需求详情
      </div>
      <!-- 招聘详情 -->
      <infoShow :columns="recruitmentColumns">
        <!-- 工作性质 -->
        <template #workProperty>
          <span>{{ recruitmentDetail.workProperty | CommonDictType(WorkProperty) }} </span>
        </template>
        <!--紧急程度  -->
        <template #emerType>
          <span>{{ recruitmentDetail.emerType | CommonDictType(EmerType) }} </span>
        </template>
        <!-- 工作年限 -->
        <template #workYear>
          <span>{{ recruitmentDetail.workYear | CommonDictType(WorkYear) }} </span>
        </template>
        <!-- 招聘原因 -->
        <template #reason>
          <span>{{ recruitmentDetail.reason | CommonDictType(RecruitmentReason) }} </span>
        </template>
        <!-- 薪资范围 -->
        <template #salaryRange>
          <span>{{ `${recruitmentDetail.minSalary}~${recruitmentDetail.maxSalary}` }} </span>
        </template>
      </infoShow>
    </div>

    <div
      v-if="recruitmentDetail.status === 'UnHandle'"
      class="info-botton-btn"
      @click="handelClick"
    >
      <van-button
        block
        type="info"
      >
        分配
      </van-button>
    </div>
    <div
      v-else
      class="info-botton-btn"
    >
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
import { queryDistribution } from '@/api/todo'
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import { getRecruitmentDetail } from '@/api/work'
import infoShow from '@/components/infoShow/infoShow'
export default {
  name: 'RecAllocated',
  components: {
    StickyHeader,
    infoShow
  },
  filters: {
    filterStatus(val) {
      if (!val) return
      let StatusObj = {
        UnHandle: '待分配',
        Handled: '已分配'
      }
      return StatusObj[val]
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
      // 招聘详情配置
      recruitmentColumns: [
        { label: '申请人', value: '', prop: 'userName' },
        { label: '申请时间', value: '', prop: 'createTime' },
        { label: '申请公司', value: '', prop: 'companyName' },
        { label: '用人部门', value: '', prop: 'orgName' },
        { label: '职位', value: '', prop: 'jobName' },
        { label: '岗位', value: '', prop: 'positionName' },
        { label: '工作性质', value: '', prop: 'workProperty', slot: true },
        { label: '需求人数', value: '', prop: 'needNum' },
        { label: '到岗日期', value: '', prop: 'joinDate' },
        { label: '紧急程度', value: '', prop: 'emerType', slot: true },
        { label: '薪酬范围', value: '', prop: 'salaryRange', slot: true },
        { label: '工作年限', value: '', prop: 'workYear', slot: true },
        { label: '职位要求', value: '', prop: 'requirement' },
        { label: '工作职责', value: '', prop: 'duty' },
        { label: '招聘原因', value: '', prop: 'reason', slot: true },
        { label: '申请理由', value: '', prop: 'remark' }
      ],
      //头部提交
      submitColumns: [
        { label: '提交人', value: '', prop: 'userName' },
        { label: '提交时间', value: '', prop: 'createTime' }
      ],
      // 字典组
      WorkProperty: [],
      EmerType: [],
      WorkYear: [],
      EducationalLevel: [],
      RecruitmentReason: [],

      // 分配信息
      allocatList: []
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
          this.recruitmentColumns.forEach((item) => {
            item.value = res[item.prop]
          })
          this.submitColumns.forEach((item) => {
            item.value = res[item.prop]
          })
        })
        .finally(() => {})
      queryDistribution({ recruitmentId: this.recruitmentId })
        .then((res) => {
          this.allocatList = res
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
    // 点击分配
    handelClick() {
      this.$router.push({
        query: {
          recruitmentId: this.recruitmentId
        },
        path: '/todo/allotRecruitment'
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__title {
  font-weight: bold;
}
.page {
  //
  padding-bottom: 72px;

  .task-box {
    width: 100%;
    padding-left: 16px;
    box-sizing: border-box;
    box-shadow: inset 0 -1px 0 0 #dddddd;
    padding-bottom: 10px;
    .jobName-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      .jobName-box {
        font-size: 16px;
        color: #000000;
        line-height: 24px;
        .jobName-title {
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 550;
          color: rgba(30, 30, 30, 1);
        }
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
  }
  // 分配信息
  .distribution-box {
    width: 100%;
    box-sizing: border-box;
    padding-top: 15px;
    .title {
      padding: 0 16px;
      font-size: 17px;
      color: #000000;
      line-height: 25.5px;
      font-weight: bold;
    }
    .item {
      display: flex;
      margin: 10px 16px;
      padding: 10px;
      border-radius: 8px;
      background-color: #f2f2f2;
      // 主要内容
      .left-content {
        .icon {
          margin: 0px 15px 0 0;
          height: 32px;
          width: 32px;
        }
      }
      .main-content {
        box-sizing: border-box;
        flex: 1;
        // border-bottom: 1px solid #dddddd;
        .title-row {
          margin: 0px 0 8px 0;
          font-size: 16px;
          color: #000000;
          line-height: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .van-icon {
            margin-right: 24px;
            color: rgb(216, 216, 216);
          }
        }
        .brief-row {
          margin: 0 0 16.5px 0;
          font-size: 14px;
          color: #757c85;
          letter-spacing: 0;
          line-height: 14px;
        }
        .complete-row {
          display: flex;
          // justify-content: center;
          .num {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 28px;
            color: #78859c;
            text-align: right;
            line-height: 28px;
          }
          .progress-box {
            margin: 4px 0 0 10px;
            .progress-text {
              margin-top: 4px;
              font-size: 12px;
              color: rgba(80, 80, 80, 1);
            }
          }
        }
      }
    }
  }
  // 招聘需求详情
  .detail-box {
    width: 100%;
    box-sizing: border-box;
    padding-left: 16px;
    padding-top: 15px;

    .title {
      margin-bottom: 8px;
      font-size: 17px;
      color: #000000;
      line-height: 25.5px;
      font-weight: bold;
    }
  }
  // 分配按钮
  .foot-box {
    .content {
      height: 48px;
      width: 343px;
      margin: 0 auto;
      background: #207efa;
      border-radius: 10px;
      color: #ffffff;
      text-align: center;
      line-height: 48px;
    }
  }
}
</style>
