<template>
  <div class="tooltip">
    <v-icon
      large
      @mouseover="showing = true"
      @mouseleave="showing = false"
    >info</v-icon>
    <transition name="fade">
      <v-card v-if="showing">
        <v-card-title primary-title>
          <div class="note-info">
            <h3 class="title">{{ words }}</h3>
            <h3 class="title">{{ time }}</h3>
            <h3 class="title">Creado el {{ created }}</h3>
          </div>
        </v-card-title>
      </v-card>
    </transition>
  </div>
</template>

<script>
import h2t from 'html2plaintext';
import moment from 'moment';
import { readingTime } from 'reading-time-estimator';

export default {
  props: {
    noteBody: {
      type: String,
      default: '',
    },
    createdEpoch: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showing: false,
    };
  },
  computed: {
    created() {
      return moment(this.createdEpoch).format('DD/MM/YYYY');
    },
    timeData() {
      const textOnly = h2t(this.noteBody);
      if (textOnly.length < 1) {
        return {
          text: 'Comience a escribir!',
          words: 0
        };
      }
      return readingTime(textOnly, { locale: 'es' });
    },
    time() {
      return this.timeData.text;
    },
    words() {
      return `${this.timeData.words} palabras escritas`;
    },
  }
}
</script>

<style lang="css">
  .note-info {
    text-align: center;
  }
  .title {
    line-height: 1.5px;
  }
  .tooltip {
    position: absolute;
    top: 100px;
    z-index: 2;
    right: 15px;
    text-align: right;
  }
  .firstrow {
    border-right: 1px solid black;
  }
  .extra-data {
    margin-top: 15px;
  }
  .fade-enter-active {
    transition: all .3s ease;
  }
  .fade-leave-active {
    transition: all .3    s ease;
  }
  .fade-enter, .fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
