<template>
  <div class="page">
    <van-sticky>
      <van-search
        v-model="search"
        autofocus
        show-action
        left-icon="search"
        background="#EFEFF4"
        placeholder="搜索"
        input-align="left"
        @cancel="handleCancel"
        @search="handleSearch"
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
                  </div>
                  <div class="title-bottom">
                    <span class="custom-title">{{ item.orgName + ' - ' + item.jobName }}</span>
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:error>
              加载失败
            </template>
          </van-cell>
        </template>
      </div>
      <van-empty
        v-if="orgData.length === 0 && userData.length === 0"
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="无搜索结果"
      />
    </div>
  </div>
</template>
<script>
import { getAddressOrg, getAddressuser } from '@/api/addressBook'
export default {
  name: 'FindOrgUser',
  data() {
    return {
      search: '',
      orgData: [],
      userData: []
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path === '/addressBook/index') {
        vm.orgData = [] // 清空原有数据
        vm.userData = [] // 清空原有数据
      }
    })
  },
  methods: {
    handleCancel() {
      this.$router.go(-1)
    },
    handleSearch() {
      this.initData()
    },
    /**
     * 获取数据
     */
    initData() {
      let orgParmas = {
        orgName: this.search,
        parentOrgId: ''
      }
      let userParmas = {
        name: this.search,
        orgId: ''
      }
      getAddressOrg(orgParmas).then((res) => {
        this.orgData = res
      })
      getAddressuser(userParmas).then((res) => {
        this.userData = res
      })
    },
    handleClickOrg(item) {
      this.$router.push('/addressBook/orgDetail/' + item.orgId)
    },
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
  min-height: 100%;
}
.van-search {
  height: 44px;
  padding: 8px 9px;
  .van-search__content {
    height: 28px;
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
      align-content: center;
      .title {
        margin-left: 14px;
        .title-top {
          margin-bottom: 6px;
          .custom-title {
            font-size: 17px;
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
