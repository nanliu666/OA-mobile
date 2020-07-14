<template>
  <div class="page">
    <StickyHeader title="离职事项" />
    <div class="header">
      <div class="name-row">
        <div class="name-box">
          {{ listData.userName }} 的离职交接事项
        </div>
        <div class="status">
          {{ listData.status | filterStatus }}
        </div>
      </div>
      <div class="info-row">
        <div class="item">
          发起人: <span>{{ listData.userName }}</span>
        </div>
        <div class="item">
          发起时间: <span>{{ listData.createTime }}</span>
        </div>
      </div>
    </div>
    <div class="main-wrap">
      <div class="tips-row">
        员工 {{ listData.userName }},请尽快为他办理以下离职交接事项并确认：
      </div>
      <div
        v-for="category in listData.data"
        :key="category.categoryId"
        class="category-box"
      >
        <div class="categoryName-row">
          {{ category.categoryName }}
        </div>
        <div
          v-for="detail in category.details"
          :key="detail.detailId"
          class="detail-box"
        >
          {{ detail.detailName }}
        </div>
      </div>
    </div>

    <div class="btn-box">
      <div
        class="urge"
        @click="urgeleaveNote"
      >
        催办
      </div>
      <div
        class="confirm"
        @click="confirmleaveNote"
      >
        确认
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getLeaveNote, postConfirmleaveNote, postUrgeleaveNote } from '@/api/todo'
import { Dialog } from 'vant'
import StickyHeader from '@/components/stickyHeader/stickyHeader'
export default {
  name: 'OrgLeave',
  components: {
    StickyHeader
  },
  filters: {
    filterStatus(val) {
      if (!val) return
      let obj = {
        UnConfirm: '待确认',
        Confirmed: '已确认'
      }
      return obj[val]
    }
  },
  data() {
    return {
      leaveUserId: '',
      groupId: '',
      listData: {},
      userId: ''
    }
  },

  created() {
    this.loadingData()
  },
  methods: {
    loadingData() {
      // let arrId = this.$route.query.biz_id.split(',')
      // this.leaveUserId = arrId[0]
      // this.groupId = arrId[1]
      this.leaveUserId = this.$route.query.biz_id
      this.groupId = this.$route.query.biz_id2
      this.userId = this.$store.state.user.userInfo.user_id
      let params = {
        userId: this.userId,
        leaveUserId: this.leaveUserId,
        groupId: this.groupId
      }
      getLeaveNote(params).then((res) => {
        this.listData = res[0]
      })
    },
    confirmleaveNote() {
      let params = {
        groupId: this.groupId,
        userId: this.leaveUserId
      }
      Dialog.confirm({
        title: '标题',
        message: '您确认该员工离职交接事项已完成吗？'
      })
        .then(async () => {
          let res = await postConfirmleaveNote(params)
          Toast.success(res)
        })
        .then(() => {
          this.loadingData()
        })
        .catch(() => {})
    },
    async urgeleaveNote() {
      let res = await postUrgeleaveNote({
        groupId: this.groupId,
        userId: this.userId,
        type: 'B2C'
      })
      Toast.success(res)
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  padding-bottom: 72px;

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
    .info-row {
      .item {
        padding-bottom: 8px;
        font-size: 14px;
        color: #757c85;
        letter-spacing: 0;
        line-height: 14px;
        span {
          font-size: 14px;
          color: #000000;
          letter-spacing: 0;
          line-height: 14px;
        }
      }
    }
  }
  .main-wrap {
    background: #ffffff;
    padding-left: 16px;
    margin-top: 2px;
    margin-left: 10;
    .tips-row {
      font-size: 14px;
      color: #0e001c;
      line-height: 20px;

      padding: 16px 0;
    }
    .category-box {
      margin-left: 10px;
      .categoryName-row {
        font-size: 14px;
        color: #202940;
        font-weight: bold;

        margin-bottom: 8px;
      }
      .detail-box {
        font-size: 14px;
        color: #718199;

        padding-bottom: 8px;
      }
    }
  }
  .btn-box {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    padding: 16px;
    background-color: #fff;
    background: #ffffff;
    border-bottom: 1px solid #dddddd;
    border-top: 1px solid #dddddd;
    height: 87px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .urge {
      background: #f2f2f2;
      border-radius: 10px;
      font-size: 18px;
      color: #202940;
      letter-spacing: 0;
      width: 163.5px;
      height: 46px;
      text-align: center;
      line-height: 46px;
    }
    .confirm {
      line-height: 46px;
      height: 46px;
      width: 163.5px;
      background: #207efa;
      border-radius: 10px;
      font-size: 18px;
      color: #f8fbff;
      text-align: center;
      letter-spacing: 0;
    }
  }
}
</style>
