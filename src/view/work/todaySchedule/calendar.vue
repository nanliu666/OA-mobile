<template>
  <div class="page">
    <stickyHeader title="分配招聘需求">
      <template #title>
        <span @click="handleClickPicker">{{ pickerDate }}</span>
        <van-icon
          name="arrow-down"
          class="dateDown"
        />
      </template>
      <template #right>
        <van-icon
          name="plus"
          @click="handleAdd"
        />
      </template>
    </stickyHeader>
    <vue-hash-calendar
      ref="hash-calendar"
      :visible.sync="calendarShow"
      :default-datetime="currentDate"
      :is-show-action="false"
      first-day-of-month-class-name="color: #191919;"
      @change="change"
    >
      <div
        slot="day"
        slot-scope="scope"
      >
        <div>{{ scope.date.day }}</div>
      </div>
    </vue-hash-calendar>
    <div class="contain">
      <van-cell title="当日安排" />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <template v-for="item in todayList">
          <van-cell
            :key="item.id"
            is-link
            @click="handleClickCell(item)"
          >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="person-cell">
                <van-image
                  round
                  class="matterIcon"
                >
                  <template v-slot:error>
                    加载失败
                  </template>
                </van-image>
                <div class="title">
                  <div class="title-top">
                    <span class="custom-title">{{ item.title }}</span>
                  </div>
                  <div class="title-bottom">
                    <span class="custom-title">{{ item.remindDate }}</span>
                  </div>
                </div>
              </div>
            </template>
          </van-cell>
        </template>
      </van-list>
    </div>
    <van-popup
      v-model="showPicker"
      position="bottom"
    >
      <van-datetime-picker
        :value="currentDate"
        type="year-month"
        :formatter="formatter"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>
<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import { getScheduleInfo } from '@/api/work'
import moment from 'moment'

export default {
  name: 'Calendar',
  components: {
    StickyHeader
  },
  data() {
    return {
      calendarShow: true,
      finished: false,
      monthList: [],
      allData: [],
      currentDate: new Date(),
      showPicker: false
    }
  },
  computed: {
    pickerDate() {
      return moment(this.currentDate).format('YYYY-MM')
    },
    todayList() {
      let dataList
      this.allData.forEach((item) => {
        if (item.month === moment(this.currentDate).format('YYYY-MM')) dataList = item.dataList
      })
      return dataList.filter((item) => {
        return item.remindDate === moment(this.currentDate).format('YYYY-MM-DD')
      })
    },
    loading() {
      let dataItem
      this.allData.forEach((item) => {
        if (item.month === moment(this.currentDate).format('YYYY-MM')) dataItem = item
      })
      return dataItem.loading
    }
  },
  created() {
    this.getData(moment(new Date()))
  },
  methods: {
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      return val
    },
    getData(date) {
      if (
        this.allData.findIndex((item) => {
          return item.month === moment(date).format('YYYY-MM')
        }) > -1
      ) {
        this.monthList = this.allData[
          this.allData.findIndex((item) => {
            return item.month === moment(date).format('YYYY-MM')
          })
        ].dataList
      } else {
        let item = {
          color: '#207EFA',
          month: moment(date).format('YYYY-MM'),
          type: 'dot',
          loading: true,
          dataList: [],
          date: []
        }
        this.allData.push(item)
        const params = {
          userId: this.$store.state.user.userInfo.user_id,
          beginRemindDate: moment(date)
            .startOf('month')
            .format('YYYY-MM-DD'),
          endRemindDate: moment(date)
            .endOf('month')
            .format('YYYY-MM-DD')
        }
        getScheduleInfo(params).then((res) => {
          item.loading = false
          item.dataList.push(...res)
          let dotDate = Array.from(
            new Set(
              res.map((item) => {
                return moment(item.remindDate).format('YYYY/MM/DD')
              })
            )
          )
          item.date.push(...dotDate)
        })
      }
    },
    handleClickPicker() {
      this.showPicker = true
    },
    change(date) {
      if (
        !(
          moment(date).isBefore(moment(this.currentDate).endOf('month')) &&
          moment(date).isAfter(moment(this.currentDate).startOf('month'))
        )
      ) {
        this.getData(date)
      }
      this.currentDate = date
    },
    onConfirm(date) {
      this.getData(date)
      this.currentDate = date
      this.defaultDatetime = date
      this.showPicker = false
    },
    handleAdd() {
      this.$router.push('/todaySchedule/calendar/info')
    },
    handleClickCell(item) {
      this.$router.push({
        path: '/todaySchedule/calendar/info',
        query: {
          id: item.id,
          title: item.title,
          remindDate: item.remindDate
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  min-height: 100%;
  background-color: #f5f6f6;
}
.contain {
  margin-top: 8px;
}
.van-list {
  min-height: 300px;
  background-color: #fff;
}
/deep/.van-cell--clickable {
  align-items: center;
}
/deep/.van-nav-bar__title {
  display: flex;
  .dateDown {
    display: inline-block;
    height: 24px;
    width: 24px;
    display: flex;
    margin-left: 8px;
    color: #d8d8d8;
    justify-content: center;
    align-items: center;
  }
}

.person-cell {
  display: flex;
  align-items: center;
  .title {
    margin-left: 14px;
    .title-top {
      // margin-bottom: 6px;
      .custom-title {
        font-size: 16px;
        margin-right: 11px;
        color: #000;
      }
    }
    .title-bottom {
      color: #888888;
      font-size: 14px;
    }
  }
  .matterIcon {
    height: 32px;
    width: 32px;
  }
}
</style>
