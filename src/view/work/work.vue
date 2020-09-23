<template>
  <div class="page">
    <div
      class="basic-info"
      :style="{ backgroundImage: `url(${imgModules.bg})` }"
    >
      <div class="basic">
        <div class="company">
          {{ userInfo.companyName }}
        </div>
        <div
          v-if="userInfo.workNo"
          class="hello"
        >
          你好，{{ userInfo.name }}（{{ userInfo.workNo }}）
        </div>
      </div>
      <van-image
        round
        class="avatarClass"
        :src="userInfo.avatarUrl"
        @click="toPersonalcenter"
      >
        <template v-slot:error>
          <i class="icon-usercircle" />
        </template>
      </van-image>
    </div>
    <div class="workbox">
      <div class="iconbox">
        <div
          class="iconItem"
          @click="handleClickIcon('approve')"
        >
          <van-image
            class="iconImg"
            :src="imgModules.approve"
          >
            <template v-slot:error>
              加载失败
            </template>
          </van-image>
          <div class="title">
            审批
          </div>
        </div>
        <div
          class="iconItem"
          @click="handleClickIcon('todo')"
        >
          <van-image
            class="iconImg"
            :src="imgModules.todo"
          >
            <template v-slot:error>
              加载失败
            </template>
          </van-image>
          <div class="title">
            待办
          </div>
        </div>
        <div
          class="iconItem"
          @click="handleClickIcon('schedule')"
        >
          <van-image
            class="iconImg"
            :src="imgModules.schedule"
          >
            <template v-slot:error>
              加载失败
            </template>
          </van-image>
          <div class="title">
            日程
          </div>
        </div>
        <div
          class="iconItem"
          @click="handleClickIcon('task')"
        >
          <van-image
            class="iconImg"
            :src="imgModules.task"
          >
            <template v-slot:error>
              加载失败
            </template>
          </van-image>
          <div class="title">
            任务
          </div>
        </div>
      </div>
    </div>
    <van-skeleton
      title
      avatar
      row="3"
      :loading="skeletonLoading"
      class="skeleton-class"
    >
      <section>
        <div
          v-if="myApproveList.length > 0"
          class="matters"
        >
          <van-cell title="我的申请" />
          <template v-for="(item, index) in myApproveList">
            <van-cell
              :key="item.id"
              :class="index === 2 ? 'noBorderBottom' : ''"
              style="align-items: flex-start"
              is-link
              @click="toApprovalDetail(item)"
            >
              <!-- 使用 title 插槽来自定义标题 -->
              <template #title>
                <div
                  class="person-cell"
                  style="align-items: flex-start"
                >
                  <svg
                    class="icon svg-icon"
                    aria-hidden="true"
                  >
                    <use :[symbolKey]="getApprIcon(item.formKey)" />
                  </svg>
                  <div class="title needWidth">
                    <div class="title-top">
                      <span class="custom-title">{{ item.processName }}</span>
                    </div>
                    <div class="title-bottom">
                      <span class="custom-title">申请时间：{{ item.applyTime }}</span>
                    </div>
                    <div
                      v-if="item.approveUser.length !== 0"
                      class="title-bottom"
                    >
                      <span
                        class="custom-title"
                      >当前审批人：{{ getApproveUser(item.approveUser) }}</span>
                      <span
                        class="custom-buttton"
                        @click.stop="handelUrge(item)"
                      >催一下</span>
                    </div>
                  </div>
                </div>
              </template>
              <span
                v-if="item.status"
                :style="{
                  color: getApprovalText(item.status).color
                }"
                v-text="getApprovalText(item.status).text"
              />
            </van-cell>
          </template>
          <div
            v-if="approveTotalNum > 3"
            class="more"
            @click="getMoreApproveList"
          >
            <div class="btn">
              查看更多
            </div>
          </div>
        </div>
        <div
          v-show="todoList.length > 0"
          class="matters"
        >
          <van-cell title="待办事项" />
          <ul>
            <van-cell
              v-for="(item, index) in todoList"
              :key="index"
              is-link
              @click="handleClickCell(item)"
            >
              <template slot="title">
                <div class="person-cell">
                  <svg
                    class="icon matterIcon"
                    aria-hidden="true"
                  >
                    <use :[symbolKey]="getTodoIcon(item.type)" />
                  </svg>
                  <div class="title">
                    <div class="title-top">
                      <span class="custom-title">{{ item.title }}</span>
                      <span
                        v-if="ifShowWarn(item)"
                        class="emerType-style"
                        v-text="getWarnText(item)"
                      />
                    </div>
                    <div class="title-bottom">
                      <span class="custom-title">{{ item.beginDate }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </van-cell>
          </ul>
          <div
            v-if="todoTotalNum > 3"
            class="more"
            @click="handleClickIcon('task')"
          >
            <div class="btn">
              查看更多
            </div>
          </div>
        </div>
        <div class="matters">
          <van-cell
            is-link
            title="今日安排"
            :value="today"
            @click="handleClickIcon('schedule')"
          />
          <template v-for="(item, index) in scheduleList">
            <van-cell
              v-if="index < 5"
              :key="item.id"
              is-link
            >
              <!-- 使用 title 插槽来自定义标题 -->
              <template #title>
                <div
                  class="person-cell"
                  @click="handleClickIcon('schedule')"
                >
                  <svg
                    class="icon matterIcon"
                    aria-hidden="true"
                  >
                    <use xlink:href="#icon-remind-bicolor" />
                  </svg>
                  <div class="title">
                    <div class="title-top">
                      <span class="custom-title">{{ item.title }}</span>
                    </div>
                    <div class="title-bottom">
                      <span class="custom-title">{{ item.remindDate }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </van-cell>
          </template>
          <section
            v-if="isAllFree"
            class="free-style"
          >
            <van-empty description="当前暂无安排" />
            <van-button
              plain
              type="info"
              class="bottom-button"
              @click="handleClickIcon('schedule')"
            >
              添加提醒
            </van-button>
          </section>
        </div>
        <div
          v-if="taskList.length > 0"
          class="matters"
        >
          <van-cell title="我的任务" />
          <template v-for="(item, index) in taskList">
            <van-cell
              v-if="index < 3"
              :key="item.id"
              style="align-items: flex-start"
              :class="index === 2 ? 'noBorderBottom' : ''"
              is-link
              @click="toTaskDetail(item)"
            >
              <!-- 使用 title 插槽来自定义标题 -->
              <template #title>
                <div
                  class="person-cell"
                  style="align-items: flex-start"
                >
                  <svg
                    class="icon svg-icon"
                    aria-hidden="true"
                  >
                    <use xlink:href="#icon-approval-invitation-bicolor" />
                  </svg>
                  <div class="title">
                    <div class="title-top">
                      <span class="custom-title">{{ item.title }}</span>
                      <span
                        class="emerType-style"
                        :style="{
                          color: getEmrTypeText(item.emerType).color,
                          borderColor: getEmrTypeText(item.emerType).color
                        }"
                        v-text="getEmrTypeText(item.emerType).text"
                      />
                    </div>
                    <div class="title-bottom">
                      <span class="custom-title">{{ item.brief }}</span>
                    </div>
                    <div class="percent">
                      <div class="percentNum">
                        {{ parseInt((item.completeNum / item.totalNum || 0) * 100) }}%
                      </div>
                      <div class="percentInfo">
                        <van-progress
                          :percentage="parseInt((item.completeNum / item.totalNum || 0) * 100)"
                          pivot-text
                        />
                        <div class="percentInfo-bottom">
                          <span
                            class="custom-title"
                          >计划招聘{{ item.totalNum || ' ' }}人 已入职{{
                            item.totalNum === 0 ? ' ' : item.completeNum || 0
                          }}人</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </van-cell>
          </template>
          <div
            v-if="taskList.length > 3"
            class="more"
            @click="handleClickIcon('task')"
          >
            <div class="btn">
              查看更多
            </div>
          </div>
        </div>
      </section>
    </van-skeleton>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/user'
import { getTodoList, getScheduleList } from '@/api/work'
import { getMyApproveList, createApprUrge } from '@/api/approval'
import moment from 'moment'
import { fetchTaskList } from '@/api/metask'
import { todoJumpFun } from './common'
import { improtAllFiles } from '@/util/util'
import { STATUS_TO_TEXT, FormKeysCN } from '@/const/approve'
import { todoTypeCN } from '@/const/todo'
import { EmerTypeCN } from '@/const/myTask'
export default {
  data() {
    return {
      todoTotalNum: 0,
      isAllFree: false, //所有的任务线都是空的
      skeletonLoading: true,
      symbolKey: 'xlink:href',
      approveParams: {
        pageNo: 1,
        pageSize: 3,
        userId: this.$store.state.user.userInfo.user_id
      },
      imgModules: {},
      today: moment().format('YYYY-MM-DD'),
      userInfo: {},
      todoList: [],
      scheduleList: [],
      myApproveList: [],
      approveTotalNum: 0,
      taskList: []
    }
  },
  created() {
    this.imgModules = improtAllFiles(
      require.context('@/assets/images/homeImages', false, /\.png$/),
      '.png'
    )
    this.initData()
  },
  methods: {
    // 点击催一下
    handelUrge(item) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      createApprUrge({
        apprNo: item.apprNo,
        processInstanceId: item.processInstanceId
      })
        .then(() => {
          this.$toast.clear()
          this.$toast({ type: 'success', message: '催办成功' })
        })
        .catch(() => {
          this.$toast.clear()
          this.$toast('今天已经催办过了')
        })
    },
    getApproveUser(data) {
      let userList = []
      data.map((item) => userList.push(item.userName))
      return userList.join('，')
    },
    /**
     * 兑换紧急程度文本
     */
    getEmrTypeText(emerTypeKey) {
      return EmerTypeCN[emerTypeKey]
    },
    /**
     * 初始化数据
     */
    initData() {
      Promise.all([
        this.getTodoList(),
        this.getMyTask(),
        this.getSchedule(),
        this.getUser(),
        this.getApproveList()
      ]).then((res) => {
        // 使用赋值解构，重写这部分
        [
          { data: this.todoList, totalNum: this.todoTotalNum },
          { data: this.taskList },
          this.scheduleList,
          this.userInfo,
          { data: this.myApproveList, totalNum: this.approveTotalNum }
        ] = res
        this.skeletonLoading = false
        this.jugeFreeLine()
      })
    },
    /**
     * 判断当前是否是空闲状态
     */
    jugeFreeLine() {
      // 判断内容为我的申请，待办事项，今日安排以及我的任务列表长度
      const isAllFreeArray = [
        this.todoList.length,
        this.scheduleList.length,
        this.myApproveList.length,
        this.taskList.length
      ]
      // 当所有的长度都为0时
      const isAllFreeFlag = isAllFreeArray.every((f) => f === 0)
      if (isAllFreeFlag) {
        this.isAllFree = true
      }
    },
    /**
     * 获取用户信息
     */
    getUser() {
      return getUserInfo({ userId: this.$store.state.user.userInfo.user_id }).then((res) => {
        this.$store.commit('SET_USER_DETAIL', res)
        return res
      })
    },
    /**
     * 获取我的任务
     */
    getMyTask() {
      const params = {
        pageNo: 1,
        pageSize: 5,
        userId: this.$store.state.user.userInfo.user_id,
        status: 'UnFinished'
      }
      return fetchTaskList(params).then((res) => {
        return res
      })
    },
    /**
     * 获取待办事项
     */
    getTodoList() {
      const params = {
        pageNo: 1,
        pageSize: 3,
        status: 'UnFinished',
        userId: this.$store.state.user.userInfo.user_id
      }
      return getTodoList(params).then((res) => {
        return res
      })
    },
    /**
     * 获取今日安排
     */
    getSchedule() {
      const params = {
        userId: this.$store.state.user.userInfo.user_id,
        beginRemindDate: moment().format('YYYY-MM-DD'),
        endRemindDate: moment().format('YYYY-MM-DD')
      }
      return getScheduleList(params).then((res) => {
        return res
      })
    },
    /**
     * 获取我的审批列表
     */
    getApproveList() {
      return getMyApproveList(this.approveParams).then((res) => {
        return res
      })
    },
    /**
     * 获取代办信息的icon
     */
    getTodoIcon(data) {
      return `#${todoTypeCN[data].icon}`
    },
    /**
     * 获取当前的formKey.来兑换当前的icon
     */
    getApprIcon(data) {
      return `#${data ? FormKeysCN[data].icon : FormKeysCN.Recruitment.icon}`
    },
    /**
     * 前往个人中心
     */
    toPersonalcenter() {
      this.$router.push('/me/index')
    },
    /**
     * 跳转到审批详情
     */
    toApprovalDetail(item) {
      this.$router.push({
        path: '/approval/approDetails',
        query: { apprNo: item.apprNo }
      })
      // console.log('跳转到审批详情==', data)
    },
    /**
     * 获取审批中文文字以及文字颜色
     */
    getApprovalText(status) {
      return STATUS_TO_TEXT[status]
    },
    /**
     * 跳转到审批列表页面
     */
    getMoreApproveList() {
      this.$router.push({
        path: `/approval/apprList`,
        query: {
          to: 'apprByMe'
        }
      })
    },
    /**
     * 展示条件：今天是否在比较时间相同或者之后
     */
    ifShowWarn(row) {
      let isShowWarn =
        moment().isSameOrAfter(moment(row.endDate), 'day') && row.status === 'UnFinished'
      return isShowWarn
    },
    /**
     * 获取滞留的天数（今天天数 - 结束日期）
     */
    getWarnText(row) {
      let showText = ''
      if (moment().isSame(moment(row.endDate), 'day')) {
        showText = '今天'
      } else {
        showText = `停滞${moment().diff(moment(row.endDate), 'days')}天`
      }
      return showText
    },
    /**
     * 点击icon图标
     */
    handleClickIcon(iconName) {
      const obj = {
        todo: '/work/todo',
        schedule: '/todaySchedule/calendar',
        task: '/work/task',
        approve: '/approval/apprHome'
      }
      // 当点击任务icon时，重置nav标签
      if (iconName === 'task') {
        this.$store.commit('RESET_TASK_NAV')
      }
      if (iconName === 'todo') {
        this.$store.commit('RESET_TODO_NAV')
      }
      this.$router.push(obj[iconName])
    },
    handleClickCell(item) {
      todoJumpFun(item, this.$router)
    },
    // 点击跳转到任务详情
    toTaskDetail({ bizId }) {
      return this.$router.push({
        path: '/work/taskDetail',
        query: {
          bizId
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  height: 100%;
  background-color: #f5f6f6;
  overflow: scroll;
  .free-style {
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    .bottom-button {
      width: 160px;
      height: 40px;
      margin-bottom: 30px;
    }
  }
}
.basic-info {
  position: relative;
  height: 145px;
  background-repeat: no-repeat;
  background-size: contain;
  padding: 0 32px 0px 25px;
  display: flex;
  justify-content: bet;
  .basic {
    flex: 1;
    margin-top: 34px;
    .company {
      height: 16px;
      max-width: 200px;
      font-size: 12px;
      color: #ffffff;
      margin-bottom: 4px;
    }
    .hello {
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
    }
  }
  .avatarClass {
    border: 2px solid white;
    box-shadow: 0 4px 12px 0 rgba(#1f416c, 0.3);
    margin-top: 20px;
    width: 60px;
    height: 60px;
    /deep/ .van-image__loading {
      width: 60px;
      height: 60px;
    }

    /deep/ .icon-usercircle {
      font-size: 64px;
      opacity: 0.5;
    }
  }
}

.workbox {
  height: 70px;
  background-color: #fff;
  position: relative;
  .iconbox {
    display: flex;
    position: absolute;
    height: 103px;
    left: 16px;
    right: 16px;
    bottom: 8px;
    background-color: #fff;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    .iconItem {
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .iconImg {
        height: 41px;
        width: 41px;
      }
      .title {
        margin-top: 8px;
        font-size: 14px;
        color: #718199;
      }
    }
  }
}
.skeleton-class {
  background: #fff;
  height: 100%;
  padding-top: 20px;
}
.matters {
  margin-top: 8px;
  .van-cell {
    align-items: center;
    .van-cell__title {
      font-weight: 500;
    }
    .van-cell__value {
      flex: 0 1 80px;
    }
    .person-cell {
      display: flex;
      align-items: center;
      .title {
        margin-left: 14px;
        width: calc(100vw - 100px);
        .custom-buttton {
          color: #5d82f7;
          margin-left: 4px;
        }
        &.needWidth {
          width: 224px;
        }
        .title-top {
          // margin-bottom: 6px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .custom-title {
            display: inline-block;
            font-size: 16px;
            margin-right: 11px;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .emerType-style {
            display: inline-block;
            padding: 0px 10px;
            color: #ff6464;
            border: 1px solid #ff6464;
            border-radius: 3px;
            font-size: 12px;
          }
        }
        .title-bottom {
          color: #888888;
          font-size: 14px;
          .press {
            margin-left: 8px;
          }
        }
        .percent {
          display: flex;
          margin-top: 15px;
          .percentNum {
            font-size: 28px;
            color: #78859c;
            margin-right: 15px;
          }
          .percentInfo {
            .van-progress {
              width: 210px;
              height: 6px;
            }
            .percentInfo-bottom {
              margin-top: 4px;
              font-size: 12px;
              color: #718199;
            }
          }
        }
      }
      .matterIcon {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
      }
      .svg-icon {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 4px;
      }
    }
  }
  .noBorderBottom {
    border-bottom: 0;
  }
  .more {
    padding: 0 16px 16px;
    background-color: #fff;
    .btn {
      border: 1px solid #dddddd;
      border-radius: 5px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 14px;
      color: #207efa;
    }
  }
}
</style>
