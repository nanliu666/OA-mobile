export const todoJumpFun = (item, router) => {
  if (item.type === 'Recruitment') {
    router.push({ path: '/todo/recruitment', query: { bizId: item.bizId } })
  } else if (item.type === 'ResumeReview') {
    router.push({ path: '/work/resumeDetail', query: { id: item.bizId } })
  } else if (item.type === 'Interview') {
    router.push({ path: '/work/interviewDetail', query: { id: item.bizId } })
  } else if (item.type === 'InterviewRegister') {
    router.push({ path: '/todo/InterviewRegister', query: { bizId: item.bizId } })
  } else if (item.type === 'Entry') {
    router.push({ path: '/todo/entry', query: { bizId: item.bizId } })
  } else if (item.type === 'EntryRegister') {
    router.push({ path: '/todo/entryRegister', query: { bizId: item.bizId } })
  } else if (item.type === 'LeaveListOrg') {
    router.push({
      path: '/todo/orgLeave',
      query: { leaveUserId: item.bizId, groupId: item.bizId2 }
    })
  } else if (item.type === 'LeaveListUser') {
    router.push({ path: '/todo/staffLeave', query: { leaveUserId: item.bizId } })
  } else if (item.type === 'Leave') {
    router.push({ path: '/todo/leaveHandel', query: { biz_id: item.bizId } })
  }
}
