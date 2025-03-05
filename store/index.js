import { createStore } from 'vuex';

export default createStore({
  state: {
    sideBarOpen: false,
    dropDownOpen: false,
  },
  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.sideBarOpen = !state.sideBarOpen;
    },
    TOGGLE_DROPDOWN(state) {
      state.dropDownOpen = !state.dropDownOpen;
    },
  },
  actions: {
    toggleSidebar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
    toggleDropdown({ commit }) {
      commit('TOGGLE_DROPDOWN');
    },
  },
});
