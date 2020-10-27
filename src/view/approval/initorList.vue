<template>
  <ul
    v-if="!_.isEmpty(list)"
    class="list-style"
  >
    <div v-show="list.children">
      <li
        v-for="(childrenItem, childrenIndex) in list.children"
        :key="childrenIndex"
        class="children-li-title"
        @click.stop="selectPart(childrenItem)"
      >
        <div class="li-title">
          <span
            class="triangle"
            :class="[childrenItem.id === currentNode.id ? 'triangle-down' : 'triangle-right']"
          />
          <span> {{ childrenItem.orgName }}</span>
          <span v-if="childrenItem.users.length !== 0">（{{ childrenItem.users.length }}）</span>
        </div>
        <div
          v-if="childrenItem.id === currentNode.id"
          class="children-item"
        >
          <initor-list :list="currentNode" />
        </div>
      </li>
    </div>
    <div
      v-show="list.users.length !== 0"
      class="user-ul"
    >
      <li
        v-for="(userItem, userIndex) in list.users"
        :key="userIndex"
        class="user-li"
        @click.stop="checkCurrentInitor(userItem)"
      >
        <span> {{ userItem.name }}</span>
        <van-icon
          v-if="userItem.userId === initiator.userId"
          name="checked"
        />
      </li>
    </div>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'InitorList',
  props: {
    list: {
      type: [Object, Array],
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      currentNode: {}
    }
  },
  computed: {
    ...mapGetters(['initiator'])
  },
  created() {},
  methods: {
    checkCurrentInitor(data) {
      let temp = this.initiator.userId === data.userId ? {} : data
      this.$store.commit('SET_CURRENT_INITOR', temp)
    },
    selectPart(data) {
      this.currentNode = this.currentNode.id === data.id ? {} : data
    }
  }
}
</script>

<style scoped lang="less">
@transparentWidth: 8px;
.triangle {
  display: inline-block;
  width: 0;
  height: 0;
  border: @transparentWidth solid;
}
.triangle-right {
  border-color: transparent transparent transparent #868686;
}
.triangle-down {
  border-color: #868686 transparent transparent transparent;
  margin-top: 10px;
  margin-right: 4px;
  margin-left: -2px;
}
.list-style {
  padding: 0 15px;
  .li-title {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }
  .user-ul {
    margin-bottom: 20px;
    .user-li {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
