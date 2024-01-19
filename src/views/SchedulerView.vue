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
            <select id="site" v-model="taskData.site" @change="updateTaskData(taskData.site)">
                <option v-for="site in sites" :key="site.name" :value="site.name">
                    {{ site.name }}
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
                    <label for="collection">Collection name:</label>
                    <input id="collection" v-model="taskData.collection" type="text" required>
                </div>

            <div class="form-group">
                <button type="submit">Schedule Task</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const userEmail = ref(store.getters.userEmail);

        const sites = ref([
            { name: "Google Scholar", script: "google_scholar.py" },
            { name: "ArXiv", script: "arxiv.py" },
            { name: "NCBI", script: "ncbi.py" },
            { name: "Technium Science", script: "techniumScience.py"}
        ]);

        const taskData = ref({
            name: '',
            site: '',
            siteScript: '',
            string: '',
            datetime: '',
            frequency: 'none',
            collection: '',
        });

        const updateTaskData = (siteName) => {
            const selectedSite = sites.value.find(site => site.name === siteName);
            if (selectedSite) {
                taskData.value.siteScript = selectedSite.script;
            } else {
                taskData.value.siteScript = '';
            }
        };

        const scheduleTask = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/scheduleTask', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userEmail: userEmail.value,
                        taskData: taskData.value
                    }),
                });
                if (response.ok) {
                    console.log("Task scheduled successfully");
                } else {
                    console.error("Failed to schedule task");
                }
            } catch (error) {
                console.error("Error scheduling task:", error);
            }
        };

        return {
            userEmail,
            sites,
            taskData,
            updateTaskData,
            scheduleTask
        };
    },
};
</script>

<style scoped>
.scheduler-container {
    width: 500px;
    margin: 20px auto;
    padding: 20px;
    overflow-y: auto;
}
.scheduler-h2{
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
}
.scheduler-form{
    margin: 10px 20px;
    align-items: center;
}
.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: var(--color);
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
