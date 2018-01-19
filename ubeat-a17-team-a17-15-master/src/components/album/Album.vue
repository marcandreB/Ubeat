<template>
  <div class="album" v-if="album">
    <div class="album-info">
      <div class="album-cover"><img width="100%" height="100%" :src="album.artworkUrl100"></div>
      <div class="album-desc">
        <h3 class="title is-3"> {{album.collectionName}} </h3>
        <h4 class="subtitle is-4"> {{album.artistName}} </h4>
        <h5 class="subtitle is-5">Genre: {{album.primaryGenreName}}</h5>
        <h5 class="subtitle is-5"> {{album.releaseDate.toLocaleDateString()}} </h5>
        <a :href="album.artistViewUrl" style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/assets/shared/badges/en-us/music-lrg.svg) no-repeat;width:157px;height:45px;background-size:contain;"></a>
      </div>
    </div>
    <tracks :tracks="album.tracks"></tracks>
  </div>
</template>

<script>
  import Tracks from './Tracks';
  import { albumClient } from '../../clients/clients';

  export default {
    components: {
      tracks: Tracks,
    },
    props: ['albumId'],
    data() {
      return {
        album: null,
      };
    },
    created() {
      albumClient.fetchAlbum(this.albumId).then((album) => {
        this.album = album;
        this.album.tracks.sort((first, second) => first - second);
      });
    }
  };
</script>

<style scoped>
  .album {
    padding: 5px;
    margin: 10px;
    display: flex;
    align-items: flex-start;
  }

  .album-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-around;
    align-items: center;
    margin: 0 10px 10px;
    max-width: 600px;
  }

  .album-cover {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
  }

  .album-desc {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
  }

  img {
    display: block;
  }

  @media screen and (max-width: 600px) {
    .album {
      flex-direction: column;
      align-items: center;
    }
  }

  @media screen and (min-width: 600px) and (max-width: 900px){
    .album {
      flex-direction: column;
    }

    .album-info {
      flex-direction: row;
      width: 100%;
    }
  }
</style>
