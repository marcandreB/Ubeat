<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{displayedText.title}}</p>
        <button class="delete" aria-label="close" v-on:click="failureCallback()"></button>
      </header>
      <section class="modal-card-body">
        <slot name="modalFormContent"></slot>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" v-bind:disabled="disableSuccessButton" v-on:click="successCallback()" ref="successButton">{{displayedText.successButton}}</button>
        <button class="button is-danger" v-on:click="failureCallback()">{{displayedText.failureButton}}</button>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['successCallback', 'failureCallback', 'displayedText', 'disableSuccessButton']
  };
</script>

<style scoped>

</style>
