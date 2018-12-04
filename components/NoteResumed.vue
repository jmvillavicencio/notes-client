<template lang="html">
  <a ripple>
    <v-layout
      :class="{
        note: true,
        'note-unsaved': note.dirty,
        'note-selected': selectedId === id,
      }"
      ripple
      @click="selectNote({ note, id })"
    >
      <v-flex class="time-elapsed">
        {{ created }}
      </v-flex>
      <v-flex
        class="data"
        align-center
        justify-center
        column
      >
        <div class="data-container">
          <h3 class="title">{{ title }}</h3>
          <div
            class="body"
            v-html="body"
          />
        </div>
        <v-icon
          v-if="!note.dirty"
          medium
          class="save-icon">save</v-icon>
      </v-flex>
    </v-layout>
  </a>
</template>

<script>
import moment from 'moment';
import h2t from 'html2plaintext';
import { mapMutations, mapState } from 'vuex';

moment.updateLocale('en', {
  relativeTime : {
    future: "in %s",
    past:   "%s ago",
    s  : '1s',
    ss : '%ds',
    m:  "1m",
    mm: "%dm",
    h:  "1h",
    hh: "%dh",
    d:  "1D",
    dd: "%dD",
    M:  "1M",
    MM: "%dM",
    y:  "1Y",
    yy: "%dY"
  }
});

export default {
  props: {
    id: {
      type: Number,
      default: -1,
    },
    note: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      created: '1s',
      clearer: null,
    };
  },
  computed: {
    ...mapState(['selectedId']),
    title() {
      return this.note.title || 'Comience escribiendo una nota';
    },
    body() {
      if (!this.note.body) {
        return 'Clickee sobre esta nota para comenzar a escribir';
      }

      return h2t(this.note.body);
    },
  },
  mounted() {
      this.clearer = setInterval(() => {
      this.created = moment(this.note.created).fromNow().replace('ago', '').trim();
    }, 30000);
  },
  destroyed() {
    clearInterval(this.clearer);
  },
  methods: {
    ...mapMutations(['selectNote']),
  }
}
</script>

<style lang="css">
  .body {
    max-height: 60px;
  }
  .note:not(.note-selected):hover {
    border-left: 3px solid #0073ff;
  }
  .note {
    user-select: none;
    overflow: hidden;
    position: relative;
  }
  .note-selected {
    border-left: 5px solid #0073ff;
  }
  .note-selected.note-unsaved {
    border-left: 5px solid #d80000 !important;
  }
  .data-container {
    height: fit-content;
    width: 100%;
  }
  .time-elapsed {
    line-height: 96px;
    max-width: 50px;
    min-width: 50px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    color: #0000004d;
  }
  .data {
    display: flex;
    border-bottom: 2px solid #eaeaea;
    padding: 10px 5px 10px 0;
    overflow: auto;
  }
  .title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .save-icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
</style>
