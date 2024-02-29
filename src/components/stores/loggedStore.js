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
      this.userLogged.logged = true
      this.userLogged.token = token
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
        key: "auth",
        storage: window.localStorage,
      },
    ],
  }
})