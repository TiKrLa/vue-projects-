<template>
  <div id="app">

    <div class="loader" v-if="allItems-length == 0"></div>

    <img src="./assets/images/brewdog.png" id="logo" alt="Brewdog" />

    <div id="items">

      <ItemCard
       v-for="item in allItems"
       :key="item.id" 
       :id="item.id"
       :image="item.image_url"
       :name="item.name" 
       :tagline="item.tagline">
      </ItemCard>

    </div>

    <button
      class="load-more"
      :class="{loading: loading}"
      :disabled="loading"
      @click="loadMore">
        Load more
     </button>

    <ItemDetails 
      :class="{show: showItem}"
      v-bind="showItem">
    </ItemDetails>

  </div>
</template>

<script>
import {eventBus} from './main.js';
import axios from 'axios';
import ItemCard from './components/ItemCard.vue';
import ItemDetails from './components/ItemDetails.vue';

export default {
  name: 'App',
  components: {
    ItemCard,
    ItemDetails
  },
  data() {
    return {
      page: 1,
      perPage: 12,
      allItems: [],
      loading: true,
      showItem: null
    }
  },
  created() {
    eventBus.$on('showDetails', (itemId) => {
      //console.log('App.vue vastaanotti kaljan id ' + itemId);
      this.showItem = this.allItems.find(item => item.id == itemId);
    });

    eventBus.$on('closeDetails', () => {
      this.showItem = null;
    });
  },
  mounted() {
    //console.log('Komponentti rendattu domiin');
    this.getItems();
  },
  methods: {
    getItems() {
      //console.log('Pitäis ladata oluet apista');
      this.loading = true;
      axios.get('https://api.punkapi.com/v2/beers', {
        params: {
          page: this.page,
          per_page: this.perPage
        }
      })
      .then((response) => {
        //console.log(response);
        this.allItems = this.allItems.concat(response.data);
        console.log(this.allItems);
      })
      .catch(function(error) {
        console.error(error);
      })
      .then(() => {
        this.loading = false;
      });
    },
    loadMore() {
      //console.log('Pitäis ladata lisää...');
      this.page++;
      this.getItems();
    }
  }
}
</script>

<style scoped>
#logo {
  display: block;
  max-width: 120px;
  height: auto;
  margin: 1rem auto;
}

#items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 768px;
  margin: 0 auto;
}
.load-more {
  display: block;
  margin: 2rem auto;
}
</style>
