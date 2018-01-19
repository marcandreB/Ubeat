<template>
  <span class="button is-info" v-bind:class="{ 'is-outlined': notToggled }" ref="toggleButton"
          v-on:click="clickButton()">
    <slot name="buttonLabel"></slot>
  </span>
</template>

<script>
  export default {
    data() {
      return {
        notToggled: true,
      };
    },
    props: ['activationCallback', 'deactivationCallback'],
    methods: {
      clickButton() {
        this.$refs.toggleButton.blur();
        if (this.notToggled) {
          this.activationCallback();
        } else {
          this.deactivationCallback();
        }
        this.notToggled = !this.notToggled;
      }
    }
  };
</script>

<style scoped>
  span {
    margin: 2px 2px 2px 2px;
  }
</style>
