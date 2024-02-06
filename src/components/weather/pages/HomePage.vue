<script>
export default {
  name: 'HomePage',
  props: {
    login: Function,
    logout: Function,
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
    <h2>Aquí estarán los formularios para iniciar sesión y registrarse</h2>
    <button @click="()=>onLogin('UserPrueba')">Sign In</button>
    <button @click="onLogout">Log Out</button>
  </main>
</template>

<style scoped>
  h1 {
    margin: 0;
  }
</style>