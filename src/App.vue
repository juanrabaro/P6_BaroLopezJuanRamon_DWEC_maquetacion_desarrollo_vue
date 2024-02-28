<script>
import Header from './components/layout/Header.vue';

export default {
  components: {
    Header
  },
  data() {
    return {
      // variables globales para saber si el usuario está logueado y
      // los datos del usuario en cuestion
      userLogged: false,
      user: null,
      token: null,
    }
  },
  methods: {
    validateUserLoggedDB() {
      this.userLogged = JSON.parse(window.localStorage.getItem('userLoggedWeatherHub')) || false
      this.token = JSON.parse(window.localStorage.getItem('tokenUser')) || null
    },
    // Comprueba si el usuario está logueado al cargar la página
    validateUserLogged() {
      this.userLogged = JSON.parse(window.localStorage.getItem('userLoggedWeatherHub')) || false
      this.user = JSON.parse(window.localStorage.getItem('userWeatherHub')) || {}
      if (!this.userLogged) {
        this.user = { inputUsername: "" }
        return
      }
    },
  },
  created() {
    // this.validateUserLogged()
    this.validateUserLoggedDB()
  },
}
</script>

<template>
  <Header :user="user" :isLogged="userLogged" />
  <RouterView :user="user" :isLogged="userLogged" />
</template>

<style scoped lang="scss">
  main {
    //height: 85vh;
    margin: 0;
  }
</style>
