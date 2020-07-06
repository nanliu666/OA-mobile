<template>
  <div>
    <stickyHeader
      :title="step === 0 ? '登录密码': '新手机号码'"
      @leftClick="handleBack"
    />
    <template v-if="step === 0">
      <div class="inputBox">
        <div class="title">
          登录密码
        </div>
        <van-field
          v-model="password"
          label="密码"
          placeholder="请输入登录密码"
          type="password"
        />
        <div class="btn">
          <van-button
            :loading="checkLoading"
            type="info"
            block
            @click="toNext"
          >
            下一步
          </van-button>
        </div>
      </div>
    </template>
    <template v-if="step === 1">
      <div class="inputBox">
        <div class="title">
          新手机号码
        </div>
        <van-field
          v-model.trim="tel"
          type="tel"
          label="手机号"
          placeholder="请输入手机号"
          maxlength="11"
          :rules="[{ pattern: /^1[0-9]{10}$/, message: '手机号不正确' }]"
          :formatter="formatter"
        />
        <van-field
          v-model.trim="code"
          type="number"
          center
          label="验证码"
          placeholder="请输入验证码"
        >
          <template #button>
            <span
              :class="timeout ? 'loading': 'ready'"
              @click="sendCode"
            >获取验证码{{ timeout ? `(${countdown})` : '' }}</span>
          </template>
        </van-field>
        <div class="btn">
          <van-button
            :loading="changeLoading"
            type="info"
            block
            @click="handelConfirm"
          >
            确认
          </van-button>
        </div>
      </div>
    </template>
    <van-overlay :show="changeSuccess">
      <div
        v-show="changeSuccess"
        class="rejectPopup"
      >
        <van-icon
          name="checked"
          class="resolveIcon"
        />
        <div class="title">
          手机号码修改成功
        </div>
        <div class="joinBtn">
          <van-button
            round
            block
            type="info"
            @click="toSetting"
          >
            返回设置
          </van-button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import { sendSms, modifyUserPhone } from '@/api/user'
import { Toast } from 'vant'
import md5 from 'js-md5'

export default {
  name:'ChangePhone',
  components: {
    StickyHeader
  },
  data() {
    return {
      tel: '',
      code: '',
      countdown: 60,
      timeout: null,
      checkLoading: false,
      smsLoading: false,
      step: 0,
      password: '',
      changeLoading: false,
      changeSuccess: false
    }
  },
  methods: {
    handleBack() {
      if (this.step === 1) {
        this.step = 0
      } else {
        this.$router.go(-1)
      }
    },
    formatter(value) {
      return value.replace(/\D/g, '')
    },
    sendCode() {
      if (this.timeout && this.countdown > 0) return
      if (this.smsLoading) return
      if (!/^1[0-9]{10}$/.test(this.tel)) {
        Toast('手机号格式错误')
        return
      }
      this.smsLoading = true
      sendSms({ phone: this.tel }).then(() => {
        this.countdown = 60
        this.timeout = setInterval(() => {
          if (this.countdown === 0) {
            clearInterval(this.timeout)
            this.timeout = null
            this.countdown = 60
          } else {
            this.countdown -= 1
          }
        }, 1000)
        this.smsLoading = false
      })
    },
    toNext() {
      if(!this.password.trim()){
            Toast('密码不能为空')
            return
        }
    //   const params = {
    //     phonenum: this.tel,
    //     smsCode: this.code
    //   }
      const params = {
        userId: this.$store.state.user.userInfo.user_id,
        password: md5(this.password)
      }
      this.checkLoading = true
      modifyUserPhone(params)
        .then(() => {
          this.step = 1
          this.checkLoading = false
        })
        .catch(() => {
          this.checkLoading = false
        })
    },
    handelConfirm(){
        if (!/^1[0-9]{10}$/.test(this.tel)) {
        Toast('手机号格式错误')
        return
      }
      if (!this.code.trim()) {
        Toast('请填写验证码')
        return
      }
        const params ={
            userId: this.$store.state.user.userInfo.user_id,
            password: md5(this.password),
            phonenum: this.tel,
            smsCode: this.code
        }
        this.changeLoading = true
        modifyUserPhone(params).then(() =>{
            this.changeLoading = false
            this.changeSuccess = true
        }).catch(() =>{
            this.changeLoading = false
        })
    },
    toSetting(){
        this.$router.replace('/me/setting')
    }
  }
}
</script>

    <style
      lang="less"
      scoped
    >
.inputBox {
  .title {
    font-size: 16px;
    color: #333333;
    padding: 20px 16px;
    border-bottom: 1px solid #eeeeee;
  }
  .loading {
    color: #757c85;
  }
  .ready {
    color: #1989fa;
  }
  .btn {
    padding: 20px 16px;
    width: calc(100% - 32px);
  }
}
.rejectPopup {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  padding-top: 200px;
  align-items: center;
  z-index: 100;
  .title {
    font-size: 18px;
    color: #202940;
    margin-top: 20px;
  }
  .word {
    font-size: 14px;
    color: #0e001c;
    line-height: 25px;
  }
  .resolveIcon {
    color: #1677ff;
    font-size: 89px;
  }
  .rejectIcon {
    font-size: 89px;
    color: #757c85;
  }
}
.joinBtn {
  position: fixed;
  bottom: 0;
  margin-top: 20px;
  padding: 16px;
  width: calc(100% - 32px);
  background-color: #fff;
  /deep/ .van-button {
    border-radius: 5px;
  }
}
</style>
