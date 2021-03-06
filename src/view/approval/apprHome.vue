<template>
  <div class="approval-index">
    <StickyHeader title="审批" />
    <div class="iconbox">
      <div
        v-for="(item, index) in navList"
        :key="index"
        class="iconItem"
        @click="handleClickIcon(item)"
      >
        <svg
          class="icon iconImg"
          aria-hidden="true"
        >
          <use :[symbolKey]="'#' + item.icon" />
        </svg>
        <div class="title">
          {{ item.name }}
        </div>
        <div
          v-if="waitTotalNum && index === 0"
          class="corner-mark"
        >
          {{ waitTotalNum }}
        </div>
      </div>
    </div>
    <ul class="approval-list">
      <li
        v-for="(item, index) in aprrovalList"
        :key="index"
        class="approval-li"
      >
        <div
          class="title-box"
          @click="toggleShow(index)"
        >
          <span class="title">{{ item.name }}</span>
          <span class="button">{{ hasIndexList.indexOf(index) > -1 ? '展开' : '收起' }}</span>
        </div>
        <ul
          v-if="hasIndexList.indexOf(index) === -1"
          class="group-ul"
          :class="{ 'emty-ul': hasIndexList.indexOf(index) === -1 }"
        >
          <li
            v-for="(groupItem, groupIndex) in item.processes"
            :key="groupIndex"
            class="group-li"
            @click="toAppr(groupItem)"
          >
            <div class="logo-box">
              <svg
                class="icon svg-icon"
                aria-hidden="true"
              >
                <use :[symbolKey]="'#' + groupItem.icon" />
              </svg>
            </div>
            <div class="li-title">
              {{ groupItem.processName }}
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { getProcessList, getWaitApproveList } from '@/api/approval'
const NAV_LIST = [
  {
    name: '待我审批',
    to: 'waitAppr',
    icon: 'iconseal-bicolor'
  },
  {
    name: '我已审批',
    to: 'hasAppr',
    icon: 'iconapproval-bicolor'
  },
  {
    name: '抄送我的',
    to: 'copyApprToMe',
    icon: 'iconCC-bicolor'
  },
  {
    name: '我发起的',
    to: 'apprByMe',
    icon: 'iconlaunch-bicolor'
  }
]
import { mapGetters } from 'vuex'
import StickyHeader from '@/components/stickyHeader/stickyHeader'
export default {
  name: 'ApprovalIndex',
  components: {
    StickyHeader
  },
  data() {
    return {
      waitTotalNum: 0,
      hasIndexList: [],
      aprrovalList: [],
      symbolKey: 'xlink:href',
      navList: NAV_LIST
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.initData()
  },
  methods: {
    toAppr(data) {
      if (data.formKey) {
        this.$toast({
          message: '该申请不支持直接发起，请在相关业务处（如：人事管理模块）发起申请',
          position: 'bottom'
        })
        return
      }
      this.$router.push({ path: '/approval/apprApply', query: { processId: data.processId } })
    },
    /**
     * 初始化数据
     */
    initData() {
      let parmas = {
        userId: this.userId
      }
      getProcessList(parmas).then((res) => {
        this.aprrovalList = res
      })
      let waitParmas = {
        pageNo: 1,
        pageSize: 1,
        userId: this.$store.state.user.userInfo.user_id
      }
      getWaitApproveList(waitParmas).then(({ totalNum }) => {
        this.waitTotalNum = totalNum
      })
    },
    /**
     * toggleShow切换展示/隐藏
     */
    toggleShow(index) {
      let showIndex = this.hasIndexList.indexOf(index)
      if (showIndex > -1) {
        this.hasIndexList.splice(showIndex, 1)
      } else {
        this.hasIndexList.push(index)
      }
    },
    /**
     * 点击头部导航栏
     */
    handleClickIcon(data) {
      this.$router.push({
        path: `/approval/apprList`,
        query: {
          to: data.to
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.approval-index {
  background-color: #f7f9fa;
  min-height: 100vh;
  .iconbox {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 15px 0;
    .iconItem {
      position: relative;
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .corner-mark {
        position: absolute;
        right: 25px;
        top: -6px;
        background-color: #ee3e37;
        color: #ffff;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        font-size: 12px;
      }
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
  .approval-list {
    .approval-li {
      margin-top: 16px;
      background-color: #fff;
      .title-box {
        padding: 10px 20px;
        font-size: 16px;
        color: #000000;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #dddddd;
      }
      .group-ul {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        .group-li {
          margin: 10px 0;
          width: calc(100% / 4);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          .li-title {
            font-size: 14px;
            margin-top: 4px;
            color: #718199;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            text-align: center;
          }
          .logo-box {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 14px;
            width: 48px;
            height: 48px;
            svg {
              width: 40px;
              height: 40px;
            }
          }
        }
      }
      .emty-ul {
        padding: 0;
      }
    }
  }
}
</style>
