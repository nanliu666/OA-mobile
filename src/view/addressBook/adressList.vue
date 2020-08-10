<template>
  <div class="contain">
    <div class="org">
      <template v-for="item in adressOptions.orgData">
        <van-cell
          :key="item.orgId"
          is-link
          @click="handleClickOrg(item)"
        >
          <template #title>
            <span
              class="custom-title"
            >{{ item.orgName }}{{ item.workNum ? `（${item.workNum}）` : '' }}</span>
          </template>
        </van-cell>
      </template>
    </div>
    <van-skeleton
      row="10"
      row-width="80%"
      :loading="skeletonLoading"
      class="skeleton-class"
    >
      <div
        class="user"
        :class="{
          'index-user': $route.path === '/addressBook/index'
        }"
      >
        <!-- 独立负责人 -->
        <van-cell
          v-if="adressOptions.orgHeadData && adressOptions.orgHeadData.name"
          @click="toUserDetail(adressOptions.orgHeadData)"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="person-cell">
              <van-image
                round
                class="avatarClass"
                :src="adressOptions.orgHeadData.avatarUrl"
              />
              <div class="title">
                <div class="title-top">
                  <span class="custom-title">{{ adressOptions.orgHeadData.name }}</span>
                  <van-tag
                    style="margin-left: 6px"
                    type="primary"
                    plain
                  >
                    负责人
                  </van-tag>
                </div>
                <div class="title-bottom">
                  <span class="custom-title">{{ adressOptions.orgHeadData.jobName }}</span>
                </div>
              </div>
            </div>
          </template>
          <template v-slot:error>
            加载失败
          </template>
        </van-cell>
        <van-index-bar :index-list="adressOptions.pingyinArr">
          <template v-for="item in adressOptions.pingyinSortData">
            <van-index-anchor
              :key="item.sortTag"
              :index="item.sortTag"
            >
              {{ item.sortTag }}
            </van-index-anchor>
            <div
              v-for="groupItem in item.data"
              :key="groupItem.groupItem"
            >
              <van-cell @click="toUserDetail(groupItem)">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                  <div class="person-cell">
                    <van-image
                      round
                      class="avatarClass"
                      :src="groupItem.avatarUrl"
                    />
                    <div class="title">
                      <div class="title-top">
                        <span class="custom-title">{{ groupItem.name }}</span>
                      </div>
                      <div
                        v-if="groupItem.jobName"
                        class="title-bottom"
                      >
                        <span class="custom-title">{{ groupItem.jobName }}</span>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-slot:error>
                  加载失败
                </template>
              </van-cell>
            </div>
          </template>
        </van-index-bar>
      </div>
    </van-skeleton>
    <van-empty
      v-if="isShowEmty"
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      :description="tipsText"
    />
  </div>
</template>

<script>
export default {
  name: 'AdressList',
  props: {
    adressOptions: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      tipsText: '',
      linkSymbol: 'is-link',
      skeletonLoading: true
    }
  },
  computed: {
    isShowEmty() {
      return this.getEmpty()
    }
  },
  methods: {
    /**
     * 判断当前下属部门或者员工都为空
     */
    getEmpty() {
      let flagArr = [this.adressOptions.orgData.length, this.adressOptions.pingyinSortData.length]
      let isShowEmty = false // 是否展示空白图片
      if (this.adressOptions.pingyinSortData.length === 0) {
        this.tipsText = '部门内无成员'
        isShowEmty = true
      }
      if (_.every(flagArr, Boolean)) {
        isShowEmty = true
        this.tipsText = '无下级部门与成员'
      }
      return isShowEmty
    },
    /**
     * 去部门
     */
    handleClickOrg(item) {
      this.$emit('toOrg', item)
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
.skeleton-class {
  background: #fff;
  height: calc(100vh - 45px);
  padding-top: 10px;
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
.index-user {
  padding-bottom: 52px;
}
.avatarClass {
  width: 50px;
  height: 50px;
}
</style>
