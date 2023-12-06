<template>
  <div class="app-container">
    <aside class="sidebar">
      <nav>
        <button class="nav-item active"><i class="fas fa-tachometer-alt"></i></button>
        <button class="nav-item"><i class="fas fa-folder-open"></i></button>
        <button class="nav-item"><i class="fas fa-chart-line"></i></button>
      </nav>
      <button class="nav-item settings"><i class="fas fa-cog"></i></button>
      <input type="checkbox" id="darkmode-toggle" checked/>
      <label for="darkmode-toggle">
        <svg version="1.1" class="sun" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 496 496" style="enable-background:new 0 0 496 496;" xml:space="preserve">
        <rect x="152.994" y="58.921" transform="matrix(0.3827 0.9239 -0.9239 0.3827 168.6176 -118.5145)" width="40.001" height="16"/>
        <rect x="46.9" y="164.979" transform="matrix(0.9239 0.3827 -0.3827 0.9239 71.29 -12.4346)" width="40.001" height="16"/>
        <rect x="46.947" y="315.048" transform="matrix(0.9239 -0.3827 0.3827 0.9239 -118.531 50.2116)" width="40.001" height="16"/>
          <rect x="164.966" y="409.112" transform="matrix(-0.9238 -0.3828 0.3828 -0.9238 168.4872 891.7491)" width="16" height="39.999"/>
          <rect x="303.031" y="421.036" transform="matrix(-0.3827 -0.9239 0.9239 -0.3827 50.2758 891.6655)" width="40.001" height="16"/>
          <rect x="409.088" y="315.018" transform="matrix(-0.9239 -0.3827 0.3827 -0.9239 701.898 785.6559)" width="40.001" height="16"/>
          <rect x="409.054" y="165.011" transform="matrix(-0.9239 0.3827 -0.3827 -0.9239 891.6585 168.6574)" width="40.001" height="16"/>
          <rect x="315.001" y="46.895" transform="matrix(0.9238 0.3828 -0.3828 0.9238 50.212 -118.5529)" width="16" height="39.999"/>
          <path d="M248,88c-88.224,0-160,71.776-160,160s71.776,160,160,160s160-71.776,160-160S336.224,88,248,88z M248,392c-79.4,0-144-64.6-144-144s64.6-144,144-144s144,64.6,144,144S327.4,392,248,392z"/>
        <rect x="240" width="16" height="72"/>
        <rect x="62.097" y="90.096" transform="matrix(0.7071 0.7071 -0.7071 0.7071 98.0963 -40.6334)" width="71.999" height="16"/>
        <rect y="240" width="72" height="16"/>
          <rect x="90.091" y="361.915" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -113.9157 748.643)" width="16" height="71.999"/>
        <rect x="240" y="424" width="16" height="72"/>
          <rect x="361.881" y="389.915" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 397.8562 960.6281)" width="71.999" height="16"/>
        <rect x="424" y="240" width="72" height="16"/>
        <rect x="389.911" y="62.091" transform="matrix(0.7071 0.7071 -0.7071 0.7071 185.9067 -252.6357)" width="16" height="71.999"/>
      </svg>
        <svg version="1.1" class="moon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 49.739 49.739" style="enable-background:new 0 0 49.739 49.739;" xml:space="preserve">
       <path d="M25.068,48.889c-9.173,0-18.017-5.06-22.396-13.804C-3.373,23.008,1.164,8.467,13.003,1.979l2.061-1.129l-0.615,2.268
       c-1.479,5.459-0.899,11.25,1.633,16.306c2.75,5.493,7.476,9.587,13.305,11.526c5.831,1.939,12.065,1.492,17.559-1.258v0
       c0.25-0.125,0.492-0.258,0.734-0.391l2.061-1.13l-0.585,2.252c-1.863,6.873-6.577,12.639-12.933,15.822
       C32.639,48.039,28.825,48.888,25.068,48.889z M12.002,4.936c-9.413,6.428-12.756,18.837-7.54,29.253
       c5.678,11.34,19.522,15.945,30.864,10.268c5.154-2.582,9.136-7.012,11.181-12.357c-5.632,2.427-11.882,2.702-17.752,0.748
       c-6.337-2.108-11.473-6.557-14.463-12.528C11.899,15.541,11.11,10.16,12.002,4.936z"/></svg>
      </label>
    </aside>

    <main class="main-content">
      <header class="main-header">
        <h1>Dashboard</h1>
        <h2>Silk Scraper</h2>
        <div class="profile-pic">
          <img src="./assets/user.png" alt="Profile Picture">
        </div>
      </header>

      <div class="upper-content-area">
        <section class="card calendar-card">
          <vue-cal
            :events="myEvents"
            :on-event-click="eventClicked"
            :on-day-click="dayClicked"
            :on-cell-mouse-enter="cellMouseEnter"
            :on-cell-mouse-leave="cellMouseLeave"
            :selected-dates="selectedDates"
            :indicators="true"
            style="--vuecal--selected-date-bg-color: orange; --vuecal--text-color: #fff; --vuecal--bg-color: #333; --vuecal--weekday-bg-color: #444;"
          ></vue-cal>

        </section>

          <section class="card scraping-tasks-card">
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
          </section>
      </div>

      <div class="lower-content-area">
      <section class="card directory-card">
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
      </section>

      <section class="card my-tasks-card">
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
    </section>
  </div>
  </main>
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

label {
	width:50px;
	height:25px;
	position: relative;
	display: block;
	background: #ebebeb;
	border-radius: 50px;
	box-shadow: inset 0px 5px 15px rgba(0,0,0,0.4), inset 0px -5px 15px rgba(255,255,255,0.4);
	cursor: pointer;
	transition: 0.3s;
  margin-left: 13px;
  margin-bottom: 10px;
}
label:after {
	content: "";
	width:25px;
	height: 25px;
	position: absolute;
	top:0px;
	left:25px;
	background: linear-gradient(180deg,#ffcc89,#d8860b);
	border-radius: 25px;
	box-shadow: 0px 5px 10px rgba(0,0,0,0.2);
	transition: 0.3s;
}
input {
	width: 0;
	height: 0;
	visibility: hidden;
}
input:checked + label {
	background: #242424;
}
input:checked + label:after {
	left:25px;
	transform: translateX(-100%);
	background: linear-gradient(180deg,#777,#3a3a3a);
}
label:active:after{
	width: 50px;
}
.background {
	width:100vw;
	height: 100vh;
	background: #fff;
	z-index: -1;
	position: absolute;
	transition: 0.3s;
}
input:checked + label + .background {
	background:#242424;
}
label svg {
	position: absolute;
	width: 20px;
	top:2.5px;
	z-index: 100;
}
label svg.sun {
	left:28px;
	fill:#fff;
	transition: 0.3s;
}
label svg.moon {
	left:2px;
	fill:#7e7e7e;
	transition: 0.3s;
}
input:checked + label svg.sun {
	fill:#7e7e7e;
}
input:checked + label svg.moon {
	fill:#fff;
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
  margin-left: 75px;
  width: calc(100% - 75px);
  overflow-y: auto;
  background-color: rgb(26, 26, 26);
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  color: white;
  padding: 10px;
  height: 10%;
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

.content-area {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.upper-content-area,
.lower-content-area {
  display: flex;
  flex: 1;
}

.upper-content-area {
  height: 45%;
}

.lower-content-area {
  height: 45%;
}

.card {
  background-color: #444;
  color: white;
  border-radius: 5px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.directory-card,
.my-tasks-card,
.scraping-tasks-card,
.calendar-card {
  width: calc(50% - 20px);
  margin: 5px 10px;
}

.scraping-tasks-card,
.calendar-card  {
  margin-top: 20px;
}
.card h3 {
  font-size: 1.2rem;
}
.calendar-row {
  display: flex;
}
.calendar-row > div {
  flex: 1;
  padding: 10px;
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

.my-tasks-card li:last-child {
  margin-bottom: 0; 
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
  flex-wrap: wrap; 
  justify-content: space-around; 
  align-items: center;
}

.directory-card h3 {
  width: 100%;
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

.vuecal--blue-theme .vuecal__cell-content {
  border-radius: 50%;
  margin: 4px;
}

.vuecal--blue-theme .vuecal__cell-content:not(.vuecal__past) {
  background-color: #444; 
}

.vuecal--blue-theme .vuecal__cell-content.vuecal__selected {
  background-color: orange;
}

.vuecal--blue-theme .vuecal__cell-content:not(.vuecal__past):not(.vuecal__selected):hover {
  background-color: #555; 
}

.event-class {
  background-color: #ff9800; 
  color: #ffffff; 
  border-radius: 4px;
  padding: 4px; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.vuecal--cell-content {
  display: flex;
  align-items: center;
  justify-content: center;
}


@media (max-width: 1024px) {

  .upper-content-area,
  .lower-content-area {
    flex-direction: column;
  }

  .calendar-card,
  .scraping-tasks-card,
  .directory-card,
  .my-tasks-card {
    
  }
}</style>

