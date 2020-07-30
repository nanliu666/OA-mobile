<template>
  <div>
    <stickyHeader :title="$route.query.title" />
    <div id="pdf">
      <div id="demo" />
    </div>
    <!-- <pdf
      v-for="i in numPages"
      :key="i"
      ref="myPdfComponent"
      :src="pdfSrc"
      preview="0"
      :page="i"
    />-->
  </div>
</template>
<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
// import Pdf from 'vue-pdf'
import Pdfh5 from 'pdfh5'
export default {
  name: 'ResumeUrl',
  components: {
    StickyHeader
    // Pdf
  },
  data() {
    return {
      pdfh5: null,
      numPages: 0,
      scaleNum: 1,
      left: 0,
      rigth: 0,
      up: 0,
      down: 0
    }
  },
  //   created(){
  // this.pdfSrc = Pdf.createLoadingTask(this.$route.query.url)
  //   this.pdfSrc.promise.then(pdf => {
  //     this.numPages = pdf.numPages
  //   })
  //   },
  mounted() {
    this.pdfh5 = new Pdfh5('#demo', {
      pdfurl: this.$route.query.url,
      lazy: true,
      scale: 1,
      renderType: 'svg'
    })
    // .on('complete', function(status, msg, time) {
    //   //监听完成事件
    //   console.log(
    //     '状态：' + status + '，信息：' + msg + '，耗时：' + time + '毫秒，总页数：' + this.totalNum
    //   )
    // })
  },
  methods: {}
}
</script>

<style lang="less" scoped>
#demo {
  height: calc(100vh - 46px);
  .viewerContainer {
    height: calc(100vh - 46px);
  }
  svg {
    height: calc(100vh - 46px) !important;
  }
}
</style>
