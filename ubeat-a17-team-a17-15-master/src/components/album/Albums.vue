<template>
  <div class="search">
    <div class="hero is-info">
      <div class="hero-body title is-1">Search for albums</div>
    </div>
    <div class="no-search container">
      <autocomplete :onupdate="fetchAlbums()" :onselect="onSelect" :onsubmit="onSubmit"></autocomplete>
    </div>
    <div class="albums">
      <router-link :key="index" :to="{ path: `albums/${album.id}` }" class="album-list box" v-for="(album, index) in albums">
        <figure class="image is-48x48">
          <img :src="album.img">
        </figure>
        {{ album.name }}
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
        albums: []
      };
    },
    methods: {
      fetchAlbums() {
        return searchClient.searchAlbums.bind(searchClient);
      },
      onSelect(album) {
        this.updateAlbums(album.name);
      },
      onSubmit(name) {
        this.updateAlbums(name);
      },
      updateAlbums(query) {
        searchClient.searchAlbums(query).then((albums) => {
          this.albums = albums;
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

  .albums {
    margin: 50px;
  }

  .album-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 900px) {
    .container {
      margin-left: 12px;
      margin-right: 12px;
    }
  }
</style>
