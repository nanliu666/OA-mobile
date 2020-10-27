<template>
  <div
    class="appr-apply"
    :style="{ 'margin-bottom': hasHandle ? '76px' : 0 }"
  >
    <div v-show="!initor.isShowInitiator">
      <sticky-header :title="'发起' + basicSetting.processName + '申请'" />
      <div class="appr-preview">
        <van-field
          v-if="!hasHandle"
          is-link
          readonly
          input-align="right"
          label-width="15em"
          clickable
          name="picker"
          :label="`正在模拟发起人：${initor.currentInitor}`"
          placeholder="切换发起人"
          @click="switchInitiator"
        />
      </div>
      <dynamic-form
        ref="form"
        :form-data.sync="form"
      />
      <appr-picker
        ref="apprPicker"
        :process-data="processData"
        :form-data="form"
      />
      <div
        v-if="hasHandle"
        class="footer"
      >
        <van-button
          size="medium"
          type="info"
          :loading="submiting"
          @click="submit"
        >
          提交
        </van-button>
      </div>
    </div>
    <SelectInitor
      v-model="initor"
      @search="onSearch"
    />
  </div>
</template>

<script>
import { getOrgUserTree } from '@/api/addressBook'
import { getProcessDetail } from '@/api/approval'
import ApprPicker from '@/components/appr-picker/apprPicker'
import DynamicForm from '@/components/dynamic-form/render'
import { Base64 } from 'js-base64'
import { mapGetters } from 'vuex'
import SelectInitor from './selectInitor'
export default {
  name: 'ApprApply',
  components: {
    ApprPicker,
    SelectInitor,
    DynamicForm
  },

  data() {
    return {
      initor: {
        isShowInitiator: false,
        currentInitor: '',
        skeletonLoading: false,
        orgData: []
      },
      hasHandle: true,
      basicSetting: {},
      formData: {},
      form: {},
      processData: null,
      advancedSetting: {},
      json: '',
      loading: false,
      processId: null,
      submiting: false
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'orgDataVuex', 'initiator'])
  },
  watch: {
    initiator(nVal) {
      this.initor.currentInitor = _.isEmpty(nVal) ? this.userInfo.nick_name : nVal.name
      this.initor.isShowInitiator = false
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }
  },
  created() {
    this.initor.currentInitor = this.userInfo.nick_name
    this.processId = this.$route.query.processId
    this.getProcess()
    if (this.$route.query.type && this.$route.query.type === 'preview') {
      this.hasHandle = false
    }
  },
  methods: {
    // 选择发起人的搜索
    onSearch(searchParams) {
      this.initor.orgData = []
      getOrgUserTree(searchParams).then((result) => {
        this.initor.orgData = result
      })
    },
    /**
     * 打开搜索页面
     * 发起人为所有人
     * 发起人全都是个人
     * 发起人同时存在部门和个人
     */
    switchInitiator() {
      // console.log('this.basicSetting==', this.basicSetting.initiator)
      this.initor.isShowInitiator = true
      if (!_.isEmpty(this.orgDataVuex)) {
        this.initor.orgData = this.orgDataVuex
      } else {
        this.initor.skeletonLoading = true
        getOrgUserTree().then((result) => {
          this.initor.skeletonLoading = false
          this.initor.orgData = result
          this.$store.commit('SET_ORG_DATA', result)
        })
      }
    },
    getProcess() {
      if (!this.processId) {
        return
      }
      this.loading = true
      getProcessDetail({ processId: this.processId })
        .then((res) => {
          this.json = res.baseJson
          const obj = JSON.parse(Base64.decode(res.baseJson))
          if (typeof obj === 'object') {
            this.basicSetting = obj.basicSetting
            this.formData = obj.formData
            this.processData = obj.processData
            // 此处为提交审批内的权限，故只取第一层数据的权限
            const formOperates = this.processData.properties.formOperates
            if (formOperates && formOperates.length > 0) {
              formOperates.map((item) => {
                this.formData.fields.map((formItem) => {
                  if (item.formId === formItem.__config__.formId) {
                    formItem.__config__.formPrivilege = item.formPrivilege
                    if (formItem.__config__.children) {
                      formItem.__config__.children.forEach((childrenItem) => {
                        childrenItem.__config__.formPrivilege = item.formPrivilege
                      })
                    }
                    if (formItem.__config__.formPrivilege === 1) {
                      formItem.__config__.required = false
                      if (formItem.__config__.children) {
                        formItem.__config__.children.forEach((childrenItem) => {
                          childrenItem.__config__.required = false
                        })
                      }
                    }
                  }
                })
              })
            }
            this.advancedSetting = obj.advancedSetting
            this.$refs.form.init(obj.formData)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    submit() {
      Promise.all([this.$refs.form.validate(), this.$refs.apprPicker.validate()]).then(() => {
        this.submiting = true
        // 审批提交的时候，前端会Base64存表格生成数据以及流程数据
        this.$refs.apprPicker
          .submit({
            formData: Base64.encode(
              JSON.stringify({
                formData: this.$refs.form.formConfCopy,
                processData: this.processData
              })
            ),
            processId: this.processId,
            processName: this.basicSetting.processName
          })
          .then(() => {
            this.$toast.success({
              message: '审批提交成功',
              duration: 1000,
              onClose: () => {
                this.goBack()
              }
            })
          })
          .finally(() => {
            this.submiting = false
          })
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    clear() {
      this.$refs.form.resetForm()
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/styles/variables.less';
.appr-preview {
  margin: 10px 0 15px 0;
  /deep/ .van-field {
    background-color: #6e9afd;
    width: 100vw;
    color: #ffffff;
    .van-field__value,
    .van-cell__right-icon {
      color: #ffffff;
    }
    input::-webkit-input-placeholder {
      color: #ffffff;
    }
  }
}
.appr-apply {
  background-color: @--color-background-gray;
  .footer {
    background-color: #fff;
    box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.15);
    padding: 16px 16.5px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    .van-button {
      width: calc(100% - 32px);
    }
  }
}
</style>
