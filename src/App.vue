<template>
  <div id="app">
    <GameUI />
    <Coordinates />
  </div>
</template>

<script>
import GameUI from "./components/GameUI.vue";
import Coordinates from "./components/Coordinates.vue";
import { mapActions, mapState } from "vuex";
import { ACTION_FIRST_ROW_ARR, ACTION_ROWS_OBJ, ACTION_BATTLE_SHIPS_TOTAL_PARTS  } from "../store/types.js"; 

export default {
  name: 'app',
  components: {
    GameUI,
    Coordinates,
  },
   computed: {
    ...mapState({
      // first_row_arr: state => state.first_row_arr,
      game_grid: state => state.game_grid,
      // NE SE POLZVA
      rows_obj: state => state.rows_obj,
      alphabet: state => state.alphabet,
      dot: state => state.dot,
      battle_ships_arr: state => state.battle_ships_arr,
      // NE SE POLZVA
      battle_ships_total_parts: state => state.battle_ships_total_parts,
    }),
  },
  methods: {
    ...mapActions({
      action_first_row_arr: ACTION_FIRST_ROW_ARR,
      action_rows_obj: ACTION_ROWS_OBJ,
      action_battle_ships_total_parts: ACTION_BATTLE_SHIPS_TOTAL_PARTS,
    }),
  },
  // FIX MAI MOJE DA E V COMPUTED
  beforeMount() {
    //#region fill data in Vuex
    const firstRowArr = [""]
    for (let i = 1; i <= this.game_grid; i++) firstRowArr.push(i);
    this.action_first_row_arr(firstRowArr)

    const rowsObj = {}
    const elementsArr = Array.from({length: this.game_grid}, el => this.dot)
    const isShipPartArr = Array.from({length: this.game_grid}, el => false)
    for (let i = 0; i < this.game_grid; i++) rowsObj[[this.alphabet[i]]] = { elementsArr, isShipPartArr }
    this.action_rows_obj(rowsObj)
    // console.log(this.rows_obj);


    this.action_battle_ships_total_parts(this.battle_ships_arr.reduce((a, b) => a + b, 0))
    //#endregion
  }
};
</script>

<style lang="sass">
html, body
  width: 100%
  height: 100%
  margin: 0
  box-sizing: border-box
  
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  text-align: center
  flex-direction: column
</style>