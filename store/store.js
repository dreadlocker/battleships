import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // game_grid can go up to 26
    game_grid: 10,
    alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], 
    first_row_arr: [""],
    rows_obj: {},
    dot: ".",
    battle_ships_arr: [5, 4, 4],
    battle_ships_total_parts: null,
    shots: 0,
    shotText: ''
  },
  mutations: {
    [types.FIRST_ROW_ARR]: (state, payload) => {
      state.first_row_arr = payload;
    },
    [types.ROWS_OBJ]: (state, payload) => {
      state.rows_obj = payload;
    },
    [types.BATTLE_SHIPS_ARR]: (state, payload) => {
      state.battle_ships_arr = payload;
    },
    [types.BATTLE_SHIPS_TOTAL_PARTS]: (state, payload) => {
      state.battle_ships_total_parts = payload;
    },
    [types.SHOT_TAKEN]: (state, payload) => {
      state.shots = payload;
    },
    [types.SHOT_TEXT]: (state, payload) => {
      state.shotText = payload;
    },
  },
  actions: {
    [types.ACTION_FIRST_ROW_ARR]({ commit }, payload) {
      commit(types.FIRST_ROW_ARR, payload);
    },
    [types.ACTION_ROWS_OBJ]({ commit }, payload) {
      commit(types.ROWS_OBJ, payload);
    },
    [types.ACTION_BATTLE_SHIPS_ARR]({ commit }, payload) {
      commit(types.BATTLE_SHIPS_ARR, payload);
    },
    [types.ACTION_BATTLE_SHIPS_TOTAL_PARTS]({ commit }, payload) {
      commit(types.BATTLE_SHIPS_TOTAL_PARTS, payload);
    },
    [types.ACTION_SHOT_TAKEN]({ commit }, payload) {
      commit(types.SHOT_TAKEN, payload);
    },
    [types.ACTION_SHOT_TEXT]({ commit }, payload) {
      commit(types.SHOT_TEXT, payload);
    },
  }
})
