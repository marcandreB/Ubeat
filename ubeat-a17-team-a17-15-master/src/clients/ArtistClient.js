import axios from 'axios';

export default class ArtistClient {
  constructor(url) {
    this.url = url;
  }

  fetchArtist(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/artists/${id}`).then((response) => {
        const artist = response.data.results[0];
        resolve({
          name: artist.artistName,
          genre: artist.primaryGenreName,
          url: artist.artistLinkUrl
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  fetchAlbums(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/artists/${id}/albums`).then((response) => {
        const albums = response.data.results;
        resolve(albums.map(alb => ({
          albumId: alb.collectionId,
          title: alb.collectionName,
          img: alb.artworkUrl100
        })));
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
