<template>
  <div class="appr-apply">
    <sticky-header :title="'发起' + basicSetting.processName + '申请'" />
    <dynamic-form
      ref="form"
      :form-data.sync="form"
    />
    <appr-picker
      ref="apprPicker"
      :process-data="processData"
      :form-data="form"
    />
    <div class="footer">
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
</template>

<script>
import { getProcessDetail } from '@/api/approval'
import ApprPicker from '@/components/appr-picker/apprPicker'
import DynamicForm from '@/components/dynamic-form/render'
import { Base64 } from 'js-base64'

export default {
  name: 'ApprApply',
  components: {
    ApprPicker,
    DynamicForm
  },
  data() {
    return {
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
  created() {
    this.processId = this.$route.query.processId
    this.getProcess()
  },
  methods: {
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
            this.advancedSetting = obj.advancedSetting
            this.$refs.form.init(obj.formData)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    submit() {
      Promise.all([this.$refs.form.validate(), this.$refs.apprPicker.validate()]).then(([data]) => {
        this.submiting = true
        this.$refs.apprPicker
          .submit({
            formData: data.formFields,
            processId: this.processId,
            processName: this.basicSetting.processName
          })
          .then(() => {
            this.$toast.success('审批提交成功')

            this.goBack()
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
.appr-apply {
  background-color: @--color-background-gray;
  .footer {
    padding: 16px 16.5px;
    position: absolute;
    bottom: 0;
    width: 100%;
    .van-button {
      width: calc(100% - 32px);
    }
  }
}
</style>
