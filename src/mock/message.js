import Mock from 'mockjs'

export default ({ mock }) => {
  if (!mock) return

  Mock.mock(new RegExp('/api/msg/v1/msg/notify/list' + '.*'), 'get', () => {
    let data = []
    for (let i = 0; i < 21; i++) {
      data.push(
        Mock.mock({
          id: '@integer(1000000, 1000000000)',
          'type|1': ['Work', 'System'],
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
}
