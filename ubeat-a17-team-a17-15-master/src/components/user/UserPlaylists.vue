<template>
  <div class="container">
    <collapsable-card
      v-for="playlist in playlists"
      v-bind:cardTitle="playlist.name"
      v-bind:cardFooterOptions="[]"
      v-bind:key="playlist.id">
      <table class="table is-fullwidth is-hoverable" slot="card-content">
        <thead>
        <tr>
          <th class="is-hidden-mobile">No.</th>
          <th>Titre</th>
          <th>Artiste</th>
          <th class="is-hidden-mobile">Album</th>
          <th class="is-hidden-mobile">Durée</th>
        </tr>
        </thead>
        <tbody class="album-track">
        <tr v-for="(playlistTrack, index) in playlist.tracks">
          <th class="is-hidden-mobile">{{index + 1}}</th>
          <th>{{playlistTrack.trackName}}</th>
          <th>{{playlistTrack.artistName}}</th>
          <th class="is-hidden-mobile">{{playlistTrack.collectionName}}</th>
          <th class="is-hidden-mobile">{{toDuration(playlistTrack.trackTimeMillis)}}</th>
          <th></th>
        </tr>
        </tbody>
      </table>
    </collapsable-card>
  </div>
</template>

<script>
  import moment from 'moment';
  import CollapsableCard from '@/components/playlists/CollapsableCard';
  import { playlistClient } from '../../clients/clients';

  export default {
    data() {
      return {
        playlists: []
      };
    },
    props: ['user'],
    components: {
      CollapsableCard
    },
    methods: {
      toDuration(duration) {
        const time = moment.utc(duration);
        return time.hours() < 1 ? time.format('mm:ss') : time.format('HH:mm:ss');
      },
    },
    created() {
      playlistClient.fetchPlaylists().then((playlists) => {
        for (let index = 0; index < playlists.length; index += 1) {
          if (typeof playlists[index].owner !== 'undefined') {
            if (playlists[index].owner.id === this.user.id) {
              this.playlists.push(playlists[index]);
            }
          }
        }
      });
    }
  };
</script>

<style>

</style>
