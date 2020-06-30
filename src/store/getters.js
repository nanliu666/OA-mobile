const getters = {
  userInfo: (state) => state.user.userInfo,
  userId: (state) => state.user.userInfo.user_id
}
export default getters
