<script>
import { useLoggedStore } from "../stores/loggedStore"
import { mapState, mapActions } from "pinia"

export default {
  name: 'Header',
  computed: {
    ...mapState(useLoggedStore, ["userLogged"]),
  },
  methods: {
    ...mapActions(useLoggedStore, ["logOutStore"]),
    
    // Desloguea al usuario
    logout() {
      this.logOutStore()
    },
    
    // Redirige al usuario a la página de inicio y al formulario de login o signin
    goToLogIn() {
      if (this.$route.path !== '/') {
        this.$router.push('/').then(() => {
          this.$nextTick(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          });
        });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    }
  },
}
</script>

<template>
  <header>
    <a href="/">
      <div class="logo-container">
        <img src="/cloud_3220.png" alt="IMGLOGO">
        <h2>WeatherHub</h2>
      </div>
    </a>

    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/world-time">World Time</router-link>
      <router-link to="/compare-weathers">Compare Weathers</router-link>
      <router-link v-if="userLogged.logged" to="/search-history">Search History</router-link>
      <router-link to="/contact">Contact Us</router-link>
      <a v-if="!userLogged.logged" @click="goToLogIn" class="log-in-button">Sign In</a>
      <router-link v-else-if="userLogged.logged" @click="logout" to="/" class="log-in-button">Log Out</router-link>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/main.scss';

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 18vh;
  padding: 0 5% 0 5%;
  font-size: 19px;

  a {
    text-decoration: none;
    color: black;
    word-spacing: -2.9px;
  }

  .router-link-exact-active {
    //color: rgb(201, 226, 255);
    color: rgb(220, 238, 253);
  }
  
  a:hover {
    color: rgb(220, 238, 253);
    //color: rgb(56, 87, 148);
  }

  .logo-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;

    img {
      width: 50px;
    }
  }

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 19px;

    .log-in-button {
      padding: 5px 10px;
      border-radius: 5px;
      background-color: rgb(42, 59, 130);
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }

    .log-in-button:hover {
      background-color: rgb(5, 20, 88);
    }
  }
}

@media (max-width: 1050px) {
  header {
    flex-direction: column;
  }
}
</style>
