import Mock from 'mockjs'

export default ({ mock }) => {
  if (!mock) return
  const orgData = Mock.mock({
    'list|3-6': [
      {
        'orgId|+1': [`${Mock.Random.id()}`, `${Mock.Random.id()}`],
        'userId|+1': [`${Mock.Random.id()}`, `${Mock.Random.id()}`],
        'orgName|+1': [`百利宏`, `事业部`, `人事部`, `研发部`],
        'userName|+1': [`${Mock.Random.cname()}`, `${Mock.Random.cname()}`],
        //Enterprise-企业，Company-公司，Department-部门，Group-小组
        'type|+1': ['Enterprise', 'Company', 'Department', 'Group'],
        remark: Mock.mock('@csentence'),
        // 组织机构编码，生成规则为：A+3位数字，示例：A001A001
        code: `A${Math.floor(Math.random() * (100 - 999) + 999)}`,
        'workNum|+1': Math.floor(Math.random() * (1 - 999) + 999)
      }
    ]
  })
  // 通讯录部门查询接口
  Mock.mock(new RegExp('/api/user/v1/user/address/book/org' + '.*'), 'get', () => {
    return {
      resCode: 200,
      success: true,
      response: orgData.list,
      resMsg: '操作成功'
    }
  })
  Mock.Random.extend({
    phone: function() {
      var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
      return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    }
  })
  const userData = Mock.mock({
    'list|6-12': [
      {
        'userId|+1': [`${Mock.Random.id()}`, `${Mock.Random.id()}`, '1'],
        'leaderId|+1': [`${Mock.Random.id()}`, `${Mock.Random.id()}`, '1'],
        'orgId|+1': [`${Mock.Random.id()}`, `${Mock.Random.id()}`],
        'jobId|+1': [`${Mock.Random.id()}`, `${Mock.Random.id()}`],
        'workNo|+1': [`${Mock.Random.id()}`, `${Mock.Random.id()}`],
        'name|+1': [`${Mock.Random.cname()}`, `${Mock.Random.cname()}`],
        'leaderName|+1': [`${Mock.Random.cname()}`, `${Mock.Random.cname()}`],
        'jobName|+1': [`${Mock.Random.cname()}`, `${Mock.Random.cname()}`],
        'orgName|+1': [`${Mock.Random.cname()}`, `${Mock.Random.cname()}`],
        'avatarUrl|+1': [`${Mock.Random.dataImage()}`, `${Mock.Random.dataImage()}`],
        'pinyin|+1': [`${Mock.Random.cname()}`, `${Mock.Random.cname()}`],
        'sex|+1': [0, 1],
        'phonenum|1': ['@phone'],
        'email|1': [Mock.mock('@email')]
      }
    ]
  })
  // 通讯录员工查询接口
  Mock.mock(new RegExp('/api/user/v1/user/address/book/user' + '.*'), 'get', () => {
    return {
      resCode: 200,
      success: true,
      response: userData.list,
      resMsg: '操作成功'
    }
  })
}
