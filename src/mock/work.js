/* eslint-disable no-console */
const moment = require('moment')
import Mock from 'mockjs'

export default ({ mock }) => {
  if (!mock) return

  Mock.mock(new RegExp('/user/v1/person/interview/info' + '.*'), 'post', () => {
    return {
      response: '提交OK'
    }
  })

  Mock.mock(new RegExp('/user/v1/person/interview/info' + '.*'), 'get', () => {
    let data = Mock.mock({
      id: '54654',
      pushUser: '4654645',
      pushName: '@cname',
      pushTime: '@date',
      status: 'Pass',
      interviewUser: '54654',
      interviewName: '@cname',
      interviewTime: '@date',
      interviewType: 'Onsite',
      name: '@cname',
      phonenum: '546546546',
      address: '广州',
      remark: '这是备注',
      interview: 0,
      recruitmentId: '564645',
      personId: '456456',
      evaluateTime: '@date',
      workBackground: 'A',
      workExperience: 'A',
      knowledge: 'A',
      train: 'A',
      specialty: 'A',
      evaluation: '面试评价,还行',
      score: '1000'
    })
    return {
      response: data
    }
  })
  Mock.mock(new RegExp('/api/user/v1/person/resume/reject' + '.*'), 'post', (options) => {
    console.log(options.url, JSON.parse(options.body))
    return {
      response: {}
    }
  })
  Mock.mock(new RegExp('/api/user/v1/person/resume/pass' + '.*'), 'post', (options) => {
    console.log(options.url, JSON.parse(options.body))
    return {
      response: {}
    }
  })
  Mock.mock(new RegExp('/user/v1/recruitment/detail' + '.*'), 'get', () => {
    let response = Mock.mock({
      id: '@integer(100000, 10000000000)',
      orgId: '@integer(100000, 10000000000)',
      orgName: '部门名称',
      jobId: '@integer(100000, 10000000000)',
      jobName: '职位名称',
      positionId: '@integer(100000, 10000000000)',
      positionName: '岗位名称',
      //  workProperty: '工作性质，字典组：WorkProperty',
      workProperty: 'FullTime',
      // emerType: '紧急程度，字典组：EmerType',
      emerType: 'common',
      needNum: '10',
      entryNum: '已入职人数21321',
      candidateNum: '候选人数213212',
      joinDate: '到岗日期1978-11-14',
      // workYear: '工作年限，字典组：WorkYear',
      workYear: 'Y02',
      // educationalLevel: '学历要求，字典组：EducationalLevel',
      educationalLevel: 'JuniorCollege',
      minSalary: '最低薪酬，单位：21321元',
      maxSalary: '最高薪酬，单位：2132132元',
      requirement: '职位要求',
      duty: '工作职责',
      // reason: '招聘原因，字典组：RecruitmentReason',
      reason: 'Organization4',
      reasonNote: '原因补充说明',
      remark: '申请理由',
      userId: '@integer(100000, 10000000000)',
      userName: '提交人姓名',
      companyId: '@integer(100000, 10000000000)',
      companyName: '公司名称'
    })

    return {
      response
    }
  })
  const normalData = {
    resCode: 200,
    resMsg: '操作成功',
    response: {}
  }
  Mock.mock(new RegExp('/api/user/v1/person/info' + '.*'), 'get', () => {
    return {
      ...normalData,
      response: Mock.mock({
        personId: '@increment',
        name: '@cname',
        phonenum: /[0-9]{11}/,
        'sex|1': [0, 1],
        age: '@integer(20, 100)',
        email: '@email',
        'interview|1': ['0', '1'],
        provinceCode: /[0-9]{5}/,
        proviceName: '@province',
        cityCode: /[0-9]{5}/,
        cityName: '@city',
        educationalLevel: 'Primary',
        university: '@cname',
        major: '@cname',
        workAge: '@integer(2, 10)',
        lastCompany: '@cname',
        'recruitment|1': [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14'
        ],
        monthSalary: '@integer(2000, 20000)',
        resumeUrl: '@url',
        attachmentUrl: '@url',
        attachmentName: '@cname',
        remark: '@cparagraph',
        status: '@string( 2, 10)',
        recruitmentId: '@string( 2, 10)',
        userId: '@string( 2, 10)',
        userName: '@cname',
        createTime: '@date',
        addUserId: '@string( 2, 10)',
        addUserName: '@cname',
        jobName: '@string( 5, 10)'
      })
    }
  })
  Mock.mock(new RegExp('/api/user/v1/person/resume/check' + '.*'), 'get', (options) => {
    console.log(options.url, JSON.parse(options.body))
    return {
      response: Mock.mock({
        id: '@increment',
        title: '@csentence',
        'status|1': ['UnCheck', 'Pass', 'Reject', 'Cancel'],
        checkName: '@cname',
        checkRemark: '@csentence',
        checkTime: '@date',
        personId: '1271038384256966657',
        reason: '@csentence',
        pushName: '@cname',
        pushRemark: '@csentence',
        pushTime: '@date'
      })
    }
  })
  Mock.mock(new RegExp('/api/appr/v1/appr/my/approve/list' + '.*'), 'get', () => {
    let list = Mock.mock([
      {
        apprNo: '@integer(100000, 10000000000)',
        title: '@cparagraph(1, 2)',
        formKey: 'Recruitment',
        formId: '@integer(1, 100)',
        orgId: '@integer(1, 100)',
        orgName: '@ctitle(1,3)',
        userId: '@integer(1, 100)',
        userName: '@cname',
        jobId: '@integer(1, 100)',
        jobName: '@ctitle(1,3)',
        processId: '@integer(1, 100)',
        status: 'Approve',
        applyTime: '@date()',
        completeTime: '@date()',
        approveUser: '@integer(1, 100)',
        approveName: '@cname'
      },
      {
        apprNo: '@integer(100000, 10000000000)',
        title: '@cparagraph(1, 2)',
        formKey: 'PersonOfferApply',
        formId: '@integer(1, 100)',
        orgId: '@integer(1, 100)',
        orgName: '@ctitle(1,3)',
        userId: '@integer(1, 100)',
        userName: '@cname',
        jobId: '@integer(1, 100)',
        jobName: '@ctitle(1,3)',
        processId: '@integer(1, 100)',
        status: 'Approve',
        applyTime: '@date()',
        completeTime: '@date()',
        approveUser: '@integer(1, 100)',
        approveName: '@cname'
      },
      {
        apprNo: '@integer(100000, 10000000000)',
        title: '@cparagraph(1, 2)',
        formKey: 'UserFormalInfo',
        formId: '@integer(1, 100)',
        orgId: '@integer(1, 100)',
        orgName: '@ctitle(1,3)',
        userId: '@integer(1, 100)',
        userName: '@cname',
        jobId: '@integer(1, 100)',
        jobName: '@ctitle(1,3)',
        processId: '@integer(1, 100)',
        status: 'Approve',
        applyTime: '@date()',
        completeTime: '@date()',
        approveUser: '@integer(1, 100)',
        approveName: '@cname'
      },
      {
        apprNo: '@integer(100000, 10000000000)',
        title: '@cparagraph(1, 2)',
        formKey: 'UserContractInfo',
        formId: '@integer(100000, 10000000000)',
        orgId: '@integer(100000, 10000000000)',
        orgName: '@ctitle(1,3)',
        userId: '@integer(100000, 10000000000)',
        userName: '@cname',
        jobId: '@integer(100000, 10000000000)',
        jobName: '@ctitle(1,3)',
        processId: '@integer(100000, 10000000000)',
        status: 'Pass',
        applyTime: '@date()',
        completeTime: '@date()',
        approveUser: '@integer(100000, 10000000000)',
        approveName: '@cname'
      },
      {
        apprNo: '@integer(100000, 10000000000)',
        title: '@cparagraph(1, 2)',
        formKey: 'UserLeaveInfo',
        formId: '@integer(100000, 10000000000)',
        orgId: '@integer(100000, 10000000000)',
        orgName: '@ctitle(1,3)',
        userId: '@integer(100000, 10000000000)',
        userName: '@cname',
        jobId: '@integer(100000, 10000000000)',
        jobName: '@ctitle(1,3)',
        processId: '@integer(100000, 10000000000)',
        status: 'Reject',
        applyTime: '@date()',
        completeTime: '@date()',
        approveUser: '@integer(100000, 10000000000)',
        approveName: '@cname'
      },
      {
        apprNo: '@integer(100000, 10000000000)',
        title: '@cparagraph(1, 2)',
        formKey: 'UserChangeInfo',
        formId: '@integer(100000, 10000000000)',
        orgId: '@integer(100000, 10000000000)',
        orgName: '@ctitle(1,3)',
        userId: '@integer(100000, 10000000000)',
        userName: '@cname',
        jobId: '@integer(100000, 10000000000)',
        jobName: '@ctitle(1,3)',
        processId: '@integer(100000, 10000000000)',
        status: 'Cancel',
        applyTime: '@date()',
        completeTime: '@date()',
        approveUser: '@integer(100000, 10000000000)',
        approveName: '@cname'
      }
    ])

    return {
      response: {
        totalNum: 50,
        totalPage: 10,
        data: list
      }
    }
  })
  Mock.mock(new RegExp('/api/user/v1/person/info' + '.*'), 'get', (options) => {
    console.log(options.url, JSON.parse(options.body))
    let tags = []
    for (let i = 0; i < 3; i++) {
      tags.push(
        Mock.mock({
          tagId: '@integer(1, 100000000)',
          name: '@cword(3, 5)',
          color: '@color'
        })
      )
    }
    Mock.Random.extend({
      constellation: function() {
        const educationalLevel = [
          'Primary',
          'Juniormiddle',
          'High',
          'JuniorCollege',
          'Undergraduate',
          'Master',
          'Doctor',
          'PostDoctoral',
          'VocationalHigh',
          'SecondarySpecialized',
          'Technical',
          'SecondaryNormal',
          'Other'
        ]
        return this.pick(educationalLevel)
      }
    })
    let data = Mock.mock({
      personId: '@integer(10000000000, 20000000000)',
      name: '@cname',
      phonenum: '@integer(10000000000, 20000000000)',
      sex: '@integer(0, 1)',
      age: '@integer(1, 100)',
      email: '@email',
      interview: '@integer(0, 1)',
      provinceCode: 'Vm[Z',
      proviceName: 'FmF',
      cityCode: '1R2)@W',
      cityName: 'F6z7tql',
      educationalLevel: '@constellation',
      university: 'RH92',
      major: 'X[RRQ',
      workAge: '@integer(0, 45)',
      lastCompany: '@cword(3, 5)',
      'recruitment|1': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
      monthSalary: '@natural(4000, 100000)',
      resumeUrl: '@url',
      attachmentUrl: '@url',
      attachmentName: '@cword(3, 5)',
      remark: '@sentence(3, 5)',
      status: /[0-6]/,
      recruitmentId: '@integer(1, 100)',
      userId: '@integer(1, 1000000)',
      userName: '@cname',
      createTime: "@date('yyyy-mm-dd')",
      orgId: '@integer(1, 10000000)',
      orgName: '@cword(3, 5)',
      jobId: '@integer(1, 10000000)',
      jobName: '@cword(3, 5)'
    })
    data.tags = tags
    return {
      resCode: 200,
      resMsg: '',
      response: data
    }
  })
  Mock.mock(new RegExp('/api/user/v1/user/work/list' + '.*'), 'get', () => {
    return {
      resCode: 200,
      success: true,
      response: {
        data: [
          {
            userId: '1258244944030916609',
            workNo: '0001',
            name: 'Zeus',
            orgId: '1252523599903072258',
            orgName: '集团总部',
            jobId: '1252190741156134914',
            jobName: 'CEO',
            positionId: '1262993255747080193',
            positionName: '总裁',
            phonenum: '13726042239',
            status: 'Formal'
          },
          {
            userId: '1262998215033409537',
            workNo: '0002',
            name: '游荣昌',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262996469389250561',
            jobName: '开发工程师',
            positionId: '1262997363212210177',
            positionName: 'Java开发工程师',
            phonenum: '15915874288',
            status: 'Formal'
          },
          {
            userId: '1263037430240694273',
            workNo: '0003',
            name: '伍伟雁',
            orgId: '1252523599903072257',
            orgName: '百利宏',
            jobId: '1262996469389250561',
            jobName: '开发工程师',
            positionId: '1262997402550587393',
            positionName: '前端开发工程师',
            phonenum: '18826138292',
            status: 'Formal'
          },
          {
            userId: '1263038146921418753',
            workNo: '0004',
            name: '徐国烨',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262996469389250561',
            jobName: '开发工程师',
            positionId: '1262997363212210177',
            positionName: 'Java开发工程师',
            phonenum: '15915742688',
            status: 'Formal'
          },
          {
            userId: '1263038423980363778',
            workNo: '0005',
            name: '曾庆荣',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262996469389250561',
            jobName: '开发工程师',
            positionId: '1262997363212210177',
            positionName: 'Java开发工程师',
            phonenum: '15815912344',
            status: 'Formal'
          },
          {
            userId: '1263038746618810370',
            workNo: '0006',
            name: '陈柳明',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262997100938186753',
            jobName: '测试工程师',
            positionId: '1262997437786935298',
            positionName: '测试工程师',
            phonenum: '16516821455',
            status: 'Try'
          },
          {
            userId: '1263039892955648002',
            workNo: '0007',
            name: '关芬达',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262996469389250561',
            jobName: '开发工程师',
            positionId: '1262997402550587393',
            positionName: '前端开发工程师',
            phonenum: '15915875266',
            status: 'Formal'
          },
          {
            userId: '1263040438093533185',
            workNo: '0008',
            name: '王木宗',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262996279848652801',
            jobName: '项目经理',
            positionId: '',
            positionName: '',
            phonenum: '16515789244',
            status: 'Formal'
          },
          {
            userId: '1263040873252573186',
            workNo: '0009',
            name: '张金桦',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262996469389250561',
            jobName: '开发工程师',
            positionId: '',
            positionName: '',
            phonenum: '13516578266',
            status: 'Formal'
          },
          {
            userId: '1263041216476663809',
            workNo: '0010',
            name: '刘康奇',
            orgId: '1262951869450633218',
            orgName: '百利宏OA',
            jobId: '1262996469389250561',
            jobName: '开发工程师',
            positionId: '1262997402550587393',
            positionName: '前端开发工程师',
            phonenum: '13816423142',
            status: 'Formal'
          }
        ],
        totalNum: 12,
        totalPage: 2
      },
      resMsg: '操作成功'
    }
  })
  Mock.mock(new RegExp('/api/user/v1/todo/list' + '.*'), 'get', () => {
    let data = []
    for (let i = 0; i < 21; i++) {
      data.push(
        Mock.mock({
          id: '@integer(1000000, 1000000000)',
          'type|1': [
            'Approve',
            'Recruitment',
            'ResumeReview',
            'Interview',
            'InterviewRegister',
            'Entry',
            'EntryRegister',
            'LeaveListOrg',
            'LeaveListUser',
            'Leave'
          ],
          bizId: '@integer(1000000, 1000000000)',
          'status|1': ['UnFinished', 'Finished'],
          beginDate: '@date("yyyy-MM-dd")',
          endDate: '@date("yyyy-MM-dd")',
          completeTime: '@date("yyyy-MM-dd")',
          title: '@ctitle(3,5)',
          content: '@cparagraph(3, 5)',
          'isRead|1': [1, 0],
          createTime: '@date("yyyy-MM-dd hh:mm:ss")'
        })
      )
    }
    return {
      resCode: 200,
      success: true,
      response: {
        totalNum: 20,
        totalPage: 1,
        data: data
      }
    }
  })
  Mock.mock(new RegExp('/api/schedule/v1/schedule/info' + '.*'), 'get', (option) => {
    let urlParams = new URLSearchParams(option.url.split('?')[1])
    const randomDate = (startDate, endDate) => {
      let start = moment(startDate).valueOf()
      let end = moment(endDate).valueOf()
      let date = new Date(start + Math.random() * (end - start))
      let hour = (0 + Math.random() * (23 - 0)) | 0
      let minute = (0 + Math.random() * (59 - 0)) | 0
      let second = (0 + Math.random() * (59 - 0)) | 0
      date.setHours(hour)
      date.setMinutes(minute)
      date.setSeconds(second)
      return date
    }
    let data = []
    for (let i = 0; i < 30; i++) {
      data.push(
        Mock.mock({
          id: '@integer(1000000, 1000000000)',
          remindDate: moment(
            randomDate(urlParams.get('beginRemindDate'), urlParams.get('endRemindDate'))
          ).format('YYYY-MM-DD'),
          type: 'Remind',
          title: '@ctitle(3,5)',
          createTime: '@date("yyyy-MM-dd hh:mm:ss")'
        })
      )
    }
    return {
      resCode: 200,
      resMsg: '',
      response: data
    }
  })
}
