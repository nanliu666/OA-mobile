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
          发起时间: <span>{{ listData.createTime | dataFliter }}</span>
        </div>
      </div>
    </div>
    <div class="main-wrap">
      <div class="tips-row">
        您的离职申请已通过，请在离职前尽快与相关部门办理以下离职交接事项：
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
    <div class="btn">
      <van-button
        block
        type="info"
        @click="urgeleaveNote"
      >
        催办
      </van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getLeaveNote, postUrgeleaveNote } from '@/api/todo'
import StickyHeader from '@/components/stickyHeader/stickyHeader'
export default {
  name: 'OrgLeave',
  components: {
    StickyHeader
  },
  filters: {
    dataFliter(time) {
      if (!time) {
        return
      }
      let dateStr = time.split(' ')
      let strGMT =
        dateStr[0] +
        ' ' +
        dateStr[1] +
        ' ' +
        dateStr[2] +
        ' ' +
        dateStr[5] +
        ' ' +
        dateStr[3] +
        ' GMT+0800'
      let date = new Date(Date.parse(strGMT))
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let dates = date.getDate()
      let h = date.getHours()
      let m = date.getMinutes()
      let s = date.getSeconds()
      h = h < 10 ? '0' + h : h
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      return `${year}-${month}-${dates}  ${h}:${m}:${s}`
    },
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
      let arrId = this.$route.query.biz_id.split(',')
      this.leaveUserId = arrId[0]
      this.groupId = arrId[1]
      // this.leaveUserId = this.$route.query.biz_id
      let params = {
        userId: this.$store.state.user.userInfo.user_id,
        leaveUserId: this.leaveUserId
      }
      getLeaveNote(params)
        .then((res) => {
          this.listData = res[0]
        })
        .finally(() => {})
    },
    // 催办
    async urgeleaveNote() {
      let res = await postUrgeleaveNote({
        groupId: this.groupId,
        userId: this.userId
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
        // .status-box {
        // 	display: inline-block;
        // 	width: 100%;
        // 	height: 100%;
        // }
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
