<script>
import SearchInput from '../childComponents/SearchInput.vue';
import moment from 'moment'

export default {
  name: 'WorldTime',
  components: { SearchInput },
  data() {
    return {
      citySearched: null,
      showData: false,
      time: moment().format('HH:mm:ss')
    }
  },
  methods: {
    handleSearch(citySearched) {
      this.citySearched = citySearched;
      this.showData = true;
    }
  },
  created() {
    setInterval(() => {
      if ( this.citySearched ) {
        this.time = moment().add(this.citySearched.zonaHoraria.horaZona, 'hours').format('HH:mm:ss');
      }
    }, 1000);
  }
}
</script>

<template>
  <main>
    <h1>World Time</h1>
    <h3>Search the current time in any city!</h3>
    <SearchInput @searched="handleSearch" />
    <div class="current-time" v-if="citySearched">
      <p>In <span>{{ citySearched.nombreCiudad }}</span> it is {{ time }}</p>
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
    margin-top: 10px;
  }

  .current-time {
    text-align: center;
    margin-top: 20px;
    font-size: 30px;

    span {
      color: blue;
    }
  }
}
</style>