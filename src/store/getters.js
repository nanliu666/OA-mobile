const getters = {
  userInfo: (state) => state.user.userInfo,
  org_user_tree: (state) => state.orgUserTree,
  taskActive: (state) => state.work.taskActive,
  todoActive: (state) => state.work.todoActive,
  userDetail: (state) => state.user.userDetail
}
export default getters
