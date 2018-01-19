import axios from 'axios';

function createSearchItem(item) {
  let name = item.collectionName;
  if (item.wrapperType === 'artist') {
    name = item.artistName;
  } else if (item.wrapperType === 'track') {
    name = item.trackName;
  }
  return {
    ...item,
    name,
    type: item.wrapperType === 'collection' ? 'album' : item.wrapperType,
    id: (item.wrapperType === 'artist' ? item.artistId : item.collectionId),
    img: (item.wrapperType === 'collection' ? item.artworkUrl100 : item.artworkUrl100)
  };
}

export default class SearchClient {
  constructor(url) {
    this.url = url;
  }

  search(query) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/search?q=${query}`)
        .then(res => resolve(res.data.results.map(createSearchItem)))
        .catch(err => reject(err));
    });
  }

  searchArtists(query) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/search/artists?q=${query}`).then((response) => {
        const searchResults = response.data.results;
        resolve(searchResults.map(createSearchItem));
      }).catch((err) => {
        reject(err);
      });
    });
  }

  searchAlbums(query) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/search/albums?q=${query}&limit=30`).then((response) => {
        const searchResults = response.data.results;
        resolve(searchResults.map(createSearchItem));
      }).catch((err) => {
        reject(err);
      });
    });
  }

  searchUsers(query) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/search/users?q=${query}&limit=30`).then((response) => {
        const searchUsers = response.data;
        resolve(searchUsers.map(r => ({
          id: r.id,
          name: r.name,
          type: 'user',
          email: r.email,
          following: r.following || []
        })));
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
