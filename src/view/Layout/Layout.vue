<template>
  <div
    data-title="百利宏移动办公"
    class="home"
  >
    <div class="tab-contain">
      <router-view />
    </div>
    <van-tabbar>
      <van-tabbar-item
        v-for="(item, index) in tabbarList"
        :key="index"
        class="tabber-li"
        :class="{ 'van-tabbar-item--active': currentPage === item.code }"
        :name="item.code"
        @click="handleClick(item)"
      >
        <svg
          slot="icon"
          class="icon"
          aria-hidden="true"
        >
          <use :[symbolKey]="`#${currentPage === item.code ? item.activeIcon : item.icon}`" />
        </svg>
        <div>{{ item.name }}</div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { TabbarList } from '@/const/myTask'
export default {
  name: 'Home',
  data() {
    return {
      symbolKey: 'xlink:href',
      currentPage: '',
      tabbarList: TabbarList
    }
  },
  created() {
    this.getCurrentPage()
  },
  activated() {
    this.getCurrentPage()
  },
  methods: {
    handleClick(data) {
      this.currentPage = data.code
      this.$router.replace(data.path)
    },
    getCurrentPage() {
      this.currentPage = TabbarList.filter((i) => i.path === this.$route.path)[0].code
    },
    onChange() {}
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
.tab-contain {
  height: calc(100% - 53px);
  // background-color: #F5F6F6;
}
.van-tabbar--fixed {
  height: 53px;
}

.van-tabbar-item {
  color: #979797;
  .van-tabbar-item__text {
    a {
      color: #979797;
    }
  }
}
.van-tabbar-item--active {
  color: #207efa;
  .van-tabbar-item__text {
    a {
      color: #207efa;
    }
  }
}
</style>
