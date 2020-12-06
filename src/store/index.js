import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: {
      t1: 123,
      t2: 233
    },
    username: 'test',
    status: '',
    headerAbove: 1,
    showEditor: 0,
    fixedEditor: 0,
    colorTheme: 'light',
    boardInfo: null,
    popUser: {
      username: '',
      signature: ''
    },
    userInfo: {
      id: "",
      username: "",
      avatarUrl: "",
      isReal: "",
      threadCount: "",
      followCount: "",
      fansCount: "",
      likedCount: "",
      questionCount: "",
      signature: "",
      usernameBout: "",
      status: "",
      loginAt: "",
      joinedAt: "",
      expiredAt: "",
      createdAt: "",
      updatedAt: "",
      canEdit: "",
      canDelete: "",
      showGroups: "",
      registerReason: "",
      banReason: "",
      denyStatus: "",
      canBeAsked: "",
      follow: "",
      originalMobile: "",
      registerIp: "",
      registerPort: "",
      lastLoginIp: "",
      lastLoginPort: "",
      identity: "",
      realname: "",
      mobile: "",
      email: "",
      hasPassword: "",
      hasPayPassword: "",
      canWalletPay: "",
      walletBalance: "",
      walletFreeze: "",
      canEditUsername: "",
      paid: "",
      payTime: "",
      unreadNotifications: "",
      typeUnreadNotifications: "",
    },
  },
  mutations: {
    setData(state, payload) {
      state[payload.key] = payload.value
    },
    test(){
      console.log(this.abc)
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getBoardInfo: state => {
      console.log(state);
      return state.boardInfo;
    }
  }
})
