const orgUserData = {
  state: {
    orgTree: [],
    adressTree: [],
    adressDetail: {}
  },
  mutations: {
    SET_ORG: (state, data) => {
      state.orgTree = data
    },
    SET_ADDRESS: (state, data) => {
      state.adressTree = data
    },
    SET_USERDETAIL: (state, data) => {
      state.adressDetail = data
    }
  }
}

export default orgUserData
