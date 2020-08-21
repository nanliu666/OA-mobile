import Mock from 'mockjs'

const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}
const processListData = Mock.mock({
  ...normalData,
  'response|1-10': [
    {
      'id|+1': [`${Mock.Random.id()}`, `${Mock.Random.id()}`],
      'name|+1': [`人事审批`, `业务审批`, '行政审批'],
      sort: 1,
      'processes|0-10': [
        {
          'processId|+1': [`${Mock.Random.id()}`, `${Mock.Random.id()}`],
          'processName|+1': [`入职申请1`, `入职申请2`, '入职申请3'],
          sort: 1,
          icon: 'approval-invitation-bicolor',
          remark: '@ctitle(5,15)',
          visibleRange: 'all',
          formKey: ''
        }
      ]
    }
  ]
})
const details = {
  ...normalData,
  response: {
    applyTime: '2020-08-18 17:02:12',
    apprNo: '2020081800004',
    completeTime: '2020-08-19 17:30:37',
    formData:
      '[{"label":"用户名称","prop":"name","span":12,"value":"六娃"},{"label":"异动类型","prop":"type","span":12,"content":"调岗","value":"Position"},{"label":"异动原因","prop":"reason","span":12,"value":"个人申请"},{"label":"生效日期","prop":"effectDate","span":12,"value":"2020-08-21 00:00:00"},{"label":"原公司名称","prop":"companyName","span":12,"value":"百利宏"},{"label":"新公司名称","prop":"newCompanyName","span":12,"value":"百利宏"},{"label":"原部门名称","prop":"orgName","span":12,"value":"集团总部"},{"label":"新部门名称","prop":"newOrgName","span":12,"value":"集团总部"},{"label":"原职位名称","prop":"jobName","span":12,"value":"java后台"},{"label":"新职位名称","prop":"newJobName","span":12,"value":"java后台"},{"label":"原岗位名称","prop":"positionName","span":12,"value":"Java开发工程师"},{"label":"新岗位名称","prop":"newPositionName","span":12,"value":"前端开发工程师"},{"label":"备注","prop":"remark","span":12,"value":"test"}]',
    formId: '',
    formKey: '',
    jobId: 1262996213457014800,
    jobName: '交付（业务）总监',
    nodeData:
      '[{"type":"start","content":"所有人","properties":{"title":"发起人","initiator":"ALL","formOperates":[]},"nodeId":"Gb2","userList":[{"name":"Zeus","userId":"1258244944030916609","workNo":"0001","type":"user"}]},{"type":"approver","content":"Zeus","properties":{"title":"审批人","attribute":"1258244944030916609","approvers":[{"workNo":"0001","name":"Zeus","userId":"1258244944030916609","id":"1252523599903072258_1258244944030916609","type":"user"}],"assigneeType":"user","formOperates":[],"counterSign":true,"optionalMultiUser":false,"optionalRange":"USER"},"nodeId":"Kb2","prevId":"Gb2","userList":[{"workNo":"0001","name":"Zeus","userId":"1258244944030916609","id":"1252523599903072258_1258244944030916609","type":"user"}]},{"type":"approver","content":"Zeus","properties":{"title":"审批人","attribute":"1258244944030916609","approvers":[{"workNo":"0001","name":"Zeus","userId":"1258244944030916609","id":"1252523599903072258_1258244944030916609","type":"user"}],"assigneeType":"user","formOperates":[],"counterSign":true,"optionalMultiUser":false,"optionalRange":"USER"},"nodeId":"Lb2","prevId":"Kb2","userList":[{"workNo":"0001","name":"Zeus","userId":"1258244944030916609","id":"1252523599903072258_1258244944030916609","type":"user"}]}]',
    orgId: '1262951869450633218',
    orgName: 'OA自动化办公',
    processId: 'id2e8d4613d449fd768ffcef478d4bf5d4',
    processInstanceId: '80c0d6d4-e131-11ea-acd9-d0278889fb56',
    processName: '测试连续审批人去重',
    status: 'Pass',
    title: 'Zeus发起的测试连续审批人去重',
    userId: '1258244944030916609',
    userName: 'Zeus'
  }
}
const record = {
  ...normalData,
  response: {
    apprNo: '2020081800004',
    processId: 'id2e8d4613d449fd768ffcef478d4bf5d4',
    processInstanceId: '80c0d6d4-e131-11ea-acd9-d0278889fb56',
    data: [
      {
        taskId: '',
        userId: '1258244944030916609',
        userName: 'Zeus',
        jobId: '1262996213457014785',
        jobName: '交付（业务）总监',
        approveTime: '2020-08-18 17:02:12',
        result: 'Pass',
        remark: '',
        createTime: '2020-08-18 17:02:12',
        nodeId: 'start',
        nodeName: '',
        nodeType: ''
      },
      {
        taskId: '80c0fdee-e131-11ea-acd9-d0278889fb56',
        userId: '1258244944030916609',
        userName: 'Zeus',
        jobId: '1262996213457014785',
        jobName: '交付（业务）总监',
        approveTime: '2020-08-18 17:02:30',
        result: 'Pass',
        remark: '审批人去重',
        createTime: '2020-08-18 17:02:11',
        nodeId: 'Kb2',
        nodeName: '审批人',
        nodeType: ''
      },
      {
        taskId: '8c00a177-e131-11ea-acd9-d0278889fb56',
        userId: '1258244944030916609',
        userName: 'Zeus',
        jobId: '1262996213457014785',
        jobName: '交付（业务）总监',
        approveTime: '2020-08-19 17:30:36',
        result: 'Pass',
        remark: '',
        createTime: '2020-08-18 17:02:30',
        nodeId: 'Lb2',
        nodeName: '审批人',
        nodeType: ''
      }
    ]
  }
}
export default ({ mock }) => {
  if (!mock) return
  // v2版本接口
  // 审批列表查询，调用接口：审批流程列表查询接口【GET /appr/v2/appr/process/list】
  Mock.mock(new RegExp('/api/appr/v2/appr/process/list' + '.*'), 'get', () => {
    return processListData
  })
  Mock.mock(new RegExp('/api/appr/v2/appr/process/apply/detail' + '.*'), 'get', () => {
    return details
  })
  Mock.mock(new RegExp('/api/appr/v2/appr/apply/record' + '.*'), 'get', () => {
    return record
  })
}
