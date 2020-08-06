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
              <span class="custom-title">{{ item.orgName + item.workNum }}</span>
            </template>
          </van-cell>
        </template>
      </div>
      <div class="user">
        <template v-for="item in userData">
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
                      v-if="item.leaderId === item.userId"
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
      </div>
    </div>
  </div>
</template>

<script>
import { getAddressOrg, getAddressuser } from '@/api/addressBook'
import { mapGetters } from 'vuex'
export default {
  name: 'AddressBook',
  data() {
    return {
      search: '',
      orgData: [],
      userData: []
    }
  },
  computed: {
    ...mapGetters(['orgTree', 'adressTree'])
  },
  created() {
    this.initData()
  },
  methods: {
    /**
     * 初始化数据，拉取通讯录部门查询接口以及通讯录员工查询接口
     */
    initData() {
      // 部门数据已存入vuex就不使用接口
      if (this.orgTree.length !== 0) {
        this.orgData = this.orgTree
      } else {
        getAddressOrg().then((res) => {
          this.orgData = res
          this.$store.commit('SET_ORG', res)
        })
      }
      // 员工数据已存入vuex就不使用接口
      if (this.adressTree.length !== 0) {
        this.userData = this.adressTree
      } else {
        getAddressuser().then((res) => {
          this.userData = res
          this.$store.commit('SET_ADDRESS', res)
        })
      }
    },
    /**
     * 进入搜索页面
     */
    toSearch() {
      this.$router.push('/addressBook/findOrgUser')
    },
    /**
     * 去部门
     */
    handleClickOrg(item) {
      this.$router.push('/addressBook/orgDetail/' + item.orgId)
    },
    /**
     * 去用户详情
     */
    toUserDetail(item) {
      this.$store.commit('SET_USERDETAIL', item)
      this.$router.push('/addressBook/userDetail/')
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  background-color: #f5f6f6;
  .contain {
    padding-bottom: 50px;
  }
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
