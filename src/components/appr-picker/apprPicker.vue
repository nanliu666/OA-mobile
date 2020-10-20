<template>
  <div class="appr-picker">
    <van-form
      ref="form"
      :rules="rules"
      :model="{}"
      size="medium"
      label-position="top"
    >
      <van-field-select-picker
        v-if="conditonHasInitiator"
        v-model="fullOrgId"
        name="fullOrgId"
        label="所在部门"
        column-label="orgName"
        column-value="fullOrgId"
        :columns="userOrgList"
        :rules="rules.fullOrgId"
      />
      <!-- 当流程数据存在时挂载  -->
      <!--如果第一级条件存在发起人时，需要校验是否选择了当前部门-->
      <van-field
        name="approver"
        :rules="rules.approver"
        class="appr-picker-approver"
      >
        <template #input>
          <appr-picker-item
            v-if="processData"
            v-show="!processErrored && processFullfilled"
            ref="apprPickerItem"
            path="0"
            :form-data="formData"
            :type="processData.type"
            :child-node="processData.childNode"
            :condition-nodes="processData.conditionNodes"
            :full-org-id="fullOrgId"
            :is-first="true"
            @hook:mounted="checkFullfilled"
          />
          <div v-if="!processFullfilled">
            必填信息填写后，流程将自动显示
          </div>
          <div
            v-if="processErrored"
            class="process--error"
          >
            流程出错：当前条件没有设置审批人，请联系管理员
          </div>
        </template>
      </van-field>
    </van-form>
  </div>
</template>

<script>
import moment from 'moment'
import apprPickerItem from './apprPickerItem'
import VanFieldSelectPicker from '@/components/vanFieldSelectPicker/vanFieldSelectPicker'
import { submitApprApply, getUserOrgList } from '@/api/approval'

import { mapGetters } from 'vuex'

export default {
  name: 'ApprPicker',
  components: {
    apprPickerItem,
    VanFieldSelectPicker
  },
  props: {
    processData: {
      type: Object,
      default: null
    },
    formData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      conditonHasInitiator: false,
      conditionFieldsFullfilled: false,
      conditionFullfiled: false,
      conditionFields: [],
      userOrgList: [],
      fullOrgId: null,
      noMatchOrg: null,
      rules: {
        fullOrgId: [{ required: true, message: '请选择所在部门' }],
        approver: [
          { required: true, validator: this.checkValidate, message: this.getValidateMessage }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userId']),
    // 流程出错
    processErrored() {
      return (this.fullOrgId && this.noMatchOrg) || this.conditonHasInitiator
        ? this.fullOrgId && this.conditionFieldsFullfilled && !this.conditionFullfiled
        : this.conditionFieldsFullfilled && !this.conditionFullfiled
    },
    // 流程条件是否完善
    processFullfilled() {
      return this.conditonHasInitiator
        ? !!this.fullOrgId && this.conditionFieldsFullfilled
        : this.conditionFieldsFullfilled
    }
  },

  watch: {
    fullOrgId() {
      setTimeout(() => {
        this.checkFullfilled()
        this.noMatchOrg = this.$refs.apprPickerItem && this.$refs.apprPickerItem.noMatchOrg
      })
    },
    formData: {
      handler() {
        this.checkFullfilled()
      },
      deep: true
    },
    processData: {
      handler(val) {
        // 动态检查条件对应的字段是否全部填写
        this.getConditionFields(this.processData)
        // 监听流程数据判断有没有发起人条件，有的话并获取用户所在的组织
        this.conditonHasInitiator = _.get(val, 'conditionNodes', []).some(
          (node) => _.get(node, 'properties.initiator.length') > 0
        )
        if (this.conditonHasInitiator) {
          this.getUserOrgList()
        }
      }
    }
  },
  provide: function() {
    const that = this
    return {
      validateApprover: this.validateApprover,
      // 根据path判断是否是最后一个节点
      isLastNode: function(path) {
        const pathList = []
        const loop = ($el) => {
          pathList.push($el.path)
          let children = $el.$children.filter((item) => item.$options.name === 'ApprPickerItem')
          children.forEach((child) => loop(child))
        }
        loop(that.$refs.apprPickerItem)
        return path === _.max(pathList)
      }
    }
  },
  methods: {
    checkFullfilled() {
      // 校验条件对应的表单项是否全部填写
      this.conditionFieldsFullfilled = this.conditionFields.every(
        // _.isEmpty函数无法验证Number类型
        ({ prop: field }) => !_.isEmpty(this.formData[field]) || _.isNumber(this.formData[field])
      )
      this.$nextTick(() => {
        // 校验条件分支节点是否全部满足
        this.conditionFullfiled = this.checkConditionFullfilled()
      })
    },
    getUserOrgList() {
      getUserOrgList({ userId: this.userId }).then((res) => {
        this.userOrgList = res
      })
    },
    validateApprover() {
      this.$refs.form.resetValidation('approver')
      return this.$refs.form.validate('approver')
    },
    validate() {
      return this.$refs.form.validate(...arguments)
    },
    submit(data) {
      if (!this.checkValidate()) {
        return false
      }
      const processMap = this.createProcessMap()
      const nodeData = this.createNodeLine()

      return submitApprApply({
        ...data,
        formData: data.formData ? JSON.stringify(data.formData) : null,
        title: `${this.userInfo.nick_name}发起的${data.processName}`,
        userId: this.userId,
        processMap: Object.assign(
          {},
          processMap,
          this.createConditionProcessMap(),
          data.processMap
        ),
        nodeData: JSON.stringify(nodeData)
      })
    },
    checkValidate() {
      let valid = true
      if (this.conditonHasInitiator && !this.fullOrgId) {
        valid = false
      } else if (this.processErrored) {
        valid = false
      } else if (!this.conditionFieldsFullfilled) {
        valid = false
      } else if (!this.checkApprovers()) {
        valid = false
      }
      return valid
    },
    getValidateMessage() {
      let message = null
      if (this.conditonHasInitiator && !this.fullOrgId) {
        message = '请先选择所在部门'
      } else if (this.processErrored) {
        message = '流程出错，请联系管理员'
      } else if (!this.conditionFieldsFullfilled) {
        message = '请先填写表单必填项'
      } else if (!this.checkApprovers()) {
        message = '请选择审批人'
      }
      return message
    },
    // 递归检查审批人是否已选
    checkApprovers() {
      let valid = true
      const loop = ($el) => {
        let data = $el.data
        if (!data || (data.type === 'approver' && data.userList.length === 0)) {
          valid = false
        }

        let children = $el.$children.filter((item) => item.$options.name === 'ApprPickerItem')
        if (children.length > 0) {
          children.forEach((child) => loop(child))
        }
      }
      if (!this.conditionFieldsFullfilled) {
        return false
      }
      loop(this.$refs.apprPickerItem)
      return valid
    },
    // 条件是否都已满足
    checkConditionFullfilled() {
      let fullfilled = true
      const loop = ($el) => {
        if (_.isEmpty($el.data)) {
          fullfilled = false
        }
        let children = $el.$children.filter((item) => item.$options.name === 'ApprPickerItem')
        if (children.length > 0) {
          children.forEach((child) => loop(child))
        }
      }
      if (this.$refs.apprPickerItem) {
        loop(this.$refs.apprPickerItem)
      } else {
        fullfilled = false
      }
      return fullfilled
    },
    // 递归生成变量数据对象
    createProcessMap() {
      let map = {}
      const loop = ($el) => {
        let data = $el.data
        if (!data) {
          return
        }
        if (data.variable) {
          if (
            // 是否是会签或者或签，分为自选多个人和指定多个人
            (data.properties.assigneeType == 'optional' && data.properties.optionalMultiUser) ||
            (data.properties.assigneeType == 'user' && data.userList.length > 1)
          ) {
            // 会签或者或签审批人变量需要传数组类型
            map[data.variable] = [
              ...new Set(data.userList.map((item) => 'taskUser_' + this.getUserId(item)))
            ]
          } else {
            map[data.variable] = 'taskUser_' + this.getUserId(data.userList[0])
          }
        }
        let children = $el.$children.filter((item) => item.$options.name === 'ApprPickerItem')
        if (children.length > 0) {
          children.forEach((child) => loop(child))
        }
      }
      loop(this.$refs.apprPickerItem)
      return map
    },
    getUserId(user) {
      let id = user.id || user.userId
      if (id.split('_').length > 1) {
        return id.split('_')[1]
      } else {
        return id
      }
    },
    // // 生成条件变量
    // createConditionProcessMap() {
    //   let processMap = this.conditionFields.reduce((acc, curr) => {
    //     acc[curr] = this.formData[curr]
    //     return acc
    //   }, {})
    //   if (this.conditonHasInitiator) {
    //     processMap['initiator_org'] =
    //       this.$refs.apprPickerItem.conditionOrgId || this.fullOrgId.split('.').slice(-1)[0]
    //   }
    //   return processMap
    // },
    // 生成条件变量
    createConditionProcessMap() {
      const { formData } = this
      let processMap = this.conditionFields.reduce((acc, { prop, type }) => {
        if (type === 'checkbox') {
          if (formData[prop].includes(-1)) {
            acc[prop] = _.find(formData[prop], _.isString)
          } else {
            acc[prop] = _.sortBy(formData[prop]).join()
          }
        } else if (type === 'daterange') {
          const [date1, date2] = formData[prop]
          // diff date1以免出现负数，区间计算当天（+1天）
          acc[prop] = moment.duration(moment(date2).diff(date1)).days() + 1
        } else {
          acc[prop] = formData[prop]
        }
        return acc
      }, {})
      if (this.conditonHasInitiator) {
        processMap['initiator_org'] =
          this.$refs.apprPickerItem.conditionOrgId || this.fullOrgId.split('.').slice(-1)[0]
      }
      return processMap
    },
    // 获取条件对应的表单字段
    getConditionFields() {
      let fields = []
      const loop = (node) => {
        let conditions = _.get(node, 'properties.conditions', null)
        if (Array.isArray(conditions)) {
          conditions.forEach((condition) => {
            fields.push({
              prop: condition.vModel,
              type: condition.type
            })
          })
        }
        node.childNode && loop(node.childNode)
        Array.isArray(node.conditionNodes) && node.conditionNodes.forEach(loop)
      }

      this.processData && loop(this.processData)
      // 动态生成所有节点需要的字段数组
      return (this.conditionFields = _.uniqWith(fields, _.isEqual))
    },
    // 生成线性节点数组
    createNodeLine() {
      let start = JSON.parse(JSON.stringify(this.processData))
      delete start.childNode
      delete start.conditionNodes
      start.userList = [
        {
          name: this.userInfo.nick_name,
          userId: this.userId,
          workNo: this.userInfo.account,
          type: 'user'
        }
      ]
      const line = [start]
      const loop = ($el) => {
        let data = JSON.parse(JSON.stringify($el.data))
        if (!data.noData) {
          delete data.conditionNodes
          delete data.childNode
          data.properties.approvers = []
          line.push(data)
        }
        // 注意sort是为了将节点按上下顺序排序
        let children = $el.$children
          .filter((item) => item.$options.name === 'ApprPickerItem')
          .sort((a, b) => (a.path > b.path ? 1 : -1))
        children.forEach((child) => loop(child))
      }
      loop(this.$refs.apprPickerItem)
      return line
    }
  }
}
</script>

<style lang="less" scoped>
.appr-picker {
  .appr-picker-approver {
    margin-top: 8px;
  }
  .process--error {
    color: #ee0a24;
  }
}
</style>
