<template>
  <div id="app">
    <nav-menu v-bind:mainUser="mainUser"></nav-menu>
    <router-view :key="$route.fullPath" v-bind:mainUser="mainUser"></router-view>
  </div>
</template>

<script>
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';
import axios from 'axios';
import Navigation from '@/components/Navigation';
import { userClient } from '@/clients/clients';
import { bus, emptyUser } from '@/bus';

export default {
  data() {
    return {
      mainUser: emptyUser
    };
  },
  name: 'app',
  components: {
    'nav-menu': Navigation
  },
  created() {
    bus.$on('update:mainUser', (newMainUser) => {
      this.mainUser = newMainUser;
    });
    bus.$on('delete:mainUser', () => {
      this.mainUser = emptyUser;
    });
    userClient.getMainUser().then((mainUser) => {
      bus.$emit('update:mainUser', mainUser);
    }, (error) => {
      if (!(error instanceof axios.Cancel)) {
        Promise.reject(error);
      }
    });
  }
};
</script>

<style>
</style>
