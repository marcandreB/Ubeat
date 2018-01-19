<template>
  <div v-bind:class="['global', opened ? 'opened':'closed']" @click="exit($event)">
    <div class="playlists" @click="$event.stopImmediatePropagation()">
      <h3 class="title is-3">{{ header }}</h3>
      <div class="playlists-selection">
        <div v-for="playlist in playlists">
          <div class="playlist" @click="select(playlist, $event)">
            {{ playlist.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'playlists',
    props: [
      'playlists',
      'header',
      'onSelect',
      'onExit',
      'opened'
    ],
    methods: {
      exit(e) {
        e.stopImmediatePropagation();
        this.onExit();
      },
      select(playlist, e) {
        e.stopImmediatePropagation();
        this.onSelect(playlist);
      }
    }
  };
</script>

<style scoped>
  .global {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.75);
  }

  .global.opened {
    opacity: 1;
    transition: opacity 1s ease;
  }

  .global.closed {
    opacity: 0;
    transition: opacity 1s ease;
    pointer-events: none;
  }

  .playlists {
    position: fixed;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 400px;
    height: 400px;
    max-width: 90vw;
    max-height: 90vh;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;
    text-align: center;
  }

  .playlists-selection {
    overflow: auto;
  }

  .playlist {
    border: groove;
    margin: 5px;
  }

  .playlist:hover {
    cursor: pointer;
  }
</style>
