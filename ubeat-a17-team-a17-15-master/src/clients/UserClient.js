import axios from 'axios';

export default class PlaylistClient {
  constructor(url) {
    this.url = url;
  }

  getUserById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/users/${id}`).then((response) => {
        resolve(response.data);
      }).catch(err => reject(err));
    });
  }

  getUserByNameAndEmail(name, email) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('q', name);
      axios.get(`${this.url}/search/users?${params.toString()}`).then((response) => {
        for (let index = 0; index < response.data.length; index += 1) {
          if (response.data[index].email === email) {
            resolve(response.data[index]);
          }
        }
        reject(`no user with name '${name}' has email '${email}'.`);
      }).catch(err => reject(err));
    });
  }

  getMainUser() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/tokenInfo`).then((tokenResponse) => {
        axios.get(`${this.url}/users/${tokenResponse.data.id}`).then((userResponse) => {
          resolve(userResponse.data);
        }).catch(err => reject(err));
      }).catch(err => reject(err));
    });
  }

  follow(id) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/follow/`, { id }).then((response) => {
        resolve(response.data);
      }).catch(err => reject(err));
    });
  }

  unfollow(id) {
    return new Promise((resolve, reject) => {
      axios.delete(`${this.url}/follow/${id}`).then((response) => {
        resolve(response.data);
      }).catch(err => reject(err));
    });
  }
}
