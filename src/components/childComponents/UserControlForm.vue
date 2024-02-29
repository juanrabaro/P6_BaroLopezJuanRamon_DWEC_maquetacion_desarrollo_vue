<script>
import axios from 'axios'
import { useLoggedStore } from "../stores/loggedStore"
import { mapState, mapActions } from "pinia"

export default {
  name: 'UserControlForm',
  data() {
    return {
      userData: {
        inputUsername: "",
        inputEmail: "",
        inputPassword: "",
      },
      allReady: false,
      validationMessage: "",
      userExistMessage: "",
      userNotExistMessage: "",
      actualForm: "sign-in",
      loadingSignInLogIn: false,
    }
  },
  computed: {
    ...mapState(useLoggedStore, ["userLogged"]),
  },
  methods: {
    // Importa las acciones de useLoggedStore
    ...mapActions(useLoggedStore, ["logInStore"]),

    // Vacía las variables de validación del formulario
    cleanVariables() {
      this.userData = {
        inputUsername: "",
        inputEmail: "",
        inputPassword: "",
      }
      this.allReady = false
      this.validationMessage = ""
      this.userExistMessage = ""
      this.userNotExistMessage = ""
    },
    // Cambia el formulario de sign-in a log-in y viceversa
    changeForms() {
      if (this.actualForm === "sign-in") {
        this.actualForm = "log-in"
        this.cleanVariables()
      } else {
        this.actualForm = "sign-in"
        this.cleanVariables()
      }
      console.log(this.actualForm);
    },
    loginDB(user) {
      const data = {
        email: user.inputEmail,
        password: user.inputPassword,
      }

      this.loadingSignInLogIn = true

      axios.post('http://localhost:80/api/login', data)
        .then((response) => {
          console.log(response);
          this.logInStore(response.data.token)
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.cleanVariables()
        })
        .catch((error) => {
          console.log(error.response.data.error);
          this.userNotExistMessage = "Ups... the user does not exist or the password is incorrect"
        })
        .finally(() => {
          this.loadingSignInLogIn = false
        })
    },
    signinDB(user) {
      const data = {
        nombre_usuario: user.inputUsername,
        email: user.inputEmail,
        password: user.inputPassword,
      }

      this.loadingSignInLogIn = true

      axios.post('http://localhost:80/api/register', data)
        .then((response) => {
          console.log(response);
          this.logInStore(response.data.token.original.token)
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.cleanVariables()
        })
        .catch((error) => {
          console.log(error.response.data.error);
          if (error.response.data.error === "error, usuario ya registrado o hay otro error") {
            this.userExistMessage = "Ups... the user already exist"
          }
        })
        .finally(() => {
          this.loadingSignInLogIn = false
        })

    },
    // Valida si el formulario es para sign  in
    validateSigIn() {
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


      if (this.userData.inputUsername.length < 1 || this.userData.inputEmail.length < 1 || this.userData.inputPassword.length < 1) {
        this.allReady = false
        return
      } else {
        this.validationMessage = ""
      }

      this.validationMessage = ""
      this.allReady = true
    },
    // Valida si el formulario es para log in
    validateLogIn() {
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


      if (this.userData.inputEmail.length < 1 || this.userData.inputPassword.length < 1) {
        this.allReady = false
        return
      } else {
        this.validationMessage = ""
      }

      this.validationMessage = ""
      this.allReady = true
    },
    // Valida el formulario
    validateForm() {
      if (this.actualForm === "sign-in") {
        this.validateSigIn()
        return
      }
      this.validateLogIn()
    }
  }
}
</script>

<template>
  <form v-on:submit.prevent="sendMessage">
    <h2 v-if="actualForm === 'sign-in'">Sign In</h2>
    <h2 v-else-if="actualForm === 'log-in'">Log In</h2>
    <p v-if="validationMessage.length > 1">{{ validationMessage }}</p>
    <p v-if="userExistMessage.length">{{ userExistMessage }}</p>
    <p v-if="userNotExistMessage.length">{{ userNotExistMessage }}</p>
    <div v-if="actualForm === 'sign-in'" class="container">
      <div class="label-container">
        <label for="username">Username</label>
      </div>
      <div class="input-container">
        <input id="username" type="text" v-on:input="validateForm" v-model="userData.inputUsername"
          placeholder="ManuelApruebame" />
      </div>
    </div>
    <div class="container">
      <div class="label-container">
        <label for="email">Email</label>
      </div>
      <div class="input-container">
        <input id="email" type="email" v-on:input="validateForm" v-model="userData.inputEmail"
          placeholder="manuelapruebame@gmail.com" />
      </div>
    </div>
    <div class="container">
      <div class="label-container">
        <label for="password">Password</label>
      </div>
      <div class="input-container">
        <input id="password" type="password" v-on:input="validateForm" v-model="userData.inputPassword"
          placeholder="Password" />
      </div>
    </div>
    <button v-if="actualForm === 'sign-in'" v-bind:disabled="!allReady" @click="() => signinDB(userData)">Sign In</button>
    <button v-else-if="actualForm === 'log-in'" v-bind:disabled="!allReady" @click="() => loginDB(userData)">Log
      In</button>
    <div v-if="loadingSignInLogIn" class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <p v-if="actualForm === 'sign-in'" class="change-log-sign">You already have an account? <a @click="changeForms">Log
        In</a></p>
    <p v-else-if="actualForm === 'log-in'" class="change-log-sign">You don't have an account? <a @click="changeForms">Sign
        In</a></p>
  </form>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/main.scss';

form {
  @include flex(column, center, center, 10px);
  width: 300px;

  h2 {
    font-size: 37px;
    margin: 0;
    padding-bottom: 20px;
  }

  .container {
    @include flex(row, space-between, center);
    border: 3px solid rgb(42, 59, 130);
    border-radius: 7px;
    width: 100%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

    .label-container {
      @include flex(row, center, center);
      background-color: rgb(42, 59, 130);
      border-right: 3px solid rgb(42, 59, 130);
      color: rgb(224, 244, 252);
      height: 21px;
      width: 35%;
      padding: 12px 10px 12px 12px;

      label {
        padding: 7px 5px 7px 6px;
        font-size: 18px;
      }
    }

    .input-container {
      @include flex(row, center, center);
      background-color: rgb(209, 218, 233);
      width: 65%;
      height: 42px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;

      input {
        border-radius: 0;
        border: 1px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        padding-left: 5px;
        background-color: inherit;
        width: 100%;
        height: 100%;
        font-size: 18px;
      }

      input:focus {
        background-color: rgb(149, 197, 215);
      }
    }
  }

  button {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background-color: rgb(42, 59, 130);
    padding: 10px 40px;
    margin-top: 7px;
    font-size: 20px;
    border-radius: 5px;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: rgb(5, 20, 88);
  }

  p {
    max-width: 70%;
    text-align: center;
    font-size: 19px;
    margin: 0;
  }

  button:disabled {
    background-color: rgb(95, 95, 137);
  }


  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }

  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(24px, 0);
    }
  }

  .change-log-sign {
    font-size: 17px;
    margin-top: 0;
    width: 200px;
    padding-bottom: 100px;

    a {
      text-decoration: none;
      color: rgb(227, 232, 249);
      cursor: pointer;
    }

    a:hover {
      color: rgb(4, 35, 50);
    }
  }
}
</style>