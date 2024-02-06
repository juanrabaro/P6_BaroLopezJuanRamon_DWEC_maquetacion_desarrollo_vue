<script>
import Header from './components/shared/Header.vue';

export default {
  components: {
    Header
  },
  methods: {
    login(user) {
      this.$store.dispatch('setUser', user)
    },
    logout() {
      this.$store.dispatch('setUser', null)
    }
  },
  computed: {
    isUserLoggedIn() {
      console.log(this.$store.getters.isUserLoggedIn);
      return this.$store.getters.isUserLoggedIn
    }
  }
}
</script>

<template>
  <Header :logout="logout" :isLogged="isUserLoggedIn" />
  <RouterView :login="login" :logout="logout" :isLogged="isUserLoggedIn" />
</template>

<style scoped>
  main {
    height: 85vh;
  }
</style>
