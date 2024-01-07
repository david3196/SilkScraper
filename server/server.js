const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
const mongoUri = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(mongoUri);

async function connectToDb() {
  try {
    await client.connect();
    db_users = client.db('silk-scraper-users');
    db_tasks = client.db('silk-scraper-tasks');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to DB:', error);
    process.exit(1);
  }
}

connectToDb();

app.post('/api/users/signup', async (req, res) => {
  const { firstName, lastName, userType, email} = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const usersCollection = db_users.collection('users');
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return res.status(409).send('User already exists');
    }

    const newUser = { firstName, lastName, userType, email };
    await usersCollection.insertOne(newUser);
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

app.get('/api/getUserByEmail', async (req, res) => {
    const userEmail = req.query.email;

    if (!userEmail) {
        return res.status(400).send('Missing email parameter');
    }
    
    try {
        const usersCollection = db_users.collection('users');
        const user = await usersCollection.findOne({ email: userEmail });

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/scheduleTask', async (req, res) => {
  const {userEmail, taskData} = req.body;

  try {
    const tasksCollection = db_tasks.collection('tasks');
    const scheduleTime = new Date(taskData.datetime).toISOString();

    const usersCollection = db_users.collection('users');
    const user = await usersCollection.findOne({ email: userEmail });

    const newTask = {uid: user._id , scheduleTime, taskDetails: taskData, status: "scheduled"};
    await tasksCollection.insertOne(newTask);

    res.status(200).send({ message: "Task scheduled successfully" });
  } catch (error) {
    console.error("Error scheduling task:", error);
    res.status(500).send({ message: "Failed to schedule task" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

