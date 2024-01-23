<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3></base-card
      >
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested?Reach out now!</h2>
        </header>
          <base-button link :to="coachContactLink">Contact</base-button>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    coachContactLink() {
      console.log('id', this.id)
      console.log('this.$route.path', this.$route.path)
        return this.$route.path + '/contact'
    },
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    contactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    },
  },
  //when the component is created, we want to fetch the coach with the id from the route.
  //And reach out to vuex to get the coach with the id.
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    );
    console.log(this.selectedCoach);
  },
};
</script>
