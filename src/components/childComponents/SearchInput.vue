<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      searchInput: '',
      initialLoading: true,
      cityData: null,
      citySearched: null,
    }
  },
  emits: ['searched'],
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://localhost/api/ciudades');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        this.initialLoading = false;

        const responseData = await response.json();
        this.cityData = responseData.data;

      } catch (error) {
        console.error('Error:', error);
      }
    },
    search() {
      const cityNameList = this.cityData.map((city) => {
        return city.nombreCiudad.toLowerCase().trim().replace(/\s+/g, '');
      });

      const formatedInput = this.searchInput.toLowerCase().trim().replace(/\s+/g, '');

      if ( cityNameList.includes(formatedInput) ) {
        const citySearchedIndex = cityNameList.indexOf(formatedInput)
        this.citySearched = this.cityData[citySearchedIndex];
         
        this.$emit('searched', this.citySearched);
      }
    }
  },
  created() {
    this.fetchData();
  },
}
</script>

<template>
  <div class="search">
    <input v-model="searchInput" v-if="!initialLoading" type="text" placeholder="Search for a city">
    <button v-on:click="search" v-if="!initialLoading">Search</button>
    <div v-if="initialLoading" class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/main.scss';

.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input {
    padding: 7px 15px 7px 15px;
    border-radius: 8px;
    font-size: 19px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 10px;
    border: 0;
    width: 250px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }

  button {
    background-color: rgb(42, 59, 130);
    color: rgb(229, 242, 253);
    padding: 8px 50px 8px 50px;
    font-size: 18px;
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    width: 150px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    transition: all 0.3s;
  }

  button:hover {
    background-color: rgb(5, 20, 88);
  }

  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }

  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(24px, 0);
    }
  }
}
</style>