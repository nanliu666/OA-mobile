<template>
  <div class="page">
    <stickyHeader title="面试" />
    <div class="content">
      <div>
        <span
          class="title"
        >{{ personInfo.name || ' ' }}（{{ recruitmentInfo.jobName || ' ' }}）的面试</span>
        <span
          class="status"
          :class="interviewInfo.status"
        >{{
          statusWord[interviewInfo.status]
        }}</span>
        <info-show :columns="initiateColumns" />
      </div>
    </div>
    <div
      v-if="interviewInfo.status === 'Pass' || interviewInfo.status === 'Reject'"
      class="content"
    >
      <div class="content-title">
        面试评价
      </div>
      <info-show :columns="evaluationColumns">
        <template #status="{value}">
          <span>{{ statusWord[value] }}</span>
        </template>
      </info-show>
    </div>
    <div class="content">
      <div class="content-title">
        面试信息
      </div>
      <info-show :columns="interviewColumns">
        <template #interviewType="{value}">
          <span>{{ interviewTypeWord[value] }}</span>
        </template>
      </info-show>
    </div>
    <div class="content">
      <div class="content-title">
        候选人信息
      </div>
      <info-show :columns="personColums">
        <template #sex="{value}">
          <span>{{ value === 1 ? '男' : '女' }}</span>
        </template>
        <template #age="{value}">
          <span>{{ value + '岁' }}</span>
        </template>
        <template #provinceCode>
          <span>{{ personInfo.proviceName + personInfo.cityName || '' }}</span>
        </template>
        <template #educationalLevel="{value}">
          <span>{{ EducationalLevel[value] }}</span>
        </template>
        <template #recruitment="{value}">
          <span>{{ RecruitmentChannel[value] }}</span>
        </template>
        <template #resumeUrl="{value}">
          <a :href="value" />
        </template>
        <template #attachmentUrl="{value}">
          <a :href="value" />
        </template>
      </info-show>
    </div>
    <div
      v-if="interviewInfo.status === 'UnEvaluate'"
      class="btnBox"
    >
      <div class="nextBox">
        <van-button
          round
          block
          type="info"
          @click="toEvaluate"
        >
          面试评价
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import InfoShow from '@/components/infoShow/infoShow'
import { getInterviewInfo, getPersonInfo, getRecruitmentDetail } from '@/api/work'
export default {
  name: 'InterviewDetail',
  components: {
    StickyHeader,
    InfoShow
  },
  data() {
    return {
      initiateColumns: [
        { prop: 'pushName', label: '发起人', value: '' },
        { prop: 'pushTime', label: '发起时间', value: '' }
      ],
      interviewInfo: {
        status: 'UnEvaluate'
      },
      personInfo: {},
      recruitmentInfo: {},
      evaluationColumns: [
        { prop: 'workBackground', label: '工作背景', value: '' },
        { prop: 'knowledge', label: '工作经验', value: '' },
        { prop: 'knowledge', label: '岗位知识', value: '' },
        { prop: 'train', label: '教育培训', value: '' },
        { prop: 'specialty', label: '专业特长', value: '' },
        { prop: 'evaluation', label: '面试评价', value: '' },
        { prop: 'score', label: '综合打分', value: '' },
        { prop: 'status', label: '录用建议', value: '', slot: true }
      ],
      interviewColumns: [
        { prop: 'interviewName', label: '面试人', value: '123' },
        { prop: 'interviewTime', label: '面试时间', value: '' },
        { prop: 'interviewType', label: '面试方式', value: '', slot: true },
        { prop: 'address', label: '面试地址', value: '' }
      ],
      personColums: [
        { prop: 'jobName', label: '应聘职位', value: '' },
        { prop: 'orgName', label: '应聘部门', value: '' },
        { prop: 'name', label: '姓名', value: '' },
        { prop: 'sex', label: '性别', value: 1, slot: true },
        { prop: 'age', label: '年龄', value: 12, slot: true },
        { prop: 'phonenum', label: '手机号码', value: '' },
        { prop: 'email', label: '邮箱', value: '' },
        { prop: 'provinceCode', label: '目前所在地', value: '', slot: true },
        { prop: 'educationalLevel', label: '最高学历', value: '', slot: true },
        { prop: 'university', label: '毕业学校', value: '' },
        { prop: 'major', label: '毕业专业', value: '' },
        { prop: 'workAge', label: '工作年限', value: '' },
        { prop: 'lastCompany', label: '最近工作单位', value: '' },
        { prop: 'monthSalary', label: '期望薪资', value: '' },
        { prop: 'recruitment', label: '应聘渠道', value: '', slot: true },
        { prop: 'resumeUrl', label: '简历', value: '', slot: true },
        { prop: 'attachmentUrl', label: '附件', value: '', slot: true },
        { prop: 'remark', label: '备注', value: '' }
      ],
      statusWord: {
        UnEvaluate: '待评价',
        Pass: '通过',
        Reject: '淘汰',
        Cancel: '已撤销'
      },
      interviewTypeWord: {
        Onsite: '现场面试',
        Phone: '电话面试',
        Video: '视频面试'
      },
      EducationalLevel: {},
      RecruitmentChannel: {}
    }
  },
  created() {
    getInterviewInfo({ id: this.$route.query.id }).then((res) => {
      this.interviewInfo = res
      this.initiateColumns.forEach((item) => {
        item.value = res[item.prop]
      })
      this.interviewColumns.forEach((item) => {
        item.value = res[item.prop]
      })
      getPersonInfo({ personId: res.personId }).then((res) => {
        this.personColums.forEach((item) => {
          if (item.prop !== 'jobName' || item.prop !== 'orgName') {
            item.value = res[item.prop]
          }
        })
      })
      getRecruitmentDetail({ recruitmentId: res.recruitmentId }).then((res) => {
        this.recruitmentInfo = res
        this.personColums[0].value = res.jobName
        this.personColums[1].value = res.orgName
      })
    })
    this.$store.dispatch('CommonDict', 'EducationalLevel').then((res) => {
      res.forEach((item) => {
        this.EducationalLevel[item.dictKey] = item.dictValue
      })
    })
    this.$store.dispatch('CommonDict', 'RecruitmentChannel').then((res) => {
      res.forEach((item) => {
        this.RecruitmentChannel[item.dictKey] = item.dictValue
      })
    })
  },
  methods: {
    toEvaluate() {
      this.$router.push('/work/interviewEvaluation?id' + this.$route.query.id)
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  background-color: #f5f6f6;
  min-height: 100%;
}
.content {
  padding: 20px 16px;
  margin-bottom: 8px;
  border-bottom: 1px solid #ebedf0;
  border-top: 1px solid #ebedf0;
  background-color: #fff;
  .content-title {
    font-size: 17px;
    color: #000000;
    margin-bottom: 8px;
  }
  .title {
    margin-bottom: 8px;
    display: inline-block;
  }
  .status {
    display: inline-block;
    padding: 4px 12px;
    font-size: 12px;
    border-radius: 3px;
    margin-left: 8px;
    &.UnEvaluate {
      background: #edf8ff;
      color: #6aafff;
    }
    &.Pass {
      background: rgba(0, 204, 0, 0.2);
      color: #00cc00;
    }
    &.Reject {
      background: rgba(255, 0, 0, 0.2);
      color: #ff0000;
    }
    &.Cancel {
      background: rgba(153, 153, 153, 0.2);
      color: #666666;
    }
  }
}
.btnBox {
  display: flex;
  background-color: #fff;
  div {
    flex: 1;
  }
  .nextBox:first-child {
    padding: 0 8px 0 16px;
    .van-button {
      // background-color: #f2f2f2;
      border: 0;
      // color: #202940;
    }
  }
  .nextBox:last-child {
    padding: 0 16px 0 8px;
  }
}
.nextBox {
  margin: 16px auto;

  /deep/ .van-button {
    border-radius: 5px;
  }
}
</style>
