<script>
export default {
  name: 'SignInForm',
  props: {
    sigin: Function,
  },
  data() {
    return {
      userData: {
        inputUsername: "",
        inputEmail: "",
        inputPassword: "",
      }
    }
  },
  methods: {
    onSigin(user) {
      console.log(user)
      console.log("signing in")
      this.sigin(user)
    },
    sendMessage() {
      console.log("enviado");
    }
  }
}
</script>

<template>
  <form v-on:submit.prevent="sendMessage">
    <h2>Sign In</h2>
    <input type="text" v-model="userData.inputUsername" placeholder="Username" />
    <input type="email" v-model="userData.inputEmail" placeholder="Email" />
    <input type="password" v-model="userData.inputPassword" placeholder="Password" />
    <button @click="()=>onSigin(userData)">Sign In</button>
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
}
</style>