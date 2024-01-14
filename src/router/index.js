import { createRouter, createWebHashHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';
import SchedulerView from '@/views/SchedulerView.vue';
import ResultsView from '@/views/ResultsView.vue';
import AnalyticsView from '@/views/AnalyticsView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { title: 'Dashboard', requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { title: 'Login' }
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignupView,
        meta: { title: 'SignUp' }
    },
    {
        path: '/scheduler',
        name: 'scheduler',
        component: SchedulerView,
        meta: { title: 'Scheduler', requiresAuth: true }
    },
    {
        path: '/results',
        name: 'results',
        component: ResultsView,
        meta: { title: 'Results', requiresAuth: true }
    },
    {
        path: '/analytics',
        name: 'analytics',
        component: AnalyticsView,
        meta: { title: 'Analytics', requiresAuth: true }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

let currentUser;

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !currentUser) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
