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
      rows_obj: state => state.rows_obj,
    }),
  },
};
</script>

<style scoped lang="sass">
  #restRows
    margin-bottom: 1em
  .row
    display: flex
  .singleItem
    width: 30px
</style>