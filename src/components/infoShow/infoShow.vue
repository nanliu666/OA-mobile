<template>
  <div>
    <div
      v-for="item in columns"
      :key="item.label"
      class="item"
    >
      <span class="label">{{ item.label }}： </span>
      <span
        v-if="!item.slot"
        class="val"
      >{{ item.value }}</span>
      <slot
        v-else
        :name="item.prop"
        v-bind="{value:item.value,label:item.label}"
      />
    </div>
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

<style lang='less' scoped>
.item {
  font-size: 14px;
  margin-bottom: 5px;
  .label {
    color: #757c85;
  }
  .val {
    color: #000000;
  }
}
</style>