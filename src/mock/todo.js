import Mock from 'mockjs'
const info = {
  ...normalData,
  response: {
    personId: '人员ID',
    name: '真实姓名',
    phonenum: '手机号',
    sex: 1,
    email: '个人邮箱',
    idType: 'IDCard',
    idNo: '证件号码',
    birthDate: '2020-07-16',
    educationalLevel: 'High',
    firstWorkDate: '2020-07-15',
    marriage: 1,
    health: '健康状态',
    nation: 'Han',
    politicalStatus: 'Ordinary',
    nativeProvinceCode: '440000',
    nativeProvinceName: '广东省',
    nativeCityCode: '440100',
    nativeCityName: '广州市',
    householdType: 'Urban',
    idAddress: '身份证地址',
    userAddress: '现住址',
    bankName: '开户银行名称',
    bankNo: '开户银行账号',
    isFirstSs: 1,
    ssNo: '个人社保号',
    isFirstEpf: 1,
    epfNo: '个人公积金账号',
    emer: [
      {
        id: '紧急联系人ID',
        name: '紧急联系人姓名',
        phone: '紧急联系人电话',
        relationship: 'Friend'
      },
      {
        id: '紧急联系人ID',
        name: '紧急联系人姓名',
        phone: '紧急联系人电话',
        relationship: 'Friend'
      },
      {
        id: '紧急联系人ID',
        name: '紧急联系人姓名',
        phone: '紧急联系人电话',
        relationship: 'Friend'
      }
    ],
    family: [
      {
        id: '家庭信息ID',
        name: '姓名',
        phone: '联系电话',
        relationship: 'Parent',
        age: '年龄',
        companyName: '工作单位',
        jobName: '职位'
      },
      {
        id: '家庭信息ID',
        name: '姓名',
        phone: '联系电话',
        relationship: 'Parent',
        age: '年龄',
        companyName: '工作单位',
        jobName: '职位'
      }
    ],
    education: [
      {
        id: '教育经历ID',
        beginDate: '2020-07-15',
        endDate: '2020-08-15',
        educationalLevel: 'High',
        educationalType: 'Self',
        schoolName: '学校名称',
        majorName: '专业名称'
      },
      {
        id: '教育经历ID',
        beginDate: '2020-07-15',
        endDate: '2020-08-15',
        educationalLevel: 'High',
        educationalType: 'Self',
        schoolName: '学校名称',
        majorName: '专业名称'
      }
    ],
    work: [
      {
        id: '工作经历ID',
        beginWorkDate: '2018-07-15',
        endWorkDate: '2020-07-15',
        companyName: '在职单位名称',
        jobName: '职位名称',
        salary: '15000',
        witnessName: '证明人名称',
        witnessPhone: '证明人电话',
        isSecret: '1',
        beginSecretDate: '遵守义务开始日期',
        endSecretDate: '遵守义务截止日期',
        content: '具体内容'
      },
      {
        id: '工作经历ID',
        beginWorkDate: '2018-07-15',
        endWorkDate: '2020-07-15',
        companyName: '在职单位名称',
        jobName: '职位名称',
        salary: '15000',
        witnessName: '证明人名称',
        witnessPhone: '证明人电话',
        isSecret: '1',
        beginSecretDate: '遵守义务开始日期',
        endSecretDate: '遵守义务截止日期',
        content: '具体内容'
      }
    ],
    train: [
      {
        id: '培训经历ID',
        beginDate: '2018-07-15',
        endDate: '2020-07-15',
        name: '培训课程名称',
        companyName: '培训机构名称'
      },
      {
        id: '培训经历ID',
        beginDate: '2018-07-15',
        endDate: '2020-07-15',
        name: '培训课程名称',
        companyName: '培训机构名称'
      }
    ],
    certificate: [
      {
        id: '资格证书ID',
        name: '证书名称',
        code: '证书编号',
        companyName: '发证机构名称',
        issueDate: '2018-07-15'
      },
      {
        id: '资格证书ID',
        name: '证书名称',
        code: '证书编号',
        companyName: '发证机构名称',
        issueDate: '2018-07-15'
      }
    ],
    attachment: [
      {
        id: '附件ID',
        categoryId: '附件分类ID',
        name: '身份证',
        url: `https://s1.ax1x.com/2020/07/09/Umdx4P.jpg`
      },
      {
        id: '附件ID',
        categoryId: '附件分类ID',
        name: '身份证',
        url: `https://s1.ax1x.com/2020/07/09/Umdx4P.jpg`
      }
    ]
  }
}
const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}
export default ({ mock }) => {
  if (!mock) return

  Mock.mock(new RegExp('/user/v1/recruitment/task' + '.*'), 'get', () => {
    let data = []
    for (let i = 0; i < 4; i++) {
      data.push(
        Mock.mock({
          id: '@integer(1000000, 1000000000)',
          userId: '@integer(1000000, 1000000000)',
          workNo: '@integer(1000000, 1000000000)',
          name: '@cname',
          taskNum: '@integer(100, 100)',
          entryNum: '@integer(1, 50)',
          candidateNum: '@integer(2, 50)'
        })
      )
    }
    return {
      response: data
    }
  })

  // 人员信息
  Mock.mock(new RegExp('/helper/v1/person/info' + '.*'), 'get', () => {
    return info
  })
  // 员工离职交接事项
  Mock.mock(new RegExp('/user/v1/user/leave/note' + '.*'), 'get', () => {
    let arr = [
      {
        userId: '3211',
        userName: '张三',
        createTime: '2009-08-08 04:18:37',
        status: 'UnConfirm',
        isUrge: 1,
        urgeTime: '2009-08-08 04:18:37',
        data: [
          {
            categoryId: '4645646',
            categoryName: '办公物品回收',
            details: [
              {
                detailId: '2313213',
                detailName: '计算机查验'
              },
              {
                detailId: '231321465643',
                detailName: '计算机查验'
              }
            ]
          },
          {
            categoryId: '46546',
            categoryName: '办公物品回收',
            details: [
              {
                detailId: '645646',
                detailName: '计算机查验'
              },
              {
                detailId: '6445645646',
                detailName: '计算机查验'
              }
            ]
          }
        ]
      }
    ]
    return {
      response: arr
    }
  })
  // 员工离职交接事项确认
  Mock.mock(new RegExp('/user/v1/user/leave/note/confirm' + '.*'), 'post', () => {
    return {
      response: '确认成功'
    }
  })
  // 员工离职交接事项确认
  Mock.mock(new RegExp('/user/v1/user/leave/note/urge' + '.*'), 'post', () => {
    return {
      response: '催办成功'
    }
  })
  //待入职人员详情
  Mock.mock(new RegExp('/api/user/v1/candidate/accept/detail' + '.*'), 'get', () => {
    return {
      response: {
        personId: '人员ID',
        name: '真实姓名',
        phonenum: '手机号',
        sex: '1',
        age: '年龄',
        email: '个人邮箱',
        provinceCode: '	目前所在省份编码',
        proviceName: '目前所在省份名称',
        cityCode: '目前所在地市编码	',
        cityName: '目前所在地市名称	',
        educationalLevel: 'High',
        university: '毕业学校',
        major: '	毕业专业',
        workAge: '工作年限',
        lastCompany: '最新工作单位',
        recruitment: '招聘渠道',
        monthSalary: '期望月薪，单位：元',
        resumeUrl: '简历URL',
        attachmentUrl: '附件URL',
        attachmentName: '附件名称',
        remark: '备注',
        recruitmentId: '招聘需求ID',
        register: '1',
        entryDate: '2008-07-16',
        orgId: '用人部门ID',
        orgName: '用人部门名称	',
        jobId: '职位ID	',
        jobName: '职位名称',
        positionId: '岗位ID',
        positionName: '岗位名称',
        workProperty: 'FullTime',
        applyId: '录用申请ID',
        status: '7'
      }
    }
  })
  //员工离职信息查询数据
  Mock.mock(new RegExp('/api/user/v1/user/leave/info' + '.*'), 'get', () => {
    let response = Mock.mock({
      id: '4654132165',
      lastDate: '@date("")',
      applyDate: '@date("")',
      leaveDate: '@date("")',
      reason: '家庭原因',
      remark: '家庭住址变更交通不便'
    })
    return {
      response: response
    }
  })
  // 员工基本信息查询
  Mock.mock(new RegExp('/user/v1/user/info' + '.*'), 'get', () => {
    let response = Mock.mock({
      userId: '20200426',
      name: '张三',
      sex: '1', //	性别，1：男；0：女
      email: 'zahngsan5@epro.com.cn',
      phonenum: '13456347890',
      idType: '身份证',
      idNo: '610144198802145643',
      birthDate: '1980-02-14',
      marriage: '1', //婚姻状态，1：已婚，0：未婚
      politicalStatus: '共产党员',
      firstWorkDate: '2014-06',
      householdType: '城镇户口',
      health: '健康',
      nation: '汉族',
      idAddress: '广东省深圳市龙岗区龙岗派出所',
      userAddress: '广东省深圳市龙岗区龙岗派出所12号',
      nativeProvinceName: '江苏',
      nativeProvinceCode: '',
      nativeCityName: '南京',
      nativeCityCode: 'nativeCityCode--02',
      'status|1': ['Leaved', 'WaitLeave'],
      orgName: 'UCD中心',
      jobName: '产品经理',
      leaderName: '程小刚',
      workNo: 'XA667',
      bankName: '建设银行',
      bankNo: '6228374768997669',
      isFirstSs: '1', //	是否本地首次缴纳社保，1：是，0：否
      ssNo: '897668999',
      isFirstEpf: '1', //是否本地首次缴纳公积金，1：是，0：否
      epfNo: '897668999',
      tags: [
        {
          tagId: 'qq',
          tagName: '正式PM；储备PM；正式PM；储备PM'
        }
      ],
      userRemark: '这是在职信息的备注',
      recruitment: 'BOSS直聘',
      workProvinceName: '陕西省',
      workProvinceCode: '610000',
      workCityCode: '610100',
      workCityName: '西安市',
      provinceCode: '610000',
      provinceName: '陕西省',
      cityName: '西安市',
      cityCode: '610100',
      countyCode: '610113',
      countyName: '雁塔区',
      address: 'xxx软件园', //工作的详细地址
      subOrg: [
        {
          subOrgId: '1257943561580855298',
          subOrgName: '1257943561580855298',
          subJobId: '1257966733176881154',
          subJobName: '财务'
        }
      ],
      positionName: '岗位名称',
      companyName: '入职公司',
      workProperty: '全职',
      probation: '3个月',
      formalDate: '2019-3-20',
      entryDate: '2018-12-20'
    })
    return {
      resCode: 200,
      resMsg: '',
      response: response
    }
  })
  // 录用申请详情查询
  Mock.mock(new RegExp('/user/v1/candidate/offer/apply' + '.*'), 'get', () => {
    let response = Mock.mock({
      id: '申请ID',
      personId: '人员ID',
      entryDate: '预计入职日期',
      probation: '试用期，单位：月',
      companyId: '入职公司ID',
      companyName: '入职公司名称',
      orgId: '主部门ID',
      orgName: '部门名称',
      jobId: '主职位ID',
      jobName: '职位名称',
      positionId: '岗位ID',
      positionName: '岗位名称',
      // workProperty: '工作性质，字典组：WorkProperty',
      workProperty: 'FullTime',
      workAddressId: '工作地址ID',
      provinceCode: '省份编码',
      provinceName: '	省份名称',
      cityCode: '	地市编码',
      cityName: '	地市名称',
      countyCode: '区县编码',
      countyName: '区县名称',
      address: '详细地址',
      workProvinceCode: '工作省份编码',
      workProviceName: '工作省份名称',
      workCityCode: '工作地市编码',
      workCityName: '工作地市名称',
      probationSalary: '试用期月薪，单位：元',
      formalSalary: '转正月薪，单位：元',
      // contractType: '合同类型，字典组：ContractType',
      contractType: 'FixedTerm',
      contractBeginDate: '合同开始日期',
      contractEndDate: '合同结束日期',
      contractPeriod: '合同期限，单位：年',
      isShbx: '是否缴纳社会保险，1-是，0-否',
      baseMoney: '社会保险基数，单位：元',
      // isYangl: '是否缴纳养老保险，1-是，0-否',
      // isYil: '是否缴纳医疗保险，1-是，0-否',
      // isGs: '是否缴纳工伤保险，1-是，0-否	',
      // isShiy: '是否缴纳失业保险，1-是，0-否',
      // isShengy: '是否缴纳生育保险，1-是，0-否',
      // isGjj: '是否缴纳住房公积金，1-是，0-否',
      isYangl: '1',
      isYil: '1',
      isGs: '1	',
      isShiy: '1',
      isShengy: '1',
      // isGjj: '是否缴纳住房公积金，1-是，0-否',
      isGjj: '1',

      officeSpace: '办公位安排',
      telphone: '电话配备',
      // isComputer: '是否电脑配备，1-是，0-否',
      isComputer: '0',
      other: '其他',
      isHouse: '0',
      // isHouse: '是否安排住房，1-是，0-否',
      houseStandard: '住房标准',
      remark: '备注',
      userId: '提交人ID',
      userName: '提交人姓名'
    })

    return {
      response
    }
  })
  // 待入职人员详情查询接口
  Mock.mock(new RegExp('/user/v1/candidate/accept/detail' + '.*'), 'get', () => {
    let response = Mock.mock({
      personId: '人员ID',
      name: '真实姓名',
      phonenum: '手机号',
      sex: 1,
      age: '年龄',
      email: '个人邮箱',
      provinceCode: '目前所在省份编码',
      proviceName: '目前所在省份名称',
      cityCode: '	目前所在地市编码',
      cityName: '目前所在地市名称',
      educationalLevel: '学历要求',
      university: '毕业学校',
      major: '毕业专业',
      workAge: '工作年限',
      lastCompany: '最新工作单位',
      recruitment: '招聘渠道',
      monthSalary: '期望月薪',
      resumeUrl: '简历URL',
      attachmentUrl: '附件URL',
      attachmentName: '附件名称',
      remark: '备注',
      recruitmentId: '招聘需求ID ',
      register: '入职登记表',
      entryDate: '入职日期',
      orgId: '用人部门ID',
      orgName: '用人部门名称',
      jobId: '职位ID',
      jobName: '职位名称',
      positionId: '岗位ID',
      positionName: '岗位名称',
      workProperty: '工作性质',
      applyId: '录用申请ID',
      status: '	候选人状态'
    })

    return {
      response
    }
  })
}
