<template>
  <collapsable-card
    v-bind:cardTitle="playlist.name"
    v-bind:cardFooterOptions="[{ name:'Edit', callback:editPlaylist }, { name:'Delete', callback:deletePlaylist }]">
    <table class="table is-fullwidth is-hoverable" slot="card-content">
      <thead>
      <tr>
        <th class="is-hidden-mobile">No.</th>
        <th>Titre</th>
        <th>Artiste</th>
        <th class="is-hidden-mobile">Album</th>
        <th class="is-hidden-mobile">Durée</th>
        <th></th>
      </tr>
      </thead>
      <tbody class="album-track">
      <playlist-track v-for="(playlistTrack, index) in playlist.tracks" v-bind:playlistTrack="playlistTrack" v-bind:addCallback="createAddTrackCallback(playlistTrack)"
                      v-bind:number="index + 1" v-bind:removeCallback="createRemoveByIndexCallback(index)" :key="playlistTrack.trackId">
      </playlist-track>
      </tbody>
      <tfoot>
      <tr>
        <th class="is-hidden-mobile"></th>
        <th></th>
        <th></th>
        <th class="is-hidden-mobile"></th>
        <th class="is-hidden-mobile">{{toDuration(totalDuration())}}</th>
        <th></th>
      </tr>
      </tfoot>
    </table>
  </collapsable-card>
</template>

<script>
  import PlaylistTrack from '@/components/playlists/PlaylistTrack';
  import CollapsableCard from '@/components/playlists/CollapsableCard';
  import moment from 'moment';
  import { playlistClient } from '../../clients/clients';

  export default {
    props: ['playlist', 'removeCallback', 'editingCallback', 'createAddTrackCallback'],
    data() {
      return {
        displayMoreInformation: false
      };
    },
    components: {
      PlaylistTrack,
      CollapsableCard
    },
    methods: {
      toDuration(duration) {
        const time = moment.utc(duration);
        return time.hours() < 1 ? time.format('mm:ss') : time.format('HH:mm:ss');
      },
      totalDuration() {
        let duration = 0;
        this.playlist.tracks.forEach((t) => { duration += t.trackTimeMillis; });
        return duration;
      },
      createRemoveByIndexCallback(index) {
        return async () => {
          playlistClient.deleteTrack(this.playlist.id, this.playlist.tracks[index].trackId).then();
          this.playlist.tracks.splice(index, 1);
        };
      },
      deletePlaylist() {
        playlistClient.deletePlaylist(this.playlist).then();
        this.removeCallback();
      },
      editPlaylist() {
        this.editingCallback(this.playlist);
      }
    }
  };
</script>

<style scoped>
</style>
