<template>
  <div class="media">
    <div class="media-left">
      <img v-bind:src="gravatarUrl"/>
    </div>
    <div class="media-content">
      <div class="container">
        <h1 class="title">
          {{user.name}}
        </h1>
        <h2 class="subtitle">
          {{user.email}}
        </h2>
        <button class="button is-success" v-if="!following" v-on:click.stop="follow">Add Friend</button>
        <button class="button is-danger" v-if="following" v-on:click.stop="unfollow">Remove Friend</button>
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'md5';
  import { bus } from '@/bus';
  import { userClient } from '../../clients/clients';

  export default {
    props: ['user', 'mainUser'],
    computed: {
      followId() {
        for (let index = 0; index < this.mainUser.following.length; index += 1) {
          if (this.mainUser.following[index].email === this.user.email) {
            const id = '_id';
            return this.mainUser.following[index][id];
          }
        }
        return null;
      },
      following() {
        return this.followId !== null;
      },
      gravatarUrl() {
        const normalizedEmail = this.user.email.trim().toLowerCase();
        const hashedEmail = md5(normalizedEmail);
        return `https://www.gravatar.com/avatar/${hashedEmail}?d=retro`;
      }
    },
    methods: {
      follow() {
        userClient.getUserByNameAndEmail(this.user.name, this.user.email).then((user) => {
          userClient.follow(user.id).then((newMainUser) => {
            bus.$emit('update:mainUser', newMainUser);
          });
        });
      },
      unfollow() {
        userClient.unfollow(this.followId).then((newMainUser) => {
          bus.$emit('update:mainUser', newMainUser);
        });
      }
    }
  };
</script>

<style scoped>

</style>
