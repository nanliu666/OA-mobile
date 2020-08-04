/**
 *
 * @param {*} item 点击的每一项
 * @param {*} router vue的路由实例
 */
import { Toast } from 'vant'

export const todoJumpFun = (item, router) => {
  switch (item.type) {
    case 'Recruitment':
      router.push({ path: '/todo/recruitment', query: { bizId: item.bizId } })
      break
    case 'ResumeReview':
      router.push({ path: '/work/resumeDetail', query: { id: item.bizId } })
      break
    case 'Interview':
      router.push({ path: '/work/interviewDetail', query: { id: item.bizId } })
      break
    case 'InterviewRegister':
      router.push({ path: '/todo/InterviewRegister', query: { bizId: item.bizId } })
      break
    case 'Entry':
      router.push({ path: '/todo/entry', query: { bizId: item.bizId } })
      break
    case 'EntryRegister':
      router.push({ path: '/todo/entryRegister', query: { bizId: item.bizId } })
      break
    case 'LeaveListOrg':
      router.push({
        path: '/todo/orgLeave',
        query: { leaveUserId: item.bizId, groupId: item.bizId2 }
      })
      break
    case 'LeaveListUser':
      router.push({ path: '/todo/staffLeave', query: { leaveUserId: item.bizId } })
      break
    case 'Leave':
      router.push({ path: '/todo/leaveHandel', query: { biz_id: item.bizId } })
      break
    case 'Approve':
      Toast('开发中...')
      // router.push({ path: '/todo/recruitment', query: { bizId: item.bizId } })
      break
  }
}
