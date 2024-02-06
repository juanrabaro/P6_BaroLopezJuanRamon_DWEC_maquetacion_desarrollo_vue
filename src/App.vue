<script>
import Header from './components/shared/Header.vue';

export default {
  components: {
    Header
  }
}
</script>

<template>
  <Header />
  <RouterView />
</template>

<style scoped>
  main {
    height: 85vh;
  }
</style>
