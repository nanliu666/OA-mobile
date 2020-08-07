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
    <addressList
      ref="addressList"
      :adress-options.sync="adressOptions"
      @toOrg="handleClickOrg"
    />
  </div>
</template>

<script>
import addressList from './adressList'
import { getAddressOrg, getAddressuser } from '@/api/addressBook'
import { mapGetters } from 'vuex'
import { validatenull } from '@/util/validate'
import { deepClone } from '@/util/util'
import { commonSortPinyin, commonAdressOptionsType } from './commonSortPinyin'
export default {
  name: 'AddressBook',
  components: {
    addressList
  },
  data() {
    return {
      search: '',
      // 需要使用深克隆，避免导致共用一个对象
      adressOptions: deepClone(commonAdressOptionsType)
    }
  },
  computed: {
    ...mapGetters(['addressOptionsVuex'])
  },
  mounted() {
    this.initData()
  },
  methods: {
    /**
     * 初始化数据，拉取通讯录部门查询接口以及通讯录员工查询接口
     */
    initData() {
      // 部门数据已存入vuex就不使用接口
      if (!validatenull(this.addressOptionsVuex)) {
        this.adressOptions = this.addressOptionsVuex
        this.$refs.addressList.skeletonLoading = false
      } else {
        getAddressOrg().then((res) => {
          this.adressOptions.orgData = res
        })
        getAddressuser().then((res) => {
          this.sortUserPinyin(res)
        })
      }
    },
    /**
     * 排序拼音
     */
    sortUserPinyin(res) {
      let tempData = commonSortPinyin(res)
      this.adressOptions = Object.assign(this.adressOptions, tempData)
      this.$refs.addressList.skeletonLoading = false
      this.$store.commit('SET_ADDRESS_OPTIONS', this.adressOptions)
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
      this.$router.push({
        path: `/addressBook/orgDetail/${item.orgId}`,
        query: {
          title: item.orgName
        }
      })
      this.$store.commit('SET_ORGPATH_LIST')
      this.$store.commit('PUSH_ORGPATH_LIST', item)
    },
    /**
     * 去用户详情
     */
    toUserDetail(item) {
      this.$store.commit('SET_USERDETAIL', item)
      this.$router.push('/addressBook/userDetail')
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  background-color: #f5f6f6;
  .contain {
    min-height: calc(100vh - 90px);
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
  padding-bottom: 52px;
  .van-cell {
    border-bottom: 1px solid #ebedf0;
    height: 70px;
    .person-cell {
      display: flex;
      align-items: center;
      .title {
        margin-left: 14px;
        .title-top {
          .custom-title {
            font-size: 16px;
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
