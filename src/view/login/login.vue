<template>
  <div class="contain">
    <van-image
      class="logo"
      round
      :src="logoSrc"
    >
      <template v-slot:error>
        加载失败
      </template>
    </van-image>
    <div class="inputBox">
      <van-field
        v-model="workNo"
        label="工号"
        placeholder="请输入工号"
      />
      <van-field
        v-model="password"
        placeholder="请输入密码"
        :type="passwordType"
        label="密码"
      >
        <template #right-icon>
          <i
            class="iconfont"
            :class="
              passwordType === 'password'
                ? 'icon-basics-eyeopen-outlined'
                : 'iconfont icon-basics-eyeblind-outlined'
            "
            style="line-height: inherit;"
            @click="switchPasswordType"
          />
        </template>
      </van-field>
      <van-field
        v-model="code"
        label="验证码"
        placeholder="请输入验证码"
      >
        <template #right-icon>
          <van-image
            class="captcha"
            :src="captchaImg"
            @click="refreshCaptcha"
          />
        </template>
      </van-field>
    </div>
    <div class="btn">
      <van-button
        :loading="loading"
        type="info"
        block
        @click="handleLogin"
      >
        登录
      </van-button>
      <div
        class="forget"
        @click="handleForget"
      >
        忘记密码
      </div>
    </div>
  </div>
</template>
<script>
import { getTenantId } from '@/api/common'
import { getOauthCaptcha, userLogin } from '@/api/user'
import { Toast } from 'vant'
import md5 from 'js-md5'
import logoSrc from '@/assets/images/login/logo.png'
export default {
  name: 'Login',
  data() {
    return {
      workNo: '',
      logoSrc,
      password: '',
      code: '',
      passwordType: 'password', //输入框类型
      loading: false,
      captchaImg: '',
      captchaKey: ''
    }
  },
  created() {
    const isProduction = process.env.NODE_ENV === 'production'
    const domain = isProduction ? window.location.host : 'www.bestgrand.com.cn'
    getTenantId({ domain }).then((res) => {
      this.$store.commit('SET_TENANRID', res.tenantId)
    })
  },
  destroyed() {
    // 销毁enter事件
    document.removeEventListener('keyup', this.enterKey)
  },
  mounted() {
    this.getOauthCaptcha()
    document.addEventListener('keyup', this.enterKey)
  },
  methods: {
    enterKey(event) {
      const code = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode
      if (code == 13) {
        this.handleLogin()
      }
    },
    handleForget() {
      this.$router.push('/forget')
    },
    refreshCaptcha() {
      this.getOauthCaptcha()
    },
    switchPasswordType() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    getOauthCaptcha() {
      getOauthCaptcha().then((res) => {
        this.captchaImg = res.image
        this.captchaKey = res.key
      })
    },
    handleLogin() {
      if (!this.workNo.trim()) {
        Toast('工号不能为空')
        return
      }
      if (!this.password.trim()) {
        Toast('密码不能为空')
        return
      }
      if (!this.code.trim()) {
        Toast('验证码不能为空')
        return
      }
      const params = {
        tenantId: this.$store.state.user.userInfo.tenantId,
        username: this.workNo,
        password: md5(this.password),
        type: 'account',
        grant_type: 'captcha',
        scope: 'all',
        code: this.code,
        key: this.captchaKey,
        user_type: 'staff'
      }
      this.loading = true
      userLogin(params)
        .then((res) => {
          this.$store.commit('SET_USER_INFO', res)
          this.loading = false
          this.$router.replace('/work/index')
        })
        .catch(() => {
          this.loading = false
          this.getOauthCaptcha()
        })
    }
  }
}
</script>

<style lang="less" scoped>
.contain {
  padding-top: 74px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    width: 120px;
    height: 120px;
  }
  .inputBox {
    border-top: 1px solid #eeeeee;
    margin-top: 40px;
  }
  .btn {
    margin-top: 30px;
    padding: 0 16px;
    width: calc(100% - 32px);
    .van-button {
      border-radius: 4px;
    }
    .forget {
      text-align: center;
      font-size: 15px;
      margin-top: 20px;
      color: #333333;
    }
  }
}

/deep/.van-field__right-icon {
  height: 32px;
}
.van-cell {
  height: 48px;
  font-size: 17px;
}
.captcha {
  height: 32px;
  width: 77px;
}
</style>
