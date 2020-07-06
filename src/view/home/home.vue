<template>
  <div
    data-title="百利宏移动办公"
    class="home"
  >
    <div class="tab-contain">
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
        工作
      </van-tabbar-item>
      <van-tabbar-item
        name="addressBook"
        icon="search"
      >
        通讯录
      </van-tabbar-item>
      <van-tabbar-item
        name="message"
        icon="friends-o"
      >
        消息
      </van-tabbar-item>
      <van-tabbar-item
        name="me"
        icon="setting-o"
      >
        我的
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
  background-color: #F5F6F6;
}
.van-tabbar--fixed{
  height: 53px;
}
</style>