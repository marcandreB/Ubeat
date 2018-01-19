<template>
  <div class="search">
    <div class="hero is-info">
      <div class="hero-body title is-1">Search for artists</div>
    </div>
    <div class="no-search container">
      <autocomplete :onupdate="fetchArtists()" :onselect="onSelect" :onsubmit="onSubmit"></autocomplete>
    </div>
    <div class="artists">
      <router-link :key="index" :to="{ path: `artists/${artist.id}` }" class="artist box" v-for="(artist, index) in artists">
        {{ artist.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
  import Autocomplete from '../Autocomplete';
  import { searchClient } from '../../clients/clients';

  export default {
    components: {
      Autocomplete
    },
    data() {
      return {
        artists: []
      };
    },
    methods: {
      fetchArtists() {
        return searchClient.searchArtists.bind(searchClient);
      },
      onSelect(artist) {
        this.updateArtists(artist.name);
      },
      onSubmit(name) {
        this.updateArtists(name);
      },
      updateArtists(query) {
        searchClient.searchArtists(query).then((artists) => {
          this.artists = artists;
        });
      }
    }
  };
</script>

<style>
  .title {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .hero {
    margin-bottom: 25px;
  }

  .search {
    text-align: center;
  }

  .artists {
    margin: 50px;
  }

  @media screen and (max-width: 900px) {
    .container {
      margin-left: 12px;
      margin-right: 12px;
    }
  }
</style>
