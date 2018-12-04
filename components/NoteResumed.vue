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
        <div
          v-if="!note.dirty"
          class="save-time-data"
        >
          <em>last saved: {{ updated }}</em>
          <v-icon
            medium
          >save</v-icon>
        </div>
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
      updated: '1s',
      clearer: null,
    };
  },
  computed: {
    ...mapState(['selectedId']),
    title() {
      return this.note.title || 'Start writing a note';
    },
    body() {
      if (!this.note.body) {
        return 'Click this note to start writing';
      }

      return h2t(this.note.body);
    },
  },
  mounted() {
    this.setTimestampsAgo();
    this.clearer = setInterval(() => {
      this.setTimestampsAgo();
    }, 30000);
  },
  destroyed() {
    clearInterval(this.clearer);
  },
  methods: {
    ...mapMutations(['selectNote']),
    setTimestampsAgo() {
      this.created = moment(this.note.created).fromNow().replace('ago', '').trim();
      this.updated = moment(this.note.updated).fromNow().trim();
    },
  },
};
</script>

<style lang="css">
  .body {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 30px;
  }
  .note:not(.note-selected):hover {
    background-color: #e6e6e6;
  }
  .note-selected {
    background-color: #1976D2;
    color: white;
  }
  .note {
    user-select: none;
    overflow: hidden;
    position: relative;
    border-bottom: 2px solid #eaeaea;
    line-height: 55px;
    padding: 0 15px;

  }
  .note-selected.note-unsaved {
    border-left: 3px solid #d80000 !important;
  }
  .data-container {
    height: fit-content;
    width: 100%;
  }
  .data {
    padding: 15px 0 15px 0;
    overflow: auto;
  }
  .title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .save-time-data {
    /*position: absolute;
    bottom: -10px;
    right: 10px;*/
    text-align: right;
    line-height: 20px;
  }
  .save-time-data em {
    color: rgba(0,0,0,0.3);
  }
  .save-time-data i {
    color: #4caf50;
    vertical-align: bottom;
  }
  .note-selected .save-time-data  em, .note-selected .save-time-data i {
    color: white;
  }
</style>
