<template>
  <div class="container">
    <modal-form
      v-bind:class="{ 'is-active': creatingPlaylist }"
      v-bind:failure-callback="playlistCreationFailureCallback"
      v-bind:success-callback="playlistCreationSuccessCallback"
      v-bind:displayed-text="{ title: 'Creating Playlist', successButton: 'Create', failureButton: 'Cancel' }"
      v-bind:disableSuccessButton="invalidNewName">
      <div class="field" slot="modalFormContent">
        <p class="control has-icons-right">
          <input class="input is-medium" type="text" placeholder="Enter playlist's name" v-model="newPlaylistName">
          <span class="icon is-small is-right" v-if="invalidNewName">
            <i class="fa fa-warning"></i>
          </span>
          <span class="icon is-small is-right" v-else>
            <i class="fa fa-check"></i>
          </span>
        </p>
        <p class="help is-danger" v-if="invalidNewName">This playlist name is invalid</p>
        <p class="help is-success" v-else>This playlist name is valid</p>
      </div>
    </modal-form>
    <modal-form
      v-bind:class="{ 'is-active': editingPlaylist }"
      v-bind:failure-callback="playlistEditionFailureCallback"
      v-bind:success-callback="playlistEditionSuccessCallback"
      v-bind:displayed-text="{ title: 'Editing ' + playlistBeingEdited.name, successButton: 'Edit', failureButton: 'Cancel' }"
      v-bind:disableSuccessButton="invalidNewName">
      <div class="field" slot="modalFormContent">
        <p class="control has-icons-right">
          <input class="input is-medium" type="text" placeholder="Enter new playlist's name" v-model="newPlaylistName">
          <span class="icon is-small is-right" v-if="invalidNewName">
            <i class="fa fa-warning"></i>
          </span>
          <span class="icon is-small is-right" v-else>
            <i class="fa fa-check"></i>
          </span>
        </p>
        <p class="help is-danger" v-if="invalidNewName">This playlist name is invalid</p>
        <p class="help is-success" v-else>This playlist name is valid</p>
      </div>
    </modal-form>
    <modal-form
      v-bind:class="{ 'is-active': addingTrack }"
      v-bind:failure-callback="trackAdditionFailureCallback"
      v-bind:success-callback="trackAdditionSuccessCallback"
      v-bind:displayed-text="{ title: 'Adding ' + trackBeingAdded.trackName, successButton: 'Add', failureButton: 'Cancel' }"
      v-bind:disableSuccessButton="false">
      <div class="buttons" slot="modalFormContent">
        <toggle-button
          v-for="playlist in reversedPlaylists" v-bind:key="playlist.id"
          v-bind:activation-callback="createAddPlaylistToListCallback(playlist)"
          v-bind:deactivation-callback="createRemovePlaylistFromListCallback(playlist)">
          <label slot="buttonLabel">{{playlist.name}}</label>
        </toggle-button>
      </div>
    </modal-form>
    <div class="content">
      <figure>
        <a class="icon is-large has-text-info" v-on:click="creatingPlaylist = true">
          <i class="fa fa-plus-circle fa-3x"></i>
        </a>
      </figure>
    </div>
    <playlist v-for="(playlist, index) in reversedPlaylists" v-bind:playlist="playlist"
              v-bind:createAddTrackCallback="createAddTrackCallback" v-bind:editingCallback="editCallback"
              v-bind:removeCallback="createRemoveByIndexCallback(playlists.length - index - 1)" :key="playlist.id">
    </playlist>
  </div>
</template>

<script>
  import Playlist from '@/components/playlists/Playlist';
  import ToggleButton from '@/components/playlists/ToggleButton';
  import ModalForm from '@/components/playlists/ModalForm';
  import { playlistClient } from '../../clients/clients';

  export default {
    data() {
      return {
        playlists: [],
        creatingPlaylist: false,
        newPlaylistName: '',
        invalidNewName: true,
        editingPlaylist: false,
        playlistBeingEdited: { name: '' },
        trackBeingAdded: { trackName: '' },
        addingTrack: false,
        playlistToAddTrackTo: []
      };
    },
    components: {
      Playlist,
      ToggleButton,
      ModalForm
    },
    watch: {
      newPlaylistName(newValue) {
        this.invalidNewName = newValue.trim() === '';
      }
    },
    methods: {
      playlistCreationFailureCallback() {
        this.creatingPlaylist = false;
        this.newPlaylistName = '';
      },
      playlistCreationSuccessCallback() {
        this.creatingPlaylist = false;
        playlistClient.postPlaylist({ name: this.newPlaylistName.trim(), owner: 'owner@mail.com' }).then((newPlaylist) => {
          this.playlists.push(newPlaylist);
        });
        this.newPlaylistName = '';
      },
      playlistEditionFailureCallback() {
        this.editingPlaylist = false;
        this.newPlaylistName = '';
        this.playlistBeingEdited = { name: '' };
      },
      playlistEditionSuccessCallback() {
        this.editingPlaylist = false;
        this.playlistBeingEdited.name = this.newPlaylistName.trim();
        playlistClient.editPlaylist(this.playlistBeingEdited).then();
        this.newPlaylistName = '';
      },
      trackAdditionFailureCallback() {
        this.addingTrack = false;
        this.playlistToAddTrackTo = [];
        this.trackBeingAdded = { trackName: '' };
      },
      trackAdditionSuccessCallback() {
        this.addingTrack = false;
        this.playlistBeingEdited.name = this.newPlaylistName;
        this.playlistToAddTrackTo.forEach(async (playlist) => {
          playlist.tracks.push(this.trackBeingAdded);
          playlistClient.editPlaylist(playlist).then();
        });
        this.playlistToAddTrackTo = [];
        this.trackBeingAdded = { trackName: '' };
      },
      createAddPlaylistToListCallback(playlist) {
        return () => {
          this.playlistToAddTrackTo.push(playlist);
        };
      },
      createRemovePlaylistFromListCallback(playlist) {
        return () => {
          const index = this.playlistToAddTrackTo.indexOf(playlist);
          this.playlistToAddTrackTo.splice(index, 1);
        };
      },
      createRemoveByIndexCallback(index) {
        return () => {
          this.playlists.splice(index, 1);
        };
      },
      createAddTrackCallback(track) {
        return () => {
          this.trackBeingAdded = track;
          this.addingTrack = true;
        };
      },
      editCallback(playlist) {
        this.editingPlaylist = true;
        this.playlistBeingEdited = playlist;
      }
    },
    computed: {
      reversedPlaylists() {
        return this.playlists.slice().reverse();
      }
    },
    created() {
      playlistClient.fetchPlaylists().then((playlists) => {
        this.playlists = playlists;
      });
    }
  };
</script>

<style scoped>
  .content {
    margin-top: 20px
  }
</style>
