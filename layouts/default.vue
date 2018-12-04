<template>
  <v-app>
    <v-navigation-drawer
      :value="true"
      class="menu"
      width="150"
      dark
      fixed
      permanent
      app
    >
      <v-list>
        <v-list-tile
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>
              note
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Notes
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content class="no-pading">
      <v-container
        pa-0
        fluid
        fill-height
        justify-space-around
      >
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Vuetify.js'
      }
    }
  }
</script>

<style scoped>
  .menu {
    background-color: #323538;
    transform: none !important;
    width: 200px;
    left: 0;
  }
</style>
