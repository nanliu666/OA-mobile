const orgUserData = {
  state: {
    addressOptionsVuex: {},
    oraPathList: [],
    adressDetail: {}
  },
  mutations: {
    SET_ADDRESS_OPTIONS: (state, data) => {
      state.addressOptionsVuex = data
    },
    PUSH_ORGPATH_LIST: (state, data) => {
      state.oraPathList.push(data)
    },
    SET_ORGPATH_LIST: (state) => {
      state.oraPathList = []
    },
    DELETE_ORGPATH_LIST: (state, data) => {
      state.oraPathList.splice(data)
    },
    SET_USERDETAIL: (state, data) => {
      state.adressDetail = data
    }
  }
}

export default orgUserData
