<template>
    <div class="form-wrapper">
        <div class="form-container">
            <h1 class="form-title">Login</h1>
            <form @submit.prevent="login" class="login-form">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="password" required>
                </div>
                <button type="submit" class="submit-button">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import store from '../../store';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
    name: 'LoginView',
    setup() {
        const email = ref('');
        const password = ref('');
        const router = useRouter();

        const login = async () => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
                store.dispatch('setUser', {
                    email: userCredential.user.email,
                });
                router.push('/');
            } catch (error) {
                alert(error.message);
            }
        };

        return {
            email,
            password,
            login,
        };
    },
};
</script>

<style scoped>
    @import "@/assets/styles/form.css";
</style>
