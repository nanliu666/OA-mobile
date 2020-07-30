<template>
  <div class="page">
    <stickyHeader title="个人信息" />
    <div>
      <van-form
        ref="basicForm"
        input-align="right"
        :show-error-message="false"
      >
        <van-field
          name="avatarUrl"
          label="头像"
        >
          <template #input>
            <van-uploader
              :max-count="1"
              preview-size="20"
              :deletable="false"
              :after-read="uploaderRead"
            >
              <van-image
                round
                class="avatarClass"
                :src="form.avatarUrl"
              />
            </van-uploader>
          </template>
        </van-field>
        <van-field
          v-model.trim="form.name"
          name="name"
          label="姓名"
          placeholder="请输入姓名"
          :rules="rules.name"
          required
        />
        <van-field-select-picker
          v-model="form.sex"
          name="sex"
          label="性别"
          placeholder="请选择性别"
          :columns="sexColumns"
          column-label="label"
          column-value="value"
        />
        <van-field
          v-model="form.phonenum"
          name="phonenum"
          type="tel"
          label="手机号码"
          readonly
          :rules="rules.phonenum"
          required
        />
        <van-field
          v-model="form.userEmail"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          :rules="rules.email"
        />
        <van-field
          v-model="form.userAddress"
          name="userAddress"
          label="现住址"
          placeholder="请输入现住址"
        />
        <van-field
          v-model.trim="form.address"
          name="address"
          label="详细地址"
          placeholder="请输入详细地址"
        />
        <van-field
          v-model.trim="form.bankNo"
          name="bankNo"
          type="digit"
          label="银行卡号"
          placeholder="请输入银行卡号"
        />
        <van-field
          v-model.trim="form.bankName"
          name="bankName"
          label="开户行"
          placeholder="请输入开户行"
        />
        <div class="contain">
          <van-field
            label="紧急联系人"
            label-width="300"
            style="border-bottom: 0"
            readonly
            required
          />
          <van-form
            ref="emerForm"
            input-align="right"
            :show-error-message="false"
            label-width="120"
          >
            <template v-for="(item, index) in emerForm">
              <div
                :key="index"
                class="cellBox"
              >
                <van-field
                  v-model.trim="emerForm[index].name"
                  :name="'emerFormName' + index"
                  label="紧急联系人姓名"
                  placeholder="请输入紧急联系人姓名"
                  :rules="rules.name"
                  required
                />
                <van-field-select-picker
                  v-model="emerForm[index].relationship"
                  name="relationship"
                  label="紧急联系人关系"
                  column-label="dictValue"
                  column-value="dictKey"
                  placeholder="请选择紧急联系人关系"
                  :columns="relationshipColumns"
                />
                <van-field
                  v-model.trim="emerForm[index].phone"
                  :name="'emerFormPhone' + index"
                  placeholder="请输入紧急联系人电话"
                  type="tel"
                  maxlength="11"
                  label="紧急联系人电话"
                  :rules="rules.phonenum"
                  required
                />
                <van-button
                  type="default"
                  size="large"
                  @click="deleteEmerItem(index)"
                >
                  <div class="addBtn">
                    <van-icon name="delete" />删除该条
                  </div>
                </van-button>
              </div>
            </template>

            <van-button
              type="default"
              size="large"
              @click="addEmerItem"
            >
              <div class="addBtn">
                <van-icon name="plus" />添加紧急联系人
              </div>
            </van-button>
          </van-form>
        </div>
        <van-field
          v-model="form.workNo"
          class="contain"
          label="工号"
          readonly
        />
        <van-field
          v-model="form.orgName"
          label="部门"
          readonly
        />
        <van-field
          v-model="form.orgName"
          label="职位"
          readonly
        />
        <van-field
          v-model="form.positionName"
          label="岗位"
          readonly
        />
        <van-field
          v-model="form.companyName"
          label="公司名称"
          readonly
        />
        <van-field
          v-model="form.email"
          label="公司邮箱"
          readonly
        />
      </van-form>
    </div>
    <div class="nextBox">
      <van-button
        :loading="loading"
        round
        block
        type="info"
        @click="toNext"
      >
        保存
      </van-button>
    </div>
  </div>
</template>
<script>
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import VanFieldSelectPicker from '@/components/vanFieldSelectPicker/vanFieldSelectPicker'
// import VanFieldArea from '@/components/vanFieldArea/vanFieldArea'
import { uploadQiniu } from '@/util/uploadQiniu'
import { getFormDifferent } from '@/util/util'
import { Toast, Dialog } from 'vant'
import {
  getUserInfo,
  modifyUserInfo,
  getUserEmerInfo,
  modifyUserEmerInfo,
  deleteUserEmerInfo,
  createUserEmerInfo
} from '@/api/user'
// import Json from 'archiver/lib/plugins/json'

export default {
  components: {
    StickyHeader,
    VanFieldSelectPicker
    // VanFieldArea
  },
  data() {
    return {
      sexColumns: [
        { label: '男', value: 1 },
        { label: '女', value: 0 }
      ],
      form: {},
      oldEmerForm: [],
      emerForm: [],
      rules: {
        name: [{ required: true, message: '请填写姓名' }],
        phonenum: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[0-9]{10}$/, message: '手机号不正确' }
        ],
        email: [
          {
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '邮箱格式不正确'
          }
        ],
        birthDate: [{ required: true, message: '请选择出生日期' }],
        educationalLevel: [{ required: true, message: '请选择最高学历' }],
        isFirstSs: [{ required: true, message: '请选择是否本地首次缴纳社保' }],
        isFirstEpf: [{ required: true, message: '请选择是否本地首次缴纳公积金' }]
      },
      relationshipColumns: [],
      loading: false
    }
  },
  created() {
    this.getUserInfo()
    this.$store.dispatch('CommonDict', 'UserRelationship').then((res) => {
      this.relationshipColumns = res
    })
  },
  methods: {
    uploaderRead(file) {
      let that = this
      uploadQiniu(file.file, {
        error() {
          Toast('头像上传失败')
        },
        complete(data) {
          that.form.avatarUrl = data.url
          Toast('头像上传成功')
        }
      })
    },
    getUserInfo() {
      getUserInfo({ userId: this.$store.state.user.userInfo.user_id }).then((res) => {
        res.provinceCode = [
          { code: res.provinceCode, name: res.provinceName },
          { code: res.cityCode, name: res.cityName },
          { code: res.countyCode, name: res.countyName }
        ]
        this.form = res
      })
      getUserEmerInfo({ userId: this.$store.state.user.userInfo.user_id }).then((res) => {
        this.oldEmerForm = JSON.parse(JSON.stringify(res))
        this.emerForm = JSON.parse(JSON.stringify(res))
      })
    },
    deleteEmerItem(index) {
      Dialog.confirm({
        title: '确定删除',
        message: '确定要删除该紧急联系人吗？'
      }).then(() => {
        this.emerForm.splice(index, 1)
        setTimeout(() => {
          this.$refs.emerForm.resetValidation()
        }, 0)
      })
    },
    addEmerItem() {
      this.emerForm.push({ name: '', phone: '', relationship: '' })
      setTimeout(() => {
        this.$refs.emerForm.resetValidation()
      }, 0)
    },
    postEmerInfo(item) {
      let fun
      let params
      if (item.operatorType === 'Add') {
        fun = createUserEmerInfo
        params = {
          userId: this.$store.state.user.userInfo.user_id,
          ...item
        }
      } else if (item.operatorType === 'Update') {
        fun = modifyUserEmerInfo
        params = {
          userId: this.$store.state.user.userInfo.user_id,
          ...item
        }
      } else if (item.operatorType === 'Del') {
        fun = deleteUserEmerInfo
        params = {
          ids: item.id
        }
      }
      fun(params)
    },
    formValidate(formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName]
          .validate()
          .then(() => {
            resolve()
          })
          .catch((error) => {
            Toast(error[0].message)
            this.$refs[formName].scrollToField(error[0].name, { alignToTop: true })
            window.scrollBy(0, -((46 / 667) * window.screen.height))
            reject()
          })
      })
    },
    async toNext() {
      Promise.all([this.formValidate('basicForm'), this.formValidate('emerForm')]).then(() => {
        this.loading = true
        let emer = [...this.emerForm]
        let emerTypeForm = getFormDifferent(emer, this.oldEmerForm)
        emerTypeForm.forEach((item) => {
          this.postEmerInfo(item)
        })
        let basicForm = { ...this.form }
        if (basicForm.provinceCode.length > 0) {
          basicForm.countyName = basicForm.provinceCode[2].name
          basicForm.countyCode = basicForm.provinceCode[2].code
          basicForm.cityName = basicForm.provinceCode[1].name
          basicForm.cityCode = basicForm.provinceCode[1].code
          basicForm.provinceName = basicForm.provinceCode[0].name
          basicForm.provinceCode = basicForm.provinceCode[0].code
        }
        modifyUserInfo(basicForm).then(() => {
          Toast('修改成功')
          this.loading = false
          setTimeout(() => {
            this.$router.go(-1)
          }, 300)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.contain {
  margin-top: 8px;
  border-top: 1px solid #ebedf0;
}
.page {
  background-color: #f5f6f6;
}
/deep/ .van-uploader__input-wrapper {
  height: 20px;
}
.avatarClass {
  width: 20px;
  height: 20px;
  /deep/ .van-image__loading-icon {
    font-size: 14px;
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
.nextBox {
  margin: 16px auto 0px;
  /deep/ .van-button {
    border-radius: 5px;
  }
}
.cellBox {
  margin-bottom: 8px;
}
</style>
