<template>
  <div class="page">
    <stickyHeader title="待办事项">
      <template #footer>
        <van-tabs
          v-model="active"
          color="#207EFA"
          swipeable
        >
          <van-tab title="待处理" />
          <van-tab title="已完成" />
        </van-tabs>
      </template>
    </stickyHeader>
    <van-pull-refresh
      v-show="active === 0"
      v-model="toduStatus.refreshing"
      @refresh="getToduList(1)"
    >
      <van-list
        :value="toduStatus.loading"
        :finished="toduStatus.finished"
        finished-text="没有更多了"
        :offset="247"
        @load="getToduList"
      >
        <template v-for="item in workMsgList">
          <van-cell
            :key="item.id"
            is-link
          >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="person-cell">
                <van-image
                  round
                  class="matterIcon"
                >
                  <template v-slot:error>
                    加载失败
                  </template>
                </van-image>
                <div class="title">
                  <div class="title-top">
                    <span class="custom-title">{{ item.title }}</span><van-tag
                      v-if="ifShowWarn(item)"
                      type="danger"
                    >
                      停滞{{ getWarnText(item) }}天
                    </van-tag>
                  </div>
                  <div class="title-bottom">
                    <span class="custom-title">{{ item.beginDate }}</span>
                  </div>
                </div>
              </div>
            </template>
          </van-cell>
        </template>
      </van-list>
    </van-pull-refresh>
    <van-pull-refresh
      v-show="active === 1"
      v-model="didList.refreshing"
      @refresh="getDidList(1)"
    >
      <van-list
        :value="didList.loading"
        :finished="didList.finished"
        finished-text="没有更多了"
        @load="getDidList"
      >
        <template v-for="item in systemMsgList">
          <van-cell
            :key="item.id"
            is-link
          >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="person-cell">
                <van-image
                  round
                  class="matterIcon"
                >
                  <template v-slot:error>
                    加载失败
                  </template>
                </van-image>
                <div class="title">
                  <div class="title-top">
                    <span class="custom-title">{{ item.title }}</span>
                  </div>
                  <div class="title-bottom">
                    <span class="custom-title">{{ item.beginDate }}</span>
                  </div>
                </div>
              </div>
            </template>
          </van-cell>
        </template>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getTodoList } from '@/api/work'
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import moment from 'moment'

export default {
  name: 'Todo',
  components: {
    StickyHeader
  },
  data() {
    return {
      toduStatus: {
        loading: false,
        finished: false,
        refreshing: false,
        pageNo: 1,
        pageSize: 20
      },
      didList: {
        loading: false,
        finished: false,
        refreshing: false,
        pageNo: 1,
        pageSize: 20
      },
      active: 0,
      workMsgList: [],
      systemMsgList: []
    }
  },
  activated() {
    this.getToduList()
    this.getDidList()
  },
  methods: {
      ifShowWarn(row) {
      return (
        row.status === 'UnFinished' &&
        moment()
          .startOf('day')
          .diff(moment(row.endDate)) > 0
      )
    },
    getWarnText(row) {
      return moment().diff(moment(row.beginDate), 'days')
    },
    getToduList(pageNo) {
      if (this.toduStatus.loading) return
      if (pageNo) this.toduStatus.pageNo = pageNo
      const params = {
        pageNo: this.toduStatus.pageNo,
        pageSize: this.toduStatus.pageSize,
        userId: this.$store.state.user.userInfo.user_id,
        type: 'UnFinished'
      }
      this.toduStatus.loading = true

        getTodoList(params).then((res) => {
        if (res.data.length > 0) {
          if (this.toduStatus.refreshing) this.workMsgList = []
          this.workMsgList.push(...res.data)
          this.toduStatus.pageNo += 1
          if (res.data.length < this.toduStatus.pageSize) this.toduStatus.finished = true
        } else {
          this.toduStatus.finished = true
        }
        this.toduStatus.loading = false
        this.toduStatus.refreshing = false
      })
      
    },
    getDidList(pageNo) {
      if (this.didList.loading) return
      if (pageNo) this.didList.pageNo = pageNo
      const params = {
        pageNo: this.didList.pageNo,
        pageSize: this.didList.pageSize,
        userId: this.$store.state.user.userInfo.user_id,
        type: 'Finished'
      }
      this.didList.loading = true
      getTodoList(params).then((res) => {
        if (res.data.length > 0) {
          if (this.didList.refreshing) this.systemMsgList = []
          this.systemMsgList.push(...res.data)
          this.didList.pageNo += 1
          if (res.data.length < this.didList.pageSize) this.didList.finished = true
        } else {
          this.didList.finished = true
        }
        this.didList.loading = false
        this.didList.refreshing = false
      })
    }
  }
}
</script>

<style lang='less' scoped>
.page{
  height: 100%;
}
/deep/ .van-tabs__line {
  width: 50% !important;
  
  background-color: #207efa;
}
/deep/.van-tab--active {
  color: #207efa;
}
.person-cell {
      display: flex;
      align-items: center;
      .title {
        margin-left: 14px;
        .title-top {
          // margin-bottom: 6px;
          .custom-title {
            font-size: 16px;
            margin-right: 11px;
            color: #000;
          }
        }
        .title-bottom {
          color: #888888;
          font-size: 14px;
        } 
      }
      .matterIcon{
          height: 32px;
          width: 32px;
      }
    }


</style>