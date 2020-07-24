<template>
  <div class="page">
    <stickyHeader title="简历审核" />
    <div class="content">
      <div>
        <span
          class="title"
        >{{ personInfo.name || ' ' }}（{{ recruitmentInfo.jobName || ' ' }}）的简历审核</span>
        <span
          class="status"
          :class="resumeCheckInfo.status"
        >{{
          statusWord[resumeCheckInfo.status]
        }}</span>
        <info-show :columns="initiateColumns" />
      </div>
    </div>
    <div class="content">
      <div class="content-title">
        推送信息
      </div>
      <info-show :columns="resumeColumns" />
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
          <span>{{ personInfo.provinceName + personInfo.cityName || '' }}</span>
        </template>
        <template #educationalLevel="{value}">
          <span>{{ EducationalLevel[value] }}</span>
        </template>
        <template #recruitment="{value}">
          <span>{{ RecruitmentChannel[value] }}</span>
        </template>
        <template #resumeUrl>
          <span
            style="color: #207efa"
            @click="handlePreviewResume"
          >{{
            personInfo.name + '的简历'
          }}</span>
        </template>
        <template #attachmentUrl>
          <span
            style="color: #207efa"
            @click="handlePreviewAttachment"
          >{{
            personInfo.attachmentName
          }}</span>
        </template>
      </info-show>
    </div>
    <div
      v-if="resumeCheckInfo.status === 'UnCheck'"
      class="btnBox"
    >
      <div class="nextBox">
        <van-button
          round
          block
          type="info"
          @click="handleReject"
        >
          淘汰
        </van-button>
      </div>
      <div class="nextBox">
        <van-button
          round
          block
          type="info"
          @click="handlePass"
        >
          通过
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import InfoShow from '@/components/infoShow/infoShow'
import { getResumeCheck, getPersonInfo, getRecruitmentDetail } from '@/api/work'
export default {
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
      resumeCheckInfo: {
        status: 'UnCheck'
      },
      personInfo: {},
      recruitmentInfo: {},
      resumeColumns: [
        { prop: 'pushName', label: '发起人', value: '123' },
        { prop: 'pushRemark', label: '备注', value: '' },
        { prop: 'pushTime', label: '推送时间', value: '' }
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
        UnCheck: '待审核',
        Pass: '通过',
        Reject: '淘汰',
        Cancel: '已撤销'
      },
      EducationalLevel: {},
      RecruitmentChannel: {}
    }
  },
  created() {
    getResumeCheck({ id: this.$route.query.id }).then((res) => {
      this.resumeCheckInfo = res
      this.initiateColumns.forEach((item) => {
        item.value = res[item.prop]
      })
      this.resumeColumns.forEach((item) => {
        item.value = res[item.prop]
      })
      getPersonInfo({ personId: res.personId }).then((res) => {
        this.personInfo = res
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
    handleReject() {
      this.$router.push('/work/rejectResume?id=' + this.$route.query.id)
    },
    handlePass() {
      this.$router.push('/work/passResume?id=' + this.$route.query.id)
    },
    handlePreviewResume() {
      this.$router.push({
        path: '/work/resumeUrl',
        query: {
          title: this.personInfo.name + '的简历',
          url: this.personInfo.resumeUrl
        }
      })
    },
    handlePreviewAttachment() {
      this.$router.push({
        path: '/work/resumeUrl',
        query: {
          title: this.personInfo.attachmentName,
          url: this.personInfo.attachmentUrl
        }
      })
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
    &.UnCheck {
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
      background-color: #f2f2f2;
      border: 0;
      color: #202940;
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
