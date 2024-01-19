<template>
    <div class="app-container">
        <aside class="sidebar">
            <nav>
                <button :class="['nav-item', { active: currentRouteName === 'home' }]" @click="goTo('home')"><i class="fas fa-tachometer-alt"></i></button>
                <button :class="['nav-item', { active: currentRouteName === 'results' }]" @click="goTo('results')"><i class="fas fa-folder-open"></i></button>
                <button :class="['nav-item', { active: currentRouteName === 'analytics' }]" @click="goTo('analytics')"><i class="fas fa-chart-line"></i></button>
                <button :class="['nav-item', { active: currentRouteName === 'scheduler' }]" @click="goTo('scheduler')"><i class="fas fa-spider"></i></button>
            </nav>
            <ModeSwitchBtn/>
        </aside>

        <main class="main-content">
            <header class="main-header">
                <h1 class="unselectable">{{ route.meta.title }}</h1>
                <h2 class="unselectable site-name">Silk Scraper</h2>
                <div class="profile-pic dropdown unselectable">
                    <button class="profile-button" @click="toggleDropdown">
                        <img src="./assets/user.png" alt="Profile Picture">
                    </button>
                    <div v-if="dropdownOpen" class="dropdown-menu">
                        <router-link v-if="!user" to="/login"  @click="login" class="dropdown-item">Login</router-link>
                        <router-link v-if="!user" to="/signup"  @click="signup" class="dropdown-item">Sign Up</router-link>
                        <button v-if="user" @click="logout" class="dropdown-item" id="logout-btn">Logout</button>
                    </div>   
                </div>
            </header>
            <router-view/>
        </main>
    </div>
</template>

<script>
    import { ref, onMounted, onUnmounted, computed  } from 'vue';
    import { auth } from '@/firebase';
    import { onAuthStateChanged } from 'firebase/auth';
    import { useRouter, useRoute  } from 'vue-router';
    import { useStore } from 'vuex';
    import ModeSwitchBtn from './components/ModeSwitchBtn.vue';

    export default {
        setup() {
        const user = ref(null);
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const userObj = ref(null);
        const dropdownOpen = ref(false);

        const currentRouteName = computed(() => route.name);

        const goTo = (name) => {
            router.push({ name });
        };

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
            store.dispatch('clearUser');
            user.value = null;
            userObj.value = null;
            dropdownOpen.value = false;
            router.push('/');
        };

        const dashboard = async () => {
            router.push('/');
        };

        const scheduler = async () => {
            router.push('/scheduler');
        };

        const login = async () => {
            dropdownOpen.value = false;
        };

        const signup = async () => {
            dropdownOpen.value = false;
        };

        const toggleDropdown = () => {
            dropdownOpen.value = !dropdownOpen.value;
        };

        const currentMode = computed(() => {
            const themePreference = localStorage.getItem('themePreference');
            return themePreference === 'dark' ? 'dark-mode' : 'light-mode';
        });

        return { user, currentRouteName, goTo, route, logout, dashboard, scheduler, login, signup, userObj, dropdownOpen, toggleDropdown, currentMode };
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

    .lightmode{
        --color: #333;
        --background-color: #F5EEE6;
        --cards-color: #FFF8E3;
        --navbar-color: #ece6d5;
        --list-color: #dfd0a9;
        
    }

    .darkmode {
        --color: white;
        --background-color: rgb(26, 26, 26);
        --cards-color: #333;
        --navbar-color: #222;
        --list-color: #444;
    }

    .site-name{
        color: var(--color);
    }

    .fas{
        color: var(--color);
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
        background-color: var(--cards-color);
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
        color: var(--color);
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
        background-color: var(--background-color);
        box-sizing: border-box;
    }

    .main-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--navbar-color);
        color: var(--color);
        padding: 10px;
        height: 50px;
        margin: 0;
    }

    .profile-pic {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        position: relative;
    }

    .profile-pic img {
        width: 100%;
        height: auto;
    }

    .profile-button {
        background: none;
        border: none;
        cursor: pointer;
    }

    .dropdown-menu {
        display: none;
        position: absolute;
        right: 0;
        top: 100%; 
        background-color: rgba(0, 0, 0, 0.7);
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 100;
        text-align: center;
        border-radius: 4px;
        margin-top: 10px;
    }

    .dropdown-menu::before {
        content: '';
        position: absolute;
        top: -10px; 
        right: 12px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgba(0, 0, 0, 0.7); 
    }

    .dropdown-menu .dropdown-item {
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        color: white;
    }

    .dropdown-menu .dropdown-item:hover {
        background-color: #f60;
    }

    .dropdown .dropdown-menu {
        display: block;
    }

    #logout-btn{
        border: none;
        display: inline;
        background: none;
        cursor: pointer;
        width: 100%;
    }

    #logout-btn:hover {
        background-color: #f60;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    }

    @media (max-width: 767px) {
        .site-name {
            display: none;
        }
    }
</style>

