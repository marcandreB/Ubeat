import axios from 'axios';

export default class AlbumClient {
  constructor(url) {
    this.url = url;
  }

  fetchAlbum(id) {
    return this.fetchTracks(id).then(tracks => new Promise((resolve, reject) => {
      axios.get(`${this.url}/albums/${id}`).then((response) => {
        const album = response.data.results[0];
        resolve({ ...album, tracks, releaseDate: new Date(album.releaseDate) });
      }).catch((err) => { reject(err); });
    }));
  }

  fetchTracks(albumId) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/albums/${albumId}/tracks`).then((response) => {
        resolve(response.data.results);
      }).catch((err) => { reject(err); });
    });
  }
}
