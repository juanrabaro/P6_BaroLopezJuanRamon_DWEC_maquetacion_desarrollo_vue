<script>
import Header from './components/shared/Header.vue';

export default {
  components: {
    Header
  },
  data() {
    return {
      userLogged: false,
      userName: "",
    }
  },
  methods: {
    login(user) {
      if (JSON.parse(window.localStorage.getItem('userLoggedWeatherHub')) === true || user === "") {
        return
      }
      // this.$store.dispatch('setUser', user)
      window.localStorage.setItem('userLoggedWeatherHub', JSON.stringify(true))
      window.localStorage.setItem('userWeatherHub', JSON.stringify(user))
      this.userName = user
      this.userLogged = true
    },
    logout() {
      // this.$store.dispatch('setUser', null)
      window.localStorage.removeItem('userLoggedWeatherHub')
      window.localStorage.removeItem('userWeatherHub')
      this.userName = ""
      this.userLogged = false
    },
    validateUserLogged() {
      this.userLogged = JSON.parse(window.localStorage.getItem('userLoggedWeatherHub')) || false
      this.userName = JSON.parse(window.localStorage.getItem('userWeatherHub')) || ""
      if (this.userLogged) {
        this.login(this.userName)
        return
      }
      this.userName = ""
    },
    isUserLoggedIn() {
      // console.log(this.$store.getters.isUserLoggedIn);
      // return this.$store.getters.isUserLoggedIn
    }
  },
  created() {
    this.validateUserLogged()
  },
}
</script>

<template>
  <Header :logout="logout" :isLogged="userLogged" />
  <RouterView :login="login" :logout="logout" :isLogged="userLogged" :validateUserLogged="validateUserLogged" :userName="userName" />
</template>

<style scoped lang="scss">
  main {
    height: 85vh;
    margin: 0;
  }
</style>
