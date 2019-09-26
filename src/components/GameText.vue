<template>
  <div v-if="shots > 0" id="headerText">*** {{shotText}} ***</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "GameText",
  computed: {
    ...mapState({
      shots: state => state.shots,
      shotText: state => state.shotText,
    }),
  },
};
</script>

<style lang="sass" scoped>
  #headerText
    margin-bottom: 1em
</style>