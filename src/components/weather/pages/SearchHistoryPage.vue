<script>
export default {
  name: 'SearchHistoryPage',
  props: {
    isLogged: Boolean,
  },
  created() {
    if (!this.isLogged) {
      this.$router.push('/');
    }
  },
}
</script>

<template>
  <main>
    <h1>SearchHistoryPage</h1>
  </main>
</template>

<style scoped>
  h1 {
    margin: 0;
  }
</style>