<template>
  <div class="page">
    <stickyHeader title="分配招聘需求">
      <template #footer>
        <div class="numBox">
          <div class="numItem">
            需求人数：
            <span class="all">{{ totalNum }}</span>
          </div>
          <div class="numItem">
            已分配：
            <span class="alloted">{{ alloted }}</span>
          </div>
          <div class="numItem">
            待分配：
            <span class="willAllot">{{ willAllot }}</span>
          </div>
        </div>
      </template>
    </stickyHeader>
    <div class="contain">
      <van-form
        ref="workForm"
        input-align="right"
        :show-error-message="false"
        label-width="120"
      >
        <template v-for="(item, index) in workForm">
          <div
            :key="index"
            class="cellBox"
          >
            <van-field-select-picker
              v-model="workForm[index].userId"
              :name="'workFormUserId' + index"
              label="指定招聘人员"
              column-label="name"
              column-value="userId"
              placeholder="请选择"
              :columns="userColumns"
              :rules="rules.userId"
              @willToBottom="getWorkList"
            />
            <van-field
              v-model.number="workForm[index].taskNum"
              :name="'workFormTaskNum' + index"
              type="digit"
              label="招聘任务"
              placeholder="请输入"
              :rules="rules.taskNum"
            />
            <van-button
              type="default"
              size="large"
              @click="deleteItem(index)"
            >
              <div class="addBtn">
                <van-icon name="delete" />删除
              </div>
            </van-button>
          </div>
        </template>
        <div class="cellBox">
          <van-button
            type="default"
            size="large"
            @click="addItem"
          >
            <div class="addBtn">
              <van-icon name="plus" />添加
            </div>
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="bottom">
      <div>
        <van-button
          type="info"
          block
          :loading="loading"
          @click="submit"
        >
          确认分配
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import VanFieldSelectPicker from '@/components/vanFieldSelectPicker/vanFieldSelectPicker'
import { getWorkList, getRecruitmentDetail, postRecruitmentTask } from '@/api/work'
import { Toast } from 'vant'
export default {
  components: {
    StickyHeader,
    VanFieldSelectPicker
  },
  data() {
    let validator = (val) => {
      return val >= 1 && val <= this.totalNum
    }
    return {
      totalNum: 0,
      workForm: [{ userId: '', taskNum: '' }],
      loading: false,
      userColumns: [],
      userParams: {
        pageNo: 1,
        pageSize: 50,
        finished: false,
        loading: false
      },
      rules: {
        userId: [{ required: true, message: '请选择招聘人员' }],
        taskNum: [
          { required: true, message: '请输入招聘任务数量' },
          { validator: validator, message: '请输入范围内的整数' }
        ]
      }
    }
  },
  computed: {
    alloted() {
      let num = 0
      this.workForm.forEach((item) => {
        if (item.taskNum) {
          num += item.taskNum
        }
      })
      if (num > this.totalNum) num = this.totalNum
      return num
    },
    willAllot() {
      return this.totalNum - this.alloted
    }
  },
  created() {
    this.getWorkList()
    getRecruitmentDetail({ recruitmentId: this.$route.query.id }).then((res) => {
      this.totalNum = Number(res.needNum)
    })
  },
  methods: {
    addItem() {
      this.workForm.push({ userId: '', taskNum: '' })
      setTimeout(() => {
        this.$refs.workForm.resetValidation()
      }, 0)
    },
    deleteItem(index) {
      this.workForm.splice(index, 1)
      setTimeout(() => {
        this.$refs.workForm.resetValidation()
      }, 0)
    },
    getWorkList(pageNo) {
      if (this.userParams.loading || this.userParams.finished) return
      if (pageNo) this.userParams.pageNo = pageNo
      const params = { pageNo: this.userParams.pageNo, pageSize: this.userParams.pageSize }
      this.userParams.loading = true
      getWorkList(params).then((res) => {
        if (res.data.length > 0) {
          this.userColumns.push(...res.data)
          this.userParams.pageNo += 1
          if (res.data.length < this.userParams.pageSize) this.userParams.finished = true
        } else {
          this.userParams.finished = true
        }
        this.userParams.loading = false
      })
    },
    submit() {
      this.$refs.workForm
        .validate()
        .then(() => {
          if (this.getAllAllotNum() > this.all) {
            Toast('分配任务总数不能超过需求人数')
            return
          }
          const params = {
            recruitmentId: this.$route.query.id,
            assignUser: this.$store.state.user.userInfo.user_id,
            users: [...this.workForm]
          }
          this.loading = true
          postRecruitmentTask(params).then(() => {
            this.loading = false
            Toast('分配成功')
            this.$router.back()
          })
        })
        .catch((error) => {
          Toast(error[0].message)
          this.$refs.workForm.scrollToField(error[0].name, { alignToTop: true })
        })
    },
    getAllAllotNum() {
      let num = 0
      this.workForm.forEach((item) => {
        if (item.taskNum) {
          num += item.taskNum
        }
      })
      return num
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  background-color: #f5f6f6;
  min-height: 100%;
}
.numBox {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #fff;
  .numItem {
    text-align: center;
    height: 46px;
    background-color: #fff;
    line-height: 46px;
    color: #757c85;
    .all {
      color: #000;
    }
    .alloted {
      color: #000;
    }
    .willAllot {
      color: #207efa;
    }
  }
}
.addBtn {
  display: flex;
  align-items: center;
  /deep/ .van-icon {
    margin-right: 8px;
    color: #207efa;
  }
}
.cellBox {
  margin-top: 8px;
}
.contain {
  padding-bottom: 84px;
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 24px 16px 16px;
  display: flex;
  flex-direction: column;
  /deep/ .van-checkbox__label {
    color: #000;
  }
}
</style>
