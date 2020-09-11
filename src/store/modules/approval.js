const approval = {
  state: {
    approvalType: {}
  },
  mutations: {
    SET_APPR_TYPE_LIST: (state, data) => {
      state.approvalType = data
    }
  }
}

export default approval
