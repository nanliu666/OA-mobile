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
}
