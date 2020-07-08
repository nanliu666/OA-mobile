<template>
  <div>
    <template v-for="item in columns">
      <div
        :key="item.label"
        class="item"
      >
        <span class="label">{{ item.label }}:</span>
        <template v-if="!item.slot">
          <span class="val">{{ item.value }}</span>
        </template>
        <template v-else>
          <slot :name="item.prop" />
        </template>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  margin-bottom: 5px;
  font-size: 14px;
  .label {
    color: #757c85;
  }
  .val {
    color: #000000;
  }
}
</style>
