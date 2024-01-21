<template>
  <div>
    <base-card>
      <h2>REGISTER</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </div>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm,
  },
  methods: {
    saveData(formData) {
      this.$store.dispatch('coaches/registerCoach', formData);
      //this method cannot go back to the previous page
      this.$router.replace('/coaches');
      // this.$push('/coaches')
    },
  },
};
</script>
