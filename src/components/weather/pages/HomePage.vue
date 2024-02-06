<script>
export default {
  name: 'HomePage',
  props: {
    login: Function,
    logout: Function,
    isLogged: Boolean,
    userName: String,
  },
  methods: {
    onLogin(user) {
      console.log(user)
      console.log("signing in");
      this.login(user)
    },
    onLogout() {
      console.log("logged out")
      this.logout()
    },
  },
}
</script>

<template>
  <main>
    <h1>Home Page</h1>
    <h2 v-if="userName.length > 0">Hello {{ userName }}</h2>
    <button @click="()=>onLogin('UserPrueba')">Sign In</button>
    <button @click="onLogout">Log Out</button>
  </main>
</template>

<style scoped>
  h1 {
    margin: 0;
  }
</style>