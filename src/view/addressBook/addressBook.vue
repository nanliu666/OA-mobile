<template>
  <div class="page">
    <van-sticky>
      <van-search
        v-model="search"
        disabled
        left-icon="search"
        background="#EFEFF4"
        placeholder="搜索"
        input-align="left"
        @click="toSearch"
      />
    </van-sticky>
    <div class="contain">
      <div class="org">
        <template v-for="item in orgData">
          <van-cell
            :key="item.orgId"
            is-link
            @click="handleClickOrg(item)"
          >
            <template #title>
              <span class="custom-title">{{
                item.orgName + (item.users.length > 0 ? `（${item.users.length + 1}）` : '')
              }}</span>
            </template>
          </van-cell>
        </template>
      </div>
      <div class="user">
        <template v-for="items in orgData">
          <template v-for="item in items.users">
            <van-cell
              :key="item.userId"
              @click="toUserDetail(item)"
            >
              <!-- 使用 title 插槽来自定义标题 -->
              <template #title>
                <div class="person-cell">
                  <van-image
                    round
                    class="avatarClass"
                    :src="item.avatarUrl"
                  />

                  <div class="title">
                    <div class="title-top">
                      <span class="custom-title">{{ item.name }}</span>
                      <van-tag
                        v-if="items.userId === item.userId"
                        type="primary"
                        plain
                      >
                        负责人
                      </van-tag>
                    </div>
                    <div class="title-bottom">
                      <span class="custom-title">{{ item.jobName }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </van-cell>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrgUserTree } from '@/api/addressBook'
export default {
  name: 'AddressBook',
  data() {
    return {
      search: '',
      orgData: []
    }
  },
  created() {
    getOrgUserTree().then((res) => {
      this.$store.commit('SET_ORG_USER_TREE', res)
      if (res[0]) {
        this.orgData = res[0].children
      }
    })
  },
  methods: {
    toSearch() {
      this.$router.push('/addressBook/findOrgUser')
    },
    handleClickOrg(item) {
      this.$router.push('/addressBook/orgDetail/' + item.orgId)
    },
    toUserDetail(item) {
      this.$router.push('/addressBook/userDetail/' + item.userId)
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  background-color: #f5f6f6;
}
.van-search {
  height: 44px;
  padding: 8px 9px;
  .van-search__content {
    height: 28px;
    background-color: #fff;
    .van-cell {
      line-height: 18px;
    }
  }
}
.org {
  margin-bottom: 8px;
  .van-cell {
    border-bottom: 1px solid #ebedf0;
    .custom-title {
      font-size: 17px;
    }
  }
}
.user {
  .van-cell {
    border-bottom: 1px solid #ebedf0;
    height: 70px;
    .person-cell {
      display: flex;
      align-items: center;
      .title {
        margin-left: 14px;
        .title-top {
          margin-bottom: 6px;
          .custom-title {
            font-size: 16px;
            margin-right: 11px;
          }
        }
        .title-bottom {
          color: #888888;
        }
      }
    }
  }
}
.avatarClass {
  width: 50px;
  height: 50px;
}
</style>
