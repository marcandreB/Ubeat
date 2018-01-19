<template>
  <div>
    <nav class="navbar is-primary">
      <div class="navbar-brand">
        <router-link to="/" tag="a" class="navbar-item is-brand">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWUfv433Rve2XwX-adOfWrH_rheCfvSRF_s23NfMqvTCUFoqVElg"
            alt="Bulma logo">
        </router-link>
        <div class="navbar-burger burger" v-bind:class="{'is-active': burgerActive}" v-on:click="burgerActive = !burgerActive">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu" v-bind:class="{'is-active': burgerActive}">
        <div class="navbar-start">
          <router-link to="/" tag="a" class="navbar-item">
            Home
          </router-link>
          <router-link to="/playlists" tag="a" class="navbar-item">
            Playlists
          </router-link>
          <router-link :to="{ name: 'Artists' }" tag="a" class="navbar-item">
            Artists
          </router-link>
          <router-link :to="{ name: 'Albums' }" tag="a" class="navbar-item">
            Albums
          </router-link>
          <router-link :to="{ name: 'Users' }" tag="a" class="navbar-item">
            Users
          </router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <select class="select control" v-model="searchOption" title="Search Option">
              <option value="all">All</option>
              <option value="album">Album</option>
              <option value="track">Track</option>
              <option value="artist">Artist</option>
              <option value="user">User</option>
            </select>
            <autocomplete :tag="true" :onupdate="fetchSearchResults" :onselect="onSelect" :onsubmit="onSubmit">
            </autocomplete>
          </div>
          <router-link :to="{ name: 'SignIn' }" v-bind:class="['navbar-item', connected ? 'is-hidden':'']">
            Sign In
          </router-link>
          <div v-bind:class="['navbar-item', 'has-dropdown', 'is-hoverable', connected ? '':'is-hidden']">
            <a class="navbar-link" style="min-width: 100%">
              {{ displayedText }}
            </a>
            <div class="navbar-dropdown">
              <router-link :to="{ name: 'User', params: { userId: mainUser.id }}"  class="navbar-item">
                Overview
              </router-link>
              <hr class="dropdown-divider">
              <a class="navbar-item" v-on:click="this.signOut">
                Log out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import { bus, emptyUser } from '@/bus';
  import { signInClient, searchClient } from '../clients/clients';
  import Autocomplete from './Autocomplete';

  export default {
    components: {
      Autocomplete
    },
    props: ['mainUser'],
    data() {
      return {
        burgerActive: false,
        searchOption: 'all'
      };
    },
    methods: {
      fetchSearchResults(value) {
        return new Promise(((resolve) => {
          searchClient.search(value).then((results) => {
            searchClient.searchUsers(value)
              .then(users => resolve(results.concat(users)
                .filter(r => this.searchOption === 'all' || r.type === this.searchOption)));
          });
        }));
      },
      onSelect(item) {
        const type = item.type;
        if (type === 'artist') {
          this.$router.push({ name: 'Artist', params: { artistId: item.id } });
        } else if (type === 'album' || type === 'track') {
          this.$router.push({ name: 'Album', params: { albumId: item.id } });
        } else {
          this.$router.push({ name: 'User', params: { userId: item.id } });
        }
      },
      onSubmit(query) {
        this.$router.push({ name: 'Search', params: { type: this.searchOption, query, mainUser: this.mainUser } });
      },
      signOut() {
        signInClient.logoutUser();
        bus.$emit('delete:mainUser');
        this.$router.push({ name: 'Home' });
      }
    },
    computed: {
      connected() {
        return this.mainUser !== emptyUser;
      },
      displayedText() {
        if (this.connected) {
          return `${this.mainUser.name}'s Profile`;
        }
        return 'Profile';
      }
    },
  };
</script>

<style>
</style>
