<template>
<!-- (3.1) add error dialog -->
  <!-- two !! will convert the error to a boolean -->
  <!-- (3.3) listening the catch event -->
  <base-dialog :show="!!error" title="A error occured!" @close="handleError">
    <p>{{error}}</p>
  </base-dialog>
  <base-card>
    <section>
      FILTER
      <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
      <div class="controls">
        <!-- 7.when click ,call the loadCoaches function -->
        <base-button mode="outeline" @click="loadCoaches">Refresh</base-button>
        <base-button v-if="!isCoach && !isLoading" link  to="/register">Register as a Coach</base-button>
      </div>
      <!-- (2.5) register a basespinner globally then use it here -->
      <div v-if="isLoading">
        <base-spinner></base-spinner>
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
import CoachFilter from '../../components/coaches/CoachFilter.vue';

// import { mapGetters } from 'vuex'
export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      //(2.1) add a isLoading property to the data() method
      isLoading: false,
      //(3.2) add a error property to the data() method
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    //(2.6) update the hasCoaches() computed property
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
     isCoach(){
        return this.$store.getters['coaches/isCoach']
     }
  },
  // 6.the loadCoaches() method is called when the component is created
  created(){
      this.loadCoaches()
  },
  methods: {
    setFilter(updatedFilters) {
      this.activeFilters = updatedFilters;
    },

    //5. load all coaches from the server
    async loadCoaches() {
      //(2.2) set isLoading to true
      this.isLoading = true;
      //(3.3) use try/catch to catch any errors
      try{
        //(2.3) this dispatch will return a promise.We can use async/await to wait for the promise to resolve
        await this.$store.dispatch('coaches/loadCoaches');
      }catch(error){
        this.error = error.message || 'Failed to fetch coaches!'
      }

      //(2.4) set isLoading to false
      this.isLoading = false;
    },
    //(3.4) add a handleError() method
    handleError(){
      this.error = null
  },}
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
