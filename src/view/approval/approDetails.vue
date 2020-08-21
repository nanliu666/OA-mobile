<template>
  <div class="details">
    <stickyHeader title="审批详情" />
    <div class="nav flex flex-center">
      <div class="flex flex-center">
        <div>
          <span class="iconfont icon-usercircle hander_icon" />
        </div>
        <div>
          <div class="title_name">
            黄浩的用印申请
          </div>
          <div class="status">
            审批中
          </div>
        </div>
      </div>
    </div>
    <div class="form_content">
      <div
        v-for="(item, index) in formData"
        :key="index"
      >
        <span class="text">{{ item.text }}</span>：<span>{{ item.val }}</span>
      </div>
    </div>
    <van-steps
      :active="active"
      direction="vertical"
    >
      <van-step>买家下单</van-step>
      <van-step>商家接单</van-step>
      <van-step>买家提货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
  </div>
</template>

<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
export default {
  name: 'ApproDetails',
  components: {
    StickyHeader
  },
  data() {
    return {
      active: 1,
      formData: [
        { text: '审批管理', val: '20200507000086' },
        { text: '所属部门', val: '销售部' },
        { text: '审批管理', val: '20200507000086' },
        { text: '所属部门', val: '销售部' },
        { text: '审批管理', val: '20200507000086' },
        { text: '所属部门', val: '销售部' },
        { text: '审批管理', val: '20200507000086' },
        { text: '所属部门', val: '销售部' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.details {
  background-color: #f5f6f6;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.header {
  background: #fff;
  height: 45px;
  line-height: 45px;
  text-align: center;
}
.nav {
  height: 100px;
  margin-top: 10px;
  background: #fff;
  padding: 0 16px;
  box-shadow: inset 0 1px 0 0 #dddddd, inset 0 -1px 0 0 #dddddd;
  .hander_icon {
    display: inline-block;
    width: 60px;
    height: 60px;
    font-size: 60px;
    color: #cfd3d6;
    margin-right: 14px;
  }
  .title_name {
    font-size: 17px;
    line-height: 25.5px;
    color: #000000;
    /*font-weight: 0;*/
  }
  .status {
    width: 60px;
    line-height: 24px;
    background: #edf8ff;
    color: #6aafff;
    font-size: 12px;
    text-align: center;
    margin-top: 6.5px;
  }
}
.flex {
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
}
.flex-center {
  align-items: center;
  /*justify-content: center;*/
}
.form_content {
  margin-top: 6.5px;
  min-height: 50px;
  background: #fff;
  padding: 20px 18px;
  box-shadow: inset 0 1px 0 0 #dddddd, inset 0 -1px 0 0 #dddddd;
  > div {
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 8px;
    color: #202940;
    letter-spacing: 0;
  }
  .text {
    color: #757c85;
  }
}
</style>
