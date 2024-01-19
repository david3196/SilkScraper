<template>
    <div class="card results-container">
        <h2 class="results-h2">My Scraping Tasks Results</h2>
        <div class="select-container">
            <div class="select-container">
                <label for="collection-select" class="select-text">Choose a collection:</label>
                <select id="collection-select" v-model="selectedCollection" @change="fetchTasksForCollection">
                <option value="">Select a collection</option>
                <option v-for="collection in collections" :key="collection" :value="collection">
                    {{ collection }}
                </option>
                </select>
            </div>
        </div>
        <div v-if="filteredTasks.length > 0" class="table-container">
            <table class="tasks-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Task Name</th>
                        <th>Site</th>
                        <th>String</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="task in filteredTasks" :key="task._id.$oid">
                        <td>{{ formatDate(task.scheduleTime) }}</td>
                        <td>{{ task.taskDetails.name }}</td>
                        <td>{{ task.taskDetails.site }}</td>
                        <td>{{ task.taskDetails.string }}</td>
                        <td>
                            <button @click="downloadExcel(task._id)" class="download-button">
                                <i class="fas fa-download"></i> Download Excel
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="no-results">
            <p>No tasks found for the selected collection.</p>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const user = computed(() => store.getters.userEmail);
        const tasks = ref([]);
        const collections = ref([]);
        const selectedCollection = ref('');
        const filteredTasks = computed(() => {
            if (selectedCollection.value) {
                return tasks.value.filter(task =>
                    task.taskDetails && task.taskDetails.collection === selectedCollection.value
                );
            } else {
                return [];
            }
        });

        const fetchTasks = async () => {
            const userEmail = user.value;
            try {
                const response = await fetch(`http://localhost:3000/api/getUserTasks?user=${encodeURIComponent(userEmail)}`);
                if (response.ok) {
                    const data = await response.json();
                    tasks.value = data;

                    const collectionSet = new Set();
                    tasks.value.forEach(task => {
                        if (task.taskDetails && task.taskDetails.collection) {
                            collectionSet.add(task.taskDetails.collection);
                        }
                    });
                    collections.value = Array.from(collectionSet);
                } else {
                    console.error('Failed to fetch tasks');
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        };

        async function downloadExcel(taskId) {
            try {
                console.log("Downloading Excel for task:", taskId);

                const response = await fetch(`http://localhost:3000/api/downloadExcel/${taskId}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = downloadUrl;
                a.download = "task-results.xlsx";
                document.body.appendChild(a);
                a.click();

                window.URL.revokeObjectURL(downloadUrl);
                a.remove();
            } catch (error) {
                console.error("Failed to download Excel:", error);
            }
        }

        onMounted(fetchTasks);

        return {
            tasks,
            collections,
            selectedCollection,
            filteredTasks,
            formatDate,
            downloadExcel,
        };
    }
};
</script>


<style scoped>
.table-container {
    margin: 20px auto;
    overflow-y: auto;
    max-height: 500px;
}
.results-container {
    width: 50%;
    margin: 20px auto;
    padding: 20px;
    text-align: center;
}
.results-h2 {
    text-align: center;
    margin-top: 20px;
}
.select-container label {
    display: block;
    margin-bottom: 10px;
    margin-top: 30px;
    color: var(--color);
    text-align: center;
}
.select-text{
    color: var(--color);
}
.select-container select {
    width: 100%;
    padding: 8px; 
    border-radius: 4px;
    border: 1px solid #ccc;
}
.select-container {
    margin-bottom: 20px;
    margin: 0 auto;
    max-width: 300px;
}
.tasks-table {
    width: auto;
    border-collapse: collapse;
    margin: 0 auto;
}
.tasks-table th, .tasks-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}
.tasks-table th {
    background-color: #f4f4f4;
    color: #333;
}
.no-results {
    text-align: center;
    padding: 20px;
    color: #999;
}
.download-button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 12px 24px; 
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}
.download-button:hover {
  background-color: #45a049;
}
.download-button i {
  margin-right: 8px;
}

@media (max-width: 767px) {
    .tasks-table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }
    .table-container {
    margin: 0px;
    overflow-y: auto;
    max-height: 700px;
    }

    .results-container{
        width: 100%;
        margin: 10px auto;
    }
}
</style>
