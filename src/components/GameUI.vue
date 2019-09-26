<template>
  <div id="gameUI">
    <GenerateFirstRow />
    <GenerateRestRows />
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
};
</script>

<style lang="sass" scoped>
  #gameUI
    margin-bottom: 1em
</style>
