<template>
  <div>
    <div class="container">
      <div class="box" v-for="friend in user.following">
        <a v-on:click="routeToUserPage(friend)">
          <user-media
            v-bind:user="friend"
            v-bind:mainUser="mainUser">
          </user-media>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import UserMedia from '@/components/user/UserMedia';
  import { userClient } from '../../clients/clients';

  export default {
    props: ['user', 'mainUser'],
    components: {
      UserMedia
    },
    methods: {
      routeToUserPage(user) {
        userClient.getUserByNameAndEmail(user.name, user.email).then((completeUser) => {
          this.$router.push({ name: 'UserFollowers', params: { userId: completeUser.id, user: completeUser } });
        });
      }
    }
  };
</script>

<style scoped>
  .box {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .box:hover {
    background-color: lightblue;
  }
</style>
