<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body">
        <user-media
          v-bind:user="user"
          v-bind:mainUser="mainUser">
        </user-media>
      </div>
      <div class="hero-foot">
        <div class="container">
          <nav class="tabs is-boxed">
            <ul>
              <li v-bind:class="{ 'is-active': $route.name === 'UserPlaylists' }">
                <router-link :to="{ name: 'UserPlaylists', params: { userId }}">Playlists</router-link>
              </li>
              <li v-bind:class="{ 'is-active': $route.name === 'UserFollowers' }">
                <router-link :to="{ name: 'UserFollowers', params: { userId }}">Friends</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
    <router-view v-bind:user="user" v-bind:mainUser="mainUser"></router-view>
  </div>
</template>

<script>
  import UserMedia from '@/components/user/UserMedia';
  import { userClient } from '../../clients/clients';

  export default {
    data() {
      return {
        user: {
          email: ''
        }
      };
    },
    props: ['userId', 'mainUser'],
    components: {
      UserMedia
    },
    watch: {
      mainUser(newMainUser) {
        if (this.userId === newMainUser.id) {
          this.user = newMainUser;
        }
      }
    },
    created() {
      if (this.userId === this.mainUser.id) {
        this.user = this.mainUser;
      } else {
        userClient.getUserById(this.userId).then((user) => {
          this.user = user;
        });
      }
    }
  };
</script>

<style scoped>
</style>
