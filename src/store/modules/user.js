import { setStore, getStore } from '@/util/store'

const user = {
  state: {
    userInfo: getStore({ name: 'userInfo' }) || {}
  },
  actions: {
    
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      userInfo.tenantId = state.userInfo.tenantId || userInfo.tenantId
      state.userInfo = userInfo
      setStore({ name: 'userInfo', content: state.userInfo })
    },
    SET_TENANRID: (state, tenantId) => {
      state.userInfo.tenantId = tenantId
      setStore({ name: 'userInfo', content: state.userInfo })
    }
  }
}
export default user
