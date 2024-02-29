<script>
export default {
  name: 'ContactPage',

  data() {
    return {
      email: "",
      message: "",
      allReady: false,
      errorEmail: "",
      errorMessage: "",
      sendedMessage: false,
      enableButton: false,
    }
  },
  methods: {
    sendMessage() {
      this.sendedMessage = true;
      this.email = ""
      this.message = ""
      this.enableButton = false;
    },
    validateInputs() {
      if (!this.emailValidation) {
        this.errorEmail = 'Email is not valid!!';
        this.allReady = false;
        this.enableButton = false;
      } else {
        this.errorEmail = '';
      }

      if (!this.messageValidation && this.emailValidation && this.message.length >= 1) {
        this.errorMessage = 'Message must have at least 8 characters!!';
        this.allReady = false;
        this.enableButton = false;
      } else {
        this.errorMessage = '';
      }

      if (this.emailValidation && this.messageValidation) {
        this.allReady = true;
        this.enableButton = true;
        this.errorMessage = '';
        this.errorEmail = '';
      }
    },
  },
  computed: {
    emailValidation() {
      if (this.email.includes('@') && this.email.includes('.') && this.email.length >= 1) {
        return true
      }
      return false
    },
    messageValidation() {
      if (this.message.length >= 8) {
        return true
      }
      return false
    },
  }
}
</script>

<template>
  <main>
    <h1>Contact Page</h1>
    <form v-on:submit.prevent="sendMessage">
      <div class="email">
        <label>Email:</label>
        <input v-model="email" v-on:input="validateInputs('email', email)" type="email" placeholder="Email">
        <p class="error-message" v-if="errorEmail !== ''">{{ errorEmail }}</p>
      </div>
      <div class="mensaje">
        <label>Mensaje:</label>
        <textarea v-model="message" v-on:input="validateInputs('message', message)" placeholder="Message"></textarea>
        <p class="error-message" v-if="errorMessage !== ''">{{ errorMessage }}</p>
      </div>
      <button type="submit" v-bind:disabled="!enableButton">Send</button>
      <p class="message-sended" v-if="sendedMessage">Message sended!!</p>
    </form>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding-top: 60px;

  h1 {
    margin: 0;
    font-size: 45px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 17px;
    width: 300px;

    .email,
    .mensaje {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .error-message {
        text-align: center;
        font-size: 18px;
        font-family: 'Lato', sans-serif;
        margin: 0;
        margin-top: 3px;
      }

      label {
        font-size: 18px;
        font-weight: bold;
      }

      textarea {
        resize: none;
        height: 50px;
        border: 0;
        background-color: rgb(209, 218, 233);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        border-radius: 3px;
        font-size: 17px;
        padding: 7px 10px 7px 10px;
        font-family: 'Lato', sans-serif;
      }

      input {
        border: 0;
        background-color: rgb(209, 218, 233);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        border-radius: 3px;
        font-size: 17px;
        padding: 7px 10px 7px 10px;
        font-family: 'Lato', sans-serif;
      }

    }

    button {
      margin: 0 auto;
      display: block;
      background-color: rgb(42, 59, 130);
      color: rgb(229, 242, 253);
      padding: 8px 50px 8px 50px;
      font-size: 18px;
      border-radius: 8px;
      border: 0;
      cursor: pointer;
      width: 150px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      transition: all 0.3s;
    }

    button:hover {
      background-color: rgb(5, 20, 88);
    }

    button:disabled {
      background-color: rgb(114, 114, 158);
    }

    .message-sended {
      text-align: center;
      font-family: 'Lato', sans-serif;
      font-weight: bold;
      font-size: 20px;
      margin: 0;
    }
  }
}
</style>