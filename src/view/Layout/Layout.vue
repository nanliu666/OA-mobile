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
    <van-tabbar v-model="active">
      <van-tabbar-item
        name="work"
        icon="home-o"
      >
        <router-link to="/work">
          工作
        </router-link>
      </van-tabbar-item>
      <van-tabbar-item
        name="addressBook"
        icon="search"
      >
        <router-link to="/addressBook">
          通讯录
        </router-link>
      </van-tabbar-item>
      <van-tabbar-item
        name="message"
        icon="friends-o"
      >
        <router-link to="/message">
          消息
        </router-link>
      </van-tabbar-item>
      <van-tabbar-item
        name="me"
        icon="setting-o"
      >
        <router-link to="/me">
          我的
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
      active: 'work'
    }
  },
  created() {
    switch (this.$route.path) {
      case '/work/index':
        this.active = 'work'
        break
      case '/addressBook/index':
        this.active = 'addressBook'
        break
      case '/message/index':
        this.active = 'message'
        break
      case '/me/index':
        this.active = 'me'
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
