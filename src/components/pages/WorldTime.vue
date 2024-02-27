<script>
import SearchInput from '../childComponents/SearchInput.vue';

export default {
  name: 'WorldTime',
  components: { SearchInput },
  data() {
    return {
      citySearched: null,
      showData: false,
    }
  },
  methods: {
    handleSearch(citySearched) {
      this.citySearched = citySearched;
      this.showData = true;
    }
  }
}
</script>

<template>
  <main>
    <h1>World Time</h1>
    <h3>Search the time in any city!</h3>
    <SearchInput @searched="handleSearch" />
    <div v-if="citySearched">
      <p>{{ citySearched.zonaHoraria.horaZona }}</p>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/main.scss';

main {
  h1 {
    margin-top: 50px;
    margin-bottom: 0;
    font-size: 40px;
    text-align: center;
  }

  h3 {
    text-align: center;
    font-family: 'Lato regular';
    margin-top: 10px;
  }
}
</style>