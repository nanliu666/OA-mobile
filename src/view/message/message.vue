<template>
  <div class="page">
    <van-tabs
      v-model="active"
      sticky
      color="#207EFA"
      swipeable
    >
      <van-tab title="工作消息">
        <template #title>
          工作消息
          <div
            v-if="
              workMsgList.findIndex((item) => {
                return item.isRead === 0
              }) > -1
            "
            class="dot"
          />
        </template>
        <van-pull-refresh
          v-model="workMessage.refreshing"
          @refresh="getWorkMsgList(1)"
        >
          <van-list
            :value="workMessage.loading"
            :finished="workMessage.finished"
            finished-text="没有更多了"
            :offset="247"
            @load="getWorkMsgList"
          >
            <template v-for="item in workMsgList">
              <div
                :key="item.id"
                class="msgBox"
                @click="handleClick(item)"
              >
                <div
                  v-if="item.isRead === 0"
                  class="unread"
                />
                <div
                  class="msgContent"
                  :class="item.isRead === 0 ? 'unreadMsg' : ''"
                >
                  <div class="content">
                    {{ item.content }}
                  </div>
                  <div class="time">
                    {{ item.createTime }}
                  </div>
                </div>
              </div>
            </template>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="系统消息">
        <template #title>
          系统消息
          <div
            v-if="
              systemMsgList.findIndex((item) => {
                return item.isRead === 0
              }) > -1
            "
            class="dot"
          />
        </template>
        <van-pull-refresh
          v-model="systemMessage.refreshing"
          @refresh="getSystemMsgList(1)"
        >
          <van-list
            :value="systemMessage.loading"
            :finished="systemMessage.finished"
            finished-text="没有更多了"
            @load="getSystemMsgList"
          >
            <template v-for="item in systemMsgList">
              <div
                :key="item.id"
                class="msgBox"
              >
                <div
                  :class="item.isRead === 1 ? 'read' : ''"
                  class="unread"
                />
                <div
                  class="msgContent"
                  :class="item.isRead === 0 ? 'unreadMsg' : ''"
                >
                  <div class="content">
                    {{ item.content }}
                  </div>
                  <div class="time">
                    {{ item.createTime }}
                  </div>
                </div>
              </div>
            </template>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { getMsgNotifyList, readMsgNotify } from '@/api/message'

export default {
  name: 'Message',
  data() {
    return {
      workMessage: {
        loading: false,
        finished: false,
        refreshing: false,
        pageNo: 1,
        pageSize: 20
      },
      systemMessage: {
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
    this.getWorkMsgList()
    this.getSystemMsgList()
  },
  methods: {
    handleClick(item) {
      const params = {
        userId: this.$store.state.user.userInfo.user_id,
        id: item.id
      }
      readMsgNotify(params).then(() => {
        item.isRead = 1
      })
    },
    getWorkMsgList(pageNo) {
      if (this.workMessage.loading) return
      if (pageNo) this.workMessage.pageNo = pageNo
      const params = {
        pageNo: this.workMessage.pageNo,
        pageSize: this.workMessage.pageSize,
        userId: this.$store.state.user.userInfo.user_id,
        type: 'Work'
      }
      this.workMessage.loading = true

      getMsgNotifyList(params).then((res) => {
        if (res.data.length > 0) {
          if (this.workMessage.refreshing) this.workMsgList = []
          this.workMsgList.push(...res.data)
          this.workMessage.pageNo += 1
          if (res.data.length < this.workMessage.pageSize) this.workMessage.finished = true
        } else {
          this.workMessage.finished = true
        }
        this.workMessage.loading = false
        this.workMessage.refreshing = false
      })
    },
    getSystemMsgList(pageNo) {
      if (this.systemMessage.loading) return
      if (pageNo) this.systemMessage.pageNo = pageNo
      const params = {
        pageNo: this.systemMessage.pageNo,
        pageSize: this.systemMessage.pageSize,
        userId: this.$store.state.user.userInfo.user_id,
        type: 'System'
      }
      this.systemMessage.loading = true
      getMsgNotifyList(params).then((res) => {
        if (res.data.length > 0) {
          if (this.systemMessage.refreshing) this.systemMsgList = []
          this.systemMsgList.push(...res.data)
          this.systemMessage.pageNo += 1
          if (res.data.length < this.systemMessage.pageSize) this.systemMessage.finished = true
        } else {
          this.systemMessage.finished = true
        }
        this.systemMessage.loading = false
        this.systemMessage.refreshing = false
      })
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
.dot {
  display: inline-block;
  height: 6px;
  width: 6px;
  border-radius: 3px;
  margin: 0 0 3px 6px;
  background: #ff6464;
}
// /deep/ .van-tabs{
//   height: 100%;
//   .van-tabs__content{
//     height: calc(100% - 44px);
//     .van-tab__pane{
//       height: 100%;
//       .van-pull-refresh{
//         height: 100%;
//         .van-list{
//           height: 100%;
//           overflow: scroll;
//         }
//       }
//     }
//   }
// }
.msgBox {
  padding: 20px 16px;
  border-bottom: 1px solid #ddd;
  position: relative;
  .unread {
    position: absolute;
    top: 26px;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: #ff6464;
    &.read {
      background: #fff;
    }
  }

  .msgContent {
    .content {
      font-size: 16px;
      color: #000000;
    }
    .time {
      font-size: 14px;
      color: #757c85;
      margin-top: 10px;
    }
  }
  .unreadMsg {
    margin-left: 18px;
  }
}
</style>
