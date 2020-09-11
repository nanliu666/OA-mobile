const getters = {
  userInfo: (state) => state.user.userInfo,
  userId: (state) => state.user.userInfo.user_id,
  addressOptionsVuex: (state) => state.orgUserData.addressOptionsVuex,
  adressDetail: (state) => state.orgUserData.adressDetail,
  oraPathList: (state) => state.orgUserData.oraPathList,
  approvalType: (state) => state.approval.approvalType,
  taskActive: (state) => state.work.taskActive,
  todoActive: (state) => state.work.todoActive,
  userDetail: (state) => state.user.userDetail
}
export default getters
