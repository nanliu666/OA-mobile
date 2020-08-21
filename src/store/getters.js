const getters = {
  userInfo: (state) => state.user.userInfo,
  addressOptionsVuex: (state) => state.orgUserData.addressOptionsVuex,
  adressDetail: (state) => state.orgUserData.adressDetail,
  oraPathList: (state) => state.orgUserData.oraPathList,
  approvalType: (state) => state.approval.approvalType,
  filterContent: (state) => state.approval.filterContent,
  isRefresh: (state) => state.approval.isRefresh,
  taskActive: (state) => state.work.taskActive,
  todoActive: (state) => state.work.todoActive,
  userDetail: (state) => state.user.userDetail
}
export default getters
