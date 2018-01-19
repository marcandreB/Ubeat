<template>
    <div class="artist">
      <div class="artist-info">
        <div>
          <h3 class="title is-3"> {{ artist.name }} </h3>
          <h5 class="subtitle is-5"> Genre: {{ artist.genre }} </h5>
        </div>
          <img class="artist-img" v-if="albums != null" :src="albums[albums.length-1].img">
        <div>
          <a :href= "artist.url" style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/assets/shared/badges/en-us/music-lrg.svg) no-repeat;width:157px;height:45px;background-size:contain;"></a>
        </div>
      </div>

      <div class="album-list">
        <div class="album" v-for="item in albums">
          <router-link :to="{ path: '/albums/' + item.albumId }" tag="a">
            <figure class="image is-128x128">
              <img :src="item.img">
            </figure>
            {{ item.title }}
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
  import { artistClient } from '../../clients/clients';

  export default {
    props: ['artistId'],
    data() {
      return {
        artist: {},
        albums: null
      };
    },
    created() {
      artistClient.fetchArtist(this.artistId).then((artist) => {
        this.artist = artist;
      });
      artistClient.fetchAlbums(this.artistId).then((albums) => {
        this.albums = albums;
      });
    }
  };
</script>

<style scoped>
  .artist{
    padding: 5px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .album-list{
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
  }

  .album{
    padding: 5px;
    flex-basis: 0;
  }

  img{
    border-radius: 10px;
  }

  @media screen and (min-width: 900px) {
    .artist-img{
      width: 20%;
      height: 20%;
    }
  }

  @media screen and (min-width: 500px) and (max-width: 900px) {
    .artist {
      flex-direction: column;
    }

    .artist-info{
      display: flex;
      justify-content: space-around;
    }

    .artist-img{
      width: 35%;
      height: 35%;
    }

    .album-list{
      justify-content: space-around;
    }
  }

  @media screen and (max-width: 500px) {
    .artist{
      flex-direction: column;
    }

    .artist-info{
      text-align: center;
    }

    .album-list{
      justify-content: center;
    }

    .artist-img{
      width: 50%;
      height: 50%;
    }
  }

</style>
