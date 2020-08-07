const getters = {
  userInfo: (state) => state.user.userInfo,
  addressOptionsVuex: (state) => state.orgUserData.addressOptionsVuex,
  adressDetail: (state) => state.orgUserData.adressDetail,
  oraPathList: (state) => state.orgUserData.oraPathList,
  taskActive: (state) => state.work.taskActive,
  todoActive: (state) => state.work.todoActive,
  userDetail: (state) => state.user.userDetail
}
export default getters
