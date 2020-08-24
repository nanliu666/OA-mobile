<template>
  <van-popup
    v-model="options.visible"
    round
    close-icon="close"
    position="bottom"
    :style="{ height: '80%' }"
  >
    <div class="apprSelect">
      <section class="select-box">
        <van-cell
          title="审批类型"
          :value="formData.processName"
          is-link
          @click="showTypePicker = true"
        />
        <van-cell
          title="申请时间"
          :value="formData.showDate"
          is-link
          @click="isShowDate = true"
        />
        <van-cell
          title="审批状态"
          is-link
          :value="formData.statusText"
          @click="showStatusPicker = true"
        />
      </section>
      <!-- 选择日期 -->
      <van-calendar
        v-model="isShowDate"
        type="range"
        :min-date="new Date(2000, 0, 1)"
        @confirm="onDateConfirm"
      />
      <!--  选择审批状态-->
      <van-popup
        v-model="showStatusPicker"
        round
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="statusColumns"
          @cancel="showStatusPicker = false"
          @confirm="onStatusConfirm"
        />
      </van-popup>
      <!-- 选择审批类型 -->
      <van-popup
        v-model="showTypePicker"
        round
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="typeColumns"
          @cancel="showTypePicker = false"
          @confirm="onTypeConfirm"
        />
      </van-popup>
      <!-- 按钮组 -->
      <section class="button-box">
        <van-button
          round
          class="cancel-button"
          size="normal"
          type="default"
          @click="onReset()"
        >
          重置
        </van-button>
        <van-button
          round
          size="normal"
          type="info"
          @click="affirm()"
        >
          确认
        </van-button>
      </section>
    </div>
  </van-popup>
</template>

<script>
import { STATUS_TO_TEXT } from '@/const/approve'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { getProcessTypeList } from '@/api/approval'
import { getOrgTreeSimple } from '@/api/org'
export default {
  name: 'ApprSelect',
  props: {
    options: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      isShowDate: false,
      formData: {},
      showStatusPicker: false,
      showTypePicker: false,
      statusColumns: [],
      typeColumns: [],
      typeList: []
    }
  },
  computed: {
    ...mapGetters(['approvalType'])
  },
  created() {
    this.initData()
  },
  methods: {
    /**
     * 确认状态后的数据处理
     */
    onStatusConfirm(value) {
      _.mapValues(STATUS_TO_TEXT, (o, key) => {
        if (o.text === value) this.formData.status = key
      })
      this.formData.statusText = value
      this.showStatusPicker = false
    },
    onTypeConfirm(value) {
      let temp = this.typeList.filter((item) => item.processName === value)
      this.formData.processId = temp[0].processId
      this.formData.processName = value
      this.showTypePicker = false
    },
    onDateConfirm(date) {
      const [start, end] = date
      this.isShowDate = false
      this.formData.beginApplyTime = start
      this.formData.endApplyTime = end
      this.formData.showDate = `${moment(start).format('YYYY-MM-DD')}至${moment(end).format(
        'YYYY-MM-DD'
      )}`
    },
    resetFormData() {
      this.formData = {
        status: '',
        orgId: '',
        beginApplyTime: '',
        endApplyTime: '',
        showDate: '',
        processName: '',
        statusText: '',
        processId: ''
      }
    },
    onReset() {
      this.resetFormData()
      this.submitFormData()
    },
    affirm() {
      this.submitFormData()
    },
    submitFormData() {
      this.options.visible = false
      this.options = _.assign(this.options, this.formData)
      this.$emit('on-submit', this.options)
    },
    initData() {
      this.resetFormData()
      //   this.getOrgTree()
      if (_.isEmpty(this.approvalType)) {
        this.getApprType()
      } else {
        this.typeList = this.approvalType.typeList
        this.typeColumns = this.approvalType.typeColumns
      }
      _.mapKeys(STATUS_TO_TEXT, (value) => {
        this.statusColumns.push(value.text)
      })
    },
    /**
     * 获取用人部门
     */
    getOrgTree() {
      getOrgTreeSimple({ parentOrgId: 0 }).then(() => {
        // this.searchPopoverConfig.popoverOptions[1].config.treeParams.data.push(...res)
        // this.$refs['searchPopover'].treeDataUpdateFun(res, 'orgId')
      })
    },
    /**
     * 获取审批类型
     */
    getApprType() {
      getProcessTypeList().then((res) => {
        this.typeList = res
        res.map((item) => {
          this.typeColumns.push(item.processName)
        })
        // 暂存类型，如果存在就不需要拉接口
        this.$store.commit('SET_APPR_TYPE_LIST', {
          typeList: this.typeList,
          typeColumns: this.typeColumns
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.apprSelect {
  .select-box {
    padding-top: 10px;
  }
  .button-box {
    height: 63px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    // background: rgba(255, c255, 255, 0.85);
    box-shadow: 0px -2px 7px 0px rgba(126, 158, 230, 0.15);
    position: fixed;
    bottom: 0px;
    left: 0;
    padding: 10px;
    button {
      flex: 1;
    }
    .cancel-button {
      margin-right: 10px;
    }
  }
}
</style>
