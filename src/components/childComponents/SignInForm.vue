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
      },
      allReady: false,
      validationMessage: "",
    }
  },
  methods: {
    onSigin(user) {
      console.log(user)
      console.log("signing in")
      this.sigin(user)
    },
    validateForm() {
      if (this.userData.inputUsername.length < 8 && this.userData.inputUsername.length > 0) {
        this.validationMessage = "The username must have at least 8 characters"
        this.allReady = false
        return
      } else {
        this.validationMessage = ""
      }

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
      

      if ( this.userData.inputUsername.length < 1 || this.userData.inputEmail.length < 1 || this.userData.inputPassword.length < 1 ) {
        this.allReady = false
        return
      } else {
        this.validationMessage = ""
      }
      
      this.validationMessage = ""
      this.allReady = true
    }
  }
}
</script>

<template>
  <form v-on:submit.prevent="sendMessage">
    <h2>Sign In</h2>
    <input type="text" v-on:input="validateForm" v-model="userData.inputUsername" placeholder="Username" />
    <input type="email" v-on:input="validateForm" v-model="userData.inputEmail" placeholder="Email" />
    <input type="password" v-on:input="validateForm" v-model="userData.inputPassword" placeholder="Password" />
    <button v-bind:disabled="!allReady" @click="()=>onSigin(userData)">Sign In</button>
    <p v-if="validationMessage.length > 1">{{ validationMessage }}</p>
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
  
  button:disabled {
    background-color: rgb(95, 95, 137);
  }
}
</style>