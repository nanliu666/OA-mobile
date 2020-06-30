import { getStore, setStore } from '@/util/store'

import { getDict } from '@/api/common'

const dict = {
  state: {
    commonDict: getStore({ name: 'commonDict' }) || {}
  },
  actions: {
    CommonDict({ state, commit }, name) {
      return new Promise((resolve, reject) => {
        if (state.commonDict[name]) {
          resolve(state.commonDict[name])
          return
        }
        getDict({ code: name })
          .then((data) => {
            commit('SET_COMMON_DICT', { name, data })
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  },
  mutations: {
    SET_COMMON_DICT: (state, { name, data }) => {
      state.commonDict[name] = data
      setStore({
        name: 'commonDict',
        content: state.commonDict
      })
    }
  }
}

export default dict
