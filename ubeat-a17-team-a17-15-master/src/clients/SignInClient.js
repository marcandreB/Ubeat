/* eslint-disable class-methods-use-this */
import axios from 'axios';
import Cookies from 'js-cookie';
import queryString from 'query-string';

export default class SignInClient {
  constructor(url) {
    this.url = url;
  }

  createUser(name, email, password) {
    const data = queryString.stringify({ name, email, password });
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/signup`, data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          params: {
            data
          }
        }).then((response) => {
          resolve(response.data);
        }).catch(err => reject(err));
    });
  }

  loginUser(email, password) {
    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/login`, { email, password },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          params: {
            email,
            password
          }
        }).then((response) => {
          const OneHour = 1 / 48;
          const token = response.data.token;
          delete response.data.token;
          Cookies.set('access_token', token, { expires: OneHour });
          axios.defaults.headers.common.Authorization = token;
          resolve(response.data);
        }).catch(err => reject(err));
    });
  }

  logoutUser() {
    delete axios.defaults.headers.common.Authorization;
    Cookies.remove('access_token');
  }
}
