<template>
  <div class="row">
    <div id="text">Enter coordinates (row, col), e.g. A5</div>
    <!-- FIX DA IZTRIQ value="A5" -->
    <input id="inp" type="text" value="A5">
    <button @click="makeHit">Submit</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { ACTION_ROWS_OBJ, ACTION_BATTLE_SHIPS_TOTAL_PARTS } from "../../store/types.js"; 
const cloneDeep = require('lodash.clonedeep');

export default {
  name: "Coordinates",
   computed: {
    ...mapState({
      first_row_arr: state => state.first_row_arr,
      // game_grid: state => state.game_grid,
      rows_obj: state => state.rows_obj,
      battle_ships_total_parts: state => state.battle_ships_total_parts,
      // alphabet: state => state.alphabet,
      // dot: state => state.dot,
    }),
  },
  methods: {
    ...mapActions({
      // action_first_row_arr: ACTION_FIRST_ROW_ARR,
      action_rows_obj: ACTION_ROWS_OBJ,
      action_battle_ships_total_parts: ACTION_BATTLE_SHIPS_TOTAL_PARTS,
    }),
    deepCopyObj(o) {
      var out, v, key;
      out = Array.isArray(o) ? [] : {};
      for (key in o) {
        v = o[key];
        out[key] = (typeof v === "object" && v !== null) ? this.deepCopyObj(v) : v;
      }
      return out;
    },
    makeHit() {
      // FIX - AKO NQMA TAKUV ELEMENT ZA SELEKTIRANE DA POKAZVA NA USER NQKAKVA GRE6KA
      // FIX - .inp REGEX PROVERKA NA DANNITE VUVEDENI OT USER
      // FIX DA IZNESA REGEX V METHOD, TYK SAMO DA GO IZVIKVAM

      const inpVal = inp.value.toUpperCase();
      const isValidInput = (/^[A-Z]\d{0,2}$/g).test(inpVal)
      if(!isValidInput) return

      const objKey = inpVal[0]

      const index = +inpVal.substr(1)
      const lastNumOfFirstRow = this.first_row_arr[this.first_row_arr.length - 1];
      const firstNumOfFirstRow = this.first_row_arr[1];
      if(index > lastNumOfFirstRow || index < firstNumOfFirstRow) return
      console.log(index);
      
      const objCopy = this.deepCopyObj(this.rows_obj);
      (this.rows_obj[objKey]['isShipPartArr'][index - 1]) ? this.shipPartHit(objCopy, objKey, index) : this.hitMissed(objCopy, objKey, index);
    },
    shipPartHit(objCopy, objKey, index) {
        objCopy[objKey]['elementsArr'][index - 1] = "x"
        this.action_rows_obj(objCopy)

        const shipPartLess = this.battle_ships_total_parts - 1
        this.action_battle_ships_total_parts(shipPartLess)
    },
    hitMissed(objCopy, objKey, index) {
        objCopy[objKey]['elementsArr'][index - 1] = "-"
        this.action_rows_obj(objCopy)
    }
  }
};
// FIX - .row DA SE IZNESE V SASS MIXIN, 4E SE POLZVA NA MNOGO MESTA
</script>

<style scoped lang="sass">
  .row
    display: flex

  #text
    display: flex
    align-items: center

  #inp
    margin: 0px 1em
    text-transform: uppercase

</style>