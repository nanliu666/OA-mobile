import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { improtAllFiles } from '@/util/util'
const modules = improtAllFiles(require.context('./modules', false, /\.js$/), '.js')
Vue.use(Vuex)
const store = new Vuex.Store({
  modules,
  getters
})
export default store
