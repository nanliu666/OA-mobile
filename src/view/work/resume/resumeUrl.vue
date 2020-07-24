<template>
  <div>
    <stickyHeader :title="$route.query.title" />
    <preview ref="touch">
      <pdf
        v-for="i in numPages"
        :key="i"
        ref="myPdfComponent"
        :src="pdfSrc"
        :page="i"
      />
    </preview>
  </div>
</template>
<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import Pdf from 'vue-pdf'
export default {
  name: 'ResumeUrl',
  components: {
    StickyHeader,
    Pdf
  },
  data() {
    return {
      numPages: 0,
      scaleNum: 1,
      left: 0,
      rigth: 0,
      up: 0,
      down: 0
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped></style>
