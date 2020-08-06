<template>
  <div
    v-if="
      ['/work/index', '/addressBook/index', '/message/index', '/me/index'].indexOf($route.path) > -1
    "
    data-title="百利宏移动办公"
    class="home"
  >
    <div class="tab-contain">
      <router-view />
    </div>
    <van-tabbar
      v-model="currentPage"
      @change="onChange"
    >
      <van-tabbar-item
        v-for="(item, index) in tabbarList"
        :key="index"
        :class="{ 'van-tabbar-item--active': currentPage === item.code }"
        :name="item.code"
      >
        <svg
          slot="icon"
          class="icon"
          aria-hidden="true"
        >
          <use
            v-show="currentPage !== item.code"
            :[symbolKey]="'#' + item.icon"
          />
          <use
            v-show="currentPage === item.code"
            :[symbolKey]="'#' + item.activeIcon"
          />
        </svg>
        <router-link :to="item.to">
          {{ item.name }}
        </router-link>
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
  methods: {
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
