<template>
  <div class="row">
    <div v-for="num in this.first_row_arr" :key="num" class="singleItem">{{num}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "GenerateFirstRow",
  computed: {
    ...mapState({
      first_row_arr: state => state.first_row_arr,
    }),
  },
};
// FIX - .singleItem DA SE IZNESE V SASS MIXIN, 4E SE POLZVA NA MNOGO MESTA
</script>

<style scoped lang="sass">
  .row
    display: flex
  .singleItem
    width: 30px
</style>