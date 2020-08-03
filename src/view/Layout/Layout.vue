<template>
  <div
    v-if="
      ['/work/index', '/addressBook/index', '/message/index', '/me/index'].indexOf($route.path) > -1
    "
    data-title="百利宏移动办公"
    class="home"
  >
    <div class="tab-contain">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <van-tabbar v-model="curentPage">
      <van-tabbar-item
        v-for="(item, index) in tabbarList"
        :key="index"
        :class="{ 'van-tabbar-item--active': curentPage === item.code }"
        :name="item.code"
      >
        <svg
          slot="icon"
          class="icon"
          aria-hidden="true"
        >
          <use
            v-show="curentPage !== item.code"
            :[symbolKey]="'#' + item.icon"
          />
          <use
            v-show="curentPage === item.code"
            :[symbolKey]="'#' + item.activeIcon"
          />
        </svg>
        <router-link :to="item.to">
          {{ item.name }}
        </router-link>
      </van-tabbar-item>
    </van-tabbar>
  </div>
  <router-view v-else />
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      symbolKey: 'xlink:href',
      curentPage: 'work',
      tabbarList: [
        {
          to: '/work',
          name: '工作',
          code: 'work',
          icon: 'icon-mobile-homepage-work',
          activeIcon: 'icon-mobile-homepage-workblue'
        },
        {
          to: '/addressBook',
          code: 'addressBook',
          name: '通讯录',
          icon: 'icon-mobile-homepage-directories',
          activeIcon: 'icon-mobile-homepage-directoriesblue'
        },
        {
          to: '/message',
          code: 'message',
          name: '消息',
          icon: 'icon-mobile-homepage-message',
          activeIcon: 'icon-mobile-homepage-messageblue'
        },
        {
          to: '/me',
          code: 'me',
          name: '我的',
          icon: 'icon-mobile-homepage-personal',
          activeIcon: 'icon-mobile-homepage-personalblue'
        }
      ]
    }
  },
  created() {
    switch (this.$route.path) {
      case '/work/index':
        this.curentPage = 'work'
        break
      case '/addressBook/index':
        this.curentPage = 'addressBook'
        break
      case '/message/index':
        this.curentPage = 'message'
        break
      case '/me/index':
        this.curentPage = 'me'
        break
    }
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
