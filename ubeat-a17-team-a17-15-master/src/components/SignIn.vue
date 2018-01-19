<template>
    <div class="SignUp">
      <div class="new right-half">
        <label class="label textLabel">New user?</label>
        <label class="label textLabel">Enter your informations below!</label>

        <div class="field is-expanded">
          <p class="control">
            <input class="input" v-bind:class="{ 'is-success': validNewUserName, 'is-danger': !validNewUserName }" type="email" placeholder="Name" v-model="newUserName">
          </p>
        </div>

        <div class="field">
          <div class="control">
            <input class="input" v-bind:class="{ 'is-success': validNewEmail, 'is-danger': !validNewEmail }" type="email" placeholder="Email" v-model="newEmail" value="Email">
          </div>
          <p class="help is-danger" v-if="!unusedEmail">This email address is already taken</p>
        </div>

        <div class="field">
          <p class="control">
            <input class="input" v-bind:class="{ 'is-success': validNewPassword, 'is-danger': !validNewPassword }" type="password" placeholder="Password" v-model="newPassword">
          </p>
        </div>

        <div class="field is-grouped">
          <p class="control">
            <button class="button is-success" v-bind:disabled="!validCreation" v-on:click="createUser">
              Login
            </button>
          </p>
        </div>
      </div>
      <div class="new left-half">
        <label class="label textLabel">Existing user?</label>
        <label class="label textLabel">Enter your informations below</label>

        <div class="field">
          <div class="control">
            <input class="input" v-bind:class="{ 'is-success': validEmail, 'is-danger': !validEmail }" type="email" placeholder="Email" v-model="email" value="Email">
          </div>
        </div>

        <div class="field">
          <p class="control">
            <input class="input" v-bind:class="{ 'is-success': validPassword, 'is-danger': !validPassword }" type="password" placeholder="Password" v-model="password">
          </p>
        </div>

        <div class="field" id="invalidCombinaison">
          <p class="control">
            <button class="button is-success" v-bind:disabled="!validLogIn" v-on:click="logUser">
              Login
            </button>
            <div class="help is-danger is-hidden" id="ErrorMessageNextToButtonLogExisting"> Invalid email/password!</div>
        </div>
      </div>
  </div>
</template>

<script>
  import { bus } from '@/bus';
  import { signInClient } from '../clients/clients';

  export default {
    data() {
      return {
        knownUsedEmail: [],
        newUserName: '',
        newEmail: '',
        newPassword: '',
        email: '',
        password: '',
      };
    },
    computed: {
      unusedEmail() {
        return this.knownUsedEmail.indexOf(this.newEmail.trim()) === -1;
      },
      validNewEmail() {
        return this.unusedEmail && this.newEmail.trim() !== '';
      },
      validNewUserName() {
        return this.newUserName.trim() !== '';
      },
      validNewPassword() {
        return this.newPassword.trim() !== '';
      },
      validCreation() {
        return this.validNewEmail && this.validNewUserName && this.validNewPassword;
      },
      validEmail() {
        return this.email.trim() !== '';
      },
      validPassword() {
        return this.password.trim() !== '';
      },
      validLogIn() {
        return this.validEmail && this.validPassword;
      }
    },
    methods: {
      createUser() {
        signInClient.createUser(this.newUserName, this.newEmail, this.newPassword).then(() => {
          this.email = this.newEmail;
          this.password = this.newPassword;
          this.logUser();
        }).catch(() => {
          this.knownUsedEmail.push(this.newEmail.trim());
        });
      },
      logUser() {
        signInClient.loginUser(this.email, this.password).then((response) => {
          bus.$emit('update:mainUser', response);
          this.$router.push({ name: 'Home' });
        })
        .catch(() => {
          document.getElementById('ErrorMessageNextToButtonLogExisting').className = 'help is-danger is-visible';
        });
      }
    }
  };
</script>

<style scoped>
  @media screen and (max-width: 640px) {
    .new {
      width:100%;
      margin-bottom:30px;
      margin-right:0;
      float: none;
    }
    .textLabel {
      width:100%;
      text-align: center ;
    }
  }

  @media screen and (min-width: 640px) and (max-width: 1223px) {
    .new {
      width:100%;
      margin-bottom:100px;
      margin-right:0;
      float: none;
    }
    .textLabel {
      width:100%;
      text-align: center;
      border-color: #5a4848;
    }
  }

  @media screen and (min-width: 1224px) {
    .left-half {
      margin-top:50px;
      width:65%;
      margin-left:25px;
    }
    .right-half {
      margin-top:30px;
      width:65%;
      margin-left:25px;
      margin-bottom: 50px;
    }

    .hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 1px solid #ccc;
      margin: 1em 0;
      padding: 0;
      width:80%;
    }
  }
</style>
