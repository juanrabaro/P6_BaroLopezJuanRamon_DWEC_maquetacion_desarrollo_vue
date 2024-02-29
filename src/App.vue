<script>
import Header from './components/layout/Header.vue';

export default {
  components: {
    Header
  },
}
</script>

<template>
  <Header />
  <RouterView />
</template>

<style scoped lang="scss">
  main {
    margin: 0;
  }
</style>
