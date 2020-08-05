import Mock from 'mockjs'
const normalData = {
  code: 200,
  success: true,
  msg: '操作成功',
  response: ''
}
const processListData = {
  ...normalData,
  response: [
    {
      'id|+1': [`${Mock.Random.id()}`, `${Mock.Random.id()}`],
      'name|+1': [`人事审批`, `业务审批`, '行政审批'],
      sort: 1,
      processes: [
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
}
export default ({ mock }) => {
  if (!mock) return
  // v2版本接口
  // 审批列表查询，调用接口：审批流程列表查询接口【GET /appr/v2/appr/process/list】
  Mock.mock(new RegExp('/api/appr/v2/appr/process/list' + '.*'), 'get', () => {
    return processListData
  })
}
