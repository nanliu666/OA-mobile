<template>
  <div class="page">
    <van-sticky>
      <stickyHeader :title="$route.query.title">
        <template
          v-if="oraPathList.length !== 0"
          #footer
        >
          <div class="header-footer">
            <div
              ref="org-path"
              class="org-path"
            >
              <template v-for="(item, index) in oraPathList">
                <span :key="item.orgId">
                  <span @click="toDetail(item)">{{ item.orgName }}</span>
                  <i
                    v-if="index !== oraPathList.length - 1"
                    class="iconfont icon-arrow-right-outlined"
                  />
                </span>
              </template>
            </div>
          </div>
        </template>
        <template #right>
          <van-icon
            name="search"
            size="18"
            @click="toSearch"
          />
        </template>
      </stickyHeader>
    </van-sticky>
    <addressList
      ref="addressList"
      :adress-options.sync="adressOptions"
      @toOrg="handleClickOrg"
    />
  </div>
</template>
<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import { getAddressOrg, getAddressuser } from '@/api/addressBook'
import addressList from './adressList'
import { commonSortPinyin, commonAdressOptionsType } from './commonSortPinyin'
import { deepClone } from '@/util/util'
import { mapGetters } from 'vuex'

export default {
  name: 'OrgDetail',
  components: {
    StickyHeader,
    addressList
  },
  data() {
    return {
      adressOptions: deepClone(commonAdressOptionsType)
    }
  },
  computed: {
    ...mapGetters(['oraPathList'])
  },
  watch: {
    '$route.params.orgId': {
      handler() {
        this.initData()
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    /**
     * 初始化数据，拉取通讯录部门查询接口以及通讯录员工查询接口
     */
    initData() {
      let orgParmas = { parentOrgId: this.$route.params.orgId, orgName: '' }
      let userParmas = { orgId: this.$route.params.orgId, orgName: '' }
      getAddressOrg(orgParmas).then((res) => {
        this.adressOptions.orgData = res
      })
      getAddressuser(userParmas).then((res) => {
        this.sortUserPinyin(res)
      })
    },
    /**
     * 前往搜索
     */
    toSearch() {
      this.$router.push('/addressBook/findOrgUser')
    },
    /**
     * 排序拼音
     */
    sortUserPinyin(res) {
      let tempData = commonSortPinyin(res)
      this.adressOptions = Object.assign(this.adressOptions, tempData)
      this.$refs.addressList.skeletonLoading = false
    },
    /**
     * 替换路由
     */
    replaceRoute(item) {
      this.$router.replace({
        path: `/addressBook/orgDetail/${item.orgId}`,
        query: {
          title: item.orgName
        }
      })
    },
    /**
     * 通过头部面包屑前往组织详情
     */
    toDetail(item) {
      this.replaceRoute(item)
      let findIndex = this._.findIndex(this.oraPathList, function(o) {
        return o.orgId == item.orgId
      })
      this.$store.commit('DELETE_ORGPATH_LIST', findIndex + 1)
    },
    /**
     * 通过渲染的部门列表去部门
     */
    handleClickOrg(item) {
      this.replaceRoute(item)
      this.$store.commit('PUSH_ORGPATH_LIST', item)
    },
    /**
     * 前往用户详情
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
  min-height: 100%;
}
.header-footer {
  background-color: #fff;
  padding: 0 16px;
  .org-path {
    height: 45px;
    min-width: 100%;
    border-bottom: 1px solid #ebedf0;
    border-top: 1px solid #ebedf0;
    line-height: 45px;
    overflow: scroll;
    white-space: nowrap; /*不换行*/
    span {
      color: #207efa;
      &:last-child {
        color: #a0a8ae;
      }
    }
    .iconfont {
      color: #a0a8ae;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.org {
  margin: 8px 0;
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
