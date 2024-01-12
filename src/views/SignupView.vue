<template>
    <div class="form-wrapper">
        <div class="form-container signup-container">
            <h1 class="form-title signup-title">Sign Up</h1>
            <form @submit.prevent="signUp" class="signup-form">
                <div class="form-group">
                    <label for="firstName">First Name:</label>
                    <input type="text" id="firstName" v-model="firstName" required>
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name:</label>
                    <input type="text" id="lastName" v-model="lastName" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="password" required>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" required>
                </div>
                <button type="submit" class="submit-button">Sign Up</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import store from '../../store';

export default {
    name: 'SignupView',
    setup() {
        const firstName = ref('');
        const lastName = ref('');
        const email = ref('');
        const password = ref('');
        const confirmPassword = ref('');
        const router = useRouter();

        const validateEmail = (email) => {
            const re = /^\S+@\S+\.\S+$/;
            return re.test(email.toLowerCase());
        };

        const signUp = async () => {
            if (!firstName.value.trim()) {
                alert("First name is required.");
                return;
            }
            if (!lastName.value.trim()) {
                alert("Last name is required.");
                return;
            }
            if (!email.value.trim() || !validateEmail(email.value)) {
                alert("Please enter a valid email address.");
                return;
            }
            if (password.value.length < 6) {
                alert("Password must be at least 6 characters long.");
                return;
            }
            if (password.value !== confirmPassword.value) {
                alert("Passwords do not match.");
                return;
            }
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
                store.dispatch('setUser', {
                    email: userCredential.user.email,
                });

                const userData = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    userType: 1,
                    email: email.value,
                    watchList: {},
                };

                await saveUserDetails(userData);

                router.push('/');
            } catch (error) {
                alert(error.message);
            }
        };

        const saveUserDetails = async (userData) => {
            try {
                await fetch('http://localhost:3000/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
            } catch (error) {
                console.error('Error saving user details:', error);
                throw error;
            }
        };

        return {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            signUp,
        };
    },
};
</script>

<style scoped>
    @import "@/assets/styles/form.css";
</style>
