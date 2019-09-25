<template>
  <div class="row">
    <div id="text">Enter coordinates (row, col), e.g. A5</div>
    <input @keyup.enter="checkForHit" id="inp" type="text" autofocus>
    <button @click="checkForHit">Submit</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { ACTION_ROWS_OBJ, ACTION_BATTLE_SHIPS_TOTAL_PARTS } from "../../store/types.js"; 

export default {
  name: "Coordinates",
  data() {
    return {
      inpVal: null,
      objKey: null,
      index: null,
      smallestNumOfFirstRow: null,
      biggestNumOfFirstRow: null,
      objCopy: null,
    };
  },
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
    checkForHit() {
      // FIX - AKO NQMA TAKUV ELEMENT ZA SELEKTIRANE DA POKAZVA NA USER NQKAKVA GRE6KA

      this.saveInputVars();
      return this.isInputWrong() ? null : this.makeHit();
    },
    saveInputVars() {
      // Make user input with capital letter through JS if someone removes the CSS method for that
      this.inpVal = inp.value.toUpperCase();
      this.objKey = this.inpVal[0];
      this.index = +this.inpVal.substr(1);
      this.smallestNumOfFirstRow = this.first_row_arr[1];
      return this.biggestNumOfFirstRow = this.first_row_arr[this.first_row_arr.length - 1];
    },
    isInputWrong() {
      const inputIswrong = !((/^[A-Z]\d{1,2}$/g).test(this.inpVal));
      return inputIswrong || this.index < this.smallestNumOfFirstRow || this.index > this.biggestNumOfFirstRow ? [this.inputClearAndFocus(), true] : false;
    },
    makeHit() {
      this.objCopy = this.deepCopyObj(this.rows_obj);
      (this.rows_obj[this.objKey]["isShipPartArr"][this.index - 1]) ? this.shipPartHit() : this.hitMissed();
      return this.inputClearAndFocus();
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
    shipPartHit() {
      this.objCopy[this.objKey]["elementsArr"][this.index - 1] = "x";
      this.action_rows_obj(this.objCopy);

      const shipPartLess = this.battle_ships_total_parts - 1;
      return this.action_battle_ships_total_parts(shipPartLess);
    },
    hitMissed() {
      this.objCopy[this.objKey]["elementsArr"][this.index - 1] = "-";
      return this.action_rows_obj(this.objCopy);
    },
    inputClearAndFocus() {
      inp.value = "";
      return inp.focus();
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