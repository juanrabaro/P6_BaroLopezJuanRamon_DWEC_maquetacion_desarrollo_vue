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
      console.log('Email:', this.email);
      console.log('Message:', this.message);
      this.sendedMessage = true;
      this.email = ""
      this.message = ""
      this.enableButton = false;
    },
    validateInputs(label, value) {
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
        <p v-if="errorEmail !=='' ">{{ errorEmail }}</p>
      </div>
      <div class="mensaje">
        <label>Mensaje:</label>
        <textarea v-model="message" v-on:input="validateInputs('message', message)" placeholder="Message"></textarea>
        <p v-if="errorMessage !=='' ">{{ errorMessage }}</p>
      </div>
      <!-- <button type="submit" v-bind:disabled="!allReady">Send</button> -->
      <button type="submit" v-bind:disabled="!enableButton">Send</button>
      <p v-if="sendedMessage">Message sended!!</p>
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
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 17px;
      width: 20%;

      .email, .mensaje {
        display: flex;
        flex-direction: column;
        gap: 5px;

        textarea {
          resize: none;
          height: 50px;
        }

      }

      button {
        padding: 5px 10px 5px 10px;
        width: 50%;
        margin: 0 auto;
        background-color: rgb(56, 87, 148);
        color: white;
        border: none;
        border-radius: 5px;
      }
      button:hover {
        background-color: rgb(46, 46, 98);
      }
      button:disabled {
        background-color: rgb(114, 114, 158);
      }
    }
  }
</style>