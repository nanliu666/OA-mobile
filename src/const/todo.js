export const todoTypeCN = {
  Approve: {
    text: '审批',
    icon: 'icon-approval-Seal-bicolor'
  }, //biz_id = 审批编码，即表appr_apply_user中的字段appr_no
  Recruitment: {
    text: '招聘',
    icon: 'icon-approval-invitation-bicolor'
  }, //biz_id = 招聘需求ID，即表recruitment的id
  ResumeReview: {
    text: '简历审核',
    icon: 'icon-approval-Seal-bicolor'
  }, // biz_id = 人员简历审核ID，即表person_resume_check的id
  Interview: {
    text: '面试',
    icon: 'icon-approval-recruit-bicolor'
  }, // biz_id = 人员面试记录ID，即表person_interview_info的id
  InterviewRegister: {
    text: '面试登记表',
    icon: 'icon-approval-info-outlined'
  },
  Entry: {
    text: '入职办理',
    icon: 'icon-approval-checkin-bicolor'
  },
  EntryRegister: {
    text: '入职登记表',
    icon: 'icon-approval-info-outlined'
  },
  LeaveListUser: {
    text: '离职事项',
    icon: 'icon-approval-info-outlined'
  },
  LeaveListOrg: {
    text: '离职事项',
    icon: 'icon-approval-info-outlined'
  },
  Leave: {
    text: '离职办理',
    icon: 'icon-approval-leaveoffice-bicolor'
  }
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
