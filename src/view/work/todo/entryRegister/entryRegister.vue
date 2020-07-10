<template>
  <div class="page">
    <stickyHeader :title="`${infoData.name}的入职登记表`">
      <template #footer>
        <van-tabs v-model="active">
          <van-tab
            v-for="(item, index) in tabList"
            :key="index"
            :title="item.title"
            :name="item.name"
          />
        </van-tabs>
      </template>
    </stickyHeader>
    <div class="main-box">
      <!-- 基本信息区 -->
      <div v-show="active == 'info'">
        <!-- 基本信息 -->
        <div class="detail-box">
          <div class="title">
            基本信息
          </div>
          <div class="content">
            <infoShow :columns="infoColumns">
              <!-- 性别 -->
              <template #sex>
                {{ infoData.sex ? (infoData.sex == 1 ? '男' : '女') : '' }}
              </template>

              <!-- 婚姻状态 -->
              <template #marriage>
                {{ infoData.marriage ? (infoData.marriage == 1 ? '已婚' : '未婚') : '' }}
              </template>
              <!-- 证件类型 -->
              <template #idType>
                {{ infoData.idType | CommonDictType(IDType) }}
              </template>
              <!-- 最高i学历 -->
              <template #educationalLevel>
                {{ infoData.educationalLevel | CommonDictType(EducationalLevel) }}
              </template>
              <!-- 政治面貌 -->
              <template #politicalStatus>
                {{ infoData.politicalStatus | CommonDictType(PoliticalStatus) }}
              </template>
              <!-- 民族 -->
              <template #nation>
                {{ infoData.nation | CommonDictType(Nation) }}
              </template>
              <!-- 民族 -->
              <template #householdType>
                {{ infoData.householdType | CommonDictType(HouseholdType) }}
              </template>
            </infoShow>
          </div>
        </div>
        <!-- 工作银行卡 -->
        <div class="detail-box">
          <div class="title">
            工作银行卡
          </div>
          <div class="content">
            <infoShow :columns="cartColumnArr" />
          </div>
        </div>
        <!-- 社保公积金 -->
        <div class="detail-box">
          <div class="title">
            社保公积金
          </div>
          <div class="content">
            <infoShow :columns="SsEpfColumnArr">
              <template #isFirstSs>
                {{ infoData.isFirstSs ? (infoData.isFirstSs == 1 ? '是' : '否') : '' }}
              </template>
              <template #isFirstEpf>
                {{ infoData.isFirstEpf ? (infoData.isFirstEpf == 1 ? '是' : '否') : '' }}
              </template>
            </infoShow>
          </div>
        </div>
        <!-- 紧急联系人 -->
        <div class="detail-box">
          <div class="title">
            紧急联系人
          </div>
          <div
            v-for="(item, index) in emerColumnArr"
            :key="index"
            class="content"
          >
            <infoShow :columns="item">
              <!-- 紧急联系人关系 -->
              <template #relationship>
                {{ item[1].value | CommonDictType(UserRelationship) }}
              </template>
            </infoShow>
          </div>
        </div>

        <!-- 家庭信息 -->
        <div class="detail-box">
          <div class="title">
            家庭信息
          </div>
          <div
            v-for="(item, index) in familyColumnArr"
            :key="index"
            class="content"
          >
            <infoShow :columns="item">
              <!-- 关系 -->
              <template #relationship>
                {{ item[1].value | CommonDictType(UserRelationship) }}
              </template>
            </infoShow>
          </div>
        </div>
      </div>
      <!-- 个人经历区 -->
      <div v-show="active == 'experience'">
        <!-- 教育经历 -->
        <div class="detail-box">
          <div class="title">
            教育经历
          </div>
          <div
            v-for="(item, index) in educationColumnArr"
            :key="index"
            class="content"
          >
            <infoShow :columns="item">
              <!-- 受教育时间 -->
              <template #educationTime>
                {{ `${item[0].value[0]} 至 ${item[0].value[1]}` }}
              </template>
              <!-- 学历 -->
              <template #educationalLevel>
                {{ item[1].value | CommonDictType(EducationalLevel) }}
              </template>
              <!-- 教育类型 -->
              <template #educationalType>
                {{ item[2].value | CommonDictType(EducationalType) }}
              </template>
            </infoShow>
          </div>
        </div>
        <!-- 工作经历 -->
        <div class="detail-box">
          <div class="title">
            工作经历
          </div>
          <div
            v-for="(item, index) in workColumnArr"
            :key="index"
            class="content"
          >
            <infoShow :columns="item">
              <!-- 在职时间 -->
              <template #workTime>
                {{ `${item[0].value[0]} 至 ${item[0].value[1]}` }}
              </template>
              <!-- 有无守密义务或竞业禁止义务 -->
              <template #isSecret>
                {{ item[6].value ? (item[6].value == 1 ? '有' : '无') : '' }}
              </template>
              <!-- 遵守义务时间 -->
              <template #secretTime>
                {{ `${item[7].value[0]} 至 ${item[0].value[1]}` }}
              </template>
            </infoShow>
          </div>
        </div>
        <!-- 培训经历 -->
        <div class="detail-box">
          <div class="title">
            培训经历
          </div>
          <div
            v-for="(item, index) in trainColumnArr"
            :key="index"
            class="content"
          >
            <infoShow :columns="item">
              <!-- 培训时间 -->
              <template #trainTime>
                {{ `${item[0].value[0]} 至 ${item[0].value[1]}` }}
              </template>
            </infoShow>
          </div>
        </div>
        <!-- 资格证书 -->
        <div class="detail-box">
          <div class="title">
            资格证书
          </div>
          <div
            v-for="(item, index) in certificateColumnArr"
            :key="index"
            class="content"
          >
            <infoShow :columns="item" />
          </div>
        </div>
      </div>
      <!-- 材料附件 -->
      <div v-show="active == 'accessories'">
        <div class="detail-box">
          <div class="title">
            附件材料
          </div>
          <div
            v-for="(item, index) in infoData.attachment"
            :key="index"
            class="content accessories"
          >
            <div class="text">
              {{ item.name }}
            </div>
            <div
              class="img-box"
              @click="lookImg(item.url)"
            >
              <img
                :src="item.url"
                alt=""
              >
            </div>
          </div>
        </div>
      </div>

      <div class="btn">
        <van-button
          block
          type="info"
        >
          请在web端处理该待办
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import StickyHeader from '@/components/stickyHeader/stickyHeader'
import infoShow from '@/components/infoShow/infoShow'
import { getpersonInfo } from '@/api/todo'
export default {
  name: 'EntryRegister',
  components: {
    StickyHeader,
    infoShow
  },
  filters: {
    // CommonDictarr字典组数组
    CommonDictType: (value, CommonDictarr) => {
      if (!value) return ''
      let result = ''
      CommonDictarr.forEach((item) => {
        if (item.dictKey == value.trim()) {
          result = item.dictValue
          return
        }
      })

      return result
    }
  },
  data() {
    return {
      // query
      personId: '',
      tabList: [
        {
          title: '基本信息',
          name: 'info'
        },
        {
          title: '个人经历',
          name: 'experience'
        },
        {
          title: '附件材料',
          name: 'accessories'
        }
      ],
      active: 'info',
      infoData: {},
      // 基本信息配置
      infoColumns: [
        { label: '姓名', value: '', prop: 'name' },
        { label: '性别', value: '', prop: 'sex', slot: true },
        { label: '手机号码', value: '', prop: 'phonenum' },
        { label: '邮箱', value: '', prop: 'email' },
        { label: '证件类型', value: '', prop: 'idType', slot: true },
        { label: '证件号码', value: '', prop: 'idNo' },
        { label: '出生日期', value: '', prop: 'birthDate' },
        // { label: '年龄', value: '', prop: 'age' },
        { label: '最高学历', value: '', prop: 'educationalLevel', slot: true },
        { label: '首次参加工作时间', value: '', prop: 'firstWorkDate' },
        { label: '婚姻状况', value: '', prop: 'marriage', slot: true },
        { label: '健康状况', value: '', prop: 'health' },
        { label: '民族', value: '', prop: 'nation', slot: true },
        { label: '政治面貌', value: '', prop: 'politicalStatus', slot: true },
        { label: '籍贯', value: '', prop: 'name' },
        { label: '户籍类型', value: '', prop: 'householdType', slot: true },
        { label: '身份证地址', value: '', prop: 'idAddress' },
        { label: '现住址', value: '', prop: 'userAddress' }
      ],
      // 工作银行卡
      cartColumnArr: [
        { label: '银行卡号', value: '', prop: 'bankName' },
        { label: '开户行', value: '', prop: 'bankNo' }
      ],
      // 社保公积金
      SsEpfColumnArr: [
        { label: '是否本地首次缴纳社保', value: '', prop: 'isFirstSs', slot: true },
        { label: '个人社保账号', value: '', prop: 'ssNo' },
        { label: '是否本地首次缴纳公积金', value: '', prop: 'isFirstEpf', slot: true },
        { label: '个人公积金账号', value: '', prop: 'epfNo' }
      ],
      // 紧急联系人配置
      emerColumnArr: [],
      // 家庭信息配置
      familyColumnArr: [],
      // 教育经历
      educationColumnArr: [],
      // 工作经历
      workColumnArr: [],
      // 培训经历
      trainColumnArr: [],
      // 资格证书
      certificateColumnArr: [],

      // 字典组
      IDType: [],
      EducationalLevel: [],
      Nation: [],
      PoliticalStatus: [],
      HouseholdType: [],
      EducationalType: [],
      ChangeReason: [],
      UserRelationship: []
    }
  },
  created() {
    this.loading()
    this.getCommonDict()
  },
  methods: {
    loading() {
      this.personId = this.$route.query.bizId
      getpersonInfo({ personId: this.personId }).then((res) => {
        this.infoData = res
        // 基本信息
        this.infoColumns.forEach((item) => {
          item.value = res[item.prop]
        })
        // 工作银行卡
        this.cartColumnArr.forEach((item) => {
          item.value = res[item.prop]
        })
        // 社保公积金
        this.SsEpfColumnArr.forEach((item) => {
          item.value = res[item.prop]
        })
        //紧急联系人
        res.emer.forEach((item) => {
          let arr = [
            { label: '紧急联系人姓名', value: item.name, prop: 'name' },
            { label: '紧急联系人关系', value: item.relationship, prop: 'relationship', slot: true },
            { label: '紧急联系人电话', value: item.phone, prop: 'phone' }
          ]
          this.emerColumnArr.push(arr)
        })
        // 家庭信息
        res.family.forEach((item) => {
          let arr = [
            { label: '姓名', value: item.name, prop: 'name' },
            { label: '关系', value: item.relationship, prop: 'relationship', slot: true },
            { label: '年龄', value: item.age, prop: 'age' },
            { label: '工作单位', value: item.companyName, prop: 'companyName' },
            { label: '职位', value: item.jobName, prop: 'jobName' },
            { label: '联系电话', value: item.phone, prop: 'phone' }
          ]
          this.familyColumnArr.push(arr)
        })
        // 教育经历
        res.education.forEach((item) => {
          let arr = [
            {
              label: '受教育时间',
              value: [item.beginDate, item.endDate],
              prop: 'educationTime',
              slot: true
            },
            { label: '学历', value: item.educationalLevel, prop: 'educationalLevel', slot: true },
            { label: '教育类型', value: item.educationalType, prop: 'educationalType', slot: true },
            { label: '学校名称', value: item.schoolName, prop: 'schoolName' },
            { label: '专业', value: item.majorName, prop: 'majorName' }
          ]
          this.educationColumnArr.push(arr)
        })
        // 工作经历
        res.work.forEach((item) => {
          let arr = [
            {
              label: '在职时间',
              value: [item.beginWorkDate, item.endWorkDate],
              prop: 'workTime',
              slot: true
            },
            { label: '单位名称', value: item.companyName, prop: 'companyName' },
            { label: '职位名称', value: item.jobName, prop: 'jobName' },
            { label: '离职薪资', value: item.salary, prop: 'salary' },
            { label: '证明人', value: item.witnessName, prop: 'witnessName' },
            { label: '证明人联系电话', value: item.witnessPhone, prop: 'witnessPhone' },
            {
              label: '有无守密义务或竞业禁止义务',
              value: item.isSecret,
              prop: 'isSecret',
              slot: true
            },
            {
              label: '遵守义务时间',
              value: [item.beginSecretDate, item.endSecretDate],
              prop: 'secretTime',
              slot: true
            },
            { label: '具体内容', value: item.content, prop: 'content' }
          ]
          this.workColumnArr.push(arr)
        })
        // 培训经历
        res.train.forEach((item) => {
          let arr = [
            {
              label: '培训时间',
              value: [item.beginDate, item.endDate],
              prop: 'trainTime',
              slot: true
            },
            { label: '培训课程', value: item.companyName, prop: 'companyName' },
            { label: '培训机构', value: item.companyName, prop: 'companyName' }
          ]
          this.trainColumnArr.push(arr)
        })
        // 资格证书
        res.certificate.forEach((item) => {
          let arr = [
            { label: '证书名称', value: item.name, prop: 'name' },
            { label: '证书编号', value: item.code, prop: 'code' },
            { label: '发证机构', value: item.companyName, prop: 'companyName' },
            { label: '发证日期', value: item.issueDate, prop: 'issueDate' }
          ]
          this.certificateColumnArr.push(arr)
        })
      })
    },
    // 获取相关字典组
    getCommonDict() {
      let commonDictNameArr = [
        'IDType',
        'EducationalLevel',
        'Nation',
        'PoliticalStatus',
        'HouseholdType',
        'EducationalType',
        'ChangeReason',
        'UserRelationship'
      ]
      commonDictNameArr.forEach((item) => {
        this.$store.dispatch('CommonDict', item).then((res) => {
          // this.workPropertyList = res
          // 将res =》 [{dictKey:"",dictValue:"",id:""},{dictKey:"",dictValue:"",id:""}]
          let targetArr = []
          res.forEach((el) => {
            targetArr.push({ dictKey: el.dictKey, dictValue: el.dictValue, id: el.id })
          })
          this[item] = targetArr
        })
      })
    },
    // 点击查看tup
    lookImg(url) {
      ImagePreview([url])
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-tabs__line {
  background-color: #207efa;
  width: 33.333333% !important;
}
/deep/.van-nav-bar__title {
  font-size: 17px;
  color: #000000;
  letter-spacing: 0;
  line-height: 24px;
  font-weight: bold;
}
/deep/.van-tab--active {
  color: #207efa;
}
.page {
  padding-bottom: 72px;
}
.detail-box {
  width: 100%;
  box-sizing: border-box;
  padding-left: 16px;
  padding-top: 20px;

  .title {
    margin-bottom: 8px;
    font-size: 17px;
    color: #000000;
    line-height: 25.5px;
    font-weight: bold;
  }
  .content {
    border-bottom: 1px solid #dddddd;
    padding: 10px 0;
  }
}
// 材料附件
.accessories {
  .text {
    color: #757c85;
    margin-bottom: 5px;
    font-size: 14px;
  }
}
.btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  padding: 16px;
  background-color: #fff;
}
</style>
