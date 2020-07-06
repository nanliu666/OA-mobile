import { getStore, setStore } from '@/util/store'
import {getOrgPath} from '@/util/util'

const orgUserTree = {
    state: {
        orgUserTree: getStore({ name: 'orgUserTree' }) || {}
    },
    mutations: {
      SET_ORG_USER_TREE: (state, data ) => {
        getOrgPath(data)
        state.orgUserTree = data
        setStore({
          name: 'orgUserTree',
          content: state.orgUserTree,
          type:'orgUserTree'
        })
      }
    }
  }
  
  export default orgUserTree