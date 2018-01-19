import axios from 'axios';

export default class PlaylistClient {
  constructor(url) {
    this.url = url;
  }

  fetchPlaylists() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/playlists`).then((response) => {
        resolve(response.data);
      }).catch(err => reject(err));
    });
  }

  postPlaylist(playlist) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/playlists`, playlist).then((response) => {
        resolve(response.data);
      }).catch(err => reject(err));
    });
  }

  deletePlaylist(playlist) {
    return new Promise((resolve, reject) => {
      axios.delete(`${this.url}/playlists/${playlist.id}`).then((response) => {
        resolve(response.data);
      }).catch(err => reject(err));
    });
  }

  deleteTrack(playlistId, trackId) {
    return new Promise((resolve, reject) => {
      axios.delete(`${this.url}/playlists/${playlistId}/tracks/${trackId}`).then((response) => {
        resolve(response.data);
      }).catch(err => reject(err));
    });
  }

  editPlaylist(playlist) {
    return new Promise((resolve, reject) => {
      axios.put(`${this.url}/playlists/${playlist.id}`, playlist).then((response) => {
        resolve(response.data);
      }).catch(err => reject(err));
    });
  }

  addTrack(playlistId, track) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/playlists/${playlistId}/tracks`, track).then((response) => {
        resolve(response.data);
      }).catch(err => reject(err));
    });
  }
}
