<script>
export default {
  name: 'SignInForm',
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
    }
  },
  methods: {
    sigin(user) {
      const users = JSON.parse(window.localStorage.getItem('usersWeatherHub')) || []

      const userExist = users.filter((userE) => {
        if ( userE.inputEmail === user.inputEmail ) {
          return user
        }
      })
      if ( userExist.length ) {
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
    <div class="container">
      <div class="label-container">
        <label for="username">Username</label>
      </div>
      <div class="input-container">
        <input id="username" type="text" v-on:input="validateForm" v-model="userData.inputUsername" placeholder="ManuelApruebame" />
      </div>
    </div>
    <div class="container">
      <div class="label-container">
        <label for="email">Email</label>
      </div>
      <div class="input-container">
        <input id="email" type="email" v-on:input="validateForm" v-model="userData.inputEmail" placeholder="manuelapruebame@gmail.com" />
      </div>
    </div>
    <div class="container">
      <div class="label-container">
        <label for="password">Password</label>
      </div>
      <div class="input-container">
        <input id="password" type="password" v-on:input="validateForm" v-model="userData.inputPassword" placeholder="Password" />
      </div>
    </div>
    <button v-bind:disabled="!allReady" @click="()=>sigin(userData)">Sign In</button>
    <p v-if="validationMessage.length > 1">{{ validationMessage }}</p>
    <p v-if="userExistMessage.length">{{ userExistMessage }}</p>
  </form>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/main.scss';

form {
  @include flex(column, center, center, 10px);
  width: 20%;
  border-right: 5px solid rgb(36, 49, 98);
  padding-right: 30px;

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
      
      label {
        padding: 7px 5px 7px 6px;
      }
    }
    .input-container {
      @include flex(row, center, center);
      background-color: rgb(209, 218, 233);
      width: 65%;
      height: 19px;
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
      }
      input:focus {
        border-color: red;
      }
    }
  }

  button {
    background-color: rgb(42, 59, 130);
    padding: 7px 30px;
    margin-top: 7px;
    font-size: 17px;
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
  }
  
  button:disabled {
    background-color: rgb(95, 95, 137);
  }
}
</style>