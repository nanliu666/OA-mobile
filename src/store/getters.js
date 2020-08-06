const getters = {
  userInfo: (state) => state.user.userInfo,
  orgTree: (state) => state.orgUserData.orgTree,
  adressTree: (state) => state.orgUserData.adressTree,
  adressDetail: (state) => state.orgUserData.adressDetail,
  taskActive: (state) => state.work.taskActive,
  todoActive: (state) => state.work.todoActive,
  userDetail: (state) => state.user.userDetail
}
export default getters
