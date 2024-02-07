<script>
import SignInForm from './SignInForm.vue';
export default {
  name: 'HomePage',
  components: {
    SignInForm,
},
  props: {
    login: Function,
    logout: Function,
    isLogged: Boolean,
    userName: String,
  },
  methods: {
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
    <SignInForm :login="login" />
    <button @click="onLogout">Log Out</button>
  </main>
</template>

<style scoped lang="scss">
  @import '/src/assets/styles/main.scss';

  main {
    @include flex(column, flex-start, center, 10px);
    border: 2px solid black;
  }
</style>