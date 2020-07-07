<template>
  <div>
    <div v-for="item in columns" />
  </div>
</template>
<script>
export default {
    props:{
        columns:{
            type: Array,
            default:() => []
        }
    }
}
</script>

<style lang='less' scoped>
</style>