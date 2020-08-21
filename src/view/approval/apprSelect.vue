<template>
  <div class="apprSelect">
    <StickyHeader
      title="获取条件"
      @leftClick="handleBack"
    />
    <section class="select-box">
      <van-cell-group>
        <van-cell
          title="审批类型"
          :value="formData.processName"
          is-link
          @click="showTypePicker = true"
        />
        <van-cell
          title="申请部门"
          value="内容"
          is-link
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
      </van-cell-group>
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
</template>

<script>
import { STATUS_TO_TEXT } from '@/const/approve'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { getProcessTypeList } from '@/api/approval'
import { getOrgTreeSimple } from '@/api/org'
export default {
  name: 'ApprSelect',
  components: {
    StickyHeader: () => import('@/components/stickyHeader/stickyHeader')
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
    ...mapGetters(['approvalType', 'filterContent'])
  },
  created() {
    this.initData()
  },
  methods: {
    handleBack() {
      this.$store.commit('SET_REFRESH', false)
      this.$router.go(-1)
    },
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
      this.$store.commit('SET_REFRESH', true)
      this.$store.commit('SET_FILTER_CONTENT', this.formData)
      this.$router.go(-1)
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
      this.formData = _.assign(this.formData, this.filterContent)
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
  min-height: 100vh;
  background-color: #f7f9fa;
  .button-box {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.85);
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
