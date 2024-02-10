<script>
import SignInForm from '../childComponents/SignInForm.vue';
import LogInForm from '../childComponents/LogInForm.vue';

export default {
  name: 'HomePage',
  components: {
    SignInForm,
    LogInForm,
    LogInForm
},
  props: {
    login: Function,
    logout: Function,
    isLogged: Boolean,
    user: Object,
    userExistMessage: String,
    sigin: Function,
  },
  methods: {
    onLogout() {
      console.log("logged out")
      this.logout()
    },
    async fetchData() {
      fetch('http://localhost/api/ciudades')
        .then(response => response.json())
        .then(data => console.log(data));
    },
  },
  created() {
    // this.fetchData()
  },
}
</script>

<template>
  <main>
    <h1>Home Page</h1>
    <h2 v-if="user.inputUsername.length > 0">Hello {{ user.inputUsername }}</h2>
    <div v-if="!isLogged" class="logged-container">
      <SignInForm :sigin="sigin" />
      <LogInForm :login="login" :userExistMessage="userExistMessage" />
    </div>
    <!-- <button @click="onLogout">Log Out</button> -->
  </main>
</template>

<style scoped lang="scss">
  @import '/src/assets/styles/main.scss';

  main {
    @include flex(column, flex-start, center, 10px);
    border: 2px solid black;
    
    .logged-container {
      @include flex(row, center, center, 30px);
      border: 2px solid black;
      width: 70%;

      form {
        width: 60%;
      }
    }
  }
</style>