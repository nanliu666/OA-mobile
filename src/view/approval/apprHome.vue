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
        <van-image
          class="iconImg"
          :src="imgModules[item.icon]"
        >
          <template v-slot:error>
            加载失败
          </template>
        </van-image>
        <div class="title">
          {{ item.name }}
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
import { improtAllFiles } from '@/util/util'
import { getProcessList } from '@/api/approval'
const NAV_LIST = [
  {
    name: '待我审批',
    to: 'waitAppr',
    icon: 'approve'
  },
  {
    name: '我已审批',
    to: 'hasAppr',
    icon: 'todo'
  },
  {
    name: '抄送我的',
    to: 'copyApprToMe',
    icon: 'schedule'
  },
  {
    name: '我发起的',
    to: 'apprByMe',
    icon: 'task'
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
      hasIndexList: [],
      aprrovalList: [],
      symbolKey: 'xlink:href',
      imgModules: {},
      navList: NAV_LIST
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.imgModules = improtAllFiles(
      require.context('@/assets/images/homeImages', false, /\.png$/),
      '.png'
    )
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
        userId: this.userId,
        processName: ''
      }
      getProcessList(parmas).then((res) => {
        this.aprrovalList = res
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
