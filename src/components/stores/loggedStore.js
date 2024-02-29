import { defineStore } from 'pinia'

export const useLoggedStore = defineStore("loggedStore", {
  state: () => {
    return {
      userLogged: {
        logged: false,
        token: "",
      },
    }
  },

  actions: {
    logInStore(token) {
      this.logged = true
      this.token = token
    },
    logOutStore() {
      this.userLogged = {
        logged: false,
        token: "",
      }
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "loggedStore",
        storage: window.localStorage,
      },
    ],
  }
})