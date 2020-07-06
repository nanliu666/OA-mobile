<template>
  <div>
    <stickyHeader
      :title="step === 0 ? '手机号码': '新密码'"
      @leftClick="handleBack"
    />
    <template v-if="step === 0">
      <div class="inputBox">
        <div class="title">
          手机号码
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
          新密码
        </div>
        <van-field
          v-model="newPassword"
          placeholder="请输入新密码"
          type="password"
        />
        <van-field
          v-model="checkPassword"
          placeholder="请输入确认密码"
          type="password"
        />
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
          密码修改成功
        </div>
        <div class="joinBtn">
          <van-button
            round
            block
            type="info"
            @click="toLogin"
          >
            返回登录
          </van-button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import { sendSms, checkPhoneSms,changePassword } from '@/api/user'
import { Toast } from 'vant'
import md5 from 'js-md5'

export default {
  name:'Forget',
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
      userInfo: {},
      newPassword: '',
      checkPassword: '',
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
      if (!/^1[0-9]{10}$/.test(this.tel)) {
        Toast('手机号格式错误')
        return
      }
      if (!this.code.trim()) {
        Toast('请填写验证码')
        return
      }
      const params = {
        phonenum: this.tel,
        smsCode: this.code
      }
      this.checkLoading = true
      checkPhoneSms(params)
        .then((res) => {
          this.userInfo = res
          this.step = 1
          this.checkLoading = false
        })
        .catch(() => {
          this.checkLoading = false
        })
    },
    handelConfirm(){
        if(!this.newPassword.trim() || !this.checkPassword.trim()){
            Toast('密码不能为空')
            return
        }
        if(this.newPassword !== this.checkPassword){
            Toast('两次密码不一致')
            return
        }
        const params ={
            userId: this.userInfo.userId,
            newPassword: md5(this.newPassword),
            phonenum: this.tel,
            smsCode: this.code
        }
        this.changeLoading = true
        changePassword(params).then(() =>{
            this.changeLoading = false
            this.changeSuccess = true
        }).catch(() =>{
            this.changeLoading = false
        })
    },
    toLogin(){
        this.$router.replace('/login')
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
