import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';
import SchedulerView from '@/views/SchedulerView.vue';
import ReportsView from '@/views/ReportsView.vue';
import AnalyticsView from '@/views/AnalyticsView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { title: 'Dashboard' }
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
        meta: { title: 'Scheduler' }
    },
    {
        path: '/reports',
        name: 'reports',
        component: ReportsView,
        meta: { title: 'Reports' }
    },
    {
        path: '/analytics',
        name: 'analytics',
        component: AnalyticsView,
        meta: { title: 'Analytics' }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
