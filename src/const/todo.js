export const todoTypeCN = {
  Approve: '审批', //biz_id = 审批编码，即表appr_apply_user中的字段appr_no
  Recruitment: '招聘', //biz_id = 招聘需求ID，即表recruitment的id
  ResumeReview: '简历审核', // biz_id = 人员简历审核ID，即表person_resume_check的id
  Interview: '面试', // biz_id = 人员面试记录ID，即表person_interview_info的id
  InterviewRegister: '面试登记表',
  Entry: '入职办理',
  EntryRegister: '入职登记表',
  LeaveListUser: '离职事项',
  LeaveListOrg: '离职事项',
  Leave: '离职办理'
}

export const interviewStatusCN = {
  UnEvaluate: '待评价',
  Pass: '通过',
  Reject: '淘汰',
  Cancel: '已撤销'
}

export const interviewTypeCN = {
  Onsite: '现场面试',
  Phone: '电话面试',
  Video: '视频面试'
}
