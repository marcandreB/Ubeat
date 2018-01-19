<template>
  <div class="my-application">
    <div class="home-tile-layout">
      <div class="tile is-vertical is-ancestor">
        <div class="tile is-horizontal">
          <router-link to="/playlists" tag="div" class="tile is-parent is-8 playlist clickable display-rule">
            <div class="tile notification is-child is-primary background-playlist">
              <h3 class="title is-3">Playlists</h3>
              <p>Where all the neat tracks and compilations are.</p>
            </div>
          </router-link>
          <router-link :to="{ name: 'Artists' }" tag="div" class="tile is-parent is-4 artist clickable display-rule">
            <div class="tile notification is-child is-primary background-artist">
              <h3 class="title is-3">Artists</h3>
              <p>Where you can discover new artists.</p>
            </div>
          </router-link>
        </div>
        <router-link :to="{ name: 'Albums' }" tag="div" class="tile is-parent album clickable display-rule">
          <div class="tile notification is-child is-primary background-album">
            <h3 class="title is-3">Albums</h3>
            <p>Where you can listen to your favorite albums.</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .my-application {
    padding: 5px;
    margin: 10px;
  }

  .background-album {
    background-size: 100% auto;
    background: url(images/album-image.jpg) no-repeat center;
  }

  .background-artist {
    background-size: 100% auto;
    background: url(images/artist-image.jpg) no-repeat center;
  }

  .clickable :hover {
    opacity: 0.7;
    filter: alpha(opacity=70);
  }

  .background-playlist {
    background-size: 100% auto;
    background: url(images/playlist-image.jpg) no-repeat center;
  }

  .playlist {
    height: 400px;
  }

  @media screen and (max-width: 770px) {
    .playlist {
      height: 100%
    }
  }

  .home-tile-layout {
    width: 60%;
    margin: auto;
    padding: auto;
    display: block;
  }

  .title {
    word-break: normal;
  }

  @media screen and (min-width: 769px), print {
    .tile:not(.is-child) .display-rule {
    display: -webkit-box;
  }
  }
</style>
