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
      userExistMessage: "",
      userNotExistMessage: "",
    }
  },
  methods: {
    sigin(user) {
      const users = JSON.parse(window.localStorage.getItem('usersWeatherHub')) || []

      const userExist = users.filter((userE) => {
        if ( userE.inputEmail === user.inputEmail ) {
          return user
        }
      })
      if ( userExist.length ) {
        this.userExistMessage = "Ups... the user already exist"
        return
      }
      
      this.userExistMessage = ""
      users.push(user)
      window.localStorage.setItem('usersWeatherHub', JSON.stringify(users))
      window.localStorage.setItem('userLoggedWeatherHub', JSON.stringify(true))
      window.localStorage.setItem('userWeatherHub', JSON.stringify(user))
      this.user = user
      this.userLogged = true
    },
    login(user) {
      const users = JSON.parse(window.localStorage.getItem('usersWeatherHub')) || []
      const userExist = users.filter((userE) => {
        if ( userE.inputEmail === user.inputEmail && userE.inputPassword === user.inputPassword ) {
          return user
        }
      })
      if ( !userExist.length ) {
        this.userNotExistMessage = "Ups... the user does not exist or the password is incorrect"
        return
      }

      this.userNotExistMessage = ""
      window.localStorage.setItem('userLoggedWeatherHub', JSON.stringify(true))
      window.localStorage.setItem('userWeatherHub', JSON.stringify(userExist[0]))
      this.user = userExist[0]
      this.userLogged = true
    },
    logout() {
      window.localStorage.removeItem('userLoggedWeatherHub')
      window.localStorage.removeItem('userWeatherHub')
      this.userName = ""
      this.user = { inputUsername: "" }
      this.userLogged = false
    },
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
  <Header :logout="logout" :isLogged="userLogged" />
  <!-- <RouterView :login="login" :logout="logout" :isLogged="userLogged" :validateUserLogged="validateUserLogged" :userName="userName" /> -->
  <RouterView :sigin="sigin" :login="login" :logout="logout" :isLogged="userLogged" :validateUserLogged="validateUserLogged" :user="user" :userExistMessage="userExistMessage" :userNotExistMessage="userNotExistMessage" />
</template>

<style scoped lang="scss">
  main {
    //height: 85vh;
    margin: 0;
  }
</style>
