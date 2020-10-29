<template>
  <div
    class="appr-picker"
    :style="`${visible ? 'display:block' : 'display:none'}`"
  >
    <StickyHeader
      title="选择关联审批单"
      @leftClick="handleClose"
    />
    <van-tabs
      v-model="active"
      sticky
      color="#207EFA"
      swipeable
    >
      <van-tab title="我发起的">
        <van-empty
          v-if="myApply.finished && myApply.list.length === 0"
          description="暂无审批"
        />
        <div
          v-if="apprTypes.length > 0"
          class="appr-picker__tips ellipsis"
        >
          筛选条件：{{ apprProcessNames }}
        </div>
        <van-pull-refresh
          v-model="myApply.refreshing"
          @refresh="getDataList('myApply', 1)"
        >
          <van-list
            :value="myApply.loading"
            :finished="myApply.finished"
            :finished-text="myApply.length === 0 ? '' : '没有更多了'"
            :offset="247"
            @load="getDataList('myApply')"
          >
            <div
              v-for="(item, index) in myApply.list"
              :key="index"
              class="appr-item"
              @click="handleSelectAppr(item)"
            >
              <van-checkbox
                :value="getSelected(item)"
                shape="square"
              />
              <div class="appr-item__avatar">
                <img
                  v-if="item.avatarUrl"
                  :src="item.avatarUrl"
                >
                <i
                  v-else
                  class="icon-usercircle avatar"
                />
              </div>
              <div class="appr-item__content">
                <div class="appr-item__title">
                  {{ item.title }}
                </div>
                <div class="appr-item__text">
                  <span class="des-content">{{
                    moment(item.applyTime).format('YYYY-MM-DD HH:mm')
                  }}</span>
                </div>
                <div class="appr-item__text">
                  <span class="label">审批类型：</span>
                  <span class="value">{{ item.processName }}</span>
                </div>
                <div class="appr-item__text">
                  <span class="label">申请部门：</span>
                  <span class="value">{{ item.orgName }}</span>
                </div>
                <div class="appr-item__text">
                  <span class="label">当前审批人：</span>
                  <span class="value">{{ getUser(item.approveUser) }}</span>
                </div>
              </div>
              <div
                v-if="item.status"
                class="appr-item__status"
                :style="{
                  backgroundColor: getStatus(item.status).backgroundColor,
                  color: getStatus(item.status).color
                }"
                v-text="getStatus(item.status).text"
              />
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="我审批的">
        <van-empty
          v-if="hasAppr.finished && hasAppr.list.length === 0"
          description="暂无审批"
        />
        <div
          v-if="apprTypes.length > 0"
          class="appr-picker__tips ellipsis"
        >
          筛选条件：{{ apprProcessNames }}
        </div>
        <van-pull-refresh
          v-model="hasAppr.refreshing"
          @refresh="getDataList('hasAppr', 1)"
        >
          <van-list
            :value="hasAppr.loading"
            :finished="hasAppr.finished"
            :finished-text="hasAppr.length === 0 ? '' : '没有更多了'"
            :offset="247"
            @load="getDataList('hasAppr')"
          >
            <div
              v-for="(item, index) in hasAppr.list"
              :key="index"
              class="appr-item"
              @click="handleSelectAppr(item)"
            >
              <van-checkbox
                :value="getSelected(item)"
                shape="square"
              />
              <div class="appr-item__avatar">
                <img
                  v-if="item.avatarUrl"
                  :src="item.avatarUrl"
                >
                <i
                  v-else
                  class="icon-usercircle avatar"
                />
              </div>
              <div class="appr-item__content">
                <div class="appr-item__title">
                  {{ item.title }}
                </div>
                <div class="appr-item__text">
                  <span class="des-content">{{
                    moment(item.applyTime).format('YYYY-MM-DD HH:mm')
                  }}</span>
                </div>
                <div class="appr-item__text">
                  <span class="label">审批类型：</span>
                  <span class="value">{{ item.processName }}</span>
                </div>
                <div class="appr-item__text">
                  <span class="label">申请部门：</span>
                  <span class="value">{{ item.orgName }}</span>
                </div>
                <div class="appr-item__text">
                  <span class="label">当前审批人：</span>
                  <span class="value">{{ getUser(item.approveUser) }}</span>
                </div>
              </div>
              <div
                v-if="item.status"
                class="appr-item__status"
                :style="{
                  backgroundColor: getStatus(item.status).backgroundColor,
                  color: getStatus(item.status).color
                }"
                v-text="getStatus(item.status).text"
              />
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="抄送我的">
        <van-empty
          v-if="copyAppr.finished && copyAppr.list.length === 0"
          description="暂无审批"
        />
        <div
          v-if="apprTypes.length > 0"
          class="appr-picker__tips ellipsis"
        >
          筛选条件：{{ apprProcessNames }}
        </div>
        <van-pull-refresh
          v-model="copyAppr.refreshing"
          @refresh="getDataList('copyAppr', 1)"
        >
          <van-list
            :value="copyAppr.loading"
            :finished="copyAppr.finished"
            :finished-text="copyAppr.length === 0 ? '' : '没有更多了'"
            :offset="247"
            @load="getDataList('copyAppr')"
          >
            <div
              v-for="(item, index) in copyAppr.list"
              :key="index"
              class="appr-item"
              @click="handleSelectAppr(item)"
            >
              <van-checkbox
                :value="getSelected(item)"
                shape="square"
              />
              <div class="appr-item__avatar">
                <img
                  v-if="item.avatarUrl"
                  :src="item.avatarUrl"
                >
                <i
                  v-else
                  class="icon-usercircle avatar"
                />
              </div>
              <div class="appr-item__content">
                <div class="appr-item__title">
                  {{ item.title }}
                </div>
                <div class="appr-item__text">
                  <span class="des-content">{{
                    moment(item.applyTime).format('YYYY-MM-DD HH:mm')
                  }}</span>
                </div>
                <div class="appr-item__text">
                  <span class="label">审批类型：</span>
                  <span class="value">{{ item.processName }}</span>
                </div>
                <div class="appr-item__text">
                  <span class="label">申请部门：</span>
                  <span class="value">{{ item.orgName }}</span>
                </div>
                <div class="appr-item__text">
                  <span class="label">当前审批人：</span>
                  <span class="value">{{ getUser(item.approveUser) }}</span>
                </div>
              </div>
              <div
                v-if="item.status"
                class="appr-item__status"
                :style="{
                  backgroundColor: getStatus(item.status).backgroundColor,
                  color: getStatus(item.status).color
                }"
                v-text="getStatus(item.status).text"
              />
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <div class="appr-picker__submit">
      <div>已选择{{ selected.length }}个审批</div>
      <van-button
        size="medium"
        type="info"
        @click="submit"
      >
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {
  getMyApproveList,
  // getWaitApproveList,
  getHasApproveList,
  getCopyApproveList
} from '@/api/approval'
import { STATUS_TO_TEXT } from '@/const/approve'
import { mapGetters } from 'vuex'
export default {
  name: 'ApprPicker',
  props: {
    visible: Boolean,
    apprTypes: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: [],
      active: 0,
      myApply: {
        loading: false,
        finished: false,
        refreshing: false,
        pageNo: 1,
        pageSize: 10,
        list: []
      },
      hasAppr: {
        loading: false,
        finished: false,
        refreshing: false,
        pageNo: 1,
        pageSize: 10,
        list: []
      },
      copyAppr: {
        loading: false,
        finished: false,
        refreshing: false,
        pageNo: 1,
        pageSize: 10,
        list: []
      }
    }
  },
  computed: {
    apprProcessKeys() {
      return this.apprTypes.map((item) => item.processKey).join(',')
    },
    apprProcessNames() {
      return this.apprTypes.map((item) => item.processName).join(',')
    },
    query() {
      return {
        processKey: this.apprProcessKeys,
        userId: this.userId
      }
    },
    ...mapGetters(['userId'])
  },
  watch: {
    visible(val) {
      if (val === true) {
        this.selected = this.value
        this.active = 0
      }
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    moment,
    getStatus(status) {
      return STATUS_TO_TEXT[status]
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    /**
     * 显示中文审批人
     */
    getUser(data) {
      let targetNameList = []
      data.map((approveUserItem) => {
        targetNameList.push(approveUserItem.userName)
      })
      return targetNameList.length === 0 ? '暂无审批人' : targetNameList.join('，')
    },
    getSelected(item) {
      return _.some(this.selected, (i) => i.apprNo === item.apprNo)
    },
    handleSelectAppr(item) {
      if (this.getSelected(item)) {
        this.selected = _.filter(this.selected, (i) => i.apprNo === item.app)
      } else {
        this.selected = _.uniqBy([...this.selected, item], 'apprNo')
      }
    },
    submit() {
      this.$emit('input', this.selected)
      this.$emit('update:visible', false)
    },
    getDataList(type = 'myApply', pageNo) {
      if (this[type].loading) return
      if (pageNo) this[type].pageNo = pageNo
      const params = {
        pageNo: this[type].pageNo,
        pageSize: this[type].pageSize,
        ...this.query
      }
      this[type].loading = true
      let loadFunc = getMyApproveList
      if (type === 'hasAppr') {
        loadFunc = getHasApproveList
      } else if (type === 'copyAppr') {
        loadFunc = getCopyApproveList
      }
      loadFunc(params).then((res) => {
        if (res.data.length > 0) {
          if (this[type].refreshing) this[type].list = []
          this[type].list.push(...res.data)
          this[type].pageNo += 1
          if (res.data.length < this[type].pageSize) this[type].finished = true
        } else {
          this[type].finished = true
        }
        this[type].loading = false
        this[type].refreshing = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.appr-picker {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 10;
  height: 100vh;
  overflow: auto;
  &__submit {
    width: 100vw;
    padding: 16px 16px;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    color: #353556;
    font-size: 18px;
    .van-button {
      height: 44px;
      width: 84px;
      border-radius: 4px;
    }
  }
  &__tips {
    line-height: 44px;
    padding: 0 16px;
    color: #757c85;
    font-size: 16px;
  }
  .van-tabs {
    background-color: #f7f9fa;
  }
}
.appr-item {
  display: flex;
  background-color: #fff;
  box-shadow: inset 0 -1px 0 0 #e3e7e9;
  padding: 16px 16px;
  align-items: flex-start;
  &:last-of-type {
    margin-bottom: 76px;
  }
  .van-checkbox {
    margin-top: 20px;
  }
  &__avatar {
    margin: 0 16px;
    i {
      font-size: 56px;
      color: #ccc;
    }
    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }
  }
  &__content {
    max-width: 50%;
  }
  &__title {
    font-size: 18px;
    color: #353556;
    letter-spacing: 0;
    line-height: 28px;
    margin-bottom: 12px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__text {
    margin-bottom: 8px;
    font-size: 14px;
    color: #757c85;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .value {
      color: #202940;
    }
  }
  &__status {
    width: 52px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    text-align: center;
    border-radius: 2px;
    border-radius: 2px;
    margin-left: 10px;
  }
}
</style>
