<template>
  <div class="appr-user-item__box">
    <div
      v-show="!(data && data.noData) && !loading"
      class="appr-user-item"
    >
      <div
        v-if="!isLast"
        class="appr-user-item__tail"
      />
      <div class="appr-user-item__node" />
      <div class="appr-user-item__wrapper">
        <div class="appr-user-item__header">
          <span class="appr-user-item__title">{{
            data && data.properties ? data.properties.title : ''
          }}</span>
          <span class="appr-user-item__tips">{{ tips }}</span>
        </div>
        <div class="appr-user-item__content">
          <template v-for="(user, index) in _.get(data, 'userList', [])">
            <div
              v-if="index !== 0"
              :key="`separator-${index}`"
              class="appr-user-item__separator"
            >
              {{ isCounterSign ? '+' : '/' }}
            </div>
            <div
              :key="user.userId"
              class="appr-user-item__user"
            >
              <div class="appr-user-item__avatar">
                <i class="icon-usercircle avatar" />
                <i
                  v-if="selectable"
                  class="icon-tips-error-small close"
                  @click="deleteUser(index)"
                />
              </div>
              <div class="appr-user-item__username">
                {{ user.name }}
              </div>
            </div>
          </template>
          <div
            v-if="isMulti && _.get(data, 'userList.length', 0) > 0"
            class="appr-user-item__separator"
          >
            {{ isCounterSign ? '+' : '/' }}
          </div>
          <div
            v-show="(isMulti || _.get(data, 'userList.length', 0) === 0) && selectable"
            class="appr-user-item__plusWr"
          >
            <multi-picker
              :value="data.userList ? data.userList.map((item) => item.id) : []"
              :options="optionList"
              :props="pickerProps"
              :single="!isMulti"
              @change="handleSelect(...arguments)"
            >
              <div class="appr-user-item__plus">
                <i class="icon-tips-plus-outlined" />
              </div>
            </multi-picker>
          </div>
        </div>
      </div>
    </div>
    <van-loading
      v-if="loading"
      color="#1989fa"
      size="28"
    />
    <appr-picker-item
      v-if="data && (data.childNode || data.conditionNodes)"
      :path="`${path}-0`"
      :child-node="data.childNode"
      :type="data.type"
      :form-data="formData"
      :full-org-id="fullOrgId"
      :condition-nodes="data.conditionNodes"
    />
    <appr-picker-item
      v-if="nextNode"
      :form-data="formData"
      :path="`${path}-1`"
      :full-org-id="fullOrgId"
      :child-node="nextNode.childNode"
      :condition-nodes="nextNode.conditionNodes"
      :type="nextNode.type"
    />
  </div>
</template>

<script>
import { getUserByJob, getUserByPosition, getUserByTag, getUserLeader } from '@/api/approval'
import { mapGetters } from 'vuex'
import MultiPicker from '@/components/multi-picker/MultiPicker'

export default {
  name: 'ApprPickerItem',
  components: {
    MultiPicker
  },
  props: {
    formData: {
      type: Object,
      default: () => ({})
    },
    path: {
      type: String,
      default: '0'
    },
    conditionNodes: {
      type: Array,
      default: null
    },
    childNode: {
      type: Object,
      default: null
    },
    // 当前用户所选组织全路径
    fullOrgId: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      data: null,
      nextNode: null,
      watcher: null,
      isLast: false,
      conditionOrgId: null,
      noMatchOrg: false,
      loading: false,
      pickerProps: {
        value: 'id',
        label: 'name',
        formatter: (item) => `${item.name}(${item.workNo})`
      }
    }
  },
  inject: ['isLastNode', 'validateApprover'],
  computed: {
    ...mapGetters(['userId']),
    // 是否会签
    isCounterSign() {
      return _.get(this.data, 'properties.counterSign', false)
    },
    optionList() {
      return this.data.type === 'approver'
        ? _.get(this.data, 'properties.approvers', [])
        : this.data.type === 'copy'
        ? _.get(this.data, 'properties.members', [])
        : []
    },
    isMulti() {
      return _.get(this.data, 'properties.optionalMultiUser', false)
    },
    selectable() {
      return (
        _.get(this.data, 'properties.assigneeType', null) &&
        _.get(this.data, 'properties.assigneeType', null) !== 'user'
      )
    },
    tips() {
      if (_.get(this.data, 'type') === 'approver') {
        if (
          (this.selectable && !this.isMulti) ||
          (!this.selectable && this.optionList.length == 1)
        ) {
          return '一人审批'
        }
        return this.isCounterSign ? '需所有审批人同意' : '一人同意即可'
      } else if (_.get(this.data, 'type') === 'copy') {
        return `抄送${
          _.get(this.data, 'userList.length', 0) > 0
            ? _.get(this.data, 'userList.length', 0) + '人'
            : ''
        }`
      }
      return ''
    }
  },
  beforeDestroy() {
    this.watcher && this.watcher()
  },
  created() {
    if (!_.isEmpty(this.conditionNodes)) {
      if (this.childNode && this.childNode.type !== 'empty') {
        this.nextNode = { childNode: this.childNode, type: this.childNode.type }
      } else {
        this.nextNode = this.childNode
      }
      let init = false
      this.watcher = this.$watch(
        () => JSON.stringify(this.formData) + this.fullOrgId,
        function() {
          let mainflag = this.conditionNodes.some((node) => {
            let flag = true
            node.properties.conditions.forEach((condition) => {
              if (['money', 'number'].includes(condition.type) && condition.defaultValue) {
                if (condition.defaultValue.type === 'bet') {
                  if (
                    _[condition.defaultValue.value[1]](
                      condition.defaultValue.value[0],
                      this.formData[condition.vModel]
                    ) &&
                    _[condition.defaultValue.value[2]](
                      this.formData[condition.vModel],
                      condition.defaultValue.value[3]
                    )
                  ) {
                    return
                  }
                  // defaultValue.type { lt: '<', lte: '≤', gt: '>', gte: '≥', eq: '=' }
                } else if (
                  _[condition.defaultValue.type](
                    this.formData[condition.vModel],
                    condition.defaultValue.value
                  )
                ) {
                  return
                }
              } else if (condition.type === 'radio' && typeof condition.val !== 'undefined') {
                if (this.formData[condition.vModel] === condition.val) {
                  return
                }
              } else if (condition.type === 'checkbox' && typeof condition.val !== 'undefined') {
                if (this.formData[condition.vModel] === condition.val) {
                  return
                }
              }
              flag = false
            })
            if (!_.isEmpty(node.properties.initiator)) {
              if (this.fullOrgId) {
                this.conditionOrgId = (
                  node.properties.initiator.find((item) =>
                    _.includes(this.fullOrgId.split('.'), item.orgId)
                  ) || {}
                ).orgId
              } else {
                this.conditionOrgId = null
              }
              flag = flag !== false && !!this.conditionOrgId
              this.noMatchOrg = !flag
            }
            if (flag) {
              // 当这个节点只有条件没有内容时设置noData为true
              if (node.childNode && !node.conditionNodes) {
                this.data = { ...node.childNode, noData: false }
              } else if (node.conditionNodes) {
                this.data = {
                  noData: true,
                  childNode: node.childNode,
                  conditionNodes: node.conditionNodes,
                  type: node.type
                }
              } else {
                this.data = { noData: true, type: node.type }
              }
              !this.data.noData && this.initUserList(this.data)
            }
            return flag
          })
          if (!mainflag) {
            this.data = {}
          }
          if (init === false) {
            init = true
          } else {
            setTimeout(() => {
              this.validateApprover()
              // this.dispatch('ElFormItem', 'el.form.change')
            }, 0)
          }
          this.updateLast()
        },
        { deep: true, immediate: true }
      )
    } else {
      this.watcher = this.$watch(
        'childNode',
        () => {
          this.data = JSON.parse(JSON.stringify(this.childNode))
          this.data && this.initUserList(this.data)
          this.updateLast()
        },
        { deep: true, immediate: true }
      )
    }
  },
  methods: {
    updateLast() {
      let that = this
      setTimeout(() => {
        that.isLast = that.isLastNode(that.path)
      }, 0)
    },
    initUserList(data) {
      let userList
      if (data.type === 'copy') {
        userList = _.get(data, 'properties.members', [])
      } else if (data.type === 'approver') {
        if (this.selectable) {
          userList = []
        } else {
          userList = _.get(data, 'properties.approvers', [])
        }
        this.loadApprovers(data.properties)
      }
      this.$set(data, 'userList', userList)
    },
    // 加载审批人
    loadApprovers(properties = { infoForm: {} }) {
      let loadFunc = null,
        params = {}
      if (properties.assigneeType == 'tag') {
        loadFunc = getUserByTag
        params = { id: properties.infoForm.tagId }
      } else if (properties.assigneeType == 'job') {
        loadFunc = getUserByJob
        params = { id: properties.infoForm.jobId }
      } else if (properties.assigneeType == 'position') {
        loadFunc = getUserByPosition
        params = { id: properties.infoForm.positionId }
      } else if (properties.assigneeType === 'directorLevel') {
        loadFunc = getUserLeader
        params = { userId: this.userId, level: properties.infoForm.directorLevelId }
      }
      if (!loadFunc) {
        return
      }
      this.loading = true
      loadFunc(params)
        .then((res) => {
          this.$set(
            this.data.properties,
            'approvers',
            res.map((item) => ({ ...item, id: item.userId }))
          )
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleSelect(_, data = []) {
      setTimeout(() => {
        this.data.userList = data.slice()
        this.validateApprover()
      }, 300)

      // this.dispatch('ElFormItem', 'el.form.change')
    },
    // pickUser(userList) {
    //   pickUser(userList, {
    //     callback: (selectedUsers) => {
    //     },
    //     multiple: this.isMulti
    //   })
    // },
    deleteUser(index) {
      this.data.userList.splice(index, 1)
      this.validateApprover()
      // this.dispatch('ElFormItem', 'el.form.change')
    },
    checkUserSelected(user) {
      return !!_.find(this.data.userList, (item) => item.id === user.id)
    }
  }
}
</script>

<style lang="less" scoped>
.appr-user-item {
  position: relative;
  &__tail {
    position: absolute;
    left: 3px;
    top: 4px;
    height: 100%;
    border-left: 2px solid #e4e7ed;
  }
  &__node {
    position: absolute;
    background-color: #e4e7ed;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    width: 8px;
    height: 8px;
    top: 4px;
  }
  &__header {
    color: #323233;
    line-height: 24px;
  }
  &__wrapper {
    position: relative;
    padding-left: 16px;
    top: -3px;
  }
  &__title {
    font-size: 14px;
    margin-right: 6px;
  }
  &__tips {
    color: #757c85;
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
    color: #323233;
  }
  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(245, 246, 246, 0.5);
    text-align: center;
    margin: 8px auto;
    position: relative;
    .avatar {
      font-size: 40px;
      line-height: 40px;
      color: #757c85;
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 14px;
      z-index: 100;
      cursor: pointer;
      line-height: 14px;
    }
  }
  &__username {
    line-height: 16px;
    text-align: center;
  }
  &__separator {
    height: 40px;
    line-height: 40px;
    margin: 8px;
  }
  &__plusWr {
    margin: 8px 0 24px;
  }
  &__plus {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(245, 246, 246, 0.5);
    border: 1px dashed rgba(117, 124, 133, 0.5);
    text-align: center;
    cursor: pointer;
    color: #757c85;
    i {
      line-height: 40px;
      height: 40px;
      font-size: 20px;
    }
  }
}
</style>
