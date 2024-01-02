<template>
    <div class="btn_theme" @click="toggleDarkMode">
        <div class="btn__indicator" :class="{ 'darkmode': isDarkMode }">
            <div class="btn__icon-container">
                <font-awesome-icon v-if="isDarkModeInitialized" :icon="isDarkMode ? 'moon' : 'sun'" class="btn__icon" />
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
                isDarkMode: true,
                isDarkModeInitialized: false,
            };
        },
        mounted() {
            this.loadDarkMode();
            this.isDarkModeInitialized = true;
            if (this.isDarkMode) {
                document.body.classList.add('darkmode');
            }
        },
        methods: {
            toggleDarkMode() {
                this.isDarkMode = !this.isDarkMode;
                this.storeDarkMode(this.isDarkMode);
                if (this.isDarkMode) {
                    document.body.classList.add('darkmode');
                } else {
                    document.body.classList.remove('darkmode');
                }
            },
            storeDarkMode(value) {
                localStorage.setItem('darkmode', value);
            },
            loadDarkMode() {
                const darkmode = localStorage.getItem('darkmode');
                this.isDarkMode = darkmode === 'true';
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
