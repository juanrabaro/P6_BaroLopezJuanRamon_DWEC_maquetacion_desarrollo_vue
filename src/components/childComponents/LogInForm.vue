<script>
export default {
  name: 'LogInForm',
  props: {
    login: Function,
    userExistMessage: String,
  },
  data() {
    return {
      userData: {
        // inputUsername: "",
        inputEmail: "",
        inputPassword: "",
      }
    }
  },
  methods: {
    onLogin(user) {
      console.log(user)
      console.log("logging in")
      this.login(user)
    },
    sendMessage() {
      console.log("enviado");
    }
  }
}
</script>

<template>
  <form v-on:submit.prevent="sendMessage">
    <h2>Log In</h2>
    <!-- <input type="text" v-model="userData.inputUsername" placeholder="Username" /> -->
    <input type="email" v-model="userData.inputEmail" placeholder="Email" />
    <input type="password" v-model="userData.inputPassword" placeholder="Password" />
    <button @click="()=>onLogin(userData)">Log In</button>
    <p v-if="userExistMessage.length > 1">{{ userExistMessage }}</p>
  </form>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/main.scss';

form {
  @include flex(column, center, center, 10px);

  h2 {
    margin: 0;
  }

  button {
    padding: 5px 10px;
    border-radius: 5px;
    background-color: rgb(56, 87, 148);
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: rgb(46, 46, 98);
  }

  p {
    max-width: 70%;
    text-align: center;
  }
}
</style>