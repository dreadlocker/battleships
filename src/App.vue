<template>
  <div id="app">
    <GameText />
    <GameUI />
    <Coordinates />
    <TextForGameEnd />
  </div>
</template>

<script>
import GameText from "./components/GameText.vue";
import GameUI from "./components/GameUI.vue";
import Coordinates from "./components/Coordinates.vue";
import TextForGameEnd from "./components/TextForGameEnd.vue";

import { mapActions, mapState } from "vuex";
import { 
  ACTION_FIRST_ROW_ARR, 
  ACTION_ROWS_OBJ, 
  ACTION_BATTLE_SHIPS_TOTAL_PARTS,
} from "../store/types.js"; 

export default {
  name: "App",
  components: {
    GameText,
    GameUI,
    Coordinates,
    TextForGameEnd
  },
  data() {
    return {
      rowsObj: {},
      indexOfShipStart: null,
      indexOfShipEnd: null,
      indexOfRowLetter: null
    };
  },
  computed: {
    ...mapState({
      game_grid: state => state.game_grid,
      alphabet: state => state.alphabet,
      dot: state => state.dot,
      battle_ships_arr: state => state.battle_ships_arr,
    }),
  },
  methods: {
    ...mapActions({
      action_first_row_arr: ACTION_FIRST_ROW_ARR,
      action_rows_obj: ACTION_ROWS_OBJ,
      action_battle_ships_total_parts: ACTION_BATTLE_SHIPS_TOTAL_PARTS,
    }),
    generateRandomVars(i) {
      const shipLength = this.battle_ships_arr[i];
      const min = 0;
      const max = (this.game_grid - 1) - shipLength;

      this.indexOfShipStart = Math.floor(Math.random () * (max - min + 1)) + min;
      this.indexOfShipEnd = this.indexOfShipStart + shipLength;
      return this.indexOfRowLetter = Math.floor(Math.random () * (max - min + 1)) + min;
    },
    deepCopyObj(o) {
      let out, v, key;
      out = Array.isArray(o) ? [] : {};
      for (key in o) {
        v = o[key];
        out[key] = (typeof v === "object" && v !== null) ? this.deepCopyObj(v) : v;
      }
      return out;
    },
    fillFirstRowArr() {
      const firstRowArr = [""];
      for (let i = 1; i <= this.game_grid; i++) firstRowArr.push(i);
      this.action_first_row_arr(firstRowArr);
    },
    fillRowsObj () {
      // eslint-disable-next-line
      const elementsArr = Array.from({length: this.game_grid}, el => this.dot);
      // eslint-disable-next-line
      const isShipPartArr = Array.from({length: this.game_grid}, el => false );
      for (let i = 0; i < this.game_grid; i++) this.rowsObj[[this.alphabet[i]]] = { elementsArr, isShipPartArr };
    },
    placeShipsInRandomPlaces() {
      for (let i = 0; i < this.battle_ships_arr.length; i++) {
        const randomShipDirection = Math.floor(Math.random () * (1 - 0 + 1)) + 0;
        this.generateRandomVars(i);
        (!randomShipDirection) ? i -= this.shipInRow(i) : i -= this.shipInColumn(i);
      }
    },
    // eslint-disable-next-line
    shipInRow(i) {
      const chechArr = this.rowsObj[this.alphabet[this.indexOfRowLetter]]["isShipPartArr"].slice(this.indexOfShipStart, this.indexOfShipEnd);
      if (chechArr.every(str => str === false)) {
        this.rowsObj = this.deepCopyObj(this.rowsObj);
        for (let y = this.indexOfShipStart; y < this.indexOfShipEnd; y++) {
          this.rowsObj[this.alphabet[this.indexOfRowLetter]]["isShipPartArr"][y] = true;
        } 
        return 0;
      } else { return 1; }
    },
    // eslint-disable-next-line
    shipInColumn(i) {
      const chechArr = [];
      for (let z = this.indexOfShipStart; z < this.indexOfShipEnd; z++) chechArr.push(this.rowsObj[this.alphabet[z]]["isShipPartArr"][this.indexOfRowLetter]);
      if (chechArr.every(str => str === false)) {
        this.rowsObj = this.deepCopyObj(this.rowsObj);
        for (let z = this.indexOfShipStart; z < this.indexOfShipEnd; z++) this.rowsObj[this.alphabet[z]]["isShipPartArr"][this.indexOfRowLetter] = true;
        return 0;
      } else { return 1; }
    },
  },
  created() {
    //#region fill data in Vuex
    this.fillFirstRowArr();
    this.fillRowsObj();
    this.placeShipsInRandomPlaces();
    
    this.action_rows_obj(this.rowsObj);
    this.action_battle_ships_total_parts(this.battle_ships_arr.reduce((a, b) => a + b, 0));
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