<template>
  <tr>
    <th class="is-hidden-mobile">{{number}}</th>
    <th>{{playlistTrack.trackName}}</th>
    <th>{{playlistTrack.artistName}}</th>
    <th class="is-hidden-mobile">{{playlistTrack.collectionName}}</th>
    <th class="is-hidden-mobile">{{toDuration(playlistTrack.trackTimeMillis)}}</th>
    <th>
      <a class="icon has-text-success" v-on:click="addCallback()">
        <i class="fa fa-plus"></i>
      </a>
      <a class="icon has-text-danger" v-on:click="removeCallback()">
        <i class="fa fa-minus"></i>
      </a>
    </th>
  </tr>
</template>

<script>
  import moment from 'moment';

  export default {
    props: ['playlistTrack', 'number', 'removeCallback', 'addCallback'],
    methods: {
      toDuration(duration) {
        const time = moment.utc(duration);
        return time.hours() < 1 ? time.format('mm:ss') : time.format('HH:mm:ss');
      },
    }
  };
</script>

<style scoped>

</style>
