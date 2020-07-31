<template>
  <div class="page">
    <div class="basic-info">
      <van-image
        class="backgroud-image"
        fill
        :src="imgModules.bg"
      >
        <template v-slot:error>
          加载失败
        </template>
      </van-image>
      <div class="basic">
        <div class="company">
          {{ userInfo.companyName }}
        </div>
        <div class="hello">
          你好，{{ userInfo.name }}（{{ userInfo.workNo }}）
        </div>
      </div>
      <van-image
        round
        class="avatarClass"
        :src="userInfo.avatarUrl"
      >
        <template v-slot:error>
          加载失败
        </template>
      </van-image>
    </div>
    <div class="workbox">
      <div class="iconbox">
        <div class="iconItem">
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
    <div
      v-if="myApproveList.length > 0"
      class="matters"
    >
      <van-cell title="我的申请" />
      <template v-for="(item, index) in myApproveList">
        <van-cell
          v-if="index < 3"
          :key="item.id"
          :value="approveStatusWork[item.status]"
          :class="index === 2 ? 'noBorderBottom' : ''"
          style="align-items: flex-start"
          is-link
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div
              class="person-cell"
              style="align-items: flex-start"
            >
              <van-image
                round
                class="matterIcon"
              >
                <template v-slot:error>
                  加载失败
                </template>
              </van-image>
              <div class="title needWidth">
                <div class="title-top">
                  <span class="custom-title">{{ item.title }}</span>
                </div>
                <div class="title-bottom">
                  <span class="custom-title">申请时间：{{ item.applyTime }}</span>
                </div>
                <div class="title-bottom">
                  <span class="custom-title">当前审批人：{{ item.approveName || '' }}</span>
                  <span
                    class="press"
                    style="color: #207EFA;"
                  >催一下</span>
                </div>
              </div>
            </div>
          </template>
        </van-cell>
      </template>
      <div
        v-if="myApproveList.length > 3"
        class="more"
      >
        <div class="btn">
          查看更多
        </div>
      </div>
    </div>
    <div
      v-if="todoList.length > 0"
      class="matters"
    >
      <van-cell title="待办事项" />
      <template v-for="(item, index) in todoList">
        <van-cell
          v-if="index < 5"
          :key="item.id"
          is-link
          @click="handleClickCell(item)"
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
    </div>
    <div class="matters">
      <van-cell title="今日安排">
        <template #right-icon>
          <span @click="handleClickIcon('schedule')">{{ today }}</span>
        </template>
      </van-cell>
      <template v-for="(item, index) in scheduleList">
        <van-cell
          v-if="index < 5"
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
                  <span class="custom-title">{{ item.remindDate }}</span>
                </div>
              </div>
            </div>
          </template>
        </van-cell>
      </template>
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
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div
              class="person-cell"
              style="align-items: flex-start"
            >
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
                  <span class="emerType">{{ EmerType[item.emerType] }}</span>
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
  </div>
</template>
<script>
import { getUserInfo } from '@/api/user'
import { getTodoList, getScheduleList, getMyApproveList } from '@/api/work'
import moment from 'moment'
import { fetchTaskList } from '@/api/metask'
import { todoJumpFun } from './common'
// 批量引入图片
const path = require('path')
const files = require.context('@/assets/images/homeImages', false, /\.png$/) //这句话的意思是引入图片文件夹下的所有图片
const imgModules = {}
files.keys().forEach((key) => {
  const name = path.basename(key, '.png')
  imgModules[name] = files(key).default || files(key)
})
export default {
  data() {
    return {
      imgModules: imgModules,
      today: moment().format('YYYY-MM-DD'),
      userInfo: {},
      todoList: [],
      scheduleList: [],
      myApproveList: [],
      taskList: [],
      approveStatusWork: {
        Approve: '审批中',
        Pass: '已通过',
        Reject: '已拒绝',
        Cancel: '已撤回'
      },
      EmerType: {
        Super: '特级',
        urgent: '急',
        common: '一般',
        suit: '有合适的人选再进'
      }
    }
  },
  created() {
    getUserInfo({ userId: this.$store.state.user.userInfo.user_id }).then((res) => {
      this.userInfo = res
      this.$store.commit('SET_USER_DETAIL', res)
    })
    this.$store.dispatch('CommonDict', 'EmerType').then((res) => {
      res.forEach((item) => {
        this.EmerType[item.dictKey] = item.dictValue
      })
    })
    this.getTodoList()
    this.getScheduleList()
    this.getMyApproveList()
    this.getMyTask()
  },
  methods: {
    toTudo() {
      this.$router.push('/work/todo')
    },
    getTodoList() {
      const params = {
        pageNo: 1,
        pageSize: 5,
        status: 'UnFinished',
        userId: this.$store.state.user.userInfo.user_id
      }
      getTodoList(params).then((res) => {
        this.todoList = res.data
      })
    },
    getScheduleList() {
      const params = {
        userId: this.$store.state.user.userInfo.user_id,
        beginRemindDate: moment().format('YYYY-MM-DD'),
        endRemindDate: moment().format('YYYY-MM-DD')
      }
      getScheduleList(params).then((res) => {
        this.scheduleList = res
      })
    },
    getMyApproveList() {
      const params = {
        pageNo: 1,
        pageSize: 10,
        userId: this.$store.state.user.userInfo.user_id
      }
      getMyApproveList(params).then((res) => {
        this.myApproveList = res.data
      })
    },
    getMyTask() {
      const params = {
        pageNo: 1,
        pageSize: 10,
        userId: this.$store.state.user.userInfo.user_id,
        status: 'UnFinished'
      }
      fetchTaskList(params).then((res) => {
        this.taskList = res.data
        // window.console.log('this.taskList==', this.taskList)
      })
    },
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
    handleClickIcon(iconName) {
      const obj = {
        todo: '/work/todo',
        schedule: '/todaySchedule/calendar',
        task: '/work/task'
      }
      // 当点击任务icon时，重置nav标签
      if (iconName === 'task') {
        this.$store.commit('RESET_TASK_NAV')
      }
      this.$router.push(obj[iconName])
    },
    handleClickCell(item) {
      todoJumpFun(item, this.$router)
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  height: 100%;
  background-color: #f5f6f6;
  overflow: scroll;
}
.basic-info {
  position: relative;
  height: 145px;
  background-image: linear-gradient(180deg, #207efa 0%, #0ea6fe 100%);
  padding: 0 34px 0px 25px;
  display: flex;
  justify-content: bet;
  .backgroud-image {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }
  .basic {
    flex: 1;
    margin-top: 34px;
    .company {
      font-size: 14px;
      color: #ffffff;
      margin-bottom: 4px;
    }
    .hello {
      font-size: 16px;
      color: #ffffff;
    }
  }
  .avatarClass {
    border: 2px solid white;
    box-shadow: 0 4px 12px 0 rgba(#1f416c, 0.3);
    margin-top: 22px;
    width: 60px;
    height: 60px;
    /deep/ .van-image__loading {
      width: 60px;
      height: 60px;
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
.matters {
  margin-top: 8px;
  .van-cell {
    align-items: center;
    .van-cell__title {
      font-weight: 500;
    }
    .van-cell__value {
      flex: 0 1 60px;
    }
    .person-cell {
      display: flex;
      align-items: center;
      .title {
        margin-left: 14px;
        &.needWidth {
          width: 224px;
        }
        .title-top {
          // margin-bottom: 6px;
          .custom-title {
            font-size: 16px;
            margin-right: 11px;
            color: #000;
          }
          .emerType {
            display: inline-block;
            padding: 0px 12px;
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
