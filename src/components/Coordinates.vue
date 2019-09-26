<template>
  <div class="row">
    <div id="text">Enter coordinates (row, col), e.g. A5</div>
    <input ref="inp" @keyup.enter="checkForHit" id="inp" type="text" autofocus>
    <button @click="checkForHit">Submit</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { 
  ACTION_ROWS_OBJ, 
  ACTION_BATTLE_SHIPS_TOTAL_PARTS,
  ACTION_SHOT_TAKEN,
  ACTION_SHOT_TEXT,
} from "../../store/types.js"; 

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
      game_grid: state => state.game_grid,
      rows_obj: state => state.rows_obj,
      battle_ships_total_parts: state => state.battle_ships_total_parts,
      shots: state => state.shots,
      alphabet: state => state.alphabet,
    }),
  },
  methods: {
    ...mapActions({
      action_rows_obj: ACTION_ROWS_OBJ,
      action_battle_ships_total_parts: ACTION_BATTLE_SHIPS_TOTAL_PARTS,
      action_shot_taken: ACTION_SHOT_TAKEN,
      action_shot_text: ACTION_SHOT_TEXT,
    }),
    checkForHit() {
      if (!this.battle_ships_total_parts) return this.inputClearAndFocus();

      this.saveInputVars();
      return this.inputIsWrong() ? null : this.makeHit();
    },
    saveInputVars() {
      // Make user input with capital letter through JS if someone removes the CSS method for that
      this.inpVal = this.$refs.inp.value.toUpperCase();
      this.objKey = this.inpVal[0];
      this.index = +this.inpVal.substr(1);
      this.smallestNumOfFirstRow = this.first_row_arr[1];
      return this.biggestNumOfFirstRow = this.first_row_arr[this.first_row_arr.length - 1];
    },
    inputIsWrong() {
      this.cheatEntered();

      const allLettersForCurrentGameArr = this.alphabet.slice(0, this.game_grid);
      const letterIsWrong = !(allLettersForCurrentGameArr.includes(this.objKey));
      const inputIswrong = !((/^[A-Z]\d{1,2}$/g).test(this.inpVal));
      return letterIsWrong || inputIswrong || this.index < this.smallestNumOfFirstRow || this.index > this.biggestNumOfFirstRow ? [this.inputClearAndFocus(), true] : false;
    },
    cheatEntered() {
      const isCheatEntered = (/^SHOW$/g).test(this.inpVal);

      if (isCheatEntered) {
        const backUpRowsObj = this.rows_obj;
        const objCopy = this.deepCopyObj(this.rows_obj);

        for (const key in objCopy) {
          const arr = objCopy[key]["isShipPartArr"];
          this.replaceWithEptyString(objCopy, arr, key);
          this.replaceWithX(objCopy, arr, key);
          this.action_rows_obj(objCopy);
        }

        setTimeout(() => {
          return this.action_rows_obj(backUpRowsObj);
        }, 1000);
      } else {
        return null;
      }
    },
    replaceWithEptyString(objCopy, arr, key) {
      if (arr.every(el => el === false)) {
        for (let y = 0; y < arr.length; y++) objCopy[key]["elementsArr"][y] = "";
      }
    },
    replaceWithX(objCopy, arr, key) {
      for (let i = 0; i < arr.length; i++) {
        if(arr[i] === true) {
          objCopy[key]["elementsArr"] = arr.map((bool) => bool ? "x" : "");
        }
      }
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
      if(this.objCopy[this.objKey]["elementsArr"][this.index - 1] !== "x") {
        this.action_shot_taken(this.shots + 1);
        this.objCopy[this.objKey]["elementsArr"][this.index - 1] = "x";
        this.action_rows_obj(this.objCopy);
        this.action_battle_ships_total_parts(this.battle_ships_total_parts - 1);

        return (!this.battle_ships_total_parts) ? this.action_shot_text("Sunk") : this.action_shot_text("Hit");
      } 
    },
    hitMissed() {
      if (this.objCopy[this.objKey]["elementsArr"][this.index - 1] === ".") {
        this.objCopy[this.objKey]["elementsArr"][this.index - 1] = "-";
        this.action_rows_obj(this.objCopy);
        this.action_shot_text("Miss");
        return this.action_shot_taken(this.shots + 1);
      }
    },
    inputClearAndFocus() {
      this.$refs.inp.value = "";
      return this.$refs.inp.focus();
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