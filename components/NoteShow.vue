<template>
  <transition name="fade">
    <v-flex
      v-if="selectedNote"
      class="shower"
    >
      <extra-data
        :note-body="selectedNote.body"
        :created-epoch="selectedNote.created"
      />
      <v-layout
        column
        fill-height>
        <v-flex
          class="title"
        >
          <v-text-field
            v-model="title"
            :disabled="loading"
            placeholder="Titulo"
            elevation-0
            clearable
            solo
            light
          />
        </v-flex>
        <v-flex
          fill-height
        >
          <vue-editor
            :disabled="loading"
            v-model="body"
            class="editor"
          />
        </v-flex>
      </v-layout>
      <div
        class="button delete-icon"
        @click="remove"
      >
        <v-icon>delete</v-icon>
      </div>
      <div
        class="button save-icon"
        @click="save"
      >
        <v-icon
          x-large
        >save</v-icon>
      </div>
    </v-flex>
    <v-layout
      v-else
      column
      align-center
      justify-center
    >
      <div class="info-right-pane">
        <h4 class="display-1">Seleccione una nota en el menu</h4>
        <h5 class="headline">En esta pantalla podra ver y editar</h5>
      </div>
    </v-layout>
  </transition>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import ExtraData from '~/components/ExtraData';

export default {
  components: {
    ExtraData,
  },
  data() {
    return {
      content: '',
    };
  },
  computed: {
    ...mapState(['selectedNote', 'loading']),
    title: {
      get() {
        return (this.selectedNote && this.selectedNote.title) || '';
      },
      set(title) {
        const note = this.selectedNote;
        if (!note || note.title === title ) {
          return;
        }
        this.selectedNote.title = title;
        this.selectedNote.dirty = true;
      },
    },
    body: {
      get() {
        return (this.selectedNote && this.selectedNote.body) || '';
      },
      set(body) {
        const note = this.selectedNote;
        if (!note || note.body === body) {
          return;
        }
        this.selectedNote.body = body;
        this.selectedNote.dirty = true;
      },
    },
  },
  methods: {
    ...mapActions(['saveLocalNote', 'saveRemoteNote', 'deleteNote']),
    ...mapMutations(['selectNote']),
    save() {
      if (this.selectedNote.id) {
        return this.saveRemoteNote(this.selectedNote.id);
      }
      return this.saveLocalNote();
    },
    remove() {
      this.deleteNote(this.selectedNote.id);
      this.selectNote({ id: -1, note: null });
    }
  },
}
</script>

<style scoped>
  .editor {
    box-sizing: border-box;
    display: block;
    height: 100%;
  }
  .title {
    max-height: 48px;
  }
  .shower {
    background-color: #fbfbfb;
    white-space: normal;
  }
  .delete-icon {
    cursor: pointer;
    transition: 0.2s ease;
    box-shadow: 0 0 5px #eaeaea;
    position: absolute;
    bottom: 90px;
    right: 23px;
    border: 1px solid #c7c7c7;
    padding: 10px;
    border-radius: 100px;
  }
  .save-icon {
    cursor: pointer;
    transition: 0.2s ease;
    box-shadow: 0 0 5px #eaeaea;
    position: absolute;
    bottom: 20px;
    right: 15px;
    border: 1px solid #c7c7c7;
    padding: 10px;
    border-radius: 100px;
  }
  .save-icon:hover {
    transform: scale(1.1);
    opacity: 1;
    background-color: #eaeaea;
  }
  .delete-icon:hover {
    transform: scale(1.1);
    opacity: 1;
    background-color: #eaeaea;
  }
  .info-right-pane {
    height: fit-content;
    color: #b7b7b7;
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
