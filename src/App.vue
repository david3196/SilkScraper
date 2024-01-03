<template>
    <div class="app-container">
        <aside class="sidebar">
            <nav>
                <button class="nav-item active"><i class="fas fa-tachometer-alt"></i></button>
                <button class="nav-item"><i class="fas fa-folder-open"></i></button>
                <button class="nav-item"><i class="fas fa-chart-line"></i></button>
            </nav>
            <button class="nav-item settings"><i class="fas fa-cog"></i></button>
            <ModeSwitchBtn/>
        </aside>

        <main class="main-content">
            <header class="main-header">
                <h1 class="unselectable">Dashboard</h1>
                <h2 class="unselectable">Silk Scraper</h2>
                <div class="profile-pic unselectable">
                    <!-- <img src="./assets/user.png" alt="Profile Picture"> -->
                    <router-link v-if="!user" to="/login">Login</router-link>
                    <router-link v-if="!user" to="/signup">Sign Up</router-link>
                    <router-link v-if="isAdmin" to="/adminPage">Admin Panel</router-link>
                    <button v-if="user" @click="logout">Logout</button>    
                </div>
            </header>
            <router-view/>
        </main>
    </div>
</template>

<script>
    import { ref, onMounted, onUnmounted, computed } from 'vue';
    import { auth } from '@/firebase';
    import { onAuthStateChanged } from 'firebase/auth';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import ModeSwitchBtn from './components/ModeSwitchBtn.vue';

    export default {
        setup() {
        const user = ref(null);
        const router = useRouter();
        const store = useStore();
        const userObj = ref(null);

        const fetchUserData = async (email) => {
            try {
                const response = await fetch('http://localhost:3000/api/getUserByEmail?email=' + email);
                if (!response.ok) {
                    throw new Error('Server responded with ' + response.status);
                }
                const data = await response.json();
                userObj.value = data;
                console.log(userObj.value.userType)
            } catch (error) {
                console.error('Failed to fetch user', error);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            store.dispatch('setUser', firebaseUser);
            user.value = firebaseUser;
            if (firebaseUser && firebaseUser.email) {
                fetchUserData(firebaseUser.email);
            }
        });

        const isAdmin = computed(() => {
            return userObj.value && userObj.value.userType === 0;
        });

        onMounted(() => {
            if (user.value && user.value.email) {
                fetchUserData(user.value.email);
            }
        });

        onUnmounted(() => {
            unsubscribe();
        });

        const logout = async () => {
            await auth.signOut();
            store.dispatch('setUser', null);
            user.value = null;
            userObj.value = null;
            router.push('/');
        };

        return { user, logout, userObj, isAdmin };
    },
        components: {
            ModeSwitchBtn
        },
    };
</script>

<style>

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .unselectable {
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none;    /* Firefox */
        -ms-user-select: none;     /* Edge */
        user-select: none;         /* Chrome, Opera, Edge */
    }

    .app-container {
        display: flex;
        height: 100vh;
        overflow: hidden;
    }

    .sidebar {
        background-color: #333;
        width: 75px;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        overflow-y: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .nav-item {
        background: none;
        border: none;
        color: white;
        width: 100%;
        padding: 20px 0;
        text-align: center;
        font-size: 1.5rem;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .nav-item:hover,
    .nav-item.active {
        background-color: #f60;
    }

    .nav-item i {
        margin: auto;
    }

    .nav-item.settings {
        margin-top: auto;
    }

    .main-content {
        display: flex;
        flex-direction: column;
        padding: 0px;
        height: 100vh;
        margin-left: 75px;
        width: calc(100% - 75px);
        overflow-y: auto;
        background-color: rgb(26, 26, 26);
        box-sizing: border-box;
    }

    .main-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #222;
        color: white;
        padding: 10px;
        height: 50px;
        margin: 0;
    }

    .profile-pic {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
    }

    .profile-pic img {
        width: 100%;
        height: auto;
    }

</style>

