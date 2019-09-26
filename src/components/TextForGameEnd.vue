<template>
  <div v-if="battle_ships_total_parts <= 0" id="gameEnd">Well done! You completed the game in {{shots}} shots</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TextForGameEnd",
  computed: {
    ...mapState({
      battle_ships_total_parts: state => state.battle_ships_total_parts,
      shots: state => state.shots,
    }),
  },
};
</script>

<style lang="sass">
  #gameEnd
    margin-top: 1em
</style>