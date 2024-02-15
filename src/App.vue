<script>
import Header from './components/layout/Header.vue';

export default {
  components: {
    Header
  },
  data() {
    return {
      userLogged: false,
      user: {},
    }
  },
  methods: {
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
    this.validateUserLogged()
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
