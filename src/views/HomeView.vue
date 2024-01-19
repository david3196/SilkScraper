<template>
    <div class="cards-container">
        <div class="card calendar-card">
            <vue-cal
                small
                :indicators="true"
                :disable-views="['years']"
                style="
                --vuecal--selected-date-bg-color: orange;
                --vuecal--text-color: var(--color);
                --vuecal--bg-color: var(--color);
                --vuecal--weekday-bg-color: var(--color);
                --vuecal--time-header-font-size: 4px;
                "
            ></vue-cal>
        </div>

        <div class="card scraping-tasks-card">
            <div class="scraping-tasks-header">
                <h3>Done Tasks Statistics</h3>
            </div>
            <div class="scraping-tasks-content">
                <div class="scraping-tasks-item">
                    <span>Today, so far</span>
                    <span>{{ todayTasks }}</span>
                </div>
                <div class="scraping-tasks-item">
                    <span>Yesterday</span>
                    <span>{{ yesterdayTasks }}</span>
                </div>
                <div class="scraping-tasks-item">
                    <span>In the last 7 days</span>
                    <span>{{ last7DaysTasks  }}</span>
                </div>
                <div class="scraping-tasks-item">
                    <span>In the last 28 days</span>
                    <span>{{ last28DaysTasks  }}</span>
                </div>
            </div>
        </div>

        <div class="card directory-card">
            <h3>My Directory</h3>
            <div class="directory-list">
                <div v-for="collection in collections" :key="collection" class="directory-item">
                    <i class="fas fa-folder fa-3x"></i>
                    <span>{{ collection }}</span>
                </div>
            </div>
        </div>

        <div class="card my-tasks-card">
            <h3>My Tasks</h3>
            <div class="task-list-container">
                <ul>
                    <li v-for="task in sortedTasks" :key="task._id.$oid">
                        <i class="fas fa-circle-notch task-icon"></i>
                        <span class="task-name">{{ task.taskDetails.name }}</span>
                        <span class="task-date">{{ formatDate(task.scheduleTime) }}</span>
                        <span :class="['task-status', task.status]">{{ formatStatus(task.status) }}</span>
                        <span class="task-priority">{{ formatFrequency(task.taskDetails.frequency) }}</span>
                    </li>
                </ul>
            </div>
        </div> 
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
    name: 'HomeView',
    components: {
        VueCal
    },
    setup() {
        const tasks = ref([]);
        const store = useStore();
        const user = computed(() => store.getters.userEmail);

        const fetchTasks = async () => {
            const userEmail = user.value;
            try {
                const response = await fetch(`http://localhost:3000/api/getUserTasks?user=${encodeURIComponent(userEmail)}`);
                if (response.ok) {
                    const data = await response.json();
                    tasks.value = data;
                } else {
                    console.error('Failed to fetch tasks');
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        onMounted(() => {
            fetchTasks();
        });

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toDateString();
        };

        const formatStatus = (status) => {
            switch (status) {
                case 'scheduled': return 'Scheduled';
                case 'error': return 'Error';
                case 'completed': return 'Completed';
                default: return status;
            }
        };

        const formatFrequency = (frequency) => {
            switch (frequency) {
                case 'none': return 'One-Time Task';
                case 'weekly': return 'Weekly Task';
                case 'monthly': return 'Monthly Task';
                default: return frequency;
            }
        };

        const sortedTasks = computed(() => {
            return tasks.value.slice().sort((a, b) => {
                const dateA = new Date(a.scheduleTime);
                const dateB = new Date(b.scheduleTime);
                return dateB - dateA;
            });
        });

        const todayTasks = computed(() => {
            const now = new Date();
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);

            return tasks.value.filter(task => {
                const taskDate = new Date(task.scheduleTime);
                return taskDate >= startOfDay && taskDate <= now && task.status === 'completed';
            }).length;
        });

        const collections = computed(() => {
            const collectionSet = new Set();
            tasks.value.forEach(task => {
                if (task.taskDetails && task.taskDetails.collection) {
                    collectionSet.add(task.taskDetails.collection);
                }
            });
            return Array.from(collectionSet);
        });

        const yesterdayTasks = computed(() => {
            const startOfYesterday = new Date();
            startOfYesterday.setDate(startOfYesterday.getDate() - 1);
            startOfYesterday.setHours(0, 0, 0, 0);

            const endOfYesterday = new Date(startOfYesterday);
            endOfYesterday.setHours(23, 59, 59, 999);

            return tasks.value.filter(task => {
                const taskDate = new Date(task.scheduleTime);
                return taskDate >= startOfYesterday && taskDate <= endOfYesterday && task.status === 'completed';
            }).length;
        });

        const last7DaysTasks = computed(() => {
            const now = new Date();
            const startOf7DaysAgo = new Date();
            startOf7DaysAgo.setDate(startOf7DaysAgo.getDate() - 7);
            startOf7DaysAgo.setHours(0, 0, 0, 0);

            return tasks.value.filter(task => {
                const taskDate = new Date(task.scheduleTime);
                return taskDate >= startOf7DaysAgo && taskDate <= now && task.status === 'completed';
            }).length;
        });

        const last28DaysTasks = computed(() => {
            const now = new Date();
            const startOf28DaysAgo = new Date();
            startOf28DaysAgo.setDate(startOf28DaysAgo.getDate() - 28);
            startOf28DaysAgo.setHours(0, 0, 0, 0);

            return tasks.value.filter(task => {
                const taskDate = new Date(task.scheduleTime);
                return taskDate >= startOf28DaysAgo && taskDate <= now && task.status === 'completed';
            }).length;
        });

        return {
            tasks,
            sortedTasks,
            collections,
            todayTasks,
            yesterdayTasks,
            last7DaysTasks,
            last28DaysTasks,
            formatDate,
            formatStatus,
            formatFrequency,
        };
    },
};
</script>


<style>
.vuecal__header button {
    color: var(--color);
}

.vuecal__heading .weekday-label {
    font-size: 0.8em;
}

.card {
    flex: 1 1 calc(50% - 20px);
    height: calc((100vh - 70px) / 2 - 20px);
    background: var(--cards-color); 
    color: var(--color);
    padding: 20px;
    margin: 10px; 
    border-radius: 10px;
    box-sizing: border-box;
    overflow: hidden;
}

.cards-container {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start; 
    overflow-y: auto; 
    margin: 10px;
    background-color: var(--background-color);
}

.card h3 {
    font-size: 1.2rem;
}

.today {
    background-color: #f00;
}

.scraping-tasks-card {
    background-color: var(--cards-color);
    color: var(--color);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
}

.scraping-tasks-card h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
}

.scraping-tasks-card ul {
    list-style: none;
}

.scraping-tasks-card li {
    background-color: var(--list-color);
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
}

.scraping-tasks-card li:before {
    content: '\f058';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    color: orange;
    margin-right: 10px;
}

.scraping-tasks-card li span {
    flex-grow: 1;
}

.scraping-tasks-card li:last-child {
    margin-bottom: 0;
}

.scraping-tasks-card li .date-indicator {
    font-size: 0.8rem;
    text-align: right;
    color: var(--color);
}

.scraping-tasks-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
}

.scraping-tasks-header h3 {
    font-size: 1.5rem;
}

.scraping-tasks-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.scraping-tasks-item {
    background-color: var(--list-color);
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.scraping-tasks-item span:first-child {
    font-weight: bold;
}

.my-tasks-card {
    background-color: var(--cards-color);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.my-tasks-card h3 {
    font-size: 1.5rem;
    color: orange;
    margin-bottom: 20px;
    text-align: center;
}

.my-tasks-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.my-tasks-card li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    background-color: var(--list-color);
    color: var(--color);
    border-radius: 5px;
}

.completed {
    color: green;
}

.error {
    color: red;
}

.scheduled {
    color: orange;
}

.task-list-container{
    overflow-y: auto;
    margin-bottom: 20px;
}

.task-icon {
    color: orange;
    margin-right: 10px;
}

.task-name {
    flex-grow: 1;
}

.task-date {
    margin-right: 10px;
}

.task-status {
    margin-right: 10px;
}

.not-started {
    color: red;
}

.directory-card {
    background-color: var(--cards-color);
    color: var(--color);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.directory-card h3 {
    text-align: left;
    margin-bottom: 20px;
    text-align: center;
}

.directory-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
}

.directory-item {
    background-color: var(--cards-color);
    border-radius: 5px;
    padding: 20px;
    margin: 10px;
    width: calc(50% - 20px);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.directory-item i {
    margin-bottom: 10px;
    color: orange;
}

@media (max-width: 767px) {
    .card {
        width: 100%;
        flex: 1 calc(100% - 20px);
    }
    
    .vuecal__no-event {
        font-size: 0;
        visibility: hidden;
    }

    .vuecal__no-event::after {
        content: "None";
        font-size: 10px;
        visibility: visible;
    }

    .vuecal__header{
        font-size: 12px;
    }

}
</style>
