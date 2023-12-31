<template>
    <div class="cards-container">
        <div class="card calendar-card">
            <vue-cal
                :events="myEvents"
                small
                :on-event-click="eventClicked"
                :on-day-click="dayClicked"
                :on-cell-mouse-enter="cellMouseEnter"
                :on-cell-mouse-leave="cellMouseLeave"
                :selected-dates="selectedDates"
                :indicators="true"
                :disable-views="['years']"
                style="
                --vuecal--selected-date-bg-color: orange;
                --vuecal--text-color: #fff;
                --vuecal--bg-color: #fff;
                --vuecal--weekday-bg-color: #fff;
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
                    <span>1 task</span>
                </div>
                <div class="scraping-tasks-item">
                    <span>Yesterday</span>
                    <span>0 tasks</span>
                </div>
                <div class="scraping-tasks-item">
                    <span>In the last 7 days</span>
                    <span>5 tasks</span>
                </div>
                <div class="scraping-tasks-item">
                    <span>In the last 28 days</span>
                    <span>9 tasks</span>
                </div>
            </div>
        </div>

        <div class="card directory-card">
            <h3>My Directory</h3>
            <div class="directory-list">
                <div class="directory-item">
                    <i class="fas fa-folder fa-3x"></i>
                    <span>Collection 1</span>
                </div>
                <div class="directory-item">
                    <i class="fas fa-folder fa-3x"></i>
                    <span>Collection 2</span>
                </div>
                <div class="directory-item">
                    <i class="fas fa-folder fa-3x"></i>
                    <span>Collection 3</span>
                </div>
                <div class="directory-item">
                    <i class="fas fa-folder fa-3x"></i>
                    <span>Collection 4</span>
                </div>
            </div>
        </div>

        <div class="card my-tasks-card">
            <h3>My Tasks</h3>
            <ul>
                <li>
                    <i class="fas fa-circle-notch task-icon"></i>
                    <span class="task-name">Pub Med Central latest news crawling</span>
                    <span class="task-date">Today</span>
                    <span class="task-status not-started">Just Started</span>
                    <span class="task-priority high">High Priority</span>
                </li>
                <li>
                    <i class="fas fa-circle-notch task-icon"></i>
                    <span class="task-name">Google Scholar machine learning crawling</span>
                    <span class="task-date">Tomorrow</span>
                    <span class="task-status not-started">Not Started</span>
                    <span class="task-priority high">Low Priority</span>
                </li>
                <li>
                    <i class="fas fa-circle-notch task-icon"></i>
                    <span class="task-name">Google Scholar page scraping</span>
                    <span class="task-date">Friday</span>
                    <span class="task-status not-started">Not Started</span>
                    <span class="task-priority high">Medium Priority</span>
                </li>
            </ul>
        </div> 
    </div>
</template>

<script>
    import VueCal from 'vue-cal';
    import 'vue-cal/dist/vuecal.css';

    export default {
        name: 'HomeView',
        components: {
            VueCal
        },
        data() {
        return {
            selectedDates: [],
            myEvents: [
            {
                start: new Date(2023, 11, 5, 10, 0),
                end: new Date(2023, 11, 5, 12, 0), 
                title: 'Run web crawler for the latest med news',
                content: '',
                classes: 'event-class'
            }
            ],
        };
        },
        methods: {
        eventClicked(event) {
            console.log('Event clicked:', event);
        },
        dayClicked(day) {
            console.log('Day clicked:', day);
            this.selectedDates = [day.date];
        },
        cellMouseEnter(date) {
            console.log('Mouse entered cell with date:', date);
        },
        cellMouseLeave(date) {
            console.log('Mouse left cell with date:', date);
        },
        }
    };
</script>

<style>
.vuecal__header button {
    color: #fff;
}

.vuecal__heading .weekday-label {
    font-size: 0.8em;
}

.card {
    flex: 1 1 calc(50% - 20px);
    height: calc((100vh - 70px) / 2 - 20px);
    background: #333; 
    color: #fff;
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
}

.card h3 {
    font-size: 1.2rem;
}

.today {
    background-color: #f00;
}

.scraping-tasks-card {
    background-color: #333;
    color: #fff;
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
    background-color: #555;
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
    color: #aaa;
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
    background-color: #333;
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
    background-color: #333;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
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
}

.my-tasks-card li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #444;
    color: white;
    border-radius: 5px;
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
    background-color: #333;
    color: white;
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
}

.directory-item {
    background-color: #444;
    border-radius: 5px;
    padding: 20px;
    margin: 10px;
    width: calc(50% - 40px);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.directory-item i {
    margin-bottom: 10px;
    color: orange;
}
@media (min-width: 768px) {
    .card {
        width: calc(50% - 20px);
    }
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
