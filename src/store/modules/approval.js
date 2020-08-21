const approval = {
  state: {
    approvalType: {},
    filterContent: {},
    isRefresh: true
  },
  mutations: {
    SET_APPR_TYPE_LIST: (state, data) => {
      state.approvalType = data
    },
    SET_FILTER_CONTENT: (state, data) => {
      state.filterContent = data
    },
    SET_REFRESH: (state, data) => {
      state.isRefresh = data
    }
  }
}

export default approval
