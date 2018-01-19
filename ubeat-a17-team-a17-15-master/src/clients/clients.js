import axios from 'axios';
import Cookies from 'js-cookie';
import router from '../router';
import AlbumClient from './AlbumClient';
import PlaylistClient from './PlaylistClient';
import ArtistClient from './ArtistClient';
import UserClient from './UserClient';
import SignInClient from './SignInClient';
import SearchClient from './SearchClient';

const ubeatUrl = 'http://ubeat.herokuapp.com';

export const albumClient = new AlbumClient(ubeatUrl);
export const playlistClient = new PlaylistClient(ubeatUrl);
export const artistClient = new ArtistClient(ubeatUrl);
export const searchClient = new SearchClient(ubeatUrl);
export const userClient = new UserClient(ubeatUrl);
export const signInClient = new SignInClient(ubeatUrl);

axios.defaults.headers.common.Authorization = Cookies.get('access_token');
axios.interceptors.request.use((config) => {
  if (config.url !== `${ubeatUrl}/login` && config.url !== `${ubeatUrl}/signup` && config.headers.common.Authorization === undefined) {
    router.push({ name: 'SignIn' });
    throw new axios.Cancel('no authentification token');
  }
  return config;
}, (error) => {
  Promise.reject(error);
});

