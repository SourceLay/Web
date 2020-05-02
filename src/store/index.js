import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: {
      t1: 123,
      t2: 233
    },
    status: '123',
    headerAbove: 1,
    showEditor: 0,
    fixedEditor: 0,
    colorTheme: 'light',
    forumInfo: null
  },
  mutations: {
    setData(state, payload) {
      state[payload.key] = payload.value
    }
  },
  actions: {
  },
  modules: {
  }
})
