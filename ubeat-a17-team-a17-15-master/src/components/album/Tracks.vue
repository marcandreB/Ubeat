<template>
  <div class="tracks">
    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th></th>
        <th>No.</th>
        <th>Titre</th>
        <th>Durée</th>
        <th><i class="add fa fa-plus has-text-success" v-on:click="openPlaylists(tracks)"></i></th>
      </tr>
      </thead>
      <tbody class="track" v-for="(track, index) in tracks">
      <tr>
        <th> <i v-on:click="play(track)" v-bind:class="['play fa', track === currentTrack ? 'fa-pause':'fa-play']"></i> </th>
        <th> {{index+1}} </th>
        <td> {{track.trackName}} </td>
        <td> {{toDuration(track.trackTimeMillis / 1000)}} </td>
        <th> <i class="add fa fa-plus has-text-info" v-on:click="openPlaylists([track])"></i> </th>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <th>Total</th>
        <th>{{tracks.length}}</th>
        <th></th>
        <th>{{toDuration(totalDuration())}}</th>
        <th></th>
      </tr>
      </tfoot>
    </table>
    <playlists :header="'Choose a playlist to add your song'" :playlists="playlists" :opened="playlistsOpened"
               :onSelect="onSubmitPlaylists" :onExit="onPlaylistsCanceled">
    </playlists>
  </div>
</template>

<script>
  import moment from 'moment';
  import Playlists from './Playlists';
  import { playlistClient } from '../../clients/clients';

  export default {
    name: 'tracks',
    components: {
      playlists: Playlists,
    },
    props: ['tracks'],
    data() {
      return {
        moment,
        loaded: false,
        audio: null,
        playlists: [],
        playlistsOpened: false,
        currentTrack: null,
        onSubmitPlaylists: () => {}
      };
    },
    created() {
      playlistClient.fetchPlaylists().then((playlists) => {
        this.playlists = playlists;
      });
    },
    beforeDestroy() {
      if (this.audio) this.audio.pause();
    },
    methods: {
      totalDuration() {
        let duration = 0;
        this.tracks.forEach((t) => { duration += t.trackTimeMillis / 1000; });
        return duration;
      },
      toDuration(duration) {
        const time = moment.utc(moment.duration(duration, 's').asMilliseconds());
        return time.hours() < 1 ? time.format('mm:ss') : time.format('HH:mm:ss');
      },
      play(track) {
        if (this.audio) this.audio.pause();
        if (this.currentTrack !== track) {
          this.currentTrack = track;
          this.audio = new Audio(track.previewUrl);
          this.audio.onended = () => {
            this.audio = null;
            this.currentTrack = null;
          };
          this.audio.play();
        } else {
          this.currentTrack = null;
          this.audio = null;
        }
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
    }
  };
</script>

<style>
  .tracks {
    width: 100%;
    border: 2px solid rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    overflow: hidden;
  }

  .play:hover {
    cursor: pointer;
  }

  .add:hover {
    cursor: pointer;
  }
</style>
