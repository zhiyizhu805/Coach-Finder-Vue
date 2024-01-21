import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachesRegistration from './pages/coaches/CoachesRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './pages/store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }, //coaches/c1/contact
      ],
    },
    //(navigation guard2) add meta data to routes that need to be protected
    { path: '/register', component: CoachesRegistration,meta:{requiresAuth:true} },
    { path: '/requests', component: RequestsReceived,meta:{requiresAuth:true} },
    { path: '/auth', component: UserAuth,meta:{requiresUnauth:true}},
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

//(navigation guard1 )create a global navigation guard
router.beforeEach(function(to, _, next) {
  //(navigation guard3 )analyze the route we are trying to access, and check if it has the meta data we added
  // we can access store by importing it
  if (to.meta.requiresAuth && !store.getters.isAuthenticated){
    next('/auth');
}else if(to.meta.requiresUnauth && store.getters.isAuthenticated){
  next('/coaches');}
  else{
    next();
  }
});

export default router;