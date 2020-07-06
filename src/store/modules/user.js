import { setStore, getStore } from '@/util/store'

const user = {
  state: {
    userInfo: getStore({ name: 'userInfo' }) || {},
    userDetail: getStore({ name: 'userDetail' }) || {}
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
    },
    SET_USER_DETAIL:(state, data)=>{
      state.userDetail = data
      setStore({ name: 'userDetail', content: state.userDetail })
    }
  }
}
export default user
