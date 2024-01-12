import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';
import store from '../store';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
        store.dispatch('setUser', {
            email: firebaseUser.email,
        });
    } else {
        store.dispatch('clearUser');
    }
});

const app = createApp(App);
app.use(router);
app.use(store); 
app.mount('#app');
