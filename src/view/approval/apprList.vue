<template>
  <div class="page">
    <StickyHeader :title="headerTitle">
      <div
        slot="footer"
        class="header-footer"
      >
        <van-search
          v-model="queryInfo.search"
          class="search-box"
          placeholder="请输入审批标题，审批编号"
          @search="onSearch"
        />
        <span
          style="color: #838991"
          class="iconfont icon-basics-filter-outlined"
          @click="toFilter"
        />
      </div>
    </StickyHeader>
    <apprSelect
      :options.sync="selectOptions"
      @on-submit="onSubmit"
    />
    <van-empty
      v-if="isShowEmpty"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无数据"
    />
    <van-pull-refresh
      v-model="loadingSetting.refreshing"
      class="list-style"
      @refresh="reRestList()"
    >
      <van-skeleton
        title
        row="5"
        :loading="loadingSetting.loading && isFristLoad"
        class="skeleton-class"
      >
        <van-list
          :value="loadingSetting.loading"
          :finished="loadingSetting.finished"
          :finished-text="approvalList.length === 0 ? '' : '没有更多了'"
          @load="getWorkMsgList"
        >
          <ul
            v-for="(item, index) in approvalList"
            :key="index"
          >
            <li
              class="msgBox"
              @click="toDetail(item)"
            >
              <div class="msgContent">
                <div class="content">
                  {{ item.title }}
                </div>
                <div class="des-box">
                  <span class="time">审 批 类 型：</span>
                  <span class="des-content">{{ item.processName }}</span>
                </div>
                <div class="des-box">
                  <span class="time">申 请 部 门：</span>
                  <span class="des-content">{{ item.orgName }}</span>
                </div>
                <div class="des-box">
                  <span class="time">当前审批人：</span>
                  <span class="des-content">{{ getUser(item.approveUser) }}</span>
                </div>
                <div class="des-box">
                  <span class="time">申 请 时 间：</span>
                  <span class="des-content">
                    {{ moment(item.applyTime).format('YYYY-MM-DD hh:mm') }}
                  </span>
                </div>
                <div
                  v-if="item.completeTime"
                  class="des-box"
                >
                  <span class="time">完 成 时 间：</span>
                  <span class="des-content">
                    {{ moment(item.completeTime).format('YYYY-MM-DD hh:mm') }}
                  </span>
                </div>
              </div>
              <div
                v-if="item.status"
                class="status-style"
                :style="{
                  backgroundColor: getStatus(item.status).backgroundColor,
                  color: getStatus(item.status).color
                }"
                v-text="getStatus(item.status).text"
              />
            </li>
          </ul>
        </van-list>
      </van-skeleton>
    </van-pull-refresh>
  </div>
</template>
<script>
import moment from 'moment'
import {
  getMyApproveList,
  getWaitApproveList,
  getHasApproveList,
  getCopyApproveList
} from '@/api/approval'
import { STATUS_TO_TEXT } from '@/const/approve'
import { Toast } from 'vant'
export default {
  name: 'Message',
  components: {
    StickyHeader: () => import('@/components/stickyHeader/stickyHeader'),
    apprSelect: () => import('./apprSelect')
  },
  data() {
    return {
      selectOptions: {
        visible: false
      },
      headerTitle: '待我审批',
      isFristLoad: true,
      isShowEmpty: false,
      queryInfo: {},
      loadingSetting: {
        loading: false,
        finished: false,
        refreshing: false
      },
      loadFun: null,
      approvalList: []
    }
  },
  activated() {
    this.hangleApprType()
    this.resetParams()
    if (!this.isFristLoad) {
      this.getWorkMsgList()
    }
  },
  methods: {
    onSubmit(data) {
      this.queryInfo = _.chain(this.queryInfo)
        .assign(data)
        .omit(['showDate', 'processName', 'visible', 'statusText'])
        .value()
      this.resetParams()
      this.getWorkMsgList()
    },
    hangleApprType() {
      switch (this.$route.query.to) {
        case 'waitAppr':
          this.headerTitle = '待我审批'
          this.loadFun = getWaitApproveList
          break
        case 'hasAppr':
          this.loadFun = getHasApproveList
          this.headerTitle = '我已审批'
          break
        case 'copyApprToMe':
          this.loadFun = getCopyApproveList
          this.headerTitle = '抄送我的'
          break
        case 'apprByMe':
          this.loadFun = getMyApproveList
          this.headerTitle = '我发起的'
          break
      }
    },
    toFilter() {
      this.selectOptions.visible = true
    },
    onSearch() {
      this.resetParams()
      this.getWorkMsgList()
    },
    resetParams() {
      this.queryInfo = {
        pageNo: 1,
        pageSize: 10,
        status: '',
        search: '',
        processId: '',
        orgId: '',
        beginApplyTime: '',
        endApplyTime: '',
        userId: this.$store.state.user.userInfo.user_id
      }
      this.loadingSetting.finished = false
    },
    moment,
    getStatus(status) {
      return STATUS_TO_TEXT[status]
    },
    getUser(data) {
      let targetNameList = []
      data.map((approveUserItem) => {
        targetNameList.push(approveUserItem.userName)
      })
      return targetNameList.length === 0 ? '暂无审批人' : targetNameList.join('，')
    },
    toDetail(item) {
      Toast(item.title)
    },
    reRestList() {
      this.resetParams()
      this.getWorkMsgList()
    },
    getWorkMsgList: _.debounce(function() {
      if (this.loadingSetting.loading || this.loadingSetting.finished) return
      this.loadingSetting.loading = true
      this.loadFun(this.queryInfo).then((res) => {
        let { data, totalPage } = res
        this.isFristLoad = false
        if (this.queryInfo.pageNo === 1) this.approvalList = []
        if (data.length > 0) {
          this.isShowEmpty = false
          if (this.loadingSetting.refreshing) this.approvalList = []
          this.approvalList.push(...data)
          if (totalPage === this.queryInfo.pageNo) {
            this.loadingSetting.finished = true
          }
          this.queryInfo.pageNo += 1
        } else {
          this.loadingSetting.finished = true
        }
        this.loadingSetting.loading = false
        this.loadingSetting.refreshing = false
        if (this.approvalList.length === 0) this.isShowEmpty = true
      })
    }, 10)
  }
}
</script>

<style lang="less" scoped>
.page {
  background-color: #f7f9fa;
  min-height: 100vh;
  .skeleton-class {
    background: #fff;
    height: 100%;
    min-height: 100vh;
    padding-top: 20px;
  }
  .header-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding-right: 10px;
    .search-box {
      flex: 1;
    }
  }
  .list-style {
    padding-top: 8px;
    .msgBox {
      position: relative;
      background-color: #fff;
      box-shadow: 0px 3px 6px 0px rgba(84, 105, 119, 0.05);
      padding: 20px 16px 12px;
      margin-bottom: 8px;
      .msgContent {
        .content {
          font-size: 16px;
          color: #000000;
          margin-bottom: 10px;
        }
        .time {
          color: #757c85;
        }
        .des-box {
          font-size: 14px;
          margin-bottom: 4px;
          .des-content {
            color: #202940;
          }
        }
      }
      .status-style {
        position: absolute;
        right: 15px;
        top: 18px;
        width: 60px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        font-size: 12px;
      }
    }
  }
}
</style>
