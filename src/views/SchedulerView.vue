<template>
    <div class="card scheduler-container">
        <h2 class="scheduler-h2">Schedule a new scraping task</h2>
        <form class="scheduler-form" @submit.prevent="scheduleTask">
            
            <div class="form-group">
                <label for="task-name">Task name:</label>
                <input id="task-name" v-model="taskData.name" type="text" required>
            </div>

            <div class="form-group">
                <label for="site">Site to scrape:</label>
                <select id="site" v-model="taskData.site">
                    <option v-for="site in sites" :key="site.name" :value="site.name">
                        {{ site.name }} - {{ site.description }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="string">String or Regex:</label>
                <input id="string" v-model="taskData.string" type="text" required>
            </div>

            <div class="form-group">
                <label for="datetime">Date and Time (UTC):</label>
                <input id="datetime" v-model="taskData.datetime" type="datetime-local" required>
            </div>

            <div class="form-group">
                <label for="frequency">Repeat:</label>
                <select id="frequency" v-model="taskData.frequency">
                    <option value="none">Don't repeat</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>

            <div class="form-group">
                <button type="submit">Schedule Task</button>
            </div>
        </form>
    </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
    data() {
        return {
            sites: [
                { name: 'Site1', description: 'description of Site1' },
                { name: 'Site2', description: 'description of Site2' },
            ],
            taskData: {
                name: '',
                site: '',
                string: '',
                datetime: '',
                frequency: 'none',
            }
        };
    },
    setup() {
        const store = useStore();

        const userEmail = store.getters.userEmail;

        return {
            userEmail
        };
    },
    methods: {
        async scheduleTask() {
            try {
                const response = await fetch('http://localhost:3000/api/scheduleTask', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userEmail: this.userEmail, taskData: this.taskData })
                });
                if (response.ok) {
                    console.log("Task scheduled successfully");
                } else {
                    console.error("Failed to schedule task");
                }
            } catch (error) {
                console.error("Error scheduling task:", error);
            }
        }
    }
};
</script>

<style scoped>
.scheduler-container {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
}
.scheduler-h2{
    text-align: center;
    margin-top: 20px;
}
.scheduler-form{
    margin: 70px 20px;
    align-items: center;
}
.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: white;
}

input[type="text"],
input[type="datetime-local"],
select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    display: block;
    margin: auto;
}

button:hover {
    background-color: #0056b3;
}

@media (max-width: 767px) {
    .scheduler-container {
        max-width: 300px;
        margin: 10px auto;
        padding: 10px;
    }

}
</style>
