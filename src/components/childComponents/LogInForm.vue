<script>
export default {
  name: 'LogInForm',
  props: {
    login: Function,
    userNotExistMessage: String,
  },
  data() {
    return {
      userData: {
        inputEmail: "",
        inputPassword: "",
      },
      allReady: false,
      validationMessage: "",
    }
  },
  methods: {
    onLogin(user) {
      console.log(user)
      console.log("logging in")
      this.login(user)
    },
    validateForm() {
      if (this.userData.inputEmail.length > 0 && !this.userData.inputEmail.includes('@') || !this.userData.inputEmail.includes('.')) {
        this.validationMessage = "The email is not in the correct format"
        this.allReady = false
        return
      } else {
        this.validationMessage = ""
      }
      

      if (this.userData.inputPassword.length < 8 && this.userData.inputPassword.length > 0) {
        this.validationMessage = "The password must have at least 8 characters"
        this.allReady = false
        return
      } else {
        this.validationMessage = ""
      }
      

      if ( this.userData.inputEmail.length < 1 || this.userData.inputPassword.length < 1 ) {
        this.allReady = false
        return
      } else {
        this.validationMessage = ""
      }
      
      this.validationMessage = ""
      this.allReady = true
    },
  }
}
</script>

<template>
  <form v-on:submit.prevent="sendMessage">
    <h2>Log In</h2>
    <input type="email" v-on:input="validateForm" v-model="userData.inputEmail" placeholder="Email" />
    <input type="password" v-on:input="validateForm" v-model="userData.inputPassword" placeholder="Password" />
    <button v-bind:disabled="!allReady" @click="()=>onLogin(userData)">Log In</button>
    <p v-if="validationMessage.length">{{ validationMessage }}</p>
    <p v-if="userNotExistMessage.length">{{ userNotExistMessage }}</p>
  </form>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/main.scss';

form {
  @include flex(column, center, center, 10px);
  width: 20%;

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

  button:disabled {
    background-color: rgb(95, 95, 137);
  }
}
</style>