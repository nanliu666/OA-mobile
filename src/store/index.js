import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import dict from './modules/dict'
import orgUserTree from './modules/orgUserTree'
import work from './modules/work'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    dict,
    orgUserTree,
    work
  },
  getters
})

export default store
