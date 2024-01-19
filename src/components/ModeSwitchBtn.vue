<template>
    <div class="btn_theme" @click="toggleTheme">
        <div class="btn__indicator" :class="{ 'darkmode': themePreference === 'dark' }">
            <div class="btn__icon-container">
                <font-awesome-icon v-if="isInitialized" :icon="themePreference === 'dark' ? 'moon' : 'sun'"
                    class="btn__icon" />
            </div>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSun, faMoon);

export default {
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            themePreference: 'dark',
            isInitialized: false,
        };
    },
    mounted() {
        this.loadThemePreference();
        this.isInitialized = true;
        this.applyTheme();
    },
    methods: {
        toggleTheme() {
            this.themePreference = this.themePreference === 'dark' ? 'light' : 'dark';
            this.storeThemePreference(this.themePreference);
            this.applyTheme();
        },
        storeThemePreference(value) {
            localStorage.setItem('themePreference', value);
        },
        loadThemePreference() {
            const themePreference = localStorage.getItem('themePreference');
            this.themePreference = themePreference || 'dark';
        },
        applyTheme() {
            if (this.themePreference === 'dark') {
                document.body.classList.remove('lightmode');
                document.body.classList.add('darkmode');
            } else {
                document.body.classList.remove('darkmode');
                document.body.classList.add('lightmode');
            }
        },
    },
};
</script>


<style >
    :root{
        --color: #9176FF;
        --dark-color: #2b2b2b;
        --dark-icon-color: #fff;
        --light-color: #f7f7f7;
        --light-icon-color: #FFDE59;
    }

    .btn_theme{
        background-color: #fff;
        width: 3.2em;
        height: 1.6em;
        border-radius: 2em;
        padding: 0 0.1em;
        margin-left: 0.75em;
        margin-bottom: 0.2em;

        box-shadow: inset 0 4px 3px rgba(0,0,0, .1),
                    inset 0 4px 4px rgba(0,0,0, .1),
                    inset 0 -2px 2px rgba(0,0,0, .1);

        position: relative;

        display: flex;
        align-items: center;

        cursor: pointer;
    }

    .btn__indicator{
        background-color: #fff;
        width: 1.4em;
        height: 1.4em;
        border-radius: 50%;

        position: absolute;

        box-shadow: 0 8px 40px rgba(0,0,0, .2);

        transition: transform .3s ease;
        transform: translateX(0);
    }

    .btn__icon-container{
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn__icon{
        color: var(--light-icon-color);
        font-size: 0.6rem;
    }

    .btn__icon.animated{
        animation: spin 0.5s;
    }

    @keyframes spin{
    to {
        transform: rotate(360deg);
    }
    }

    body.darkmode{
        background-color: var(--dark-color);
    }

    .darkmode .btn_theme{
        box-shadow: inset 0 8px 60px rgba(0,0,0, .3),
                    inset 8px 0 8px rgba(0,0,0, .3),
                    inset 0 -4px 4px rgba(0,0,0, .3);
    }

    .darkmode .btn__indicator{
        transform: translateX(1.6em);
        background-color: var(--dark-color);
        box-shadow: 0 8px 40px rgba(0,0,0, .3);
    }

    .darkmode .btn__icon{
        color: var(--dark-icon-color);
    }

</style>
