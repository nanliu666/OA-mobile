import Mock from 'mockjs'

export default ({ mock }) => {
    if (!mock) return

    Mock.mock(new RegExp('/api/user/v1/user/address/book' + '.*'), 'get', () => {
        return {
          resCode: 200,
          success: true,
          response: [
            {
              orgId: '1252523599903072257',
              orgName: '百利宏',
              userId: '1253210544507457537',
              users: [
                { workNo: 'GD003', name: 'A', userId: '1253210544507457537',avatarUrl:'', pinyin:'a', jobName: 'CEO' },
                { workNo: 'GD004', name: 'B', userId: '1253210544507457538',avatarUrl:'', pinyin:'b', jobName: 'CEO' },
                { workNo: '0002', name: 's1mple', userId: '1258304216295026690',avatarUrl:'', pinyin:'s1mples', jobName: 'CEO' },
                { workNo: '0003', name: 'ces', userId: '1258305249104637954',avatarUrl:'', pinyin:'ces', jobName: 'CEO' }
              ],
              children: [
                {
                  orgId: '1252523599903072258',
                  orgName: '董事长办公室',
                  userId: '1253210544507457540',
                  users: [
                    { workNo: 'GD006', name: 'E', userId: '1253210544507457540',avatarUrl:'', pinyin:'e', jobName: 'CEO' },
                    { workNo: 'GD007', name: 'F', userId: '1253210544507457541',avatarUrl:'', pinyin:'f', jobName: 'CEO'}
                  ],
                  id: '1252523599903072258',
                  hasChildren: false
                },
                {
                  orgId: '1252523599903072259',
                  orgName: '广州易宝分公司',
                  userId: '1252523599903072257',
                  users: [{ workNo: 'GD008', name: 'G', userId: '1253210544507457542',avatarUrl:'', pinyin:'g', jobName: 'CEO'  }],
                  children: [
                    {
                      orgId: '1252523599903072260',
                      orgName: 's1mple软件部',
                      parentId: '1252523599903072259',
                      users: [],
                      id: '1252523599903072260',
                      hasChildren: false
                    },
                    {
                      orgId: '1258213117681528834',
                      orgName: '事业部',
                      userId: '1258244944030916609',
                      users: [{ workNo: '0001', name: 'Zeus', userId: '1258244944030916609',avatarUrl:'', pinyin:'Zeus', jobName: 'CEO' }],
                      children: [
                        {
                          orgId: '1252523599903072261',
                          orgName: '软件部OA项目组',
                          userId: '1253210544507457543',
                          users: [{ workNo: 'GD009', name: 'M', userId: '1253210544507457543',avatarUrl:'', pinyin:'M', jobName: 'CEO' }],
                          children: [
                            {
                              orgId: '1257922456241659905',
                              orgName: '前端组',
                              parentId: '1252523599903072261',
                              users: [],
                              id: '1257922456241659905',
                              hasChildren: false
                            },
                            {
                              orgId: '1257943561580855298',
                              orgName: '后端组',
                              parentId: '1252523599903072261',
                              users: [],
                              id: '1257943561580855298',
                              hasChildren: false
                            },
                            {
                              orgId: '1257948555810025473',
                              orgName: '测试部',
                              parentId: 1252523599903072261,
                              users: [],
                              id: '1257948555810025473',
                              hasChildren: false
                            }
                          ],
                          id: '1252523599903072261',
                          hasChildren: false
                        }
                      ],
                      id: '1258213117681528834',
                      hasChildren: false
                    },
                    {
                      orgId: '1258213837629616129',
                      orgName: '华为事业部',
                      userId: '1258306363451518977',
                      users: [{ workNo: '0004', name: 'ce1231', userId: '1258306363451518977',avatarUrl:'', pinyin:'ce1231', jobName: 'CEO' }],
                      children: [
                        {
                          orgId: '1258332067669024769',
                          orgName: 'GTS软件',
                          parentId: 1258213837629616129,
                          users: [],
                          id: '1258332067669024769',
                          hasChildren: false
                        }
                      ],
                      id: '1258213837629616129',
                      hasChildren: false
                    }
                  ],
                  id: '1252523599903072259',
                  hasChildren: false
                }
              ],
              id: '1252523599903072257',
              hasChildren: false
            }
          ],
          resMsg: '操作成功'
        }
      })
      // Mock.mock(new RegExp('/user/v1/user/info' + '.*'), 'get', () => {
      //   return {
      //     resCode: 200,
      //     resMsg: '',
      //     response: {
      //       userId: '20200426',
      //       name: '张三',
      //       sex: '1', //	性别，1：男；0：女
      //       email: 'zahngsan5@epro.com.cn',
      //       phonenum: '13456347890',
      //       idType: '身份证',
      //       idNo: '610144198802145643',
      //       birthDate: '1980-02-14',
      //       marriage: '1', //婚姻状态，1：已婚，0：未婚
      //       politicalStatus: '共产党员',
      //       firstWorkDate: '2014-06',
      //       householdType: '城镇户口',
      //       health: '健康',
      //       nation: '汉族',
      //       idAddress: '广东省深圳市龙岗区龙岗派出所',
      //       userAddress: '广东省深圳市龙岗区龙岗派出所12号',
      //       nativeProvinceName: '江苏',
      //       nativeProvinceCode: '',
      //       nativeCityName: '南京',
      //       nativeCityCode: 'nativeCityCode--02',
      //       status: 'Try',
      //       orgName: 'UCD中心',
      //       jobName: '产品经理',
      //       leaderName: '程小刚',
      //       workNo: 'XA667',
      //       bankName: '建设银行',
      //       bankNo: '6228374768997669',
      //       isFirstSs: '1', //	是否本地首次缴纳社保，1：是，0：否
      //       ssNo: '897668999',
      //       isFirstEpf: '1', //是否本地首次缴纳公积金，1：是，0：否
      //       epfNo: '897668999',
      //       tags: [
      //         {
      //           tagId: 'qq',
      //           tagName: '正式PM；储备PM；正式PM；储备PM'
      //         }
      //       ],
      //       userRemark: '这是在职信息的备注',
      //       recruitment: 'BOSS直聘',
      //       workProvinceName: '陕西省',
      //       workProvinceCode: '610000',
      //       workCityCode: '610100',
      //       workCityName: '西安市',
      //       provinceCode: '610000',
      //       provinceName: '陕西省',
      //       cityName: '西安市',
      //       cityCode: '610100',
      //       countyCode: '610113',
      //       countyName: '雁塔区',
      //       address: 'xxx软件园', //工作的详细地址
      //       subOrg: [
      //         {
      //           subOrgId: '1257943561580855298',
      //           subOrgName: '1257943561580855298',
      //           subJobId: '1257966733176881154',
      //           subJobName: '财务'
      //         }
      //       ],
      //       positionName: '岗位名称',
      //       companyName: '入职公司',
      //       workProperty: '全职',
      //       probation: '3个月',
      //       formalDate: '2019-3-20',
      //       entryDate: '2018-12-20'
      //     }
      //   }
      // })
}