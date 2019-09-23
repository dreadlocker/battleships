<template>
  <div id="gameUI">
    <GenerateFirstRow />
    <GenerateRestRows />
    <!-- <button @click="asdMet">Submit</button> -->
  </div>
</template>

<script>
import GenerateFirstRow from "./GenerateFirstRow.vue";
import GenerateRestRows from "./GenerateRestRows.vue";

export default {
  name: "GameUI",
  components: {
    GenerateFirstRow,
    GenerateRestRows,
  },
  // data() {
  //   return {
  //     gameGrid: 10,
  //     alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], 
  //     firstRowArr: [""],
  //     rowsObj: {},
  //     dot: "."
  //   };
  // },
  computed: {
    // FIX PREIMENYVAI ME
    // asd() {
    //   console.log('asd()');
    //   for (let i = 1; i <= this.gameGrid; i++) this.firstRowArr.push(i);
    //   for (let i = 0; i < this.gameGrid; i++) this.rowsObj[[this.alphabet[i]]] = this.dot.repeat(this.gameGrid)
    //   this.$emit('rowsObj', this.rowsObj);
    // }
  },
  // watch: {
  //   rowsObj(val) {
  //     console.log(val);
  //   }
  // }
};
</script>

<style lang="sass" scoped>
  #gameUI
    margin-bottom: 1em
</style>
