<template>
  <div class="dashboard-container">
    <!-- Header -->
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <h2>Web Scraping Insights</h2>
      <div class="profile">
        <!-- Profile Image -->
      </div>
    </header>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Calendar Section -->
      <section class="calendar-section">
        <!-- Calendar Here -->
      </section>

      <!-- Tasks and Directory Sections -->
      <section class="tasks-directory-section">
        <!-- Mt Directory -->
        <div class="mt-directory">
          <!-- Collections Here -->
        </div>

        <!-- Tasks -->
        <div class="tasks">
          <!-- Scraping Tasks Here -->
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  color: #fff;
  background-color: #333;
  min-height: 100vh;
  padding: 20px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-content {
  display: flex;
  justify-content: space-between;
}

.calendar-section {
  /* Styles for calendar */
}

.tasks-directory-section {
  display: flex;
  justify-content: space-between;
}

.mt-directory {
  /* Styles for directory */
}

.tasks {
  /* Styles for tasks */
}

/* Add more styles here to match the provided design */
</style>
