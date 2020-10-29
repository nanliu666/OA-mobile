<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  created() {
    // 当在开发环境并且是移动端时候开启移动调试台
    let isMobile =
      /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) &&
      navigator.platform !== 'Win32' &&
      process.env.NODE_ENV === 'development'
    if (isMobile) {
      window.eruda.init()
    }
  }
}
</script>
<style lang="less">
#app {
  height: 100%;
}
</style>
