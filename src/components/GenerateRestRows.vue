<template>
  <div id="restRows">
    <div v-for="(key,index) in Object.keys(this.rows_obj)" :key="index" class="row">
      <div class="singleItem">{{key}}</div>
      <div v-for="(str, innerIndex) in rows_obj[key]['elementsArr']" :key="innerIndex" class="singleItem">{{str}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "GenerateRestRows",
  computed: {
    ...mapState({
      // first_row_arr: state => state.first_row_arr,
      // game_grid: state => state.game_grid,
      rows_obj: state => state.rows_obj,
      // alphabet: state => state.alphabet,
      // dot: state => state.dot,
    }),
  },
  // beforeMount() {
    // console.log(this.rows_obj["A"]['elementsArr']);
  // },
  // watch: {
  //   rows_obj(val) {
  //     console.log('object');
  //     console.log(val);
  //   }
  // }
}
</script>

<style scoped lang="sass">
  #restRows
    margin-bottom: 1em
  .row
    display: flex
  .singleItem
    width: 30px
</style>