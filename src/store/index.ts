import { createStore } from 'vuex'

import {LOGIN_SUCCESS} from '@/store/mutation-types'

const store = createStore({
  state() {
    return {
      loginStatus: false,
      token:""
    }
  },
  mutations: {
    [LOGIN_SUCCESS](state:any,status:boolean) {
      state.loginStatus = status
    },
  },
  getters: {
  },
})

export default store
