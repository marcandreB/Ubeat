<template>
  <div class="autocomplete">
    <div v-bind:class="['dropdown', opened && results.length > 0 ? 'is-active':'']">
      <div class="field has-addons">
        <div class="control control-input">
          <input class="input" placeholder="Search..." @input="update()"
                 v-model="entry" @focus="opened=true; update()" @blur="close()" @keyup.13="onsubmit(entry); close()">
        </div>
        <div class="control">
          <span class="button is-info control" @click="onsubmit(entry); close()" > <i class="fa fa-search"></i> </span>
        </div>
      </div>
      <div class="dropdown-menu">
        <div class="dropdown-content">
          <a :key="index" @click="entry=result.name; onselect(result)" class="dropdown-item box" v-for="(result, index) in results">
            <span class="badge" v-if="tag">{{ result.type }}</span>
            <span v-html="result.name.replace(entry, `<b>${entry}</b>`)"></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'autocomplete',
    props: ['tag', 'onupdate', 'onselect', 'onsubmit'],
    data() {
      return {
        isActive: false,
        opened: false,
        entry: '',
        results: []
      };
    },
    methods: {
      update() {
        this.opened = true;
        if (!this.isActive) {
          this.isActive = true;
          const oldEntry = this.entry;
          this.onupdate(this.entry).then((results) => {
            this.results = results;
            setTimeout(() => {
              this.isActive = false;
              if (oldEntry !== this.entry) {
                this.update();
              }
            }, 1000);
          }).catch(() => {
            setTimeout(() => {
              this.isActive = false;
              this.update();
            }, 2000);
          });
        }
      },
      close() {
        setTimeout(() => { this.opened = false; }, 500);
      }
    }
  };
</script>

<style scoped>
  .field {
    margin: 0;
  }

  .badge {
    background-color: blue;
    color: white;
    overflow: hidden;
    padding-right: 5px;
    padding-left: 5px;
    margin-right: 5px;
    border-radius: 10px;
  }

  .dropdown {
    width: 100%;
  }

  .has-addons {
    width: 100%;
  }

  .control.control-input {
    width: 100%;
  }

  .dropdown-menu {
    position: absolute;
    width: inherit;
  }

  .dropdown-content {
    width: inherit;
    max-height: 200px;
    position: relative;
    padding: 10px;
    overflow: auto;
    display: inline-block;
  }

  .dropdown-item {
    display: inline-block;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
</style>
