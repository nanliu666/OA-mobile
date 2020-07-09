<template>
  <div class="page">
    <stickyHeader title="面试" />
    <div class="contain">
      <van-cell value="技能评价" />
      <van-form
        ref="basicForm"
        input-align="right"
        :show-error-message="false"
      >
        <van-field-select-picker
          v-model="form.workBackground"
          class="fieldPicker"
          name="workBackground"
          label="工作背景"
          placeholder="请选择"
          :columns="levelColumns"
          :rules="rules.workBackground"
          required
        />
        <div class="disc">
          是否具备丰富的行业经验，了解行业的发展状况，职业背景好
        </div>
        <van-field-select-picker
          v-model="form.workExperience"
          class="fieldPicker"
          name="workExperience"
          label="工作经验"
          placeholder="请选择"
          :columns="levelColumns"
          :rules="rules.workExperience"
          required
        />
        <div class="disc">
          以往的工作经验是否与本岗位要求一致
        </div>
        <van-field-select-picker
          v-model="form.knowledge"
          class="fieldPicker"
          name="knowledge"
          label="岗位知识"
          placeholder="请选择"
          :columns="levelColumns"
          :rules="rules.knowledge"
          required
        />
        <div class="disc">
          是否精通本岗位所需专业知识，业务技能熟练，对岗位理解深刻而独到
        </div>
        <van-field-select-picker
          v-model="form.train"
          class="fieldPicker"
          name="train"
          label="教育培训"
          placeholder="请选择"
          :columns="levelColumns"
          :rules="rules.train"
          required
        />
        <div class="disc">
          是否接受过本岗位需要的系统培训，教育背景好
        </div>
        <van-field-select-picker
          v-model="form.specialty"
          class="fieldPicker"
          name="specialty"
          label="专业特长"
          placeholder="请选择"
          :columns="levelColumns"
          :rules="rules.specialty"
          required
        />
        <div class="disc">
          是否具备一定的专业特长，有益于本岗位工作
        </div>
        <van-field
          class="contain noBorderBottom"
          label="面试评价"
          readonly
          required
        />
        <van-field
          v-model="form.evaluation"
          rows="3"
          autosize
          input-align="left"
          type="textarea"
          maxlength="200"
          :rules="rules.evaluation"
          placeholder="请输入"
          show-word-limit
        />
        <van-field
          v-model="form.score"
          class="contain"
          type="digit"
          label="综合打分"
          placeholder="请输入0～100"
          :rules="rules.score"
          required
        />
        <van-field-select-picker
          v-model="form.status"
          class="contain"
          name="status"
          label="录用建议"
          placeholder="请选择"
          :columns="statusColumns"
          :rules="rules.status"
          required
        />
      </van-form>
    </div>
    <div class="btnBox contain">
      <div class="nextBox">
        <van-button
          round
          block
          type="info"
          :loading="loading"
          @click="handleEvaluate"
        >
          提交
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import VanFieldSelectPicker from '@/components/vanFieldSelectPicker/vanFieldSelectPicker'
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import { Toast } from 'vant'
import { postInterviewEvaluation } from '@/api/work'

export default {
  components: { VanFieldSelectPicker, StickyHeader },
  data() {
    return {
      rules: {
        workBackground: [{ required: true, message: '请选择工作背景' }],
        workExperience: [{ required: true, message: '请选择工作经验' }],
        knowledge: [{ required: true, message: '请选择岗位知识' }],
        train: [{ required: true, message: '请选择教育培训' }],
        specialty: [{ required: true, message: '请选择专业特长' }],
        evaluation: [
          { required: true, message: '请填写面试评价' },
          {
            validator: (val) => {
              return val.trim().length > 0
            },
            message: '面试评价不能为空'
          }
        ],
        score: [
          { required: true, message: '请填写综合打分' },
          {
            validator: (val) => {
              return val >= 0 && val <= 100
            },
            message: '请输入范围内的整数'
          }
        ],
        status: [{ required: true, message: '请选择录用建议' }]
      },
      form: {
        workBackground: '',
        evaluation: ''
      },
      levelColumns: ['A', 'B', 'C', 'D'],
      statusColumns: [
        { label: '通过', value: 'Pass' },
        { label: '淘汰', value: 'Reject' }
      ],
      loading: false
    }
  },
  methods: {
    handleEvaluate() {
      this.$refs.basicForm
        .validate()
        .then(() => {
          const params = {
            id: this.$route.query.id,
            ...this.form
          }
          this.loading = true
          postInterviewEvaluation(params).then(() => {
            this.loading = false
            this.form.status === 'Pass' ? Toast('已通过') : Toast('已淘汰')
            this.$router.back()
          })
        })
        .catch((error) => {
          Toast(error[0].message)
          this.$refs.basicForm.scrollToField(error[0].name, { alignToTop: true })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  background-color: #f5f6f6;
  min-height: 100%;
}
.contain {
  margin-top: 8px;
  border-top: 1px solid #eee;
}

.fieldPicker {
  /deep/ .van-cell {
    border-bottom: 0;
    padding-bottom: 0;
  }
  /deep/.van-cell:last-child:after {
    border-bottom: 0;
  }
}
.disc {
  padding: 0 16px 10px;
  color: #888888;
  font-size: 12px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
}
.noBorderBottom {
  border-bottom: 0;
  padding-bottom: 0;
}
.btnBox {
  display: flex;
  background-color: #fff;
  div {
    flex: 1;
  }
  .nextBox:first-child {
    padding: 0 8px 0 16px;
    .van-button {
      // background-color: #f2f2f2;
      border: 0;
      // color: #202940;
    }
  }
  .nextBox:last-child {
    padding: 0 16px 0 8px;
  }
}
.nextBox {
  margin: 16px auto;

  /deep/ .van-button {
    border-radius: 5px;
  }
}
</style>
