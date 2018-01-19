import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Album from '@/components/album/Album';
import Albums from '@/components/album/Albums';
import Artists from '@/components/artist/Artists';
import Artist from '@/components/artist/Artist';
import PlaylistPage from '@/components/playlists/PlaylistPage';
import UserPage from '@/components/user/UserPage';
import UserFollowers from '@/components/user/UserFollowers';
import UserPlaylists from '@/components/user/UserPlaylists';
import SignIn from '@/components/SignIn';
import Search from '@/components/Search';
import Users from '@/components/user/Users';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    }, {
      path: '/artists',
      name: 'Artists',
      component: Artists
    }, {
      path: '/artists/:artistId',
      name: 'Artist',
      component: Artist,
      props: true
    }, {
      path: '/albums',
      name: 'Albums',
      component: Albums,
    }, {
      path: '/albums/:albumId',
      name: 'Album',
      component: Album,
      props: true
    }, {
      path: '/users',
      name: 'Users',
      component: Users,
    }, {
      path: '/playlists',
      name: 'Playlists',
      component: PlaylistPage
    }, {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    }, {
      path: '/users/:userId',
      name: 'User',
      component: UserPage,
      props: true,
      children: [
        {
          path: 'followers',
          name: 'UserFollowers',
          component: UserFollowers
        },
        {
          path: 'playlists',
          name: 'UserPlaylists',
          component: UserPlaylists
        }
      ]
    }, {
      path: '/search/:type/:query',
      name: 'Search',
      component: Search,
      props: true
    }
  ]
});
