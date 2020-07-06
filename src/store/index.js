import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import dict from './modules/dict'
import orgUserTree from './modules/orgUserTree'

import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    dict,
    orgUserTree
  },
  getters
})

export default store
