<template>
    <div class="card analytics-container">
        <h2 class="analytics-h2">Task Completion Analytics</h2>
        <div class="chart-container">
            <div class="dropdown-container">
                <label for="time-range">Select Time Range:</label>
                <select id="time-range" v-model="selectedTimeRange">
                    <option value="7">Last 7 Days</option>
                    <option value="14">Last 14 Days</option>
                    <option value="30">Last 30 Days</option>
                </select>
            </div>
            <div class="donut-chart">
                <apex-chart type="donut" :options="donutOptions" :series="donutSeries"></apex-chart>
            </div>
            <div class="bar-chart">
                <apex-chart type="bar" :options="barOptions" :series="barSeries"></apex-chart>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import VueApexCharts from 'vue3-apexcharts';

export default {
    components: {
        'apex-chart': VueApexCharts,
    },
    setup() {
        const store = useStore();
        const user = ref(store.getters.userEmail);
        const tasks = ref([]);
        const selectedTimeRange = ref(7);

        const donutSeries = ref([]);
        const donutOptions = ref({
            chart: {
                type: 'donut',
            },
            labels: ['Completed Tasks', 'Failed Tasks'],
            legend: {
                position: 'bottom',
                labels: {
                    colors: '#f60'
                },
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    
                }
            }]
        });

        const barSeries = ref([{
            name: "Tasks Per Day",
            data: []
        }]);
        const barOptions = ref({
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: [],
                labels: {
                    style: {
                        colors: '#f60',
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Number of Tasks',
                    style: {
                        color: '#f60',
                    }
                },
                labels: {
                    style: {
                        colors: '#f60',
                    }
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " tasks"
                    }
                }
            }
        });

        const fetchTasks = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getUserTasks?user=${encodeURIComponent(user.value)}`);
                if (!response.ok) throw new Error('Failed to fetch tasks');
                const rawData = await response.json();
                tasks.value = filterTasksByTimeRange(rawData, selectedTimeRange.value);
                updateCharts();
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        const filterTasksByTimeRange = (allTasks, days) => {
            const endDate = new Date();
            const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));
            return allTasks.filter(task => {
                const taskDate = new Date(task.scheduleTime);
                return taskDate >= startDate && taskDate <= endDate;
            });
        };

        const updateCharts = () => {
            const completedTasksCount = tasks.value.filter(task => task.status === 'completed').length;
            const failedTasksCount = tasks.value.filter(task => task.status === 'error').length;
            donutSeries.value = [completedTasksCount, failedTasksCount];

            const timeRangeDays = createTimeRangeDays(selectedTimeRange.value);
            const tasksPerDay = timeRangeDays.map(date => {
                return tasks.value.filter(task => {
                    const taskDate = new Date(task.scheduleTime);
                    return taskDate.toDateString() === date.toDateString();
                }).length;
            });

            barSeries.value[0].data = tasksPerDay;
            barOptions.value.xaxis.categories = timeRangeDays.map(date => date.toLocaleDateString());
        };

        const createTimeRangeDays = (numberOfDays) => {
            const dates = [];
            for (let i = 0; i < numberOfDays; i++) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                dates.unshift(date);
            }
            return dates;
        };

        onMounted(() => {
            fetchTasks();
        });

        watch(selectedTimeRange, fetchTasks, { immediate: true });

        return {
            selectedTimeRange,
            donutOptions,
            donutSeries,
            barOptions,
            barSeries,
            updateCharts,
        };
    }
};
</script>
 
<style scoped>
.analytics-container {
    width: 500px;
    margin: 20px auto;
    padding: 10px;
    overflow-y: auto;
}
.analytics-h2{
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
}
.chart-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.dropdown-container {
    text-align: center;
    margin-bottom: 20px;
}
.dropdown-container label {
    display: block;
    margin-bottom: 5px;
    color: var(--color);
}
.dropdown-container select {
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
.donut-chart,
.bar-chart {
    position: relative;
    max-height: 400px;
}

@media (max-width: 767px) {
    .donut-chart,
    .bar-chart {
        height: 300px;
    }
    .donut-chart{
        height: auto;
    }
    .chart-container{
        
        overflow-y: auto;
        overflow-x: auto;
    }
    .analytics-container{
        max-width: 300px;
        margin: 10px auto;
    }
}
</style>
