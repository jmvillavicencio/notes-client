<template>
  <v-layout
    row
    no-wrap
    fill-height
    @keydown.esc="unselect"
  >
    <v-progress-linear
      :active="loading"
      query
      indeterminate
      class="top-loader"
    />
    <note-list/>
    <note-show/>
  </v-layout>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import NoteList from '~/components/NoteList.vue';
import NoteShow from '~/components/NoteShow.vue';

export default {
  components: {
    NoteList,
    NoteShow,
  },
  computed: {
    ...mapState(['loading']),
  },
  mounted() {
    this.getNotes();
  },
  methods: {
    ...mapActions(['getNotes']),
    ...mapMutations(['selectNote']),
    unselect() {
      this.selectNote({
        note: null,
        id: -1,
      });
    },
  }
}
</script>

<style>
  .top-loader {
    margin-top: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
</style>
