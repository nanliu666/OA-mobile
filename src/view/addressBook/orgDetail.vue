<template>
  <div class="page">
    <van-sticky>
      <stickyHeader :title="orgData.orgName || ' '">
        <template #footer>
          <div class="header-footer">
            <div
              ref="org-path"
              class="org-path"
            >
              <template v-for="(item, index) in orgData.orgPath">
                <span :key="item.orgId">
                  <span @click="toDetail(item)">{{ item.orgName }}</span>
                  <i
                    v-if="index !== orgData.orgPath.length -1"
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
    <div class="contain">
      <div class="org">
        <template v-for="item in orgData.children">
          <van-cell
            :key="item.orgId"
            is-link
            @click="toDetail(item)"
          >
            <template #title>
              <span
                class="custom-title"
              >{{ item.orgName + (item.users.length > 0 ? `（${item.users.length +1}）` : '' ) }}</span>
            </template>
          </van-cell>
        </template>
      </div>
      <div class="user">
        <template v-if="orgData.users && orgData.users.length> 28 && sortUserPinyin().length >= 2">
          <van-cell @click="toUserDetail(orgHeadData)">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="person-cell">
                <van-image
                  round
                  class="avatarClass"
                  :src="orgHeadData.avatarUrl"
                />
                <div class="title">
                  <div class="title-top">
                    <span class="custom-title">{{ orgHeadData.name }}</span>
                    <van-tag
                      type="primary"
                      plain
                    >
                      负责人
                    </van-tag>
                  </div>
                  <div class="title-bottom">
                    <span class="custom-title">{{ orgHeadData.jobName }}</span>
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:error>
              加载失败
            </template>
          </van-cell>
          <van-index-bar :index-list="pingyinArr">
            <template v-for="item in pingyinSortData">
              <van-index-anchor
                :key="item.sortTag"
                :index="item.sortTag"
              >
                {{ item.sortTag }}
              </van-index-anchor>
              <template v-for="it in item">
                <van-cell
                  :key="it.userId"
                  @click="toUserDetail(item)"
                >
                  <!-- 使用 title 插槽来自定义标题 -->
                  <template #title>
                    <div class="person-cell">
                      <van-image
                        round
                        class="avatarClass"
                        :src="it.avatarUrl"
                      />
                      <div class="title">
                        <div class="title-top">
                          <span class="custom-title">{{ it.name }}</span>
                        </div>
                        <div class="title-bottom">
                          <span class="custom-title">{{ it.jobName }}</span>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-slot:error>
                    加载失败
                  </template>
                </van-cell>
              </template>
            </template>
          </van-index-bar>
        </template>
        <template
          v-for="item in simpleSortUser"
          v-else
        >
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
                      v-if="item.userId === orgData.userId"
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
            <template v-slot:error>
              加载失败
            </template>
          </van-cell>
        </template>
      </div>
      <van-empty
        v-if=" (!orgData.children || orgData.children.length === 0) && simpleSortUser.length === 0"
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="无下级部门或成员"
      />
    </div>
  </div>
</template>
<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'

export default {
  name: 'OrgDetail',
  components: {
    StickyHeader
  },
  data() {
    return {
      search: '',
      orgData: {},
      orgHeadData: {},
      pingyinSortData: [],
      pingyinArr: [],
      simpleSortUser:[]
    }
  },
  watch: {
    '$route.params.orgId': {
      handler(val) {
        this.orgData = this.findOrg(this.$store.state.orgUserTree.orgUserTree, val)
        this.sortUser()
        this.$nextTick(() => {
          if (this.$refs['org-path'])
            this.$refs['org-path'].scrollLeft = this.$refs['org-path'].scrollWidth
        })
      }
    }
  },
  mounted() {
    this.orgData = this.findOrg(this.$store.state.orgUserTree.orgUserTree, this.$route.params.orgId)
    this.sortUser()
    this.$nextTick(() => {
      if (this.$refs['org-path'])
        this.$refs['org-path'].scrollLeft = this.$refs['org-path'].scrollWidth
    })
  },
  methods: {
    getOrgHead() {
      if (this.orgData.users && this.orgData.users.length > 0) {
        for (const item of this.orgData.users) {
          if (item.userId === this.orgData.userId) return item
        }
      }
    },
    toSearch() {
      this.$router.push('/addressBook/findOrgUser')
    },
    findOrg(tree, orgId) {
      let data = {}
      function deep(arr) {
        for (const item of arr) {
          if (item.orgId === orgId) {
            data = item
          }
          Array.isArray(item.children) && deep(item.children)
        }
      }
      deep(tree)
      return data
    },
    toDetail(item) {
      this.$router.replace('/addressBook/orgDetail/' + item.orgId)
    },
    sortUserPinyin() {
      let arr = []
      this.orgData.users.forEach((item) => {
        if (this.orgData.userId && item.userId === this.orgData.userId) {
          this.orgHeadData = item
        } else {
          let index = arr.findIndex((it) => {
            return it.sortTag === item.pinyin.toUpperCase()[0]
          })
          index > -1
            ? arr[index].data.push(item)
            : arr.push({ sortTag: item.pinyin.toUpperCase()[0], data: [item] })
        }
      })
      arr.sort((a, b) => {
        return a.sortTag.localeCompare(b.sortTag)
      })
      arr.forEach((item) => {
        item.data.sort((a, b) => {
          return a.pinyin.localeCompare(b.pinyin)
        })
      })
      this.pingyinArr = arr.map((item) => {
        return item.sortTag
      })
      this.pingyinSortData = arr
      return arr
    },
    sortUser() {
      let arr = []
      if (Array.isArray(this.orgData.users)) {
        arr = [...this.orgData.users]
      } else {
        return arr
      }
      arr.sort((a, b) => {
        return a.pinyin.localeCompare(b.pinyin)
      })
      let index = arr.findIndex((item) => {
        return item.userId === this.orgData.userId
      })
      this.orgData.userId && index > -1 && arr.splice(0, 0, arr.splice(index, 1)[0])
      this.simpleSortUser = arr
      return arr
    },
      toUserDetail(item){
this.$router.push('/addressBook/userDetail/'+ item.userId)
    }
  }
}
</script>

<style lang='less' scoped>
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