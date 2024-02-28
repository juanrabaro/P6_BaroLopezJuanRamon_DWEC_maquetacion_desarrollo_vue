<script>
import axios from 'axios'

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
    }
  },
  methods: {
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
    login(user) {
      const users = JSON.parse(window.localStorage.getItem('usersWeatherHub')) || []
      const userExist = users.filter((userE) => {
        if (userE.inputEmail === user.inputEmail && userE.inputPassword === user.inputPassword) {
          return user
        }
      })
      console.log(userExist);
      if (!userExist.length) {
        this.userNotExistMessage = "Ups... the user does not exist or the password is incorrect"
        return
      }

      this.userNotExistMessage = ""
      window.localStorage.setItem('userLoggedWeatherHub', JSON.stringify(true))
      window.localStorage.setItem('userWeatherHub', JSON.stringify(userExist[0]))
      this.$root.user = userExist[0]
      this.$root.userLogged = true
    },
    signinDB(user) {
      console.log(user.inputEmail);
      console.log(user.inputUsername);
      console.log(user.inputPassword);

      const data = {
        nombre_usuario: user.inputUsername,
        email: user.inputEmail,
        password: user.inputPassword,
      }

      axios.post('http://localhost:80/api/register', data)
        .then((response) => {
          console.log(response);
          this.$root.user = data
          this.$root.userLogged = true
        })
        .catch((error) => {
          console.log(error);
        })

    },
    sigin(user) {
      const users = JSON.parse(window.localStorage.getItem('usersWeatherHub')) || []

      const userExist = users.filter((userE) => {
        if (userE.inputEmail === user.inputEmail) {
          return user
        }
      })
      if (userExist.length) {
        this.userExistMessage = "Ups... the user already exist"
        return
      }

      this.userExistMessage = ""
      users.push(user)
      window.localStorage.setItem('usersWeatherHub', JSON.stringify(users))
      window.localStorage.setItem('userLoggedWeatherHub', JSON.stringify(true))
      window.localStorage.setItem('userWeatherHub', JSON.stringify(user))

      this.$root.user = user
      this.$root.userLogged = true
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
    <!-- <button v-if="actualForm === 'sign-in'" v-bind:disabled="!allReady" @click="() => sigin(userData)">Sign In</button> -->
    <button v-if="actualForm === 'sign-in'" v-bind:disabled="!allReady" @click="() => signinDB(userData)">Sign In</button>
    <button v-else-if="actualForm === 'log-in'" v-bind:disabled="!allReady" @click="() => login(userData)">Log In</button>

    <p v-if="actualForm === 'sign-in'" class="change-log-sign">You already have an account? <a @click="changeForms">Log
        In</a></p>
    <p v-else-if="actualForm === 'log-in'" class="change-log-sign">You don't have an account? <a @click="changeForms">Sign
        In</a></p>
    <!-- <p v-if="validationMessage.length > 1">{{ validationMessage }}</p>
    <p v-if="userExistMessage.length">{{ userExistMessage }}</p> -->
  </form>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/main.scss';

form {
  @include flex(column, center, center, 10px);
  width: 24%;

  h2 {
    font-size: 33px;
    margin: 0;
    padding-bottom: 20px;
  }

  .container {
    @include flex(row, space-between, center);
    border: 3px solid rgb(42, 59, 130);
    border-radius: 7px;
    width: 100%;

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

  .change-log-sign {
    font-size: 17px;
    margin-top: 0;
    width: 200px;
    padding-bottom: 100px;

    a {
      text-decoration: none;
      color: rgb(42, 59, 130);
      cursor: pointer;
    }

    a:hover {
      color: rgb(95, 35, 9);
    }
  }
}
</style>