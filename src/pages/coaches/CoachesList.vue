<template>
<base-card>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <base-button mode="outeline">Refresh</base-button>
      <router-link to="/register">Register as a Coach</router-link>
    </div>
    <ul v-if="hasCoaches">
      <!-- <li v-for="coach in filteredCoaches" :key="coach.id"></li> -->
      <coach-item
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :id="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas"
      ></coach-item>
    </ul>
    <h3 v-else>No coaches found.</h3>
  </section>
  <section>LIST OF COACHES</section>
  </base-card>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
// import { mapGetters } from 'vuex'
export default {
  components: { CoachItem, BaseButton },
  computed: {
    filteredCoaches() {
      return this.$store.getters['coaches/coaches'];
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>