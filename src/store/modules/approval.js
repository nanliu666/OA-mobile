const approval = {
  state: {
    approvalType: {},
    orgDataVuex: {},
    initiator: {}
  },
  mutations: {
    SET_APPR_TYPE_LIST: (state, data) => {
      state.approvalType = data
    },
    SET_ORG_DATA: (state, data) => {
      state.orgDataVuex = data
    },
    SET_CURRENT_INITOR: (state, data) => {
      state.initiator = data
    }
  }
}

export default approval
