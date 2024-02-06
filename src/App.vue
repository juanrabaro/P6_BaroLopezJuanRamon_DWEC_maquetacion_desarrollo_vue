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
      this.$store.dispatch('setUser', user)
      window.localStorage.setItem('userLoggedWeatherHub', JSON.stringify(true))
      window.localStorage.setItem('userWeatherHub', JSON.stringify(user))
      this.userName = user
    },
    logout() {
      this.$store.dispatch('setUser', null)
      window.localStorage.removeItem('userLoggedWeatherHub')
      window.localStorage.removeItem('userWeatherHub')
      this.userName = ""
    },
    validateUserLogged() {
      this.userLogged = JSON.parse(window.localStorage.getItem('userLoggedWeatherHub'))
      this.userName = JSON.parse(window.localStorage.getItem('userWeatherHub'))
      if (this.userLogged) {
        this.login(this.userName)
        return
      }
      this.userName = ""
    }
  },
  computed: {
    isUserLoggedIn() {
      console.log(this.$store.getters.isUserLoggedIn);
      return this.$store.getters.isUserLoggedIn
    }
  },
  created() {
    this.validateUserLogged()
  },
}
</script>

<template>
  <Header :logout="logout" :isLogged="isUserLoggedIn" :userName="userName" />
  <RouterView :login="login" :logout="logout" :isLogged="isUserLoggedIn" :validateUserLogged="validateUserLogged" :userName="userName" />
</template>

<style scoped>
  main {
    height: 85vh;
  }
</style>
