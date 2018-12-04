import Vuex from 'vuex'
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      selectedNote: null,
      selectedId: -1,
      notes: [],
      loading: false,
    }),
    mutations: {
      setLoading(state, loadingState) {
        state.loading = loadingState;
      },
      setDirtiness(state, isDirty) {
        if (!state.selectedNote) {
          return;
        }
        state.selectedNote.dirty = isDirty;
      },
      addNote(state) {
        state.notes.push({
          title: '',
          body: '',
          created: +new Date(),
          dirty: true,
        });
      },
      selectNote(state, {note, id}) {
        state.selectedNote = note;
        state.selectedId = id;
      },
      addNotes(state, notes) {
        state.notes = notes;
      },
      removeNote(state, id) {
        state.notes.splice(id, 1);
      }
    },
    actions: {
      getNotes({ state, commit }) {
        commit('setLoading', true);
        axios.get(`${APIURL}/notes`)
          .then(({ data: { notes }}) => {
            commit('addNotes', notes);
            commit('setLoading', false);
          })
          .catch(() => {
            commit('setLoading', false);
          });
      },
      saveLocalNote({ state, commit }) {
        commit('setLoading', true);
        axios.post(`${APIURL}/notes`, state.selectedNote)
          .then(({ data: { id }}) => {
            commit('setLoading', false);
            state.selectedNote.id = id;
            commit('setDirtiness', false);
          })
          .catch(() => {
            commit('setLoading', false);
          });
      },
      saveRemoteNote({ state, commit }, id) {
        commit('setLoading', true);
        axios.put(`${APIURL}/notes/${id}`, state.selectedNote)
          .then(() => {
            commit('setLoading', false);
            commit('setDirtiness', false);
          })
          .catch(() => {
            commit('setLoading', false);
          });
      },
      deleteNote({ state, commit }, id) {
        commit('setLoading', true);
        axios.delete(`${APIURL}/notes/${id}`)
          .then(() => {
            commit('setLoading', false);
            commit('removeNote', state.selectedId);
          })
          .catch(() => {
            commit('setLoading', false);
          });
      },
    },
  });
};

export default createStore
