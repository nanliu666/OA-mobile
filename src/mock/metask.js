import Mock from 'mockjs'
export default ({ mock }) => {
  if (!mock) return

  //    任务中心查询接口
  Mock.mock(new RegExp('/task/v1/task/center/list' + '.*'), 'get', () => {
    let list = []
    for (let i = 0; i < 10; i++) {
      list.push(
        Mock.mock({
          id: '@integer(1, 100)',
          title: '@ctitle(5,8)',
          brief: '@ctitle(5,8)',
          'type|1': ['Recruitment'],
          bizId: '@integer(1, 100)',
          'emerType|1': ['Super', 'urgent', 'common', 'suit'],
          'status|1': ['UnFinished', 'Finished'],
          beginDate: '@date()',
          endDate: '@date()',
          totalNum: '@integer(100,100)',
          completeNum: '@integer(1, 100)',
          completeTime: '@date()',
          createTime: '@date()'
        })
      )
    }
    return {
      response: {
        totalNum: 50,
        totalPage: 3,
        data: list
      }
    }
  })

  // 招聘需求申请详情查询
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
      needNum: '需求人数123112',
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
      companyName: '公司名称',
      createTime: '@date()',
      'progress|1': ['Approved', 'Finished']
    })

    return {
      response
    }
  })
}
