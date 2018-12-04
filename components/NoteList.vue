<template>
  <v-flex
    class="note-container"
    md3>
    <v-layout
      column
      fill-height
    >
      <v-container
        class="note-header"
        fluid
      >
        <v-flex
          auto
        >
          <v-text-field
            v-model="search"
            class="search"
            placeholder="Search..."
            append-outer-icon="add_box"
            prepend-inner-icon="search"
            clearable
            solo
            light
            @click:append-outer="addNote"
          />
        </v-flex>
      </v-container>
      <v-flex
        v-if="notes.length"
        class="note-list-container"
        fill-height
      >
        <transition-group
          name="slide-y-transition"
          out-in
        >
          <note-resumed
            v-for="(note, i) in filteredNotes"
            :key="i"
            :note="note"
            :id="i"
          />
        </transition-group>
      </v-flex>
      <v-flex v-else>
        <div class="info-left-pane">
          <h4 class="headline">Cree una nota para comenzar</h4>
        </div>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Fuse from 'fuse.js';
import NoteResumed from '~/components/NoteResumed';

const options = {
  shouldSort: true,
  tokenize: true,
  threshold: 0.5,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'title',
    'body'
  ],
};

export default {
  components: {
    NoteResumed,
  },
  data() {
    return {
      search: '',
      fuse: new Fuse([], options),
    };
  },
  computed: {
    ...mapState(['notes']),
    filteredNotes() {
      const search = this.search;
      if (!search) {
        return this.notes;
      }

      return this.fuse.search(search);
    },
  },
  watch: {
    notes(val) {
      this.fuse = new Fuse(this.notes, options);
    },
  },
  methods: {
    ...mapMutations(['addNote']),
  },
}
</script>

<style scoped>
.note-list-container {
  overflow: scroll;
  flex-basis: 0;
}
.info-left-pane {
  text-align: center;
  color: #b7b7b7;
  margin-top: 25px;
}
.note-container {
  min-width: 375px;
  background-color: #fbfbfb;
  border-right: 2px solid #eaeaea;
}
.note-header {
  padding: 15px;
  max-height: 81px;
  border-bottom: 2px solid #eaeaea;
}
.notes {
  user-select: none;
}
</style>
