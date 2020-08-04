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
      v-if="active === 0"
      v-model="toduStatus.refreshing"
      @refresh="getTodoListFun(1)"
    >
      <van-list
        :value="toduStatus.loading"
        :finished="toduStatus.finished"
        finished-text="没有更多了"
        @load="getTodoListFun"
      >
        <template v-for="item in workMsgList">
          <van-cell
            :key="item.id"
            is-link
            @click="handleClickCell(item)"
          >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="person-cell">
                <div class="matterIcon">
                  <svg
                    class="icon matterIcon"
                    aria-hidden="true"
                  >
                    <use :[symbolKey]="getTodoIcon(item.type)" />
                  </svg>
                </div>
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
      v-if="active === 1"
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
            @click="handleClickCell(item)"
          >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="person-cell">
                <div class="matterIcon">
                  <svg
                    class="icon matterIcon"
                    aria-hidden="true"
                  >
                    <use :[symbolKey]="getTodoIcon(item.type)" />
                  </svg>
                </div>

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
import { todoJumpFun } from './common'
import { mapGetters } from 'vuex'
import { todoTypeCN } from '@/const/todo'

export default {
  name: 'Todo',
  components: {
    StickyHeader
  },
  data() {
    return {
      symbolKey: 'xlink:href',
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
      systemMsgList: [],
      scrollTop: {
        0: 0,
        1: 0
      }
    }
  },
  computed: {
    ...mapGetters(['todoActive'])
  },
  watch: {
    active(nVal, oVal) {
      this.scrollTop[oVal] = document.documentElement.scrollTop
      document.documentElement.scrollTop = this.scrollTop[nVal]
    }
  },
  created() {
    this.initSetting()
    this.getTodoListFun()
    this.getDidList()
  },
  methods: {
    /**
     * 获取代办信息的icon
     */
    getTodoIcon(data) {
      return `#${todoTypeCN[data].icon}`
    },
    /**
     * 初始化设置
     */
    initSetting() {
      this.active = this.todoActive
    },
    /**
     * 展示条件：今天是否在比较时间相同或者之后
     */
    ifShowWarn(row) {
      let isShowWarn = moment().isSameOrAfter(moment(row.endDate)) && row.status === 'UnFinished'
      return isShowWarn
    },
    /**
     * 获取滞留的天数（今天天数 - 结束日期）
     */
    getWarnText(row) {
      return moment().diff(moment(row.endDate), 'days')
    },
    /**
     * 获取待处理列表
     */
    getTodoListFun(pageNo) {
      if (this.toduStatus.loading) return
      if (pageNo) this.toduStatus.pageNo = pageNo
      const params = {
        pageNo: this.toduStatus.pageNo,
        pageSize: this.toduStatus.pageSize,
        userId: this.$store.state.user.userInfo.user_id,
        status: 'UnFinished'
      }
      this.toduStatus.loading = true

      getTodoList(params).then((res) => {
        if (res.data.length > 0) {
          if (this.toduStatus.refreshing) this.workMsgList = []
          this.workMsgList.push(...res.data)
          this.toduStatus.pageNo += 1
          // console.log('this.workMsgList==', this.workMsgList)
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
        status: 'Finished'
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
    },
    handleClickCell(item) {
      todoJumpFun(item, this.$router)
      this.$store.commit('SET_TODO_NAV', this.active)
    }
  }
}
</script>

<style lang="less" scoped>
.page {
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
      .matterIcon {
        height: 32px;
        width: 32px;
      }
    }
    .title-bottom {
      color: #888888;
      font-size: 14px;
    }
  }
  .matterIcon {
    height: 32px;
    width: 32px;
  }
}
</style>
