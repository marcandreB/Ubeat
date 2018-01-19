<template>
  <div class="card is-fullwidth">
    <header class="card-header">
      <p class="card-header-title">{{cardTitle}}</p>
      <a class="card-header-icon card-toggle" v-on:click="displayCardContent = !displayCardContent">
        <i class="fa fa-angle-down"></i>
      </a>
    </header>
    <div class="card-content" v-if="displayCardContent">
      <slot name="card-content"></slot>
    </div>
    <footer class="card-footer" v-if="displayCardContent">
      <a class="card-footer-item" v-for="option in cardFooterOptions" v-on:click="option.callback()">{{option.name}}</a>
      <a class="card-footer-item" v-on:click="displayCardContent = false">
        Collapse
      </a>
    </footer>
  </div>
</template>

<script>
  export default {
    props: ['cardTitle', 'cardFooterOptions'],
    data() {
      return {
        displayCardContent: false
      };
    }
  };
</script>

<style scoped>
  .card {
    margin-top: 10px;
    margin-bottom: 10px
  }
</style>
