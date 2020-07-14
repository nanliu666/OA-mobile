<template>
  <div class="page">
    <stickyHeader title="提醒事项详情" />
    <van-field
      label="提醒内容"
      required
      readonly
    />
    <van-field
      v-model="title"
      rows="2"
      autosize
      :disabled="$route.query.id ? true : false"
      type="textarea"
      maxlength="20"
      placeholder="请输入提醒内容"
      show-word-limit
    />
    <div class="bottom">
      <div class="anonymous">
        <van-cell
          title="提醒日期"
          class="required"
        >
          <template #label>
            <span
              class="date"
              @click="hanldChangeDate"
            >{{ pickerDate }}</span>
          </template>
        </van-cell>
      </div>

      <div class="btn">
        <van-button
          v-if="$route.query.id"
          class="delteBtn"
          type="info"
          block
          :loading="loading"
          @click="delele"
        >
          删除
        </van-button>
        <van-button
          v-else
          type="info"
          block
          :loading="loading"
          @click="submit"
        >
          保存
        </van-button>
      </div>
    </div>
    <van-popup
      v-model="showPicker"
      position="bottom"
    >
      <van-datetime-picker
        :value="currentDate"
        type="date"
        :formatter="formatter"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>
<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import { createScheduleInfo, deleteScheduleInfo } from '@/api/work'
import { Toast, Dialog } from 'vant'
import moment from 'moment'
export default {
  name: 'Feedback',
  components: {
    StickyHeader
  },
  data() {
    return {
      title: '',
      anonymous: false,
      loading: false,
      currentDate: new Date(),
      showPicker: false
    }
  },
  computed: {
    pickerDate() {
      return moment(this.currentDate).format('YYYY-MM-DD')
    }
  },
  created() {
    if (this.$route.query.id) {
      this.currentDate = moment(this.$route.query.remindDate).valueOf()
      this.title = this.$route.query.title
    }
  },
  methods: {
    delele() {
      Dialog.confirm({
        title: '确定删除',
        message: '确定要删除该提醒事项吗？'
      }).then(() => {
        const params = {
          userId: this.$store.state.user.userInfo.user_id,
          id: this.$route.query.id
        }
        this.loading = true
        deleteScheduleInfo(params)
          .then(() => {
            Toast('删除成功')
            this.loading = false
            this.$router.go(-1)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    submit() {
      if (!this.title.trim()) {
        Toast('意见反馈不能为空')
        return
      }
      const params = {
        userId: this.$store.state.user.userInfo.user_id,
        title: this.title,
        remindDate: this.pickerDate
      }
      this.loading = true
      createScheduleInfo(params)
        .then(() => {
          Toast('保存成功')
          this.loading = false
          this.$router.go(-1)
        })
        .catch(() => {
          this.loading = false
        })
    },
    hanldChangeDate() {
      if (this.$route.query.id) return
      this.showPicker = true
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      }
      return val
    },
    onConfirm(date) {
      this.currentDate = date
      this.showPicker = false
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  background-color: #f5f6f6;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .bottom {
    flex: 1;
    margin-top: 8px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    /deep/ .van-checkbox__label {
      color: #000;
    }
    .anonymous {
      flex: 1;
      .date {
        font-size: 14px;
        color: #757c85;
        margin-top: 8px;
      }
      .prompt {
        margin-top: 8px;
        font-size: 14px;
        color: #757c85;
        line-height: 25px;
      }
    }
    .btn {
      padding: 24px 16px 16px;
      .delteBtn {
        background: #f2f2f2;
        color: #202940;
        border-color: #f2f2f2;
      }
    }
  }
}
.required::before {
  position: absolute;
  left: 2.13333vw;
  color: #ee0a24;
  font-size: 3.73333vw;
  content: '*';
}

.van-cell--required {
  border-bottom: 0;
  padding-bottom: 0;
}
</style>
