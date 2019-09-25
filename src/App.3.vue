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
  name: "app",
  components: {
    GameUI,
    Coordinates,
  },
  data() {
    return {
      rowsObj: {},
      indexOfShipStart: null,
      indexOfShipEnd: null,
      indexOfRowLetter: null
    }
  },
  computed: {
    ...mapState({
      first_row_arr: state => state.first_row_arr,
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
    // FIX TEST BEZ RETURN
    generateRandomVars(i) {
      const shipLength = this.battle_ships_arr[i];
      const min = 0;
      const max = (this.game_grid - 1) - shipLength;

      this.indexOfShipStart = Math.floor(Math.random () * (max - min + 1)) + min;
      this.indexOfShipEnd = this.indexOfShipStart + shipLength;
      this.indexOfRowLetter = Math.floor(Math.random () * (max - min + 1)) + min;
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
      const elementsArr = Array.from({length: this.game_grid}, el => this.dot);
      const isShipPartArr = Array.from({length: this.game_grid}, el => false );
      for (let i = 0; i < this.game_grid; i++) this.rowsObj[[this.alphabet[i]]] = { elementsArr, isShipPartArr };
    },
    placeShipsInRandomPlaces() {
      for (let i = 0; i < this.battle_ships_arr.length; i++) {
        // const randomShipDirection = Math.floor(Math.random () * (1 - 0 + 1)) + 0
        let randomShipDirection = Math.floor(Math.random () * (1 - 0 + 1)) + 0
        this.generateRandomVars(i);


        // if (i === 0) {
        //   randomShipDirection = 1
        //   this.indexOfRowLetter = 4
        //   this.indexOfShipStart = 4
        //   this.indexOfShipEnd = 9
        // }
        // if (i === 1) {
        //   randomShipDirection = 0
        //   this.indexOfRowLetter = 5
        //   this.indexOfShipStart = 5
        //   this.indexOfShipEnd = 9
        // }
        // if (i === 2) {
        //   randomShipDirection = 1
        //   this.indexOfRowLetter = 0
        //   this.indexOfShipStart = 0
        //   this.indexOfShipEnd = 4
        // }


        if (i === 0) {
          randomShipDirection = 0
          this.indexOfRowLetter = 0
          this.indexOfShipStart = 3
          this.indexOfShipEnd = 8
        }
        if (i === 1) {
          randomShipDirection = 0
          this.indexOfRowLetter = 4
          this.indexOfShipStart = 2
          this.indexOfShipEnd = 6
        }
        if (i === 2) {
          randomShipDirection = 0
          this.indexOfRowLetter = 5
          this.indexOfShipStart = 2
          this.indexOfShipEnd = 6
        }
            console.log(this.battle_ships_arr[i], randomShipDirection, this.alphabet[this.indexOfRowLetter], this.indexOfShipStart, this.indexOfShipEnd);

        if (!randomShipDirection) {
          const chechArr = this.rowsObj[this.alphabet[this.indexOfRowLetter]]["isShipPartArr"].slice(this.indexOfShipStart, this.indexOfShipEnd+1);
          if (chechArr.every(str => str === false)) {
            this.rowsObj = this.deepCopyObj(this.rowsObj)
            for (let y = this.indexOfShipStart; y < this.indexOfShipEnd; y++) this.rowsObj[this.alphabet[this.indexOfRowLetter]]["isShipPartArr"][y] = 'x';
          } else { 
            console.log('PROBLEM1');
            i--; }
        } else {
          const chechArr = [];
          for (let z = this.indexOfShipStart; z < this.indexOfShipEnd; z++) chechArr.push(this.rowsObj[this.alphabet[z]]["isShipPartArr"][this.indexOfRowLetter]);
          if (chechArr.every(str => str === false)) {
            this.rowsObj = this.deepCopyObj(this.rowsObj)
            for (let i = this.indexOfShipStart; i < this.indexOfShipEnd; i++) this.rowsObj[this.alphabet[i]]["isShipPartArr"][this.indexOfRowLetter] = true;
          } else { 
            console.log('PROBLEM2');
            i--; } 
        }
      }
    },
    // shipInRow(i) {
    //   const chechArr = this.rowsObj[this.alphabet[this.indexOfRowLetter]]["isShipPartArr"].slice(this.indexOfShipStart, this.indexOfShipEnd);
    //   if (chechArr.every(str => str === false)) {
    //     this.rowsObj[this.alphabet[this.indexOfRowLetter]]["isShipPartArr"] = this.rowsObj[this.alphabet[this.indexOfRowLetter]]["isShipPartArr"].map((bool, index) => index >= this.indexOfShipStart && index < this.indexOfShipEnd? true : false);
    //   } else { i--; }
    // },
  },
  created() {
    //#region fill data in Vuex
    this.fillFirstRowArr();
    this.fillRowsObj();
    this.placeShipsInRandomPlaces();

// IZTRII - DA VIJDAM SEGA MI TRQBVA
    for (const key in this.rowsObj) {
      const arr = this.rowsObj[key]['isShipPartArr'];
        for (let i = 0; i < arr.length; i++) {
console.log('PASS');
          if(arr[i] === true) {
            this.rowsObj[key]['elementsArr'] = arr.map((bool) => bool ? 'x' : '.')
          }
        }
    }
    console.log(this.rowsObj);

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