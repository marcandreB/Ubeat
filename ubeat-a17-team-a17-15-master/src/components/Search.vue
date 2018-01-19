<template>
  <div class="search">
    <div class="albums" v-if="isAlbum()">
      <div class="hero is-info">
        <div class="hero-body title is-1">Albums</div>
      </div>
      <router-link :key="index" :to="`/albums/${album.id}`" class="album box center-content"
                   v-for="(album, index) in results.filter(r => r.type === 'album')">
        <figure class="image is-48x48">
          <img :src="album.img">
        </figure>
        {{ album.name }}
      </router-link>
    </div>
    <div class="tracks" v-if="isTrack()">
      <div class="hero is-info">
        <div class="hero-body title is-1">Tracks</div>
      </div>
      <a :key="index" @click="$router.push({ name: 'Album', params: { albumId: track.id}})"
         class="track box center-content" v-for="(track, index) in results.filter(r => r.type === 'track')">
        {{ track.name }}
        <i class="add fa fa-lg fa-plus has-text-info" v-on:click.stop="openPlaylists([track])"></i>
      </a>
    </div>
    <div class="artists" v-if="isArtist()" >
      <div class="hero is-info">
        <div class="hero-body title is-1">Artists</div>
      </div>
      <router-link :key="index" :to="`/artists/${artist.id}`" class="artist box center-content"
                   v-for="(artist, index) in results.filter(r => r.type === 'artist')">
        {{ artist.name }}
      </router-link>
    </div>
    <div class="users" v-if="isUser()">
      <div class="hero is-info">
        <div class="hero-body title is-1">Users</div>
      </div>
      <a :key="index" @click="$router.push({ name: 'User', params: { userId: user.id } })"
         class="user box" v-for="(user, index) in results.filter(r => r.type === 'user')">
        <user-media v-bind:user="user" v-bind:mainUser="mainUser"></user-media>
      </a>
    </div>
    <playlists :header="'Choose a playlist to add your song'" :playlists="playlists" :opened="playlistsOpened"
               :onSelect="onSubmitPlaylists" :onExit="onPlaylistsCanceled">
    </playlists>
  </div>
</template>

<script>
  import { searchClient, playlistClient } from '../clients/clients';
  import UserMedia from './user/UserMedia';
  import Playlists from './album/Playlists';

  export default {
    name: 'search',
    components: {
      UserMedia,
      playlists: Playlists
    },
    props: ['type', 'query', 'mainUser'],
    data() {
      return {
        results: [],
        playlists: [],
        playlistsOpened: false,
        onSubmitPlaylists: () => {}
      };
    },
    created() {
      searchClient.search(this.query).then((musicResults) => {
        searchClient.searchUsers(this.query).then((userResults) => {
          this.results = musicResults.concat(userResults);
        });
      });
      playlistClient.fetchPlaylists().then((playlists) => {
        this.playlists = playlists;
      });
    },
    methods: {
      isAll() {
        return !this.type || this.type === 'all';
      },
      isAlbum() {
        return this.isAll() || this.type === 'album';
      },
      isTrack() {
        return this.isAll() || this.type === 'track';
      },
      isArtist() {
        return this.isAll() || this.type === 'artist';
      },
      isUser() {
        return this.isAll() || this.type === 'user';
      },
      openPlaylists(tracks) {
        this.playlistsOpened = true;
        this.onSubmitPlaylists = (playlist) => {
          this.playlistsOpened = false;
          tracks.forEach((t) => {
            playlistClient.addTrack(playlist.id, t).then(() => playlistClient.fetchPlaylists())
              .then((playlists) => {
                this.playlists = playlists;
              });
          });
        };
      },
      onPlaylistsCanceled() {
        this.playlistsOpened = false;
      },
    },
  };
</script>

<style scoped>
  .center-content {
    align-items: center;
  }
  .box {
    margin: 50px;
    display: flex;
    flex-direction: column;
  }

  .track {
    flex-direction: row;
    justify-content: center;
  }

  .fa {
    margin: 10px;
  }
</style>
