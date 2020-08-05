<template>
  <div class="approval-index">
    <StickyHeader title="审批" />
    <div class="iconbox">
      <div
        v-for="(item, index) in navList"
        :key="index"
        class="iconItem"
        @click="handleClickIcon(item.icon)"
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
        <div class="title-box">
          <span class="title">{{ item.name }}</span>
          <span class="button">收起</span>
        </div>
        <ul class="group-ul">
          <li
            v-for="(groupItem, groupIndex) in item.processes"
            :key="groupIndex"
            class="group-li"
          >
            <svg
              class="icon svg-icon"
              aria-hidden="true"
            >
              <use :[symbolKey]="getApprIcon(groupItem.icon)" />
            </svg>
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
const NAV_LIST = [
  {
    name: '待我审批',
    code: 'waitForMeApproval',
    icon: 'approve'
  },
  {
    name: '我已审批',
    code: 'waitForMeApproval',
    icon: 'todo'
  },
  {
    name: '抄送我的',
    code: 'waitForMeApproval',
    icon: 'schedule'
  },
  {
    name: '我发起的',
    code: 'waitForMeApproval',
    icon: 'task'
  }
]
import StickyHeader from '@/components/stickyHeader/stickyHeader'
export default {
  name: 'ApprovalIndex',
  components: {
    StickyHeader
  },
  data() {
    return {
      aprrovalList: [],
      symbolKey: 'xlink:href',
      imgModules: {},
      navList: NAV_LIST
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
    /**
     * 初始化数据
     */
    initData() {},
    /**
     * 点击头部导航栏
     */
    handleClickIcon() {
      // console.log('data', data)
    },
    /**
     * 兑换icon
     */
    getApprIcon() {
      // console.log(data)
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
    padding: 20px 0;
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
      .title-box {
        .title {
        }
        .button {
        }
      }
      .group-ul {
        .group-li {
          .li-title {
          }
        }
      }
    }
  }
}
</style>
