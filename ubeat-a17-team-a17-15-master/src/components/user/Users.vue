<template>
  <div class="search">
    <div class="hero is-info">
      <div class="hero-body title is-1">Search for users</div>
    </div>
    <div class="no-search container">
      <autocomplete :onupdate="fetchUsers()" :onselect="onSelect" :onsubmit="onSubmit"></autocomplete>
    </div>
    <div class="users">
      <a :key="index" @click="$router.push({ name: 'User', params: { userId: user.id } })"
         class="user-list box" v-for="(user, index) in users">
        <user-media v-bind:user="user" v-bind:mainUser="mainUser"></user-media>
      </a>
    </div>
  </div>
</template>

<script>
  import Autocomplete from '../Autocomplete';
  import UserMedia from '../user/UserMedia';
  import { searchClient } from '../../clients/clients';

  export default {
    props: ['mainUser'],
    components: {
      Autocomplete,
      UserMedia
    },
    data() {
      return {
        users: []
      };
    },
    methods: {
      fetchUsers() {
        return searchClient.searchUsers.bind(searchClient);
      },
      onSelect(user) {
        this.updateUsers(user.name);
      },
      onSubmit(name) {
        this.updateUsers(name);
      },
      updateUsers(query) {
        searchClient.searchUsers(query).then((users) => {
          this.users = users;
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

  .users {
    margin: 50px;
  }

  .user-list {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 900px) {
    .container {
      margin-left: 12px;
      margin-right: 12px;
    }
  }
</style>
