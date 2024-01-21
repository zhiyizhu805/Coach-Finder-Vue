<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader
  },
  // (auto logout4.5)add computed property ,return true or false if didAutoLogout is true or false 
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    }
  },
  // (auto logout4.6)add watch property ,watch didAutoLogout property. Since didAutoLogout is initialized as false, if it changes to true, it means that the user has been logged out automatically. In this case, we want to redirect the user to the coaches page.
  watch: {
    didAutoLogout(currrentValue,oldValue){
      if(currrentValue && currrentValue !== oldValue){
        this.$router.replace('/coaches');
      }}},
  created(){
    this.$store.dispatch('tryLogin')
  }  
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>