import Vue from 'vue';

export const bus = new Vue();

export const emptyUser = {
  id: 'none',
  name: '',
  email: '',
  following: []
};
