<template>
  <div
    data-title="百利宏移动办公"
    class="home"
  >
    <div class="tab-contain">
      <router-view />
      <work v-if="active === 'work'" />
      <address-book v-if="active === 'addressBook'" />
      <me v-if="active === 'me'" />
      <message v-if="active === 'message'" />
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
</template>
<script>
import AddressBook from './addressBook'
import Me from './me'
import Message from './message'
import Work from './work'
export default {
  name: 'Home',
  components:{AddressBook,Me,Message,Work},
 data() {
    return {
      active: 'work',
    }
  },
}
</script>

<style lang='less' scoped>
.home{
  height: 100%;
}
.tab-contain{
  height: calc(100% - 53px);
  // background-color: #F5F6F6;
}
.van-tabbar--fixed{
  height: 53px;
}

.van-tabbar-item{
  color: #979797;
  .van-tabbar-item__text{
    a{
      color: #979797;
    }
  }
}
.van-tabbar-item--active{
  color: #207efa;
  .van-tabbar-item__text{
    a{
      color: #207efa;
    }
  }
}
</style>