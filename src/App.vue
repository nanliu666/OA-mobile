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
  mounted() {
    // 当在开发环境并且是移动端时候开启移动调试台
    let isMobile =
      /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) &&
      navigator.platform !== 'Win32' &&
      process.env.NODE_ENV === 'development'
    if (isMobile) {
      const src = 'https://cdn.bootcss.com/eruda/1.5.5/eruda.min.js'
      document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>')
      document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>')
    }
  }
}
</script>
<style lang="less">
#app {
  height: 100%;
}
</style>
