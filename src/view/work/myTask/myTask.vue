<template>
  <div class="page">
    <div class="sticky-box">
      <van-nav-bar
        title="我的任务"
        left-arrow
        @click-left="goBack"
      />
      <van-tabs v-model="active">
        <van-tab
          v-for="(item, index) in tabList"
          :key="index"
          :title="item.title"
          :name="item.name"
        />
      </van-tabs>
    </div>

    <!-- 没完成 -->
    <div v-show="active == 'UnFinished'">
      <van-pull-refresh
        v-model="unFinishedLoad.refreshing"
        @refresh="loadUnFinishedData(1)"
      >
        <van-list
          :immediate-check="false"
          :value="unFinishedLoad.loading"
          :finished="unFinishedLoad.finished"
          finished-text="没有更多了"
          @load="loadUnFinishedData"
        >
          <div
            v-for="(item, index) in unFinishedList"
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
              <!-- {{ item.type }} -->
            </div>
            <!-- 主要内容 -->
            <div class="main-content">
              <div
                class="title-row"
                @click="goToDetail(item)"
              >
                {{ item.title }} <van-icon name="arrow" />
              </div>
              <div class="brief-row">
                {{ item.brief }}
              </div>
              <div class="complete-row">
                <div class="num">
                  {{ parseInt((item.completeNum / item.totalNum) * 100) }}%
                </div>
                <div class="progress-box">
                  <van-progress
                    :show-pivot="false"
                    color="#207EFA"
                    :percentage="parseInt((item.completeNum / item.totalNum) * 100)"
                  />
                  <p>计划招聘{{ item.totalNum }}人 已入职{{ item.completeNum }}人</p>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

    <!-- 已完成 -->
    <div v-show="active == 'Finished'">
      <van-pull-refresh
        v-model="FinishedLoad.refreshing"
        @refresh="loadFinishedData(1)"
      >
        <van-list
          :immediate-check="false"
          :value="FinishedLoad.loading"
          :finished="FinishedLoad.finished"
          finished-text="没有更多了"
          @load="loadFinishedData"
        >
          <div
            v-for="(item, index) in finishedList"
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
              <!-- {{ item.type }} -->
            </div>
            <!-- 主要内容 -->
            <div class="main-content">
              <div
                class="title-row"
                @click="goToDetail(item)"
              >
                {{ item.title }} <van-icon name="arrow" />
              </div>
              <div class="brief-row">
                {{ item.brief }}
              </div>
              <div class="complete-row">
                <div class="num">
                  {{ parseInt((item.completeNum / item.totalNum) * 100) }}%
                </div>
                <div class="progress-box">
                  <van-progress
                    :show-pivot="false"
                    color="#207EFA"
                    percentage="100"
                  />
                  <p>计划招聘{{ item.totalNum }}人 已入职{{ item.completeNum }}人</p>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { fetchTaskList } from '@/api/metask'
import { mapGetters } from 'vuex'
export default {
  name: 'MyTask',
  data() {
    return {
      // tags
      tabList: [
        {
          title: '进行中',
          name: 'UnFinished'
        },
        {
          title: '已完成',
          name: 'Finished'
        }
      ],
      active: '',
      // query 请求参数
      unFinishedQuery: {
        pageNo: 1,
        pageSize: 10,
        title: '',
        type: '',
        beginEndDate: '',
        endEndDate: '',
        isOverdue: 0,
        status: 'UnFinished',
        userId: ''
      },
      unFinishedLoad: {
        loading: false,
        finished: false,
        refreshing: false
      },
      finishedQuery: {
        pageNo: 1,
        pageSize: 10,
        title: '',
        type: '',
        beginEndDate: '',
        endEndDate: '',
        isOverdue: 0,
        status: 'Finished',
        userId: ''
      },
      FinishedLoad: {
        loading: false,
        finished: false,
        refreshing: false
      },
      unFinishedList: [],
      finishedList: [],
      // // scrollTop
      unFinishedScrollTop: 0,
      finishedScrollTop: 0,
      scrollTop: {
        unFinished: 0,
        finished: 0
      }
    }
  },
  computed: {
    ...mapGetters(['taskActive'])
  },
  watch: {
    // 解决滚动条位置
    active(nval, oval) {
      this.scrollTop[oval] = document.documentElement.scrollTop
      document.documentElement.scrollTop = this.scrollTop[nval]
    }
  },
  created() {
    this.initSetting()
    this.loadUnFinishedData()
    this.loadFinishedData()
  },

  methods: {
    /**
     * 初始化设置
     */
    initSetting() {
      this.active = this.taskActive
    },
    // 加载 unFinishedList
    loadUnFinishedData(pageNo) {
      if (this.unFinishedLoad.loading) return
      if (pageNo) this.unFinishedQuery.pageNo = pageNo
      // this.loading = true
      // 获取用户ID
      this.unFinishedQuery.userId = this.$store.state.user.userInfo.user_id
      this.unFinishedLoad.loading = true
      fetchTaskList(this.unFinishedQuery).then((res) => {
        if (res.data.length > 0) {
          if (this.unFinishedLoad.refreshing) this.unFinishedList = []
          this.unFinishedList.push(...res.data)
          this.unFinishedQuery.pageNo += 1
          if (res.data.length < this.unFinishedQuery.pageSize) this.unFinishedLoad.finished = true
        } else {
          this.unFinishedLoad.finished = true
        }
        this.unFinishedLoad.loading = false
        this.unFinishedLoad.refreshing = false
      })
    },
    // 加载 finishedList
    loadFinishedData(pageNo) {
      if (this.FinishedLoad.loading) return
      if (pageNo) this.finishedQuery.pageNo = pageNo
      // this.loading = true
      // 获取用户ID
      this.finishedQuery.userId = this.$store.state.user.userInfo.user_id
      this.FinishedLoad.loading = true
      fetchTaskList(this.finishedQuery).then((res) => {
        if (res.data.length > 0) {
          if (this.FinishedLoad.refreshing) this.finishedList = []
          this.finishedList.push(...res.data)
          this.finishedQuery.pageNo += 1
          if (res.data.length < this.finishedQuery.pageSize) this.FinishedLoad.finished = true
        } else {
          this.FinishedLoad.finished = true
        }
        this.FinishedLoad.loading = false
        this.FinishedLoad.refreshing = false
      })
    },
    // 点击跳转到详情页
    goToDetail({ bizId, type }) {
      // 跳转详情之前先记录当前显示nav的标识
      this.$store.commit('SET_TASK_NAV', this.active)
      if (type === 'Recruitment') {
        return this.$router.push({
          path: '/work/taskDetail',
          query: {
            bizId
          }
        })
      }
    },
    //
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  height: 100%;
  padding-top: 90px;
  .sticky-box {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
  }
}
/deep/.van-tabs__line {
  background-color: #207efa;
  width: 50% !important;
}
/deep/.van-nav-bar__title {
  font-size: 17px;
  color: #000000;
  letter-spacing: 0;
  line-height: 24px;
  font-weight: bold;
}
/deep/.van-tab--active {
  color: #207efa;
}
.item {
  display: flex;
  height: 130.5px;
  // 主要内容
  .left-content {
    .icon {
      margin: 20px 15px 0 16px;
      height: 32px;
      width: 32px;
    }
  }
  .main-content {
    box-sizing: border-box;
    flex: 1;
    border-bottom: 1px solid #dddddd;
    .title-row {
      margin: 20px 0 8px 0;
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
      justify-content: flex-start;
      .num {
        width: 70px;
        font-size: 28px;
        color: #78859c;
        text-align: right;
        line-height: 28px;
      }
      .progress-box {
        margin-left: 15px;
        p {
          font-size: 12px;
          color: #718199;
          line-height: 18px;
        }
      }
    }
  }
}
</style>
